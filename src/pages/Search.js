import React, { Component } from 'react';

class Search extends Component {
  state = {
    inputSearch: '',
  };

  render() {
    const { inputSearch } = this.state;
    return (
      <>
        <input type="text" name="" id="" />
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
