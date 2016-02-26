import React, { Component, PropTypes } from 'react';

class Todo extends Component {
  render() {
    return (
      <li onClick={this.props.onClickTodo}
          style={{
            textDecoration: this.props.isComplete ? 'line-through' :
                            'none'
          }}>
        {this.props.text}
      </li>
    );
  }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  isComplete: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo;
