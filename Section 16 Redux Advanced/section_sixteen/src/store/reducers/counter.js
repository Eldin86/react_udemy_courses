//Ovo je file koji cemo exportovati reducer koji koristimo
//actionTypes je objekat posto smo ih sve exportovali, named export, tako da dobijemo objekat
import * as actionTypes from '../actions/actions'
//REDUCER
const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            }
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.value
            }
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.value
            }
        default: ;
    }
    return state
}

export default reducer