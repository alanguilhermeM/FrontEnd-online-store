import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartCounter extends Component {
  state = {
    counter: 1,
    totalValue: 0,
    productsLocalStorage: JSON.parse(localStorage.getItem('Produto')),
  };

  componentDidMount() {
    const { itemPrice, itemID } = this.props;
    const { productsLocalStorage } = this.state;
    const product = productsLocalStorage.find((element) => element.id === itemID);
    const sumPrice = itemPrice * product.quantity;
    this.setState({
      totalValue: sumPrice,
      counter: product.quantity,
    });
  }

  removeItemAndUpdate = (product) => {
    const { productsLocalStorage } = this.state;
    const { itemID, updatedQtnProductOnCart } = this.props;
    const indexProduct = productsLocalStorage
      .findIndex((e) => e.id === itemID);

    productsLocalStorage.splice(indexProduct, 1);
    const updatedProducts = [...productsLocalStorage, product];
    this.setState({ productsLocalStorage: updatedProducts });
    localStorage.removeItem('Produto');
    localStorage.setItem('Produto', JSON.stringify(updatedProducts));
    updatedQtnProductOnCart(updatedProducts);
  };

  changeCounterUp = () => {
    const { itemPrice, itemID } = this.props;
    const { counter, productsLocalStorage } = this.state;
    this.setState((previousCounter) => ({
      counter: previousCounter.counter + 1,
      totalValue: (counter + 1) * itemPrice,
    }));
    const product = productsLocalStorage.find((element) => element.id === itemID);
    product.quantity = counter + 1;
    this.removeItemAndUpdate(product);
  };

  changeCounterDown = () => {
    const { counter, productsLocalStorage } = this.state;
    const { itemPrice, itemID } = this.props;
    const drecreaseCounter = Math.abs(counter - 1);
    const newDrecreaseCounter = counter === 1 ? 1 : drecreaseCounter;
    this.setState({
      counter: newDrecreaseCounter,
      totalValue: newDrecreaseCounter * itemPrice,
    });
    const product = productsLocalStorage.find((element) => element.id === itemID);
    product.quantity = counter - 1;
    this.removeItemAndUpdate(product);
  };

  removeItem = () => {
    const { itemID, removeProduct } = this.props;

    removeProduct(itemID);
  };

  render() {
    const { counter, totalValue } = this.state;
    const { itemID } = this.props;

    return (
      <section>
        <div data-testid="shopping-cart-empty-message">
          <button
            data-testid="product-increase-quantity"
            type="button"
            onClick={ this.changeCounterUp }
          >
            +1
          </button>
          <span data-testid="shopping-cart-product-quantity">
            {` ${counter} `}
          </span>
          <button
            data-testid="product-decrease-quantity"
            type="button"
            onClick={ this.changeCounterDown }
          >
            -1
          </button>
          <div>{`Valor Total R$ ${totalValue}`}</div>
          <button
            id={ itemID }
            type="button"
            data-testid="remove-product"
            onClick={ this.removeItem }
          >
            Remover Produto
          </button>
        </div>
      </section>
    );
  }
}
CartCounter.propTypes = {
  itemPrice: PropTypes.number.isRequired,
  removeProduct: PropTypes.func.isRequired,
  itemID: PropTypes.string.isRequired,
  updatedQtnProductOnCart: PropTypes.func.isRequired,
};

export default CartCounter;
