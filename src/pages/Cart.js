import React, { Component } from 'react';

export default class Cart extends Component {
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
    // const { produtos } = this.state;
    // console.log(produtos);
  }

  render() {
    const { produtos } = this.state;
    return (
      <section>
        {produtos.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : null}
        {produtos.length > 0 ? (
          <>
            {produtos.map((produto) => (
              <div key={ Math.random() }>
                <h3 data-testid="shopping-cart-product-name">{produto.name}</h3>
                <img src={ produto.image } alt="Imagem" />
                <span>{produto.price}</span>
                <p data-testid="shopping-cart-product-quantity">
                  {
                    produtos.filter((product) => product.id === produto.id).length
                  }
                </p>
              </div>
            ))}
          </>
        ) : null}
      </section>
    );
  }
}
