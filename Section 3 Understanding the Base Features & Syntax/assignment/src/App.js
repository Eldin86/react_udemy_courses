import React, {Component} from 'react';

import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput'

class App extends Component {
 
  state = {
    username: 'Eldin_Saso_Mang3'
  }

  updateStateHandler = (e) => {
    this.setState({username: e.target.value})
  }

  render(){
    return (
      <div className="App">
        <ol>
          <li>&#10004;Create TWO new components: UserInput and UserOutput</li>
          <li>&#10004;UserInput should hold an input element, UserOutput two paragraphs</li>
          <li>&#10004;Output multiple UserOutput components in the App component (any paragraph text of your choice)</li>
          <li>&#10004;Pass a username (of your choice) to UserOutput via props and display it there.</li>
          <li>&#10004;Add state to the App component (=> the username) and pass the username to the UserOutput component</li>
          <li>&#10004;Add a method to manipulate the state(=> an event-handler method)</li>
          <li>&#10004;Pass the event-handler method reference to the UserInput component and bind it to the input-change event</li>
          <li>&#10004;Ensure that the new input entered by the user overwrites the old username passed to UserOutput</li>
          <li>&#10004;Add two-way binding to your input (in UserInput) to also display the starting username</li>
          <li>&#10004;Add styling of your choice to your components/elements in the component - both with inline styles and stylesheets</li>
        </ol>
        <hr/>
  
        <UserInput name={this.state.username} usernameHandler={this.updateStateHandler}/>
        <UserOutput username={this.state.username}/>
        <UserOutput username={'x.skater'}/>
      </div>
    );
  }
}

export default App;
