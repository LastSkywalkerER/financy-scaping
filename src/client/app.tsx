'use strict';

import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@mui/material';
import AppRoutes from '@core/router/routes';
import AuthProvider from '@core/hooks/useAuth';

const Greetings = () => {
  return (
    <AuthProvider>
      <Router>
        <Container maxWidth="lg">{<AppRoutes />}</Container>
      </Router>
    </AuthProvider>
  );
};

export default Greetings;
