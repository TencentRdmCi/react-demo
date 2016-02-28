import React, { Component } from 'react';
import Todo from './todo.js';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.onClickTodo = this.onClickTodo.bind(this);
  }

  onClickTodo = (index) => function () {
    this.props.onClickTodo(index);
  }.bind(this);

  render() {
    const todoList = this.props.todos.map((todo, index) =>
        <Todo {...todo}
          onClickTodo={this.onClickTodo(index)}
          key={index}
        />
    );

    return (
      <ul>
        {todoList}
      </ul>
    );
  }
}

export default TodoList;
