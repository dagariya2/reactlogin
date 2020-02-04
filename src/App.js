import React, { Component } from 'react';
import './App.css';
import './Styles/fonts.css';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div className="App">
         <main className="container">
          <Main />
        </main>
      </div>
    );
  }
}

export default App;
