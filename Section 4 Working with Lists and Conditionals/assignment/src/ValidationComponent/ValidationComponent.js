import React from 'react';

const validationComponent = (props) => {
    const charLength = props.inputLength > 5 ? 'Text Too Long' : 'Text Too Short'
    return (
        <div> 
            <h5>{charLength}</h5>
        </div>
    )
}

export default validationComponent