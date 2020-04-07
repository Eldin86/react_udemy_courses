const redux = require('redux')
const createStore = redux.createStore;

//Za inicijalizaciju state-a
const initialState = {
    counter: 0
}

//REDUCER
//Kreiramo reducer, koji prima stari state, i action
//Funkcija mora da vrati updatovan state
//Dodjelimo defaultnu vrijednost state-u da ne bi imali undefined
const rootReducer = (state = initialState, action) => {
    if(action.type === 'INC_COUNTER'){
        console.log('test', state, action)
        //Uvijek moramo da kopiramo objekat, nikad ne radimo sa originalom
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    if(action.type === 'ADD_COUNTER'){
        return {
            ...state,
            counter: state.counter + action.value
        }
    }
    //Vratimo state ako se niti jedan if uslov ne poklapa
    return state
}

//STORE
//Kreiramo novi redux store, store mora biti inicijaliziran sa REDUCEROM, reducer updatuje state
const store = createStore(rootReducer)
//getState() funkcija koja vadi state, iz store-a
console.log(store.getState())

//SUBSCRIPTION
//Subscriptions nam sluze da ne bi rucno pozivali stalno getState()
//Subscribe prima funkciju koja se aktivira kad god se state updatuje
//U function body mozemo izvrsiti bilo koji kod na state updatovanju
store.subscribe(() => {
    //izvrsi se prvo INC_COUNTER, zatim ADD_COUNTER zatim se ispise log koji je ispod actions
    console.log('[Subscription]', store.getState())
})

//DISPATHCING ACTION
//Action dispatchamo pristupanjem store-u
//Dispatch je funkcija koja prima argument koji je action odnosno objekat
//Ovdje odredjuemo koji tip actiona je dispatchan i koji payload ako ga ima
//type je identifikator
store.dispatch({type: 'INC_COUNTER'})
store.dispatch({type: 'ADD_COUNTER', value: 10})
console.log(store.getState())
