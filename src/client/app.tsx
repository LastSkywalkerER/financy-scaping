'use strict';

import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@mui/material';
import useRoutes from '@core/router/routes';

const Greetings = () => {
  const routes = useRoutes(false);

  return (
    <Router>
      <Container maxWidth="lg">{routes}</Container>
    </Router>
  );
};

export default Greetings;
