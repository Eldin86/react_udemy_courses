//Checkout komponenta, rendera CheckoutSummary komponentu, u kojoj je burger koji smo narucili
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import {connect} from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

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
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued} />
                 <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout)