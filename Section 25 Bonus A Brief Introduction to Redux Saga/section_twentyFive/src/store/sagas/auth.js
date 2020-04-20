//put sluzi da dispatchamo novi action
import {put} from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'

//zvjezdica pretvara funkciju u generator, to su next get javascript features, to su funkcije koje mogu
//se izvrsiti inkrementalno, mozemo ih pozvati i ne pokrecu se od pocetka do kraja nego se mogu pauzirati
//tokom izvrsenja, dok npr cekaju asinhroni kod da se izvrsi
//u function generatorima svaki korak koji izvrsavamo trebamo prepend prefix yield keyword
export function* logout(action){
    //yield znaci da ovaj korak treba da se izvrsi, i da ce cekati da se izvrsi, ako je asinhrona radnja
    //ne bi se nastavilo prije nego se korak izvrsi, odnosno izvrsava se korak po korak
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('expirationDate')
    yield localStorage.removeItem('userId')
    put({
        type: actionTypes.AUTH_LOGOUT
    })
}