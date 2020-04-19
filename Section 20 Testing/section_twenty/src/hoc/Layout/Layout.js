//Komponenta sadrzi toolbar i burger kontrole, sidebar za mobitele
//Sadrzi metodu koja sluzi za otvaranje i zatvaranje side bar navigacije i backdrop
import React, {Component} from 'react';
import {connect} from 'react-redux'

import Auxiliary from '../Auxiliary/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer:false
    }
    //Handler za zatvaranje backdrop-a na mobilnim uredjajima
    sideDrawerClosedHanlder = () => {
        this.setState({showSideDrawer: false})
    }
    //Handler za otvaranje sidebara na klick hamburger menu
    sideDrawerOpenHandler = () => {
        this.setState(pervState => ({showSideDrawer: !pervState.showSideDrawer}))
    }

    render(){
        console.log('[Layout.js -> isAuthenticated]', this.props.isAuthenticated)
        return (
            <Auxiliary>
                <Toolbar isAuth={this.props.isAuthenticated} openSidebar={this.sideDrawerOpenHandler}/>
                <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHanlder}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        //Ako token razlicito null onda smo authenticated odnosno true
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)