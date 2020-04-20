//put sluzi da dispatchamo novi action
import { put } from 'redux-saga/effects'
import axios from '../../axios-orders'
import * as actions from '../actions/index'

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart())
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData)
        console.log('[order.js -> action -> axios success response]', response)
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData))
    } catch (error) {
        console.log('[order.js -> action -> axios error response]', error)
        yield put(actions.purchaseBurgerFail(error))
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart())
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axios.get('/orders.json' + queryParams)
        console.log('[Orders.js -> response.data]', response.data)
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                //spreadamo objekat koji dohvatimo iz firebase
                ...response.data[key],
                //Dodamo i key vrijednost u objekat
                id: key
            })
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders))
    } catch (error) {
        yield put(actions.fetchOrdersFail(error))
    }
}