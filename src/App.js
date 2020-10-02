import React from 'react';
import logo from './logo.svg';

import Gallery from './Gallery';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div style={{height: '200px', width: '100%'}}>
          <Gallery>
            <div className="test-slide" style={{ backgroundColor: 'red' }} onClick={(e) => {e.stopPropagation(); console.log('red');}}> red </div>
            <div className="test-slide" style={{ backgroundColor: 'green' }}> green </div>
            <div className="test-slide" style={{ backgroundColor: 'pink' }}> pink </div>
          </Gallery>
        </div>
      </header>
    </div>
  );
}

export default App;
