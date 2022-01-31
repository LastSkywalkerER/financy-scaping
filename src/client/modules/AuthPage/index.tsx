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
import authManager from '@core/utilities/authManager';
import useStyles from './index.style';

export default function AuthPage() {
  const { loading } = useHttp();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const { fetchLogin, fetchRegister } = authManager();
  const { card, cardContent, title, textField, cardActions } = useStyles();

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    fetchRegister(form);
  };

  const loginHandler = async () => {
    fetchLogin(form);
  };

  return (
    <Card sx={card}>
      <CardContent sx={cardContent}>
        <Typography variant="h5" sx={title}>
          Stock Market Analytics
        </Typography>
        <TextField
          sx={textField}
          required
          id="email"
          type="email"
          label="Email"
          name="email"
          onChange={changeHandler}
        />
        <TextField
          sx={textField}
          required
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
          onChange={changeHandler}
        />
      </CardContent>
      <CardActions sx={cardActions}>
        <Button disabled={loading} onClick={loginHandler} variant="contained">
          Log In
        </Button>
        <Button disabled={loading} onClick={registerHandler} variant="outlined">
          Register
        </Button>
      </CardActions>
    </Card>
  );
}
