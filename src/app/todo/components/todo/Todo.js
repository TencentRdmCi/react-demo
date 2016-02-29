import React, { Component, PropTypes } from 'react';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.onClickTodo = this.onClickTodo.bind(this);
  }

  onClickTodo = (e) => {
    this.props.onClickTodo(e);
  };

  render() {
    const { complete, text } = this.props;

    return (
      <li onClick={this.onClickTodo}
        style={{
          textDecoration: complete ? 'line-through' : 'none'
        }}>
        {text}
      </li>
    );
  }
}

Todo.propTypes = {
  onClickTodo: PropTypes.func.isRequired,
  complete: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};
