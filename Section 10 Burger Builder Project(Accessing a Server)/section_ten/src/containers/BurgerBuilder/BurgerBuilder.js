//Komponenta koja sadrzi modal u kojem je orderSummary, burger  i kontrole od burgera
//rcc skracenica za kreiranje class komponente
import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    //Enable ORDER NOW button kad dodamo jedan prozvod, disable kad nismo odabrali nista
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({purchasable: sum > 0})
        console.log('[BurgerBuilder -> updatePurchaseState]:', sum)
    }

    //Handler za dodavanje ingredientsa na button
    addIngredientHandler = (type) => {
        //dohvatimo ingredient pomocu type-a
        const oldCount = this.state.ingredients[type];
        console.log('[oldCount -> addIngredientHandler]', oldCount)
        const updatedCount = oldCount + 1
        //spreadamo objekat odnosno kopiramo ga
        const updatedIngredients = {
            ...this.state.ingredients
        }
        //Unutar kopiranog objekta zamjenimo vijednost sa novom vrijednosti
        updatedIngredients[type] = updatedCount
        //Dohvatimo cijenu ingredienta pomocu type-a
        const priceAdition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAdition
        console.log('UPDATED INGREDIENTS ON ADDINGREDIENTHANDLER', updatedIngredients)
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        //Proslijedimo vec updateovan objekat u updtePurchaseState
        this.updatePurchaseState(updatedIngredients)
    }
    //Handler za brisanje ingredienta na button
    removeIngredientHandler = (type) => {
        //dohvatimo ingredient pomocu type-a
        const oldCount = this.state.ingredients[type];
        //Ako je oldCount manje ili jednako nula retun radimo, odnosno ako je cheese npr 0 return
        if(oldCount <= 0){
            return; 
        }
        console.log('[oldCount -> addIngredientHandler]', oldCount)
        const updatedCount = oldCount - 1
        //spreadamo objekat odnosno kopiramo ga
        const updatedIngredients = {
            ...this.state.ingredients
        }
        //Unutar kopiranog objekta zamjenimo vijednost sa novom vrijednosti
        updatedIngredients[type] = updatedCount
        //Dohvatimo cijenu ingredienta pomocu type-a
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }

    //handler kojim enable button za ORDER NOW
    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
    //Handler kojim ponistavamo narudzbu u modalu
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
        console.log('purchaseCancelHandler',this.state.purchasing)
    }
    //Handler kojim nastavljamo dalje narudzbu
    purchaseContinueHandler = () => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
        //Post post postavljamo u bazu podatke
        //Moramo dodati .json za firebase
        axios.post('/orders.json', order)
            .then(response => {
                console.log('[BurgerBuilder -> axios success response]', response)
            })
            .catch(error => {
                console.log('[BurgerBuilder -> axios error response]', error)
            })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
            console.log('BurgerBuilder -> disabledInfo[key]',key,  disabledInfo[key])
        }
        console.log('BurgerBuilder -> disabledInfo',  disabledInfo)

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
            </Auxiliary>
        )
    }
}
export default BurgerBuilder