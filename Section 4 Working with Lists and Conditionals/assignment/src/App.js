import React, { Component } from 'react';
import './App.css';
import Validation from './ValidationComponent/ValidationComponent';
import Char from './CharComponent/CharComponent';

class App extends Component {
  state = {
    userInput: ''
  }

  updateInputHandler = (event) => {
    this.setState({ userInput: event.target.value })
  }

  removeCharHandler = (index) => {
    const splitValue = this.state.userInput.split('');
    console.log(splitValue);

    splitValue.splice(index, 1)
    console.log(splitValue);
    const newValue = splitValue.join('');
    this.setState({userInput: newValue})
  }


  render() {
    return (
      <div className="App">
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
        <hr />
        <input onChange={(event) => this.updateInputHandler(event)} value={this.state.userInput} />
        <p>Text length: {this.state.userInput.length}</p>
        <Validation inputLength={this.state.userInput.length}/>
        {
          this.state.userInput.split('').map((el, index) => {
            return <Char key={index} char={el} removeChar={() => this.removeCharHandler(index)}/>
          })
        }
      </div>
    );
  }
}

export default App;
