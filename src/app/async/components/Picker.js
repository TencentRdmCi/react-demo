import React, { Component, PropTypes } from 'react';

export default class Picker extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange = (e) => this.props.onChange(e.target.value);

  render() {
    const { value, options } = this.props;

    return (
      <span>
        <h1>{value}</h1>
        <select onChange={this.onChange}
          value={value}>
          {options.map(option =>
            <option value={option} key={option}>
              {option}
            </option>)
          }
        </select>
      </span>
    );
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
