import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartCounter from '../components/CartCounter';

class Cart extends Component {
  state = {
    produtos: [],
  };

  componentDidMount() {
    const product = JSON.parse(localStorage.getItem('Produto'));
    if (localStorage.getItem('Produto')) {
      this.setState(({
        produtos: product,
      }));
    }
  }

  removeProduct = (itemID) => {
    const { produtos } = this.state;
    const { updatedQtnProductOnCart } = this.props;
    const indexProduct = produtos
      .findIndex((e) => e.id === itemID);

    produtos.splice(indexProduct, 1);
    const updatedProducts = [...produtos];
    this.setState({ produtos: updatedProducts });
    localStorage.removeItem('Produto');
    localStorage.setItem('Produto', JSON.stringify(updatedProducts));
    updatedQtnProductOnCart(updatedProducts);
  };

  render() {
    const { produtos } = this.state;
    const { updatedQtnProductOnCart } = this.props;

    return (
      <section>
        {produtos.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : null}
        {produtos.length > 0 ? (
          <>
            {produtos.map((produto) => (
              <div key={ produto.id }>
                <h3 data-testid="shopping-cart-product-name">{produto.name}</h3>
                <img src={ produto.image } alt="Imagem" />
                <span>{produto.price}</span>
                <CartCounter
                  itemID={ produto.id }
                  itemPrice={ produto.price }
                  removeProduct={ this.removeProduct }
                  updatedQtnProductOnCart={ updatedQtnProductOnCart }
                />
              </div>
            ))}
          </>
        ) : null}
      </section>
    );
  }
}

Cart.propTypes = {
  updatedQtnProductOnCart: PropTypes.func.isRequired,
};

export default Cart;
