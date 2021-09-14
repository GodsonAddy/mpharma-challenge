import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import localForage from 'localforage'
import { persistReducer, persistStore } from 'redux-persist'
import { routerMiddleware, routerActions } from 'connected-react-router'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import history from '../utils/history'

const config = {
  key: 'root',
  storage: localForage,
  whitelist: ['product']
}
const persistedReducer = persistReducer(config, rootReducer)

const configureStore = (initialState) => {
  // Redux Configuration
  const middleware = []
  const enhancers = []

  // Thunk Middleware
  middleware.push(thunk)

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  })

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger)
  }

  // Router Middleware
  const router = routerMiddleware(history)
  middleware.push(router)

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions
  }
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://extension.remotedev.io/docs/API/Arguments.html
      actionCreators
    })
    : compose
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware))
  const enhancer = composeEnhancers(...enhancers)
  const store = createStore(persistedReducer, initialState, enhancer)
  const persistor = persistStore(store)

  return { store, persistor }
}

export { configureStore, history }