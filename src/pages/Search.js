import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Search extends Component {
  state = {
    inputSearch: '',
    categorieSearch: '',
    categories: [],
    resultSearch: [],
    clickIdProduct: '',
    redirect: false,
    cartItems: JSON.parse(localStorage.getItem('Produto')) || [],
  };

  componentDidMount() {
    this.fetchGetCategories();
    const cartItems = JSON.parse(localStorage.getItem('Produto'));
    if (cartItems) {
      this.setState({ cartItems });
    }
  }

  fetchGetCategories = async () => {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  };

  handleClick = async () => {
    const { inputSearch, categorieSearch } = this.state;
    const search = await getProductsFromCategoryAndQuery(inputSearch, categorieSearch);
    this.setState({
      resultSearch: search.results,
    });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleClickCategorie = async (event) => {
    const { id } = event.target;
    this.setState({
      categorieSearch: id,
    });
    this.handleClick();
  };

  handleClickProductCard = (event) => {
    event.preventDefault();
    const { id } = event.target;

    this.setState({
      clickIdProduct: id,
      redirect: true,
    });
  };

  handleAddToCart = (event, product) => {
    event.preventDefault();
    const { updatedQtnProductOnCart } = this.props;
    const { title, thumbnail, price, id } = product;
    const produto = [{
      name: title,
      image: thumbnail,
      price,
      quantity: 1,
      id,
    }];
    if (localStorage.getItem('Produto')) {
      const itemOnLocal = JSON.parse(localStorage.getItem('Produto'));
      localStorage.removeItem('Produto');
      const newProduct = produto[0];
      itemOnLocal.push(newProduct);
      localStorage.setItem('Produto', JSON.stringify(itemOnLocal));

      this.setState({
        cartItems: JSON.parse(localStorage.getItem('Produto')),
      }, () => {
        const { cartItems } = this.state;
        updatedQtnProductOnCart(cartItems);
      });
    } else {
      localStorage.setItem('Produto', JSON.stringify(produto));
      this.setState({
        cartItems: JSON.parse(localStorage.getItem('Produto')),
      }, () => {
        const { cartItems } = this.state;
        updatedQtnProductOnCart(cartItems);
      });
    }
  };

  render() {
    const {
      inputSearch, categorieSearch, categories,
      resultSearch, clickIdProduct, redirect,
    } = this.state;

    if (redirect) return <Redirect to={ `/${clickIdProduct}` } />;
    return (
      <>
        <input
          type="text"
          name="inputSearch"
          data-testid="query-input"
          onChange={ this.handleChange }
        />
        <button
          data-testid="query-button"
          onClick={ this.handleClick }
        >
          Buscar
        </button>

        { !inputSearch ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )
          : '' }

        <section>
          {
            categories.map((categorie) => (
              <div
                key={ categorie.id }
              >
                <button
                  onClick={ this.handleClickCategorie }
                  id={ categorie.id }
                  value={ categorieSearch }
                  data-testid="category"
                >
                  {categorie.name}
                </button>
              </div>))
          }
        </section>
        <main>
          {resultSearch.length === 0 ? <p>Nenhum produto foi encontrado</p> : (
            resultSearch.map((result) => (
              <div
                key={ result.id }
                data-testid="product"
              >
                <button
                  id={ result.id }
                  onClick={ this.handleClickProductCard }
                  data-testid="product-detail-link"
                >
                  <h3>{ result.title }</h3>
                  <img src={ result.thumbnail } alt="imagem do produto" />
                  <span>{ result.price }</span>
                </button>
                <button
                  id={ result.id }
                  onClick={ (event) => this.handleAddToCart(event, result) }
                  data-testid="product-add-to-cart"
                >
                  Adicionar ao carrinho
                </button>
              </div>
            )))}
        </main>
      </>
    );
  }
}

Search.propTypes = {
  updatedQtnProductOnCart: PropTypes.func.isRequired,
};

export default Search;
