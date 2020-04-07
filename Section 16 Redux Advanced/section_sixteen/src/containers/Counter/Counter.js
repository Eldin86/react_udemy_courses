import React, { Component } from 'react';
//connect HOC koristimo da povezemo komponentu sa reduxom
import { connect } from 'react-redux'

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions'

class Counter extends Component {

    render() {
        const savedResults = this.props.results.map((result) => {
            return ( <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>)
        })

        return (
            <div>
                <CounterOutput val={this.props.ctr} value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
                <CounterControl label="Subtract 15" clicked={this.props.onASubtractCounter} />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                   {savedResults}
                </ul>
            </div>
        );
    }
}

/* SVE STO SALJEMO IZ REDUXA U KOMPONENTU DOHVACAMO SA PROPS */

//Actions i state definisemo poslije definisanja klase, odnosno komponente
//definisemo kako instrukcije kako state kojim upravlja redux treba da se mapira kroz props koje koristimo u ovom kontejner komponentu
const mapStateToProps = state => {
    //vraca objekat koji je map propNames i slices od state-a koji je spremljen u redux-u
    return {
        //state je initalState u reducer.js komponenti
        //vrijednost iz rducer.js state-a spremamo u ctr peroperty
        //ctr i res su 'slices' od globalnog state,a posto koristimo vise stato-va i dodjelili smo propertije ctr i res
        ctr: state.ctr.counter,
        results: state.res.results
    }
}

//Ovdje odrdjujemo koju action zelimo da dispatchamo
const mapDispatchToProps = dispatch => {
    //ovdje vratimo objekat gdje definisemo prop name koji ce drzati referencu na funkciju koja ce se izvrsiti u dispatch actionu
    return {
        //Property odredimo koji sadrzi funkciju, koja ce biti dostupna kroz onIncrementCounter propety
        onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
        onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
        onAddCounter: () => dispatch({ type: actionTypes.ADD, value: 5 }),
        onASubtractCounter: () => dispatch({ type: actionTypes.SUBTRACT, value: 15 }),
        //Proslijedimo preko payloada vrijednost u actions-e, tako prosljedjujemo vrijednosti iz jednog
        //reducera u drugi, ako imamo odvojene reducere
        onStoreResult: (result) => dispatch({ type: actionTypes.STORE_RESULT, result: result }),
        //Proslijedili smo id kroz metodu u action kao payload
        onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, resultElId: id }),
    }
}

//connect HOC koristimo da povezemo komponentu sa reduxom
export default connect(mapStateToProps, mapDispatchToProps)(Counter);