import React, { useState } from 'react';
import logo from './logo.svg';

import Gallery from './Gallery';

import './App.css';


function App() {
  let [slide, setSlide] = useState(0);

  const slideChange = (newSlide) => {
    setSlide(newSlide);
  }

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
        <div style={{height: '100px', width: '500px'}}>
          <Gallery activeSlide={slide} onSlideChange={slideChange}>
            {
              ['red', 'green', 'pink'].map((color) => 
              <div key={color} className="test-slide" style={{ backgroundColor: color }} onClick={(e) => {e.stopPropagation(); console.log(color);}}> {color} </div>
              )
            }
          </Gallery>
        </div>
      </header>
    </div>
  );
}

export default App;
