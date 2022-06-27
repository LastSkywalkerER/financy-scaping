import 'normalize.css'

import { ThemeProvider } from '@mui/material'
import React, { FC } from 'react'
import { Provider, useSelector } from 'react-redux'

import { AppWrapper } from '@/components/AppWrapper'
import modals from '@/components/modals'
import { ModalsProvider } from '@/core/hooks/modalsController'
import WebSocketProvider from '@/core/hooks/useWebSocket'
import store, { RootState } from '@/core/store/store'
import { themes } from '@/styles/themes'

export const AppComponent: FC = () => {
  const themeName = useSelector((state: RootState) => state.themeName.value)

  return (
    <ThemeProvider theme={themes[themeName]}>
      <ModalsProvider initialModals={modals}>
        <WebSocketProvider>
          <AppWrapper />
        </WebSocketProvider>
      </ModalsProvider>
    </ThemeProvider>
  )
}

export const App: FC = () => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
)
