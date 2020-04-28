import { useReducer, useCallback } from 'react'

const initialState =   {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: null
}

const httpReducer = (curHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            //u returnu koristimo error ili spinner
            //kad saljemo request prikazujemo spinner
            return { loading: true, error: null, data: null, extra: null, identifier: action.identifier }
        case 'RESPONSE':
            //spreadamo da bi overwrite propertije koje vec imamo a koje necemo mjenjati, npr error, ili loading ako je true, da ga stavimo na false
            //spreadamo da zadrzimo error vrijednost posto je u ovome actionu ne koristimo  
            return { ...curHttpState, loading: false, data: action.responseData, extra: action.extra }
        case 'ERROR':
            return { loading: false, error: action.errorMessage }
        case 'CLEAR': 
            return initialState
        default:
//ako dodjemo do ovoga onda nismo dispatchali neki action koji nismo handlali
throw new Error('Should not be reached')
    }
}
//CUSTOM HOOK
//custom hooks trebaju pocinjati sa use...
//u custom hook mozemo koristiti ostale hook
//svaki put kad koristimo custom hook na vise mjesta, svaki put se kreira drugaciji snapshoot, znaci nikad se isti kod ne pokrece
const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState)

    const clear = useCallback(() => dispatchHttp({type: 'CLEAR'}), [])

    const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
        dispatchHttp({ type: 'SEND', identifier: reqIdentifier })
        //posto u bazi imamo ingredients -> id, tako i proslijedimo u url taj id 
        //stablo u bazi npr (-M5s6ke7NZBySxrw5BEm)
        fetch(url, {
            method: method,
            body: body,
            //za GET metodu headers nam ne treba, dok za neke post treba
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.json()
            })
            .then(responseData => {
                dispatchHttp({ type: 'RESPONSE', responseData: responseData, extra: reqExtra })
            })
            .catch(error => {
                dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong' })
                //**reducer umjesto ovoga -> setError('Something went wrong!')
                //kad nam izbaci error ocistimo loading spinner
                //**reducer umjesto ovoga -> setIsLoading(false)
            })
    }, [])
    //mozemo returnati bilo koju vrijednosti, broj, objekat, niz i td, sta god nam treba
    //Ove vrijednosti custom hook vraca
    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
        reqIdentifier: httpState.identifier,
        clear: clear
    }
}

export default useHttp