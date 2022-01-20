'use strict';

// импортируем модули
import React from 'react';
import { render } from 'react-dom';
import App from './app';
import '@styles/style.sass';

render(<App />, document.getElementById('greetings'));

// ждём загрузки документа
document.addEventListener('DOMContentLoaded', () => {});
