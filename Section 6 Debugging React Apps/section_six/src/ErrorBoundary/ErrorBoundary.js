import React, { Component } from 'react';
//Koristimo ErrorBoundary samo gdje znamo da bi mogao fail
//omotamo onu komponentu gdje ocekujemo da cemo da imamo error, i sto ne mozeom da kontrolisemo,
//Mozemo da korisitmo kao error poruku, custom poruku useru
//ErrorBoundary je kao HOC
class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    //Metoda koja prima error i potencijalne informacije o erroru
    //Izvrsi se kad god komponenta koju omotamo sa ErrorBoundary throw error
    componentDidCatch = (error, info) => {
        this.setState({ hasError: true, errorMessage: error })
    }

    render() {
        if (this.state.hasError) {
            //Ako imamo error ispis ga
            return <h1>{this.state.errorMessage}</h1>
        }else{
            //Ako nemamo error vrati this.props.children posto ce jos sadrzaja omotavati ova komponenta
            console.log('[this.props.children]:', this.props.children)
            return this.props.children
        }
    }
}

export default ErrorBoundary

/**
 * ERROR BOUNDARY AND COMPONENT DID MOUNT
 * ---------------
 * --Question--
 * How is the ErrorBoundry componentDidCatch method invoked? is it invoked automatically when 
 * there is an error within the ErrorBoundry component? or we should throwing that explicitly?
 * --------------
 * --Amswer--
 * It's invoked whenever a child component throws an error. Be that automatically or upon your code.
 */

/**
 * The error boundary is meant to be used in components with which you can render other components.
 * never errors occur in these wrapped component, the error boundary allows you to handle them.
 * Think of it like try-catch - just for components.
 */