import React from 'react';

const charComponent = (props) => {
    const style = {
        display: 'inline',
        padding: '16px',
        textAlign: 'center',
        margin: '16px',
        border: '1px solid #eee',
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: '#cee'
    }
    return(
        <div style={style} onClick={props.removeChar}>
           {props.char}
        </div>
    )
}

export default charComponent