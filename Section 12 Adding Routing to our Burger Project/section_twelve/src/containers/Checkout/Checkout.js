//Checkout komponenta, rendera CheckoutSummary komponentu, u kojoj je burger koji smo narucili
import React, {Component} from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
    state={
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
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

    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelled}
                checkoutContinued={this.checkoutContinued}/>
            </div>
        )
    }
}

export default Checkout