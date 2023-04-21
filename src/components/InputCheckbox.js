import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputCheckbox extends Component {
  render() {
    const { id, onChange, checked } = this.props;
    return (
      <label htmlFor="rating1">
        <input
          data-testid={ `${id}-rating` }
          type="checkbox"
          name={ `rating${id}` }
          id={ id }
          onChange={ onChange }
          checked={ checked }
        />
        { id }
      </label>
    );
  }
}

InputCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default InputCheckbox;
