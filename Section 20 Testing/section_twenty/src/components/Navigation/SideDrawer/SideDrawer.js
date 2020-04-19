//Komponenta koja je aktivna na mobilnim uredjajima, prikazuje logo i linkove
//Odnosno ovo je sidebar koji se otvara na mobitelima
import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, props.open ? classes.Open : classes.Close];
    
    return (
        <Auxiliary>
            {/* Backdrop */}
            <Backdrop  show={props.open} clicked={props.closed} />
            {/* side navbar */}
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Auxiliary>
    )
}

export default sideDrawer