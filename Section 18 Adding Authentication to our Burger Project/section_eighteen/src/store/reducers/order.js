import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initalState = {
    //Ordersi koje imamo u bazi
    orders: [],
    //da li smo u procesu narucivanja ili smo gotovi
    loading: false,
    purchased: false
}
const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false })
}
const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true })
}
const purchaseBurgerSuccess = (state, action) => {
    return updateObject(state, {
        //orderse koje smo dohvatili smjestimo u niz
        orders: action.orders,
        //smjestimo loading na false jer smo zavrsili sa dohvatanjem ordersa
        loading: false
    })
}
const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, { loading: true })
}
const fetchOrderSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.order.id })
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    })
}
const fetchOrdersFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: return fetchOrderSuccess(state, action)

        case actionTypes.PURCHASE_BURGER_FAIL: return fetchOrdersFail(state, action)

        case actionTypes.PURCHASE_BURGER_START: return fetchOrderStart(state, action)

        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action)

        case actionTypes.FETCH_ORDERS_START: return purchaseBurgerStart(state, action)

        case actionTypes.FETCH_ORDERS_SUCCESS: return purchaseBurgerSuccess(state, action)

        case actionTypes.FETCH_ORDERS_FAIL: return purchaseBurgerFail(state, action)

        default:
            return state;
    }
}
export default reducer