import * as actionTypes from './actions'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                //prvo kopiramo state objekat
                ...state,
                ingredients: {
                    //Zatim kopiramo ingredients objekat, posto je nested, a spread radi shallow copy
                    ...state.ingredients,
                    //[action.ingredientName] -> Dinamicki overwrite property unutar objekta
                    //state.ingredients[action.ingredientName] -> vrijednost ingredienta
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                //prvo kopiramo state objekat
                ...state,
                ingredients: {
                    //Zatim kopiramo ingredients objekat, posto je nested, a spread radi shallow copy
                    ...state.ingredients,
                    //[action.ingredientName] -> Dinamicki overwrite property unutar objekta
                    //state.ingredients[action.ingredientName] -> vrijednost ingredienta
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }

        default:
            break;
    }
    return state
}

export default reducer