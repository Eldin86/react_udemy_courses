//redux store kreiramo na mjestu kad se aplikacija mounta, odnosno starta
import React from 'react';
import ReactDOM from 'react-dom';

//dedaultna compose funkcija koju nam daje redux, to je slicno kao combineReducers, compose sluzi
//da kombiniramo enhancers(enhancer je devtool?)
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import counterReducer from './store/reducers/counter'
import resultReducer from './store/reducers/result'
import  {Provider} from 'react-redux'
//thunk je library koji dodaje middleware projketu, sto dozvoljava action creatorsima, da ne vrate
//sami action nego da vrate action koja ce kasnije dispatchati action, tako mozemo da koristimo asinhroni kod,
//Moramo ga dodati u applyMiddleware
//thunk jest middleware
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const reducer = combineReducers({
  ctr: counterReducer,
  res: resultReducer
})

//MIDDLEWARE
//middleware prima store kao input
const logger = store => {
  //Vratimo novu funkciju koja prima next argument, next omogucava da actions idu dalje do reducera
  return next => {
    //funkcija vraca drugu funkciju koja prima action kao input
    return action => {
      //Unutar ovih funkcija mozemo da dohvaitimo store, next i action
      //Ovdje izvrsavamo kod koji zelimo da se pokrene izmedju action i reducera
      console.log('[index.js -> middleware Dispatching]', action)
      //Zatim izvrsimo next da bi dozvolili actionu da dodje do reducera, ali mu moramo proslijediti action
      const result = next(action);
      console.log('[index.js -> middleware -> next state]', store.getState())
      return result
    }
  }
}

//composeEnhancers sluzi da povezemo browser sa redux-store-om
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//u createStore proslijedimo middleware pomocu applyMiddleware metode, mozemo listu middleware-a
//proslijediti unutar applyMiddleware
//composeEnhancers sluzi da povezemo browser sa redux-store-om
const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
