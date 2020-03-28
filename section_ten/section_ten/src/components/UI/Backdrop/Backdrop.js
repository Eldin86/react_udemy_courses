//Backdrop je crna pozadina koja se pojavljuje kad se modal pojavi
//Klikom na backdrop zatvorimo cijeli modal
//props.show ako je true prikazi backdrop
import React from 'react'
import classes from './Backdrop.module.css'

const backdrop = (props) => {
    return(
        props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
    )
}

export default  backdrop