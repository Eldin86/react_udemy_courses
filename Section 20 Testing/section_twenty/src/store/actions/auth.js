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
         let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvvOKXU4obbD1-crWKNxgTWlEoNQPygkA'
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvvOKXU4obbD1-crWKNxgTWlEoNQPygkA'
        }
         axios.post(url, authData)
            .then(response => {
                console.log('[auth.js -> response ]',response)
                 const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                 console.log('auth.js -> expirationDate', expirationDate)
                console.log('auth.js -> new Date()', new Date())
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
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
        path: path
    }
}

//automatski login usera ako ima validan token
export const authCheckState = () => {
    //ne koristimo asinhroni kod, nego zelimo vise actionsa da dispatchamo, tako da mozemo koristiti dispatch na ovaj nacin
    return dispatch => {
        //dohvatimo token
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
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