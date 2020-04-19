import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

/* nazive actions creatorsa koristimo u komponenti kao metodu*/

//Dodaje ingredient
//Proslijedimo mu naziv ingredienta
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        //ingredientName saljemo u reducer
        ingredientName: name
    }
}
//uklanja ingredient
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}


/////////////////////////////
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
//asinhroni action za dohvatanje ingredientsa
export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-projekat-ii.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed())
        })
    }
}
///////////////////////////////