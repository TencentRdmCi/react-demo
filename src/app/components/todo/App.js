import React, { Component } from 'react';
import Footer from './footer.js';
import VisibleTodoList from '../../containers/VisibleTodoList.js';
import AddTodo from '../../containers/AddTodo.js';

export default class App extends Component {

  render() {
    return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    );
  }
}
