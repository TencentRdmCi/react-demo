import 'bootstrap/dist/css/bootstrap.css';
import 'jquery';

import 'bootstrap';

import React, { Component } from 'react';
import Todo from './todo.js';

class TodoList extends Component {
  render() {

    const todoList = this.props.todos.map((todo, index) => {
      return (
        <Todo isComplete={todo.isComplete}
              text={todo.text}
              onClickTodo={() => this.props.onClickTodo(index)}
              key={index}/>
      );
    });

    return (
      <ul>
        {todoList}
      </ul>
    );
  }
}

export default TodoList;
