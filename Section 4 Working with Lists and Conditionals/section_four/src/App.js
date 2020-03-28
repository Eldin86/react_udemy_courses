import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons: [
      { id: 'oekdoe', name: 'Eldin', age: 28 },
      { id: 'uhnubvf', name: 'Edy', age: 18 },
      { id: 'rhgh', name: 'Edi', age: 38 }
    ],
    otherState: 'some other state',
    showPersons: false
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    })
  }

  nameChangedHandler = (e, personId) => {
    //Nadjemo objekat pomocu index-a sa filter metodom koji zelimo editovati 
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === personId
    })
    //Spreadamo objekat koji smo dohvatili pomocu personIndex
    const person = {
      ...this.state.persons[personIndex]
    }
    //spremimo vrijednosti iz inputa u name
    person.name = e.target.value;
    //Spreadamo state
    const persons = [...this.state.persons];
    //Zamjenimo stari objekat sa novim u koji smo unijeli vrijednost 
    persons[personIndex] = person;

    this.setState({persons: persons})
  }

  deletePersonHandler = (itemId) => {
    //UVIJEK KOPIRAMO STATE PRIJE NEGO RADIMO NA NJEMU, ILI BILO KOJI OBJEKAT
    const persons = [...this.state.persons];
    persons.splice(itemId, 1);
    this.setState({ persons: persons })
  }


  togglePersonsHandler = () => {
    this.setState((prevState) => ({ showPersons: !prevState.showPersons }))
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '2px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let persons = null;
    if (this.state.showPersons) {
      persons = <div >
        {this.state.persons.map(person => {
          return <Person
            changed={(e) => this.nameChangedHandler(e, person.id)}
            key={person.id}
            name={person.name}
            age={person.age}
            click={() => this.deletePersonHandler(person.id)} />
        })}
      </div>
    }

    return (
      <div className="App">
        <h1>Hi, I'm React App</h1>
        <p>this is really working!</p>
        <button style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>

        {persons}


      </div>
    );
  }

}

export default App;