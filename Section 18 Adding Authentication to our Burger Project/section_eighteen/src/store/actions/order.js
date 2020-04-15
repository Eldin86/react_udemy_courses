import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

/////////////////////////////////////////////
//sinhroni action creator
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}
//sinhroni action creator
export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

//asinhroni action dispatchamo ga iz kontejnera kad kliknemo order button
//ukoliko smo authenticated mozemo da narucimo burger
export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        //Prije nego pocnemo da dohvacamo sa servera pokrenemo ovaj action
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth='+ token, orderData)
            .then(response => {
                console.log('[order.js -> action -> axios success response]', response)
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                console.log('[order.js -> action -> axios error response]', error)
                dispatch(purchaseBurgerFail(error))
            })
    }
}
//////////////////////////////////////


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


///////////////////////////////////////////////////
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START

    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        //Dodajemo token u url da bismo provjerili da li je user authenticated ili ne
        axios.get('/orders.json' + queryParams)
            .then(response => {
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
                dispatch(fetchOrdersSuccess(fetchedOrders))
            }).catch(error => {
                dispatch(fetchOrdersFail(error))
            })
    }
}
/////////////////////////////////////////////////////////