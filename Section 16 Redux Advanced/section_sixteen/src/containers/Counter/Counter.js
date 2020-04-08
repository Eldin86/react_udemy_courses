import React, { Component } from 'react';
import { connect } from 'react-redux'

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionCreators from '../../store/actions/actions'

class Counter extends Component {
    componentWillUpdate(){
        console.log('CTR', this.props.ctr)
        console.log('RESULTS', this.props.results)
    }

    render() {
        const savedResults = this.props.results.map((result) => {
            console.log('[Counter -> result]', result.value)
            return (<li 
                        key={result.id} 
                        onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>)
        })

        return (
            <div>
                <CounterOutput val={this.props.ctr} value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter} />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {savedResults}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        results: state.res.results
    }
}


const mapDispatchToProps = dispatch => {
    return {
        //Action creators kad koristimo moramo ih pozvati
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: () => dispatch(actionCreators.add(5)),
        onSubtractCounter: () => dispatch(actionCreators.subtract(15)),
        
        onStoreResult: (result) => dispatch(actionCreators.storeResult(result)),
        onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id)) 
    }
}

//connect HOC koristimo da povezemo komponentu sa reduxom
export default connect(mapStateToProps, mapDispatchToProps)(Counter);