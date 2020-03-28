import React from 'react';
import classes from './Person.module.css';
//import Radium from 'radium'
import styled from 'styled-components'


const person = (props) => {
    return (
        //<div className="Person" style={style}>
        <div className={classes.Person}>
        < p onClick={props.click} > I am a {props.name} and I am {props.age} years old!</p >
        <p>{props.children}</p>
        <br />
        <input type="test" onChange={props.changed} />
        </div>
    )
}

export default person

/**
 * 
//Posto je styled.div validna react componenta, samo spasimo vrijednostu u Styled div komponentu
//Mozemo kombinirati media query sa css-om
const StyledDiv = styled.div`
    width: 60%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;

    @media (min-width: 500px){
        width: 450px
    }
`;
 */