'use strict';

// импортируем модули
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import store from '@core/store/store';
import '@styles/style.sass';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('greetings'),
);

// ждём загрузки документа
document.addEventListener('DOMContentLoaded', () => {});
