//Komponenta sadrzi toolbar i burger kontrole, sidebar za mobitele
//Sadrzi metodu koja sluzi za otvaranje i zatvaranje side bar navigacije i backdrop
import React, {Component} from 'react';

import Auxiliary from '../Auxiliary/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    //Ovu komponentu smo pretvorili u klasu da bi lakse upravljali sa sidebarom
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
        return (
            <Auxiliary>
                <Toolbar openSidebar={this.sideDrawerOpenHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHanlder}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

export default Layout