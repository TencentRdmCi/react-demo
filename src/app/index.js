import 'bootstrap/dist/css/bootstrap.css';
import 'jquery';
import 'bootstrap';

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


import App from './components/todo/App.js';

import configureStore from './store/configureStore';

const store = configureStore({});

const root = document.querySelector('.wrapper');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);