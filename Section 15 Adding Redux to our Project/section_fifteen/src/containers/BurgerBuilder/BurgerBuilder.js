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
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {

    state = {
        //Purchasing nam sluzi da prikazemo modal
        purchasing: false,
        //Kad je loading true pokaze se spinner
        loading: false,
        //na osnovu errora ispisujemo poruku ukoliko ga ima
        error: false
    }

    componentDidMount() {
        console.log('[BurgerBuilder.js] -> this.props', this.props)
        // axios.get('https://burger-projekat-ii.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     })
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
       this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            //Ings su iz redux-a, iz mapStateToProps
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
            console.log('BurgerBuilder -> disabledInfo[key]', key, disabledInfo[key])
        }
        console.log('BurgerBuilder -> disabledInfo', disabledInfo)

        let orderSummary = null;

        let burger = this.state.error ? <h1 style={{textAlign: 'center'}}>Ingredients can't be loaded</h1> : <Spinner />
       if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                    //mi vec proslijedjujemo ingredient name u onIngredientAdded i onIngredientRemoved metodu
                    //unutar BuildControls komponente, kao ctrl.type argument
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        //Ovdje pokrenemo funkciju zato da dobijemo uvijek vrijednost true ili false
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

        //koristimo ga za orderSummary komponentu ako bi trebalo
        if (this.state.loading) {
            orderSummary = <Spinner />
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
        //Dohvatili smo ingredientse iz reduxa i spremili ih u ings
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //ingName je vrijenost koju proslijedimo u metodu onIngredientAdded, a koja se sprema u 
        //ingredientName property i saljemo u redux
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
    }
}

//Proslijedili smo komponentu kao argument da bismo je mogli vratiti nazad i ponovo normlano koristiti?
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))

 