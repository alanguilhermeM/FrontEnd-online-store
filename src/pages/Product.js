import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import Loading from '../components/Loading';

class Product extends Component {
  state = {
    loading: true,
    name: '',
    image: '',
    price: 0,
    quantity: 1,
  };

  async componentDidMount() {
    this.fetchGetProduct();
  }

  fetchGetProduct = async () => {
    const { match } = this.props;
    const { params: { id } } = match;
    const data = await getProductById(id);

    this.setState({
      name: data.title,
      image: data.thumbnail,
      price: data.price,
      loading: false,
    });
  };

  addProduct = (event) => {
    event.preventDefault();
    const { match } = this.props;
    const { params: { id } } = match;
    const { name, image, price, quantity } = this.state;
    const produto = [{ name, image, price, quantity, id }];
    if (localStorage.getItem('Produto')) {
      const itemOnLocal = JSON.parse(localStorage.getItem('Produto'));
      localStorage.removeItem('Produto');
      const newProduct = produto[0];
      itemOnLocal.push(newProduct);
      localStorage.setItem('Produto', JSON.stringify(itemOnLocal));
    } else {
      localStorage.setItem('Produto', JSON.stringify(produto));
    }
  };

  render() {
    const { loading, name, image, price } = this.state;
    return (
      <div>
        { loading ? <Loading /> : (
          <main>
            <h3 data-testid="product-detail-name">{name}</h3>
            <img
              data-testid="product-detail-image"
              src={ image }
              alt="Imagem do produto"
            />
            <span data-testid="product-detail-price">{price}</span>
            <br />
            <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
            <button
              data-testid="product-detail-add-to-cart"
              onClick={ this.addProduct }
            >
              Adicione ao Carrinho

            </button>
          </main>
        ) }
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Product;
