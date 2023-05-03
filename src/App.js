import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Header from './components/Header';
import Checkout from './pages/Checkout';

class App extends Component {
  state = {
    cartItems: JSON.parse(localStorage.getItem('Produto')) || [],
  };

  updatedQtnProductOnCart = (cartItems) => {
    this.setState({ cartItems });
  };

  render() {
    const { cartItems } = this.state;

    return (
      <div className="App">
        <Header cartItems={ cartItems } />
        <Switch>
          <Route path="/checkout" component={ Checkout } />
          <Route
            path="/cart"
            render={
              () => <Cart updatedQtnProductOnCart={ this.updatedQtnProductOnCart } />
            }
          />
          <Route
            exact
            path="/"
            render={
              () => <Search updatedQtnProductOnCart={ this.updatedQtnProductOnCart } />
            }
          />
          <Route
            path="/:id"
            render={
              (props) => <Product { ...props } />
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
