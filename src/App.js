import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Search from './pages/Search';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="App">
      <Route path="/cart" component={ Cart } />
      <Route exact path="/" component={ Search } />
      {/* <header className="App-header">
      </header> */}
    </div>
  );
}

export default App;
