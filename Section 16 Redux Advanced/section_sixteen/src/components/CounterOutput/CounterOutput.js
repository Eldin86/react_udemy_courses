import React from 'react';

import './CounterOutput.css';

const counterOutput = (props) => {
    const classes = ['CounterOutput', props.value < 0 ? 'Danger' : 'Success']
    return(
        <div className={classes.join(' ')}>
        Current Counter: {props.value}
    </div>
    )
};

export default counterOutput;

