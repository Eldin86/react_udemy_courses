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
//ovu funkciju dispatchamo kad se asinhrona funkcija izvrsi (initIngredients)
//obicno trebamo actionse i za success i za error
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
            //nakon sto dohvatimo podatke dispatchaj ovaj action
            //na success dispatchamo setIngredients
            dispatch(setIngredients(response.data))
        })
        .catch(error => {
            //Ako imamo error dispatchaj ovaj action
            dispatch(fetchIngredientsFailed())
        })
    }
}
///////////////////////////////