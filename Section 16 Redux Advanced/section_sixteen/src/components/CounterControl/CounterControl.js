import React from 'react';

import './CounterControl.css';

const counterControl = (props) => {
   
    return (
        <div className='CounterControl' onClick={props.clicked}>
            {props.label}
        </div>
    )
};

export default counterControl;