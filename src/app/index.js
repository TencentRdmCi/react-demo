import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import TodoApp from './components/todo/todoApp.js';

import todoReducer from './reducers/todo.js';

const store = createStore(todoReducer);
const root = document.querySelector('.wrapper');

render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  root
);