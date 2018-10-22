import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    temp: undefined,
    mean: undefined,
    median: undefined,
    mode: undefined,
    city: undefined,
    country: undefined,
    error: undefined,
  }

  onSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="app-main">
        <header className="app-header">
          <h1>
            Test
          </h1>
        </header>
        
      </div>
    );
  }
}

export default App;
