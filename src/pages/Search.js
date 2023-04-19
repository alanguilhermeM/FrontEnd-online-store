import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Search extends Component {
  state = {
    inputSearch: '',
  };

  render() {
    const { inputSearch } = this.state;
    return (
      <>
        <input type="text" name="" id="" />
        <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
        { !inputSearch ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )
          : '' }
      </>
    );
  }
}

export default Search;
