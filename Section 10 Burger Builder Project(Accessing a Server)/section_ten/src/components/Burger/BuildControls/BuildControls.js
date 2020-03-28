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
                return <Buildcontrol 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    //Proslijedimo type ingredienta u metodu(koja je u BuildControl), mora biti isti redosljed i u state i ovdje
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}/>
            })}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>ORDER NOW</button>
        </div>
    )
}

export default buildControls