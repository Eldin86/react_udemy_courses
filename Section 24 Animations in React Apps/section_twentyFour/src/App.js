import React, { Component } from "react";
//sa Transition omotamo ono sto zelimo da animiramo
import Transition from 'react-transition-group/Transition'

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false
  }
  showModal = () => {
    this.setState({ modalIsOpen: true })
  }
  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }
  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button className="Button" onClick={() =>
          this.setState(prevState => ({ showBlock: !prevState.showBlock }))
        }>Toggle</button><br />
        {/* pomocu transition kontrolisemo prikazivanje elemenata unutar komponente */}
        {/* 'in' property odlucuje da li element kojeg omotava Transition komponenta treba biti prikazan ili ne */}
        {/* transition komponenta upravlja sa 4 interna state-a, ENTERING, ENTERED, EXITING I EXITED state-ovi */}
        {/* drugi property koji trebamo postaviti na transition komponenti je timeout, vrijednost koja odlucuje koliko ce trajati animacija 
        odnosno koliko ce trajati prelazi izmedju ENTERING do ENTERED i EXITING do EXITED*/}
        {/*mountOnEnter propety -> ako je in property true onda dodaj element u DOM */}
        {/* unmountOnExit propety -> ako je in property false ukloni element iz DOM */}
        {/* Iz DOM-a se uklanja element tek kad citava animacija se zavrsi */}
        <Transition 
          in={this.state.showBlock} 
          timeout={1000}
          mountOnEnter
          unmountOnExit
          // Transition events
          onEnter={() => console.log('onEnter')}
          onEntering={() => console.log('onEntering')}
          onEntered={() => console.log('onEntered')}
          onExit={() => console.log('onExit')}
          onExiting={() => console.log('onExiting')}
          onExited={() => console.log('onExited')}
          >
          {/* Unutar Transition komponente trebamo renderati funkciju koja prima state 
          u kojem su 4 interna state-a ENTERING, ENTERED, EXITING I EXITED, funkcija vraca JSX*/}
          {state => (
            <div style={{
              backgroundColor: 'red',
              width: 100,
              height: 100,
              margin: 'auto',
              transition: 'opacity 1s ease-out',
              opacity: state === 'exiting' ? 0 : 1
            }}
            />
          )}
        </Transition>

        <Modal show={this.state.modalIsOpen} closed={this.closeModal} />
        {this.state.modalIsOpen ? <Backdrop show/> : null}
        <button onClick={this.showModal} className="Button">Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
