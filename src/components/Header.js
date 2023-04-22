import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import imgCarrinho from '../img/carrinho.svg';
import logo from '../img/logo.svg';
import styles from './Header.module.css';

class Header extends Component {
  render() {
    const { cartItems } = this.props;
    const sumItemsOnCart = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

    return (
      <header className={ styles.conatinerHeader }>
        <Link to="/">
          <img src={ logo } alt="Imagem do logo" />
        </Link>
        <nav>
          <Link data-testid="shopping-cart-button" to="/cart">
            <img
              className={ styles.imgCart }
              src={ imgCarrinho }
              alt="Imagem do carrinho"
            />
            <span data-testid="shopping-cart-size" className={ styles.qtnCart }>
              { sumItemsOnCart }
            </span>
          </Link>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
};

export default Header;
