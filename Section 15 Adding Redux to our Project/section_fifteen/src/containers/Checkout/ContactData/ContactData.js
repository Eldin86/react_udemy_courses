//komponenta koja sadrzi kontakt formu prilikom narudzbe, ima svoj state
import React, { Component } from 'react'
import axios from '../../../axios-orders'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    //Dohvatamo podatke u ovaj state?
    state = {
        //konfigurisemo sva polja i vrijednosti
        orderForm: {
            name: {
                //Input element
                elementType: 'input',
                //konfiguracijski atribut za odabrani tag element
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    //input polje ne smije biti prazno
                    required: true
                },
                valid: false,
                //Provjeravamo da li je user vec unio ista u input ili ne
                touched: false
            },
            street: {
                //Input element
                elementType: 'input',
                //konfiguracijski atribut za odabrani tag element
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    //input polje ne smije biti prazno
                    required: true
                },
                valid: false,
                //Provjeravamo da li je user vec unio ista u input ili ne
                touched: false
            },
            zipCode: {
                //Input element
                elementType: 'input',
                //konfiguracijski atribut za odabrani tag element
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    //input polje ne smije biti prazno
                    required: true,
                    //broj karaktera za Zip Cose (5 brojeva)
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                //Provjeravamo da li je user vec unio ista u input ili ne
                touched: false
            },
            country: {
                //Input element
                elementType: 'input',
                //konfiguracijski atribut za odabrani tag element
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    //input polje ne smije biti prazno
                    required: true
                },
                valid: false,
                //Provjeravamo da li je user vec unio ista u input ili ne
                touched: false
            },
            email: {
                //Input element
                elementType: 'email',
                //konfiguracijski atribut za odabrani tag element
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    //input polje ne smije biti prazno
                    required: true
                },
                valid: false,
                //Provjeravamo da li je user vec unio ista u input ili ne
                touched: false
            },
            deliveryMethod: {
                //Select element
                elementType: 'select',
                //konfiguracijski atribut za odabrani tag element
                //njega smo dalje rijesili u Input komponenti
                elementConfig: {
                    //Options su niz objekata, odnosno vrijednosti za select tag
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                //defaultnu vrijednost smo postavili, jer kad submitamo formu bez promjene value
                //u bazu ce upisti kao '', tek kad izaberemo drugu opciju onda ce biti u redu
                value: 'fastest',
                validation: {},
                //Stavili smo ovo polje uvijek da bude true
                valid: true
            }
        },
        //Provjeravamo da li je forma validna, da mozemo disable enable button na formi
        formIsValid: false,
        loading: false
    }

    //Handler kojim saljemo podatke u bazu pri narudzbi nakon sto popunimo formu
    orderHandler = (event) => {
        event.preventDefault()
        console.log('[ContactData.js -> ingredients]', this.props.ings)
        this.setState({ loading: true })
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
            console.log('[ContactData.js -> formData]', formData)
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log('[BurgerBuilder -> axios success response]', response)
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(error => {
                console.log('[BurgerBuilder -> axios error response]', error)
                this.setState({ loading: false })
            })
    }

    //Handler kojim dohvacamo vrijednost inputa iz forme i updatujemo
    inputChangedHandler = (event, inputIdentifier) => {
        //Prvo smo klonirali orderForm unutar state-a
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement
        console.log('[ContactData.js -> updatedFormElement', updatedFormElement)

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        console.log('[ContactData -> formIsValid]', formIsValid)
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }

    //Handler vraca true ili false, da li je validan input ili ne
    checkValidity = (value, rules) => {
        let isValid = true
        //Ako nemamo rules objekta vrati true
        if (!rules) {
            return true
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElementsArray.map(formElement => (
                        <Input
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            key={formElement.id}

                            invalid={!formElement.config.valid}
                            //Tip inputa koji nam treba
                            elementType={formElement.config.elementType}
                            //Objekat u kojem su validation atributi
                            shouldValidate={formElement.config.validation}
                            //Da li je user vec unio karakter u polje
                            touched={formElement.config.touched}
                            //proslijedimo objekat koji u Input komponenti spreadamo
                            elementConfig={formElement.config.elementConfig}
                            //value atribut unutar input elementa
                            value={formElement.config.value} />
                    ))
                }
                <Button disabled={!this.state.formIsValid} btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData)