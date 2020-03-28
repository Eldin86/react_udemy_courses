import React from 'react';
import classes from './Person.module.css';


const person = (props) => {
    const rnd = Math.random()
    if(rnd > 0.2){
        throw new Error('Something went wrong!!!')
    }
    return (
        <div className={classes.Person}>
        < p onClick={props.click} > I am a {props.name} and I am {props.age} years old!</p >
        <p>{props.children}</p>
        <br />
        <input type="test" onChange={props.changed} />
        </div>
    )
}

export default person