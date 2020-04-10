import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}


//ovu funkciju dispatchamo kad se asinhrona funkcija izvrsi (initIngredients)
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}
//action koji dispatcha error ukoliko ga ima prilikom dohvatanja podataka sa servera
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
//asinhroni action
export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-projekat-ii.firebaseio.com/ingredients.json')
        .then(response => {
            //nakon sto dohvatimo podatke dispatchaj ovaj action
            dispatch(setIngredients(response.data))
        })
        .catch(error => {
            //Ako imamo error dispatchaj ovaj action
            dispatch(fetchIngredientsFailed())
        })
    }
}