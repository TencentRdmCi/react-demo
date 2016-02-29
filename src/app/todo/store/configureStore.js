import { createStore } from 'redux';
import todoReducer from '../reducers';

export default function configureStore(initialState) {

  // 启用redux Chrome extension开发插件
  const store = (window.devToolsExtension ?
    window.devToolsExtension()(createStore) :
    createStore
  )(todoReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
