import * as actionTypes from '../actions/actionTypes'

//Action creator je funkcija koja vraca action, odnosno kreira action
//Action takojder moze da prima payload

//Action creator koristimo u komponenti, da osluskuje actione, dok vrijednost iz action creatora
//koristimo u reduceru
//Ovo su sve sinhroni action kreatorsi
export const increment = () => {
    //action creator vraca objekat
    return {
        type: actionTypes.INCREMENT
    }
}

export const decrement = () => {
    return {
        type: actionTypes.DECREMENT
    }
}

//value je vrijednost koju smo poslali iz komponente preko action-a u reducer
export const add = (value) => {
    return {
        type: actionTypes.ADD,
        value: value
    }
}

export const subtract = (value) => {
    return {
        type: actionTypes.SUBTRACT,
        value: value
    }
}


