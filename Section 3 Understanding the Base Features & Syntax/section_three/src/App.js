import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component{

  state ={
    persons: [
      { name: 'Eldin', age: 28 },
      { name: 'Edy', age: 18 },
      { name: 'Edi', age: 38 }
    ]
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: 'Eldin', age: 28 },
        { name: newName, age: 18 },
        { name: 'Edi', age: 12 }
      ]
    })
  }
  
  nameChangedHandler = (e) => {
    this.setState({
      persons: [
        { name: 'Eldin', age: 28 },
        { name: e.target.value, age: 18 },
        { name: 'Edi', age: 12 }
      ]
    })
  }

  render(){
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '2px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }
    return (
      <div className="App">
        <h1>Hi, I'm React App</h1>
        <p>this is really working!</p>
        <button style={style} onClick={() => this.switchNameHandler('EldinnnnnnN')}>Switch Name</button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} />
        <Person 
          nameChanged={this.nameChangedHandler}
          clicked={this.switchNameHandler.bind(this, 'EldinKOOOO')}
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}>My hobbies: Racing</Person>
        <Person  
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age} />
      </div>
    );
  }

}

export default App;

//bind
//https://www.freecodecamp.org/news/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb/