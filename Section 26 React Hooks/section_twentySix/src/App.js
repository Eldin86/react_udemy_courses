import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth'
import { AuthContext } from './context/auth-context'

const App = props => {
  //u useContext proslijedimo kontekst koji zelimo da osluskujemo, u ovom slucaju AuthContext
  const authContext = useContext(AuthContext)

  //defaultni sadrzaj je Auth, posto nismo login
  let content = <Auth />
//Ako smo authenticated, odnosno ako je isAuth true onda prikazi ingredients
  if (authContext.isAuth) {
    content = <Ingredients />
  }
  return content;
};

export default App;
