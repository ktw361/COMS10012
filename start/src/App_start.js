import logo from './logo.svg';
import './App.css';
import React from 'react';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends React.Component {
  state = {
    name: 'David'
  }
  constructor() {
    super();
    this.onNameChange = this.onNameChange.bind(this);
  }

  onNameChange(newName) {
        this.setState({name: newName})
  }
  render() {
    return (
      <div>
        <NameEditor name={this.state.name} onNameChange={this.onNameChange} />
        <NameGreeter name={this.state.name} />
      </div>
    )
  }
}

class NameEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
  }
  
  onNameChange(e) {
    this.props.onNameChange(e.target.value);
  }
  render() {
    return (
      <p>
        <label for="name">Name: </label>
        <input type="text" id="name" value={this.props.name} onChange={this.onNameChange} />
      </p>
    )
  }
}

class NameGreeter extends React.Component {
  render() {
    if (this.props.name === "") {
      return (
        <p>Hello!</p>
      )
    } else {
      return (
        <p>Hello, {this.props.name}!</p>
      )
    }
  }
}

export default App;
