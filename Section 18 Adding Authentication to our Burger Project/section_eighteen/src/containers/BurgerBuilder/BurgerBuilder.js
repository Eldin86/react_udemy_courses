//Komponenta koja sadrzi modal u kojem je orderSummary, burger  i kontrole od burgera
//rcc skracenica za kreiranje class komponente
import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
//konektujemo redux sa reactom
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {

    state = {
        //Purchasing nam sluzi da prikazemo modal
        purchasing: false
    }

    componentDidMount() {
        console.log('[BurgerBuilder.js] -> this.props', this.props)
        this.props.onInitIngredients()
    }

    //Enable vrati boolean u ovisnosti o broju ingredientsa
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        console.log('[BurgerBuilder -> updatePurchaseState]:', sum)
        return sum > 0
    }

    //handler kojim enable button za ORDER NOW
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }
    //Handler kojim ponistavamo narudzbu u modalu
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
        console.log('purchaseCancelHandler', this.state.purchasing)
    }
    //Handler kojim nastavljamo dalje narudzbu, CONTINUE button
    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
           ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
            console.log('BurgerBuilder -> disabledInfo[key]', key, disabledInfo[key])
        }
        console.log('BurgerBuilder -> disabledInfo', disabledInfo)

        let orderSummary = null;

        let burger = this.props.error ? <h1 style={{ textAlign: 'center' }}>Ingredients can't be loaded</h1> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Auxiliary>
            )
            orderSummary = <OrderSummary
                price={this.props.price}
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />


        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

//Proslijedili smo komponentu kao argument da bismo je mogli vratiti nazad i ponovo normlano koristiti?
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))

