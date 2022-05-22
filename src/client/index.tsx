import React from 'react';
import { Provider } from 'react-redux';
import App from './app';
import store from '@core/store/store';
import '@styles/style.sass';

import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('greetings') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
