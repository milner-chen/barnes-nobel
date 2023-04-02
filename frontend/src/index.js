import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch, { restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session';

const store = configureStore();

// testing on the window
if (process.env.NODE_DEV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}


const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
    );
  }
  
  // retreive or generate a csrf token before rendering app
  if (sessionStorage.getItem('X-CSRF-Token') === null) {
    restoreCSRF().then(renderApplication);
  } else {
    renderApplication();
  }