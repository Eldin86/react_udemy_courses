//Checkout komponenta, rendera CheckoutSummary komponentu, u kojoj je burger koji smo narucili
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

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
        let summary = <Redirect to="/" />
       
        if (this.props.ings) {
            //Ako smo vec narucili burger predirectaj nas na pocetnu stranu
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued} />

                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary
      
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout)