import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Product from './pages/Product';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/cart" component={ Cart } />
        <Route exact path="/" component={ Search } />
        <Route
          path="/:id"
          render={
            (props) => <Product { ...props } />
          }
        />
      </Switch>
      {/* <header className="App-header">
      </header> */}
    </div>
  );
}

export default App;
// requisito 3
