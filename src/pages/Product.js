import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import Loading from '../components/Loading';
import InputCheckbox from '../components/InputCheckbox';
import ReviewProduct from '../components/ReviewProduct';

class Product extends Component {
  state = {
    loading: true,
    name: '',
    image: '',
    price: 0,
    quantity: 1,
    email: '',
    text: '',
    rating: '',
    rating1: false,
    rating2: false,
    rating3: false,
    rating4: false,
    rating5: false,
    checkedFields: false,
    errorMessage: false,
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

  checkFields = () => {
    const {
      email, rating1, rating2, rating3, rating4, rating5,
    } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const checkEmail = emailRegex.test(email);

    if (checkEmail
      && (rating1 || rating2 || rating3 || rating4 || rating5)) {
      this.setState({
        checkedFields: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { errorMessage } = this.state;
    const { name } = target;
    const checkbox = target.type === 'checkbox';
    const value = checkbox ? target.checked : target.value;
    if (checkbox) this.setState({ rating: target.id });
    if (errorMessage) this.setState({ errorMessage: false });
    this.setState({
      [name]: value,
    }, this.checkFields);
  };

  onClickSubmitReview = (event) => {
    event.preventDefault();
    const { match } = this.props;
    const { params: { id } } = match;
    const { email, text, rating, checkedFields } = this.state;
    const hasProductReviewLocalStorage = localStorage.getItem(id);
    const productReview = { email, text, rating };
    if (checkedFields && hasProductReviewLocalStorage) {
      const ReviewOnLocalStorage = JSON.parse(hasProductReviewLocalStorage);
      localStorage.setItem(id, JSON.stringify([...ReviewOnLocalStorage, productReview]));
      this.setState({
        email: '',
        text: '',
        rating: '',
        rating1: false,
        rating2: false,
        rating3: false,
        rating4: false,
        rating5: false,
      });
    } else if (checkedFields && !hasProductReviewLocalStorage) {
      localStorage.setItem(id, JSON.stringify([productReview]));
      this.setState({
        email: '',
        text: '',
        rating: '',
        rating1: false,
        rating2: false,
        rating3: false,
        rating4: false,
        rating5: false,
      });
    } else {
      this.setState({ errorMessage: true });
    }
  };

  render() {
    const {
      loading, name, image, price, email, text,
      rating1, rating2, rating3, rating4, rating5, errorMessage,
    } = this.state;
    const { match } = this.props;
    const { params: { id } } = match;

    return (
      <div>
        { loading ? <Loading /> : (
          <main>
            <section>
              <h3 data-testid="product-detail-name">{name}</h3>
              <img
                data-testid="product-detail-image"
                src={ image }
                alt="Imagem do produto"
              />
              <span data-testid="product-detail-price">{price}</span>
              <br />
              <button
                data-testid="product-detail-add-to-cart"
                onClick={ this.addProduct }
              >
                Adicione ao Carrinho

              </button>
            </section>

            <form>
              <label htmlFor="email">
                Email
                <input
                  data-testid="product-detail-email"
                  type="email"
                  name="email"
                  id="email"
                  onChange={ this.handleChange }
                  value={ email }
                />
              </label>

              <div>
                <InputCheckbox
                  id="1"
                  onChange={ this.handleChange }
                  checked={ rating1 || rating2 || rating3 || rating4 || rating5 }
                />
                <InputCheckbox
                  id="2"
                  onChange={ this.handleChange }
                  checked={ rating2 || rating3 || rating4 || rating5 }
                />
                <InputCheckbox
                  id="3"
                  onChange={ this.handleChange }
                  checked={ rating3 || rating4 || rating5 }
                />
                <InputCheckbox
                  id="4"
                  onChange={ this.handleChange }
                  checked={ rating4 || rating5 }
                />
                <InputCheckbox
                  id="5"
                  onChange={ this.handleChange }
                  checked={ rating5 }
                />
              </div>

              <textarea
                data-testid="product-detail-evaluation"
                name="text"
                id="text"
                onChange={ this.handleChange }
                value={ text }
              />

              <button
                data-testid="submit-review-btn"
                onClick={ this.onClickSubmitReview }
              >
                Avaliar
              </button>
              { errorMessage && (
                <span data-testid="error-msg">Campos inválidos</span>
              ) }
            </form>

            { localStorage.getItem(id) && <ReviewProduct id={ id } /> }
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
