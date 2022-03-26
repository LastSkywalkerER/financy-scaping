'use strict';

import React from 'react';
import { Routes, Route } from 'react-router';
import { Navigate } from 'react-router-dom';
import Analytics from '@modules/Analytics';
import AuthPage from '@modules/AuthPage';
import { useAuth } from '@core/hooks/useAuth';

export default function AppRoutes() {
  const { token } = useAuth();

  if (token) {
    return (
      <Routes>
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<Navigate to="/analytics" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
