//komponenta u kojoj redirectamo usera kad klikne na logout
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as actions from '../../../store/actions/index'

class Logout extends Component {

    //Kad se ova komponenta mounta pokreni onLogout metodu kojom se logout
    componentDidMount(){
        this.props.onLogout()
    }
    render(){
        return (
            <Redirect to="/"/>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null,mapDispatchToProps)(Logout)