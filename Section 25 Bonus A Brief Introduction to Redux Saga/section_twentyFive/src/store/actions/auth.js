import * as actionTypes from './actionTypes'
import axios from 'axios'

//action kojim upravljamo sa loading state i loadiramo spinner
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

//action kojim radimo logout, cistomo token, userId, expirationDate
export const logout = () => {
    //prilikom logouta pobrisemo i token i expiration date, tako da svaki put kad se logujemo postavimo
    //novi expiration date
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

//NAKON SAT VREMENA ZELIMO DA INVALIDATE TOKEN
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            //dispatchamo logout metodu nakon sto istekne vrijeme koje je expiresIn (1 sat)
            dispatch(logout())
        }, expirationTime * 1000)
    }
}
//radimo autentikaciju usera
//method oznacava da li trebamo se sign in ili sign up
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        //Objekat koji saljemo u bazi prilikom sign up, tj email i password
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        //postavimo defaultni url koji je za signup
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvvOKXU4obbD1-crWKNxgTWlEoNQPygkA'
        //ako nije signup mode onda smo u signin modu i koristimo url za sign in
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvvOKXU4obbD1-crWKNxgTWlEoNQPygkA'
        }
        //Sign up with email / password
        //Moramo poslati objekat sa email, password i returnSecureToken vrijednostima prilikom signup-a
        axios.post(url, authData)
            .then(response => {
                console.log('[auth.js -> response ]',response)
                //Vrijeme kad istice token
                //posto je vrijeme u javascript u milisekundama a vrijeme koje imamo je u sekundama zato mnozimo sa 1000, pretvorimo u sekunde
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                //izracunamo expiration date i spremimo ga u localStorate
                console.log('auth.js -> expirationDate', expirationDate)
                console.log('auth.js -> new Date()', new Date())
                //Spremimo token u localStorage
                localStorage.setItem('token', response.data.idToken)
                 //Spremimo vrijeme kad istice token (vrijeme 1 sat unaprijed) u localStorage
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId)
                //dispatchamo idToken i localId, kad god smo loged in
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                //Dispatchamo akciju nakon sto dobijemo success response u koju proslijedimo expiration time
                //Nakon sto istekne sat vremena koliko traje token automatski radimo logout
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log('[auth.js -> error]', error.response.data.error)
                dispatch(authFail(error.response.data.error))
            })
    }
}

//action koji sluzi za redirectanje nakon sto smo se login ili signup, prima putanju koju zelimo
//proslijediti
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        //path je putanja na koju treba da nas redirecta, '/' ili '/checkout'
        path: path
    }
}

//automatski login usera ako ima validan token
export const authCheckState = () => {
    //ne koristimo asinhroni kod, nego zelimo vise actionsa da dispatchamo, tako da mozemo koristiti dispatch na ovaj nacin
    return dispatch => {
        //dohvatimo token
        const token = localStorage.getItem('token')
        //ako nemamo tokena u localStorage dispatchaj logout
        if(!token){
            dispatch(logout())
        }else{
            //localStorage vrati string, stavili smo u new date jer vrati objekat Date
            //dohvatili smo vrijeme koje racuna sat unaprijed iz localStorage
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            //ako je expirationDate vece od new Date onda zelimo login()
            //new Date() Mon Apr 13 2020 23:03:56 GMT+0200 (Central European Summer Time)
            //dok smo logovani, ako je expirationDate koje je u localStorage manji od trenutnog, onda nas logout, jer je istekao token
            if(expirationDate <= new Date()){
                console.log('auth.js -> expirationDate', expirationDate)
                console.log('auth.js -> new Date()', new Date())
                dispatch(logout())
            }else{
                console.log('auth.js -> expirationDate', expirationDate)
                console.log('auth.js -> new Date()', new Date())
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                console.log('auth.js -> checkAuthTimeout -> expirationDate', expirationDate.getSeconds() - new Date().getSeconds())
                //proslijedimo vrijeme koje predstavlja razliku koje je isteklo u milisekundama nakon koliko ce se logout
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}