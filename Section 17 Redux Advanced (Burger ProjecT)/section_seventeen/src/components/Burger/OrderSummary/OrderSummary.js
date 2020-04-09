//Order komponenta se sastoji od sastojaka koje smo narucili i 2 buttona cancel i continue
import React, { Component } from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                console.log('OrderSummary: INGREDIENTSUMMARY INGREDIENTS igKey', this.props.ingredients[igKey])
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
                        {this.props.ingredients[igKey]}
                    </li >)
            })

        console.log('OrderSummary: INGREDIENTSUMMARY', this.ingredientSummary)
        console.log('OrderSummary: INGREDIENTSUMMARY INGREDIENTS SALAD', this.props.ingredients)

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.purchaseCancelled} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.purchaseContinued} btnType="Success">CONTINUE</Button>
            </Auxiliary>
        )
    }
}

export default OrderSummary