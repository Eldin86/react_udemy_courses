import React from 'react';
import './Person.css';

const person = (props) => {
    return (
        <div className="Person">
            <p>I am a {props.name} and I am {props.age} years old!</p>
            {props.children}
            <br/>
            <input type="test" onChange={props.nameChanged} value={props.name}/>
        </div>
    )
}

export default person