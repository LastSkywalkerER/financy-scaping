'use strict';

import React from 'react';

import { ThemeProvider } from '@mui/material';
import WebSocketProvider from '@core/hooks/useWebSocket';
import { ModalsProvider } from '@core/hooks/modalsController';
import themes from '@styles/themes';
import modals from '@components/modals';
import { RootState } from '@core/store/store';
import { useSelector } from 'react-redux';

import { AppWrapper } from '@components/AppWrapper';

const Greetings = () => {
  const themeName = useSelector((state: RootState) => state.themeName.value);

  return (
    <ThemeProvider theme={themes[themeName]}>
      <ModalsProvider initialModals={modals}>
        <WebSocketProvider>
          <AppWrapper />
        </WebSocketProvider>
      </ModalsProvider>
    </ThemeProvider>
  );
};

export default Greetings;
