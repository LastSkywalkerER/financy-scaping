import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router'
import { Navigate } from 'react-router-dom'

import { statusRequest } from '@/core/store/authSlice'
import { RootState } from '@/core/store/store'
import { LoginPage } from '@/modules/LoginPage'
import { MainAnalytics } from '@/modules/MainAnalytics'
import { RegisterPage } from '@/modules/RegisterPage'
import { SavedAnalytics } from '@/modules/SavedAnalytics'
import UpdateSettings from '@/modules/UpdateSettings'

export default function AppRoutes() {
  const { token, loading } = useSelector((state: RootState) => state.auth.data)
  const dispatch = useDispatch()

  const styles = {
    container: {
      height: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }

  useEffect(() => {
    dispatch(statusRequest())
  }, [])

  if (loading) {
    return (
      <Box sx={styles.container}>
        <CircularProgress />
      </Box>
    )
  }

  if (token) {
    return (
      <Routes>
        <Route path="/mainAnalytics" element={<MainAnalytics />} />
        <Route path="/savedAnalytics" element={<SavedAnalytics />} />
        <Route path="/updateSettings" element={<UpdateSettings />} />
        <Route path="*" element={<Navigate to="/mainAnalytics" />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/loginPage" element={<LoginPage />} />
      <Route path="/registerPage" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/loginPage" />} />
    </Routes>
  )
}
