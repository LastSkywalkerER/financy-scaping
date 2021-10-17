'use strict';

import React, {Suspense, useEffect, useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import style from './style.module.sass';
import Analytics from '../pages/Analytics';
import AuthPage from '../pages/AuthPage';
import { Container } from '@mui/material';
import useRoutes from '../../routes';

const Greetings = () => { 
  const routes =  useRoutes(false);

  return (
    <Router>
      <Container maxWidth="lg">
        {routes}
      </Container>
    </Router>
    )
}

export default Greetings;