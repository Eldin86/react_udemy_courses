//Checkout komponenta, rendera CheckoutSummary komponentu, u kojoj je burger koji smo narucili
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        //Extract query params i spremimo u query varijablu
        const query = new URLSearchParams(this.props.location.search)

        //zelimo da spremimo ingredientse u obliku u kojem vec postoje
        const ingredients = {}
        let price = 0;
        for (let param of query.entries()) {
            console.log('[Checkout.js -> queryParams]', param)
            //Ako je queryParam price onda dodaj vrijednost price varijabli price
            if (param[0] === 'price') {
                 price = param[1]
            } else {
               ingredients[param[0]] = +param[1]
            }

        }
        this.setState({ ingredients: ingredients, totalPrice: price })
    }
    //Handler pomocu kojeg se vracamo na prethodnu stranicu kad kliknemo CANCEL button
    checkoutCancelled = () => {
        //Pomocu goBack metode vracamo se na prethodnu stranicu
        this.props.history.goBack()
    }
    //Handler koji nas vodi na kontakt formu page kad kliknemo na CONTINUE
    checkoutContinued = () => {
        //Zamjenimo trenutnu putanju sa putanjom za kontakt formu
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued} />
                 <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => <ContactData price={this.state.totalPrice} ingredients={this.state.ingredients}  {...props}/>} />
            </div>
        )
    }
}

export default Checkout