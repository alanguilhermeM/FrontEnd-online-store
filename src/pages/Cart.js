import React, { Component } from 'react';

export default class Cart extends Component {
  render() {
    return (
      <section>
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      </section>
    );
  }
}
// requisito 3
