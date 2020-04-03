import React, { Component } from 'react'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Order from '../../components/Order/Order'

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(response => {
                console.log('[Orders.js -> response.data]', response.data)
                const fetchedOrders = [];
                for(let key in response.data){
                    fetchedOrders.push({
                        //spreadamo objekat koji dohvatimo iz firebase
                        ...response.data[key],
                        //Dodamo i key vrijednost u objekat
                        id: key
                    })
                    this.setState({loading: false, orders: fetchedOrders})
                }

            }).catch(error => {
                this.setState({loading: false})
            })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>
                ))}
            </div>
        )
    }
}

//Proslijedimo komponentu u HOC koja ima interceptore
export default withErrorHandler(Orders, axios)