import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ReviewProduct extends Component {
  render() {
    const { id } = this.props;
    const reviews = JSON.parse(localStorage.getItem(id));

    return (
      <section>
        {
          reviews.map((review) => (
            <div key={ review.email }>
              <h4 data-testid="review-card-email">{ review.email }</h4>
              <p data-testid="review-card-rating">{ review.rating }</p>
              <p data-testid="review-card-evaluation">{ review.text }</p>
            </div>))
        }
      </section>
    );
  }
}

ReviewProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ReviewProduct;
