//Odlaze izvrsenje sljdeceg koraka
import { delay } from 'redux-saga/effects'
//put sluzi da dispatchamo novi action
import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from 'axios'

//zvjezdica pretvara funkciju u generator, to su next get javascript features, to su funkcije koje mogu
//se izvrsiti inkrementalno, mozemo ih pozvati i ne pokrecu se od pocetka do kraja nego se mogu pauzirati
//tokom izvrsenja, dok npr cekaju asinhroni kod da se izvrsi
//u function generatorima svaki korak koji izvrsavamo trebamo prepend prefix yield keyword
export function* logoutSaga(action) {
    //yield znaci da ovaj korak treba da se izvrsi, i da ce cekati da se izvrsi, ako je asinhrona radnja
    //ne bi se nastavilo prije nego se korak izvrsi, odnosno izvrsava se korak po korak
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('expirationDate')
    yield localStorage.removeItem('userId')
    //put sluzi umjesto dispatcha, odnosno da dispatchamo action
    put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
    //cekamo da token istekne 
    yield delay(action.expirationTime * 1000)
    //zatim se logout nakon isteka tokena
    yield put(actions.logout())
}

export function* authUserSaga(action) {
    yield put(actions.authStart())
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvvOKXU4obbD1-crWKNxgTWlEoNQPygkA'
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvvOKXU4obbD1-crWKNxgTWlEoNQPygkA'
    }
    //kad smo spremili rezultat u konstantu, mozemo koristiti try catch u slucaju errora
    try {
        //tek kad dobijemo response spremimo rezultat u response konstantu, to radimo pomocu yield
        const response = yield axios.post(url, authData)
        //kod ispod mozemo onda da izvrsavamo sinhrono, jer se pauzira na response konstanti, jer koristimo yield
        console.log('[auth.js -> response ]', response)
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)
        console.log('auth.js -> expirationDate', expirationDate)
        console.log('auth.js -> new Date()', new Date())
        yield localStorage.setItem('token', response.data.idToken)
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userId', response.data.localId)
        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        console.log('[auth.js -> error]', error.response.data.error)
        yield put(actions.authFail(error.response.data.error))
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token')
    if (!token) {
        yield put(actions.logout())
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
        if (expirationDate <= new Date()) {
            console.log('auth.js -> expirationDate', expirationDate)
            console.log('auth.js -> new Date()', new Date())
            yield put(actions.logout())
        } else {
            console.log('auth.js -> expirationDate', expirationDate)
            console.log('auth.js -> new Date()', new Date())
            const userId = localStorage.getItem('userId')
            yield put(actions.authSuccess(token, userId))
            console.log('auth.js -> checkAuthTimeout -> expirationDate', expirationDate.getSeconds() - new Date().getSeconds())
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}