import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import AuthContextProvider from './context/auth-context'

ReactDOM.render(
    //omotamo cijelu aplikaciju sa AuthContextProvider, tako da cijela aplikacija moze 
    //da primi kontekst bilo gdje u aplikaciji
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
    , document.getElementById('root'));
