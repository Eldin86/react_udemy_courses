import * as actionTypes from '../actions/actions'
//REDUCER
const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            console.log('[result.js -> action]', action)
            const storedResult = state.results.concat( { value: action.result, id: new Date() } )
            console.log('[reducer.js -> storedResult]', storedResult)
            console.log('[result.js results Array]', state.results.value)
            return {
                ...state,
                results: storedResult
            }
        case actionTypes.DELETE_RESULT:
            const newArray = state.results.filter((result) => result.id !== action.resultElId)
            return {
                ...state,
                results: newArray
            }
        default: ;
    }
    return state
}

export default reducer