import React from 'react'
import classes from './BuildControls.module.css'
import Buildcontrol from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => {

    return(
        <div className={classes.BuildControls}>
            <p>Total Price <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
                console.log('[buildControls -> ctrl.type]', ctrl.type)
                return <Buildcontrol 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}/>
            })}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}
                //Ako smo authenticated onda prikazi order now button, inace sign up to order
                onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    )
}

export default buildControls