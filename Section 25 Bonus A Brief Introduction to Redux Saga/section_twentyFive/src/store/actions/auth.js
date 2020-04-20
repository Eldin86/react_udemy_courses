import * as actionTypes from './actionTypes'

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
//inicijalizirali smo redux SAga u ovom action
export const logout = () => {
    // localStorage.removeItem('token')
    // localStorage.removeItem('expirationDate')
    // localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

//NAKON SAT VREMENA ZELIMO DA INVALIDATE TOKEN
export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: 10
    }
}
//radimo autentikaciju usera
//method oznacava da li trebamo se sign in ili sign up
export const auth = (email, password, isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
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
   return {
       type: actionTypes.AUTH_CHECK_STATE
   }
}