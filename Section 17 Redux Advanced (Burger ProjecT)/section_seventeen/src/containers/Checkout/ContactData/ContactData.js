//komponenta koja sadrzi kontakt formu prilikom narudzbe, ima svoj state
import React, { Component } from 'react'
import axios from '../../../axios-orders'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
    //Dohvatamo podatke u ovaj state?
    state = {
        //konfigurisemo sva polja i vrijednosti
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

    //Handler kojim saljemo podatke u bazu pri narudzbi nakon sto popunimo formu
    orderHandler = (event) => {
        event.preventDefault()
        console.log('[ContactData.js -> ingredients]', this.props.ings)
        
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
        this.props.onOrderBurger(order)
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
        if (this.props.loading) {
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))