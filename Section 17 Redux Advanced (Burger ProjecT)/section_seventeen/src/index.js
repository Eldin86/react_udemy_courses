import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'

//redux related
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import reducer from './store/reducer'

//kreiramo store i povezemo ga sa reducerom
const store = createStore(reducer)

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
