import React from 'react';
//import {withRouter} from 'react-router-dom'

import './Post.css';

const post = (props) => {
    console.log('[Post.js -> props]', props)
    return (
        <article className="Post" onClick={props.clicked}>
            <h4>{props.title}</h4>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    )
};

//Drugi nacin prosljedjivanja router props-a je da omotamo komponentu u koju zelimo da imamo router props
//sa withRouter HOC
//export default withRouter(post);
export default post;