import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Search from './pages/Search';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ Search } />
      {/* <header className="App-header">
      </header> */}
    </div>
  );
}

export default App;
