import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
//inicijalni state
const initialState = {
    ingredients: null,
    totalPrice: 4,
    //error u slucaju da nismo dohvatili podatke sa servera, ili ako imamo neku komplikaciju
    error: false,
    //da li smo u procesu pravljenja burgera ili ne
    //na true postavljamo kad dodajemo ili uklanjamo ingredient, odnoson kad radimo na burgeru
    building: false
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        //Smjestamo na true jer smo kliknuli na dugme da dodamo sastojak za burger,
        //odnosno u procesu smo kreiranja burgera
        building: true
    }
    return updateObject(state, updatedState)
}
const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        //Smjestamo na true jer smo kliknuli na dugme da uklonimo sastojak za burger,
        //odnosno u procesu smo kreiranja burgera
        building: true
    }
    return updateObject(state, updatedSt)
}
//setIngredients se postavljaju kad tek loadiramo page, odnosno kad tek posjetimo burgerBuilder
const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        //resetujemo price na pocetnu vrijednost
        totalPrice: 4,
        //resetujemo error na false, ukoliko smo uspjesno dohvatili podatke a imali smo prije error
        error: false,
        //false smo postavili jer smo reload page, i pocinjemo ispocetka sa kreiranjem burgera
        building: false
    })
}
const fetchIngredientsFailed = (state, action) => {
    //ukoliko nije uspjelo dohvatanje podataka postavi error na true, da izbaci poruku
    return updateObject(state, {error: true})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
           
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
           //izvrsi se kad dobijemo ingredientse sa servera, znaci da postavljamo ingredientse
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
            
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
            
        default: return state
    }
}

export default reducer