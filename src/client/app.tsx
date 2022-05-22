'use strict';

import React from 'react';

import { ThemeProvider } from '@mui/material';
import WebSocketProvider from '@core/hooks/useWebSocket';
import { StylesProvider } from '@core/hooks/customStyles';
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
      <StylesProvider theme={themes[themeName]}>
        <ModalsProvider initialModals={modals}>
          <WebSocketProvider>
            <AppWrapper />
          </WebSocketProvider>
        </ModalsProvider>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default Greetings;
