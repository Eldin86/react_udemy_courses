//Checkout komponenta, rendera CheckoutSummary komponentu, u kojoj je burger koji smo narucili
import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        //Extract query params i spremimo u query varijablu
        const query = new URLSearchParams(this.props.location.search) 
       
        //zelimo da spremimo ingredientse u obliku u kojem vec postoje
        const ingredients = {}
        for(let param of query.entries()){
            console.log('[Checkout.js -> queryParams]',param)
            //param -> ["bacon", "1"] ["cheese", "1"]  ["meat", "1"]  ["salad", "1"]
            //Spremimo i ingredients objekat key value vrijednosti, value pretvorimo u broj jer ono sto dobijemo iz url-a je string
            ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients: ingredients})
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
                    {/* za kreiranje putanja i route koristimo match.path */}
                    {/* Nested routing, da se prikaze ispod hamburgera */}
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        )
    }
}

export default Checkout