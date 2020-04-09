//Ovo je file koji cemo exportovati reducer koji koristimo
//actionTypes je objekat posto smo ih sve exportovali, named export, tako da dobijemo objekat
import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'
//REDUCER
const initialState = {
    counter: 0
}



//u reduceru radimo svu logiku? Reduceri su sinhroni, ne mozemo raditi asinhrone radnje u njima direknto
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.INCREMENT:
            return updateObject(state, {counter: state.counter + 1})
        case actionTypes.DECREMENT:
            return updateObject(state, {counter: state.counter - 1})
        case actionTypes.ADD:
            return updateObject(state, {counter: state.counter + action.value})
        case actionTypes.SUBTRACT:
            return updateObject(state, {counter: state.counter - action.value})
        default: ;
    }
    return state
}

export default reducer