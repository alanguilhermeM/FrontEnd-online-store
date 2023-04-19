import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Search extends Component {
  state = {
    inputSearch: '',
    categories: [],
    resultSearch: [],
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

  handleClick = async () => {
    const { inputSearch } = this.state;
    const search = await getProductsFromCategoryAndQuery(inputSearch);
    console.log(inputSearch);
    this.setState({
      resultSearch: search.results,
    });
  };

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { inputSearch, categories, resultSearch } = this.state;
    console.log(resultSearch);
    return (
      <>
        <input
          type="text"
          name="inputSearch"
          data-testid="query-input"
          onChange={ this.handleInputChange }
        />
        <button
          data-testid="query-button"
          onClick={ this.handleClick }
        >
          Buscar
        </button>

        <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
        { !inputSearch ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )
          : '' }

        <section>
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
        </section>
        <main>
          {resultSearch.length === 0 ? <p>Nenhum produto foi encontrado</p> : (
            resultSearch.map((result) => (
              <div key={ result.id } data-testid="product">
                <h3>{ result.title }</h3>
                <img src={ result.thumbnail } alt="imagem do produto" />
                <span>{ result.price }</span>
              </div>
            )))}
        </main>
      </>
    );
  }
}

export default Search;
// requisito 3
