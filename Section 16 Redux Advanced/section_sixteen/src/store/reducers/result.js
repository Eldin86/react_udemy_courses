import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'
//REDUCER
const initialState = {
    results: []
}

const deleteResult = (state, action) => {
    const newArray = state.results.filter((result) => result.id !== action.resultElId)
    return updateObject(state, {results: newArray})
} 

//u reduceru radimo svu logiku? Reduceri su sinhroni, ne mozemo raditi asinhrone radnje u njima direknto
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            console.log('[result.js -> action]', action)
            const storedResult = state.results.concat( { value: action.result, id: new Date() } )
            console.log('[reducer.js -> storedResult]', storedResult)
            console.log('[result.js results Array]', state.results.value)
            return updateObject(state, {results: state.results.concat( { value: action.result, id: new Date() } )})
        case actionTypes.DELETE_RESULT:
           
            return deleteResult(state, action)
        default: ;
    }
    return state
}

export default reducer