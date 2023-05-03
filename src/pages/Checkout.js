import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Checkout extends Component {
  state = {
    produtos: [],
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    checkedFields: false,
    msnError: false,
    redirect: false,
  };

  componentDidMount() {
    const product = JSON.parse(localStorage.getItem('Produto'));
    this.setState({ produtos: product });
  }

  calcTotalPrice = () => {
    const { produtos } = this.state;

    const totalPrice = produtos.reduce((acc, product) => {
      const result = product.price * product.quantity;
      return result + acc;
    }, 0);

    return totalPrice;
  };

  checkInputs = () => {
    const { fullname, email, cpf, phone, cep, address, payment } = this.state;

    if (fullname && email && cpf && phone && cep && address && payment) {
      this.setState({
        checkedFields: true,
      });
    }
  };

  handleOnChangeInput = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.checkInputs);
  };

  handleOnClickCheckout = () => {
    const { checkedFields } = this.state;

    if (checkedFields) {
      localStorage.removeItem('Produto');
      this.setState({ redirect: true });
    } else {
      this.setState({ msnError: true });
    }
  };

  render() {
    const { produtos, msnError, redirect } = this.state;

    if (redirect) return <Redirect to="/" />;
    if (produtos.length === 0) return <h2>Seu carrinho está vazio</h2>;
    return (
      <section>
        <section>
          <h2>Revise Seus Produtos</h2>
          <div>
            {
              produtos.map((product) => (
                <div key={ product.id }>
                  <img
                    src={ product.image }
                    alt={ `Imagem do produto ${product.name}` }
                  />
                  <h4>{product.name}</h4>
                  <span>{`R$ ${product.price}`}</span>
                  <span>{`Quantidade ${product.quantity}`}</span>
                </div>
              ))
            }
            <p>
              <strong>Total:</strong>
              {` R$ ${this.calcTotalPrice()}`}
            </p>
          </div>
        </section>
        <form>
          <label htmlFor="fullname">
            Nome Completo:
            <input
              data-testid="checkout-fullname"
              type="text"
              name="fullname"
              id="fullname"
              onChange={ this.handleOnChangeInput }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              data-testid="checkout-email"
              type="text"
              name="email"
              id="email"
              onChange={ this.handleOnChangeInput }
            />
          </label>
          <label htmlFor="cpf">
            CPF:
            <input
              data-testid="checkout-cpf"
              type="text"
              name="cpf"
              id="cpf"
              onChange={ this.handleOnChangeInput }
            />
          </label>
          <label htmlFor="phone">
            Telefone:
            <input
              data-testid="checkout-phone"
              type="text"
              name="phone"
              id="phone"
              onChange={ this.handleOnChangeInput }
            />
          </label>
          <label htmlFor="cep">
            CEP:
            <input
              data-testid="checkout-cep"
              type="text"
              name="cep"
              id="cep"
              onChange={ this.handleOnChangeInput }
            />
          </label>
          <label htmlFor="address">
            Endereço:
            <input
              data-testid="checkout-address"
              type="text"
              name="address"
              id="address"
              onChange={ this.handleOnChangeInput }
            />
          </label>
          <div>
            <p>Método de Pagamento:</p>
            <label htmlFor="boleto">
              <input
                data-testid="ticket-payment"
                type="radio"
                name="payment"
                id="boleto"
                value="boleto"
                onChange={ this.handleOnChangeInput }
              />
              Boleto
            </label>
            <label htmlFor="visa">
              <input
                data-testid="visa-payment"
                type="radio"
                name="payment"
                id="visa"
                value="visa"
                onChange={ this.handleOnChangeInput }
              />
              Visa
            </label>
            <label htmlFor="mastercard">
              <input
                data-testid="master-payment"
                type="radio"
                name="payment"
                id="mastercard"
                value="mastercard"
                onChange={ this.handleOnChangeInput }
              />
              MasterCard
            </label>
            <label htmlFor="elo">
              <input
                data-testid="elo-payment"
                type="radio"
                name="payment"
                id="elo"
                value="elo"
                onChange={ this.handleOnChangeInput }
              />
              Elo
            </label>
          </div>

          <button
            data-testid="checkout-btn"
            onClick={ this.handleOnClickCheckout }
          >
            Comprar
          </button>

          { msnError && <p><strong data-testid="error-msg">Campos inválidos</strong></p> }
        </form>
      </section>
    );
  }
}

export default Checkout;
