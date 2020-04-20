import React, { Component } from 'react';
//TransitionGroup mozemo koristiti kad zelimo da ispisemo dinamicke liste
//TransitionGroup radi samo skupa sa Transition ili CSSTransition
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'

import './List.css';

class List extends Component {
    state = {
        items: [1, 2, 3]
    }

    addItemHandler = () => {
        this.setState((prevState) => {
            return {
                items: prevState.items.concat(prevState.items.length + 1)
            };
        });
    }

    removeItemHandler = (selIndex) => {
        this.setState((prevState) => {
            return {
                items: prevState.items.filter((item, index) => index !== selIndex)
            };
        });
    }

    render() {
        const listItems = this.state.items.map((item, index) => (
            <CSSTransition classNames="fade" timeout={300} key={item}>
                <li
                    className="ListItem"
                    onClick={() => this.removeItemHandler(index)}>{item}</li>
            </CSSTransition>
        ));

        return (
            <div>
                <button className="Button" onClick={this.addItemHandler}>Add Item</button>
                <p>Click Item to Remove.</p>
                {/* Defaultno rendera div element, ali pomocu component atributa odredimo koji element zelimo */}
                {/* TransitionGroup automatski dodaje ili uklanja element, odnosno dodaje in property
                na element koji omotava, a to je CSSTransition u ovom slucaju */}
                <TransitionGroup
                    component="ul"
                    className="List">
                    {listItems}
                </TransitionGroup>
            </div>
        );
    }
}

export default List;