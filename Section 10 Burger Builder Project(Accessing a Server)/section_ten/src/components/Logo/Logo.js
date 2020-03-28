//Komponenta u koju importujemo logo
//Logo mora biti importovan dinamicki
import React from 'react'
import burgerLogo from '../../assets/images/logo.png'
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="MyBurger"></img>
    </div>
)

export default logo