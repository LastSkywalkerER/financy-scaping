'use strict';

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Analytics from '@modules/Analytics';
import AuthPage from '@modules/AuthPage';
import { useAuth } from '@core/hooks/useAuth';
import authManager from '@core/utilities/authManager';

export default function AppRoutes() {
  const { token, loading } = useAuth();
  const { fetchStatus } = authManager();

  const styles = {
    container: {
      height: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  if (loading) {
    return (
      <Box sx={styles.container}>
        <CircularProgress />
      </Box>
    );
  }

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
