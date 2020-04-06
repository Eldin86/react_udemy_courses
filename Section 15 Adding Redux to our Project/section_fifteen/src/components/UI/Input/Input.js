//Komponenta u kojoj genericki kreiramo input polja
//Spreadamo objekat elementConfig koji smo poslali iz ContactData komponente, sadrzi sve defaultne
//koje ima odredjeni input element
import React from 'react'

import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null
    const inputClasses = [classes.InputElement]
    let validationError = null
   
    if(props.invalid && props.touched){
         validationError = <h5>Please enter a valid value!</h5>
    }

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                //Spreadamo atribute koje imamo za odredjeni input type
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                //Spreadamo atribute koje imamo za odredjeni input type
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>
            break;
        case ('select'):
            //Kreirali smo dinamicki dropwdown odnosno select tag element
            inputElement = (<select
                onChange={props.changed}
                className={inputClasses.join(' ')}
                value={props.value} >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>)
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                //Spreadamo atribute koje imamo za odredjeni input type
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input