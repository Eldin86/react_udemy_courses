//U Button komponentu prosljedjujemo css stil koji zelimo, preko btnType
//join koristimo da niz pretvorimo u string
import React from 'react'
import classes from './Button.module.css'

const button = (props) => {

    return (
        <button 
            onClick={(props.clicked)}
            className={[classes.Button, classes[props.btnType]].join(' ')}>{props.children}</button>
    )
}

export default button