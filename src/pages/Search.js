import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Search extends Component {
  state = {
    inputSearch: '',
    categories: [],
  };

  componentDidMount() {
    this.fetchGetCategories();
  }

  fetchGetCategories = async () => {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  };

  render() {
    const { inputSearch, categories } = this.state;
    return (
      <>
        <input type="text" name="" id="" />
        { !inputSearch ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )
          : '' }
        <ul>
          {
            categories.map((categorie) => (
              <li
                data-testid="category"
                key={ categorie.id }
              >
                <button>{categorie.name}</button>
              </li>))
          }
        </ul>
      </>
    );
  }
}

export default Search;
