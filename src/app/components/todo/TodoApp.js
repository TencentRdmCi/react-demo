import React, { Component } from 'react';
import TodoList from './todoList.js';
import AddTodo from './addTodo.js';
import Footer from './footer.js';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          text: 'hello1',
          isComplete: true
        },
        {
          text: 'hello2',
          isComplete: false
        },
        {
          text: 'hello3',
          isComplete: false
        }
      ]
    };
  }

  onClickTodo(index) {

    const newState = Object.assign({}, this.state);

    newState.todos[index].isComplete = !newState.todos[index].isComplete;
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <AddTodo />
        <TodoList todos={this.state.todos}
                  onClickTodo={(index) => {
                    this.onClickTodo.call(this, index);
                  }}/>
        <Footer filter="SHOW_ALL"/>
      </div>
    );
  }
}

export default TodoApp;
