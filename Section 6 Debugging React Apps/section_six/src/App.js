import React, { Component } from 'react';
import appClasses from './App.module.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'

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
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === personId
        })
        const person = {
            ...this.state.persons[personIndex]
        }
        person.name = e.target.value;
        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({ persons: persons })
    }

    deletePersonHandler = (itemId) => {
        const persons = [...this.state.persons];
        persons.splice(itemId, 1);
        this.setState({ persons: persons })
    }


    togglePersonsHandler = () => {
        this.setState((prevState) => ({ showPersons: !prevState.showPersons }))
    }

    render() {
        let persons = null;
        let btnClass = ''
        if (this.state.showPersons) {
            persons = <div> {
                this.state.persons.map(person => {
                    return <ErrorBoundary key={person.id}><Person
                        changed={(e) => this.nameChangedHandler(e, person.id)}
                        
                        name={person.name}
                        age={person.age}
                        click={() => this.deletePersonHandler(person.id)}
                    /></ErrorBoundary>
                })
            }
            </div>
           
            btnClass = appClasses.Red
        }

        let classes = []
        if (this.state.persons.length <= 2) {
            classes.push(appClasses.red)
        }
        if (this.state.persons.length <= 1) {
            classes.push(appClasses.bold)
        }

        return (<div className={appClasses.App} >
            <h1 > Hi, I 'm React App</h1>
            <p className={classes.join(' ')} > this is really working! </p>
            <button className={btnClass}
                onClick={this.togglePersonsHandler} > Toggle Persons </button> {persons}
        </div>
        );
    }
}

export default App;