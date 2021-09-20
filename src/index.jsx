'use strict';

// импортируем модули
import React from 'react';
import {render} from 'react-dom';
import Greetings from './components/Greetings'
import './sass/style.sass';


render(<Greetings />, document.getElementById('greetings'));

// ждём загрузки документа
document.addEventListener('DOMContentLoaded', () => {

});