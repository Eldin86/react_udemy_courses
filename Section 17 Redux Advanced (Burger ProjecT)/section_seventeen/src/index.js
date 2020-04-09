import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk'

//redux related
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import burgerBuilderReducer from './store/reducers/burgerBuilder'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//kreiramo store i povezemo ga sa reducerom, takodjer koristimo redux devtools
const store = createStore(burgerBuilderReducer, composeEnhancers(applyMiddleware(thunk)))

//trebamo obratiti paznju da connect i routing funkcionalnosti rade savrseno
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
