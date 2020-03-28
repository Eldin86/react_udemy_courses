import React from 'react';

const userOutput = (props) => {
    const style = {
        width: '35%',
        border: '1px solid #1b4788',
        textAlign: 'center',
        boxShadow: '2px  3px 16px #f3f3f3'
    }
    return (
        <div style={style}>
            <p>Your username is: {props.username}</p>
            <p>This is some paragraph number 2</p>
        </div>
    )
}

export default userOutput