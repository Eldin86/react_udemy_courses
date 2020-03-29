import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'

axios.defaults.headers.post['Content-Type'] = 'application/json'

const requestInterceptor = axios.interceptors.request.use(request => {
  console.log('[index.js -> interceptor request]',request)
  return request
}, error => {
  console.log('[index.js -> interceptor request error]', error)
  return Promise.reject(error)
})

const responseInterceptor = axios.interceptors.response.use(response => {
  console.log('[index.js -> interceptor response]',response)
  return response
}, error => {
  console.log('[index.js -> interceptor response error]', error)
  return Promise.reject(error)
})

axios.interceptors.request.eject(requestInterceptor)
axios.interceptors.response.eject(responseInterceptor)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
