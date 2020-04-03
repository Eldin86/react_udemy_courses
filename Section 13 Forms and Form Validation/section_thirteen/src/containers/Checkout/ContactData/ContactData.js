//komponenta koja sadrzi kontakt formu prilikom narudzbe, ima svoj state
import React, { Component } from 'react'
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    //Dohvatamo podatke u ovaj state?
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    //Handler kojim saljemo podatke u bazu pri narudzbi nakon sto popunimo formu
    orderHandler = (event) => {
        //PreventDefault koristimo da ne loadira formu kad kliknemo na dugme
        event.preventDefault()
        console.log('[ContactData.js -> ingredients]', this.props.ingredients)
        this.setState({ loading: true })
        const order = {
            //this.props.ingredients su iz checkout komponente koje smo proslijedili u render metodu (Route)
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Eldin',
                address: {
                    street: 'Test street 1',
                    zipCode: '88201',
                    country: 'Bosnia and Herzegovina'
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest'
            }
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
    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>);
            //U order handleru postavimo spinner na true, jer smo kliknuli na order button
            //Kad dohvatimo podatke vratimo ga na false i zamjenimo spinner sa formom
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

export default ContactData