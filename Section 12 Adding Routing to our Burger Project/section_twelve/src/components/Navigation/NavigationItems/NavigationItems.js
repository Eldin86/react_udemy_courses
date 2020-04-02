//Komponenta koja izlistava linkove
import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {/* Dodajemo exact atribut prvom elementu i saljemo ga u NavigationItem */}
       <NavigationItem link="/" exact>Burger Builder</NavigationItem>
       <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
)

export default navigationItems