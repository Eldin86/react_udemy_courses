//Komponenta koja izlistava linkove
import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {/* Dodajemo exact atribut prvom elementu i saljemo ga u NavigationItem */}
       <NavigationItem link="/" exact>Burger Builder</NavigationItem>
       {/* Ako nismo authenticated onda ne vidimo orders link */}
       {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
       {!props.isAuthenticated 
        ? <NavigationItem link="/auth" exact>Authenticate</NavigationItem>
        :<NavigationItem link="/logout" exact>Logout</NavigationItem>}
    </ul>
)

export default navigationItems