import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { createStore, applyMiddleware } from 'redux';

export default function configureStore(initialState = {}) {

  const logger = createLogger();

  // window.devToolsExtension ?
  // window.devToolsExtension()(createStore) :
  const store = (createStore)(
    rootReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      logger
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
