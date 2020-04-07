//****HOC KOJU MOZEMO KORISTITI NA BILO KOJOJ KOMPONENTI KOJA KORISTI AXIOS****
import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Auxiliary from '../Auxiliary/Auxiliary.js'

//Prikazuje error poruku kao modal 
//axios je vrijednost koju dobijemo iz BurgerBuilder, odnosno da li imamo error ili ne
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        //hook se aktivira prije nego se mounta komponenta, prije rendera metode
        //tu postavljamo interceptor
        componentWillMount() {
            //Postavljamo globalne interceptorse koji nam dozvoljvaju da handlamo errore
            //Smjestamo u globalnu varijablu this.reqInterceptor, da bismo mogli dohvatiti u componentWillUnmount
            this.reqInterceptor = axios.interceptors.request.use(req => {
                //Nuliramo errore, odnosno kad god posaljemo zahtjev ponistimo errore
                // this sets the state.error value to null BEFORE the axios request is sent
                this.setState({ error: null })
                return req
            })

            //The axios interceptor expects two function parameters, since we only need to store the error, 
            //we are using the shorter version of fat arrow function res => res.
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
                return Promise.reject(error)
            })
        }

        //Kad unmountamo komponentu ponistimo interceptore, radi memore leaking
        componentWillUnmount() {
            console.log('[withErrorHandler -> componentWillUnmount]', this.reqInterceptor, this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Auxiliary>
                    {/* U modalu je error poruka */}
                    {/* modal i WrappedComponent su jedan kraj drugog jer modal dodje iznad komponente */}
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    {/* distribuiramo sve props koje komponenta koju proslijedimo ima */}
                    {/* spreadali smo props da bi mogli proslijediti props drugoj komponenti koju omotava 
                    ova HOC, i da bi mogli koristiti te props */}
                    {/* ...this.props postavimo da mozemo dalje proslijediti props u drugu komponentu koju omotava ova HOC */}
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            )
        }
    }

}

export default withErrorHandler