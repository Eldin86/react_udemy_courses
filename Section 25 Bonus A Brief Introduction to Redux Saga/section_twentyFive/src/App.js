//rcc skracenica za kreiranje class komponente
import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Orders from './containers/Orders/Orders'
import Checkout from './containers/Checkout/Checkout'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'

class App extends Component {

  //provjeravamo authentication status, odnosno automatski nas login ako imamo validan token.
  //ovdje smo postavili jer je ovo prvo sto se ucitava na aplikaciji
  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    //routin setup za neauthenticated users
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
    )

    if (this.props.isAuthenticated) {
      //routing setup za authenticated users
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
//ako imamo error vezano kad sa connect omotamo komponentu koja zeli da loadira routing, akomponenta ne 
//primi route props mozemo omotati connect komponentu sa withRouter, withRouter ce forsirati route props
//da se proslijede u komponentu
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
