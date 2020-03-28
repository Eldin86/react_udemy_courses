import React from 'react';
import './UserInput.css'

const userInput = (props) => {
    return (
        <div className="UserInput">
            <input value={props.name} onChange={props.usernameHandler} type="text"/>
        </div>
    )
}

export default userInput