import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import { LoginPage } from '@modules/LoginPage';
import { RegisterPage } from '@modules/RegisterPage';
import { MainAnalytics } from '@modules/MainAnalytics';
import { SavedAnalytics } from '@modules/SavedAnalytics';
import UpdateSettings from '@modules/UpdateSettings';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@core/store/store';
import { statusRequest } from '@core/store/authSlice';

export default function AppRoutes() {
  const { token, loading } = useSelector((state: RootState) => state.auth.data);
  const dispatch = useDispatch();

  const styles = {
    container: {
      height: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  useEffect(() => {
    dispatch(statusRequest());
  }, []);

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
        <Route path="/mainAnalytics" element={<MainAnalytics />} />
        <Route path="/savedAnalytics" element={<SavedAnalytics />} />
        <Route path="/updateSettings" element={<UpdateSettings />} />
        <Route path="*" element={<Navigate to="/mainAnalytics" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/loginPage" element={<LoginPage />} />
      <Route path="/registerPage" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/loginPage" />} />
    </Routes>
  );
}
