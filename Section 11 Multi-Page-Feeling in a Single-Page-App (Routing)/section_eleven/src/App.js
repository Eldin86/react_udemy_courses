import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      // Omotamo sve sto bi u aplikaciji sto bi koristili Routing 
      //Ovo je router od aplikacije, sad mozemo da koristimo routing fetures iz ovog routing paketa
      // bilo gdje u aplikaciji, u bilo kojoj komponenti
      //Ako deployamo aplikaciju ako example.com/my-app, moramo postaviti basename
      //<BrowserRouter basename="/my-app">
      <BrowserRouter >
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
