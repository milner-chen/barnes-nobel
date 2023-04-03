import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './reset.css';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import { ModalProvider } from './context/Modal';

const store = configureStore();

// testing on the window
if (process.env.NODE_DEV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

const Root = () => {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
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
  if (sessionStorage.getItem('X-CSRF-Token') === null
  || sessionStorage.getItem('currentUser') === null) {
    // restoreCSRF().then(renderApplication);
    store.dispatch(sessionActions.restoreSession()).then(renderApplication);
  } else {
    renderApplication();
  }