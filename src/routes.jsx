'use strict';

import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Analytics from './components/pages/Analytics';
import AuthPage from './components/pages/AuthPage';

export default function useRoutes(isAuthenticated) {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/analytics' exact>
          <Analytics/>
        </Route>
        <Redirect to='/analytics' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path='/' >
        <AuthPage/>
      </Route>
      <Redirect to='/'/>
    </Switch>
  )
}
