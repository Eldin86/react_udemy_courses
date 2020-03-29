import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

//Postavili smo defaultni url za axios, svugdje u aplikaciji
//Postavimo samo base url
//I kad koristimo neki parametar samo njega dodamo, npr ( axios.get('/posts') ) u Blog.js komponenti
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
//Postavimo defaultne headerse
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'

//Postavimo headers samo za specificne request tipove, npr post request gdje postavimo Content-Type npr
axios.defaults.headers.post['Content-Type'] = 'application/json'

//Interceptorsi ce se koristiti kroz sve fajlove projekta
//use() koristimo da registrujemo novi interceptor, prima funkciju kao input, konfigurator
//U interceptoru u vijek moramo vratiti request, inace blokiramo request
//Mozemo editovati request konfig prije nego ga vratimo
//Error je povezan sa slanjem zahtjeva, nema interneta ili slicno
//Moze biti koristen za dodavanje zajednickog headera za sve request
const requestInterceptor = axios.interceptors.request.use(request => {
  console.log('[index.js -> interceptor request]',request)
  return request
}, error => {
  console.log('[index.js -> interceptor request error]', error)
  return Promise.reject(error)
})

//interceptor za response
//takodjer dvije funkcije, jedna za success druga za error
const responseInterceptor = axios.interceptors.response.use(response => {
  console.log('[index.js -> interceptor response]',response)
  return response
}, error => {
  console.log('[index.js -> interceptor response error]', error)
  return Promise.reject(error)
})

//Uklanjanje interceptora
//Uklanjamo ih da ne bi doslo do memory leaks
//Uobicajeno mjesto za uklanjanje je componentWillUnmount
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
