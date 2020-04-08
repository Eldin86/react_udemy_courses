//Radimo outsorce actions-a da bismo smanjili mogucnost pogreske
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const ADD = 'ADD'
export const SUBTRACT = 'SUBTRACT' 
export const STORE_RESULT = 'STORE_RESULT' 
export const DELETE_RESULT = 'DELETE_RESULT' 

//Action creator je funkcija koja vraca action, odnosno kreira action
//Action takojder moze da prima payload

//Action creator koristimo u komponenti, da osluskuje actione, dok vrijednost iz action creatora
//koristimo u reduceru
export const increment = () => {
    //action creator vraca objekat
    return {
        type: INCREMENT
    }
}

export const decrement = () => {
    return {
        type: DECREMENT
    }
}

//value je vrijednost koju smo poslali iz komponente preko action-a
export const add = (value) => {
    return {
        type: ADD,
        value: value
    }
}

export const subtract = (value) => {
    return {
        type: SUBTRACT,
        value: value
    }
}

export const storeResult = (res) => {
    return {
        type: STORE_RESULT,
        result: res
    }
}

export const deleteResult = (resElId) => {
    return {
        type: DELETE_RESULT,
        resultElId: resElId
    }
}