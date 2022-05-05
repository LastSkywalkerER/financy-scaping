'use strict';

import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, ThemeProvider } from '@mui/material';
import AppRoutes from '@core/router/routes';
import WebSocketProvider from '@core/hooks/useWebSocket';
import { StylesProvider } from '@core/hooks/customStyles';
import { ModalsProvider } from '@core/hooks/modalsController';
import themes from '@styles/themes';
import modals from '@components/modals';
import { RootState } from '@core/store/store';
import { useSelector } from 'react-redux';
import Header from '@components/header/header';
import UserMessage from '@components/userMessage';

const Greetings = () => {
  const themeName = useSelector((state: RootState) => state.themeName.value);

  return (
    <ThemeProvider theme={themes[themeName]}>
      <StylesProvider theme={themes[themeName]}>
        <ModalsProvider initialModals={modals}>
          <WebSocketProvider>
            <Router>
              <Header />
              <AppRoutes />
              <UserMessage />
            </Router>
          </WebSocketProvider>
        </ModalsProvider>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default Greetings;
