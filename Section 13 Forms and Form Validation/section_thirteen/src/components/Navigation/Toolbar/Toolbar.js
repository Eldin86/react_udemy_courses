//Komponenta koja sadrzi navigaciju, Logo i hamburger menu
import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            {/* Ako bude problema sa klikom na hamburger menu lekcija 150 je njegov nacin */}
            <div className={classes.DrawerToggle} onClick={props.openSidebar}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default toolbar