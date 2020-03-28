import React, { Component } from 'react';
import classes from './Person.module.css';
import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/WithClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context'


class Person extends Component {
    //Uvijek kad dodajemo construvtor moramo pozvati i super
    constructor(props){
        super(props)
        //Kreiramo referencu na ovaj element
        //this.inputElementRFef = React.createRef()
        this.myInputRef = React.createRef()
    }

    //Da bismo koristili unutar ComponentDidMount
    //Ovo mora biti contextType koji je static property
    static contextType = AuthContext

   

    componentDidMount(){
        // this.inputElement.focus()
        //current daje pristup trenutno referenci
        //this.inputElementRFef.current.focus()
        //Na ovaj nacin dobijemo pristup vrijednosti unutar npr componentDidMount
        if(this.props.hasFocus){
            this.myInputRef.current.focus()
        }
        //this.context nam je dato od reacta, ovo je recimo keyword
       console.log(this.context.authenticated)
    }

    render() {
        console.log('[Person.js] rendering...')
        return (
            <Aux>
                {/* <AuthContext.Consumer>
                    {/* Consumer treba funkciju koja prima context kao argument da bismo mogli dohvatiti vrijednosti */}
                    {/* {(context) =>  context.authenticated ? <p>Authenticated</p> : <p>Please Login</p>} */}
                {/* </AuthContext.Consumer> */} 
               
               {/* context je keyword koju nam react daje */}
               { this.context.authenticated ? <p>Authenticated</p> : <p>Please Login</p>}

                < p onClick={this.props.click} > I am a {this.props.name} and I am {this.props.age} years old!</p >
                <p>{this.props.children}</p>
                <br />
                <input 
                    //Spasavamo referencu u globalni property this.inputElement 
                    // ref={(inputEl) => {this.inputElement = inputEl}} 
                    //ref={this.inputElementRFef}
                    ref={this.myInputRef}
                    type="test" 
                    onChange={this.props.changed} />
            </Aux>
        )
    }
}

//Prati koji tip podatka komponenta koristi i koji prima, i koji tip podatka treba da bude odredjeni prop
Person.propTypes = {
    //click je property, PropTypes.func je tip koji odredimo da bude click
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

//Exportujemo sta god withClass vrati
export default withClass(Person, classes.Person)