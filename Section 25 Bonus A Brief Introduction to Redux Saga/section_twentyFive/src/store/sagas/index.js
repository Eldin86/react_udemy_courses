//dozvoljava nam da listen odredjene actions i nesto radimo sa njima kad se pojave
import {takeEvery} from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth'
import {initIngredientsSaga} from './burgerBuilder'
import {purchaseBurgerSaga, fetchOrdersSaga} from './order'

//Svaki generator moramo konektovati sa midleware i index.js
//u generatorsima moramo koristiti yield
export function* watchAuth(){
    //takeEvery prima action i kao drugi argument je generator saga
    //ne izvrsavamo funkciju nego samo referencu posaljemo
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, initIngredientsSaga)
}

export function* watchOrder(){
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga)
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
}