//Komponenta koja ispisuje link item koja prima prop u kojem je route i klasa active
import React from 'react'
import classes from './NavigationItem.module.css'
import {NavLink} from 'react-router-dom'

const navigationItem = (props) => {
    return(
        <li className={classes.NavigationItem}>
            {/* Morali smo dodati activeClassName zbog css modula, jer modulu hashuju klase tako da 
            komponenta ne prepozna klasu active */}
            {/* exact koristimo da doda klasu samo onome elementu koji je aktivan */}
            <NavLink exact={props.exact} to={props.link} activeClassName={classes.active}>{props.children}</NavLink>
        </li>
    )
}

export default navigationItem