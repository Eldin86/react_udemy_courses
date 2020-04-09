import * as actionTypes from '../actions/actionTypes'

export const deleteResult = (resElId) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: resElId
    }
}
/////////////////////////////////// ispod je sve jedan action, sinhroni i asinhroni
//Ovo je sinhroni action creator
//Samo sihroni actions mogu dodati u store vrijednost 
export const saveResult = (res) => {
    //Mozemo ovdje da imamo logiku a i u reduceru, mozda je ipak bolje u reduceru drzati logiku, a ne previse logike u actionsu
    //const updatedResult = res * 2
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    }
}
/*
 thunk je library koji dodaje middleware projketu, sto dozvoljava action creatorsima, 
 da ne vrate sami action nego da vrate action koja ce kasnije dispatchati action, 
 tako mozemo da koristimo asinhroni kod,
 */

/*
 obicno koristimo kombinaciju sinhronog actiona sa asinhronim, saveResult -> sinhroni
 storeResult -> asinhroni
*/

//asinhroni action, on je moguc samo pomocu redux-thunk
//storeResult je action koju korisitmo u Counter komponeneti, i nju koristimo kao asinhronu,
//dok unutar nje pozivamo sinhroni action i sa sinhronim actionom updatujemo store
export const storeResult = (res) => {
    //middleware runs izmedju dispatchanja action i dook action dodje do reducera
    //dispatch dobijemo zbog redux-thunk-a
    //getState metoda kojom dohvacamo state, ne trebamo ga previse koristiti
    //Najbolje proslijediti kao argument storeResult funkcije, iz komponente
    return (dispatch, getState) => {
        const oldCounter = getState().ctr.counter
        console.log('[result.js -> oldCounter]', oldCounter)
        setTimeout(() => {
            //Unutar dispatch funkcije mozemo da dispatchamo action koji zelimo
            //sinhroni action moramo pozvati i izvrsiti ga i proslijediti payload u store
            //nakon 2 sekunde pozovemo sinhroni action
            dispatch(saveResult(res))
        }, 2000)
    }
}
