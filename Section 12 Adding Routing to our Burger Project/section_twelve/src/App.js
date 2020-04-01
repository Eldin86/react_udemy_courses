//rcc skracenica za kreiranje class komponente
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

import Checkout from './containers/Checkout/Checkout'

class App extends Component{

  render(){
    return (
      <div>
        <Layout>
          <Switch>
           <Route path="/checkout" component={Checkout}/>
           {/* Samo direktni child ima pristup location, history, match propsima od route peropety,
           dakle children od BurgerBuilder nemaju pristup tome, moramo ih rucno proslijediti
           ili WithRouter */}
           <Route path="/" exact component={BurgerBuilder}/>
           </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
