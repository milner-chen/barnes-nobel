import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import sessionReducer from './session';
import productReducer from './product';
import categoryReducer from './category';
import cartItemReducer from './cartItem';
import wishlistReducer from './wishlist';

const rootReducer = combineReducers({
  session: sessionReducer,
  products: productReducer,
  category: categoryReducer,
  cartItems: cartItemReducer,
  wishlists: wishlistReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// preloadedstate => fecth from localstorage
// add to cart => similar to reducer logic
  // csn brute force + go thru each item in localstorage
const configureStore = (preloadedState={}) => {
    return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;