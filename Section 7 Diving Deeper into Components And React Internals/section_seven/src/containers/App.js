import React, { Component } from 'react';
import appClasses from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/WithClass'
import Auxiliary from '../hoc/Auxiliary';
//Treba da omota sve dijelove aplikacije koji trebaju pristup context-u
import AuthContext from '../context/auth-context'

class App extends Component {
    constructor(props) {
        super(props);
        console.log('[App.js constructor], lifecycle for component creation, render number: 1')
    }

    state = {
        persons: [
            { id: 'oekdoe', name: 'Eldin', age: 28, hasFocus: true },
            { id: 'uhnubvf', name: 'Edy', age: 18, hasFocus: false  },
            { id: 'rhgh', name: 'Edi', age: 38, hasFocus: false  }
        ],
        otherState: 'some other state',
        showPersons: false,
        showCockpit: true,
        changeCounter: 0,
        authenticated: false
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[App.js -> getDerivedStateFromProps], lifecycle for componentupdate and creation, render number: 2', props)
        return state
    }

    //Ovdje mozemo da radimo http request
    componentDidMount() {
        console.log('[App.js -> componentDidMount], lifecycle for component creation, render number: 4')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[App.js -> shouldComponentUpdate] kad se state mjenja')
        //Vraca li da da update komponentu ili ne
        return true
    }

    componentDidUpdate() {
        console.log('[App.js -> componentDidUpdate] kad se state mjenja')
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
            //Spreadamo objekat odnosno kopiramo po indexu koji smo dobili
            ...this.state.persons[personIndex]
        }
        //Spremimo vrijednost iz inpuza u name unutar kopiranog objekta
        person.name = e.target.value;
        //Kopiramo cijeli persons state
        const persons = [...this.state.persons];
        //i zamjenimo odredjeni objekat sa novim unutar kopiranog state-a 
        persons[personIndex] = person;
        //setState prima prevState i props
        this.setState((prevState, props) => {
            return {
                persons: persons,
                changeCounter: prevState.changeCounter + 1
            }
        })
    }

    deletePersonHandler = (itemId) => {
        const persons = [...this.state.persons];
        persons.splice(itemId, 1);
        this.setState({ persons: persons })
    }

    togglePersonsHandler = () => {
        this.setState((prevState) => ({ showPersons: !prevState.showPersons }))
    }
    loginHandler = () => {
        this.setState({ authenticated: true })
    }
    render() {
        console.log('[App.js -> render], lifecycle for component creation, render number: 3')
        let persons = null;

        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangedHandler}
                isAuthenticated={this.state.authenticated} />
        }

        return (
            <Auxiliary>
                <button onClick={() => this.setState((prevState) => ({ showCockpit: !prevState.showCockpit }))}>remove button</button>
                {/* Provider prima value kao vrijednost, proslijedili smo vrijednosti iz appjs u context */}
                <AuthContext.Provider 
                    value={{
                        authenticated: this.state.authenticated, 
                        login: this.loginHandler
                    }}>
                    {this.state.showCockpit ? <Cockpit
                        title={this.props.appTitle}
                        showPersons={this.state.showPersons}
                        personsLength={this.state.persons.length}
                        togglePersons={this.togglePersonsHandler} 
                        /> : null}
                {persons}
                </AuthContext.Provider>
            </Auxiliary>
        );
    }
}

//Omotamo App komponentu sa withClass HOC i proslijedimo parametre koje ocekuje
export default withClass(App, appClasses.App);