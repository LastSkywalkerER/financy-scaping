'use strict';

import React, { useState, useEffect, ChangeEventHandler } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import useHttp from '@core/hooks/http.hook';
import { useAuth } from '@core/hooks/useAuth';

export default function AuthPage() {
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const { login } = useAuth();

  useEffect(() => {
    if (error) {
      alert(error);
      clearError();
    }
  }, [error, clearError]);

  const chanheHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHamdler = async () => {
    try {
      const data = await request(`/api/auth/register`, 'POST', {
        ...form,
      });
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request(`/api/auth/login`, 'POST', {
        ...form,
      });

      login(data.userID, data.token);
    } catch (e) {}
  };

  return (
    <Card
      sx={{
        m: 'auto',
        mt: 10,
        width: 1 / 2,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CardContent
        sx={{
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Stock Market Analytics
        </Typography>
        <TextField
          sx={{ width: '100%', m: 3 }}
          required
          id="email"
          type="email"
          label="Email"
          name="email"
          onChange={chanheHandler}
        />
        <TextField
          sx={{ width: '100%', m: 3 }}
          required
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
          onChange={chanheHandler}
        />
      </CardContent>
      <CardActions
        sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}
      >
        <Button disabled={loading} onClick={loginHandler} variant="contained">
          Log In
        </Button>
        <Button disabled={loading} onClick={registerHamdler} variant="outlined">
          Register
        </Button>
      </CardActions>
    </Card>
  );
}
