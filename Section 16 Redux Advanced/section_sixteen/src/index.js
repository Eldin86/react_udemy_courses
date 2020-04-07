//redux store kreiramo na mjestu kad se aplikacija mounta, odnosno starta
import React from 'react';
import ReactDOM from 'react-dom';

//combineReducers funkcija kojom mergamo reducerse u jedan
import {createStore, combineReducers} from 'redux'
//import reducer from './store/reducer'
import counterReducer from './store/reducers/counter'
import resultReducer from './store/reducers/result'
import  {Provider} from 'react-redux'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const reducer = combineReducers({
  //preko ctr i res propertijima radimo u drugim komponentama
  ctr: counterReducer,
  res: resultReducer
})

//proslijedili smo reducer u store
const store = createStore(reducer);

//Intaliramo react-redux paket i koristimo Provider da bismo povezali redux sa reactom
//Provider je helper komponenta koja pomaze da inject store u react komponente
//U provider prostavimo atribut store a u taj atribut proslijedimo store (createStore(reducer) )
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
