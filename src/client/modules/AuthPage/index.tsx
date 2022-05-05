import React, { useState, useEffect, ChangeEventHandler } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import useStyles from './index.style';
import { useDispatch } from 'react-redux';
import { loginRequest, registerRequest } from '@core/store/authSlice';

const AuthPage = React.memo(() => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { card, cardContent, title, textField, cardActions } = useStyles();
  const dispatch = useDispatch();

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = () => {
    dispatch(registerRequest(form));
  };

  const loginHandler = () => {
    dispatch(loginRequest(form));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement | null>) => {
    if (event.key === 'enter') {
      loginHandler();
    }
  };

  return (
    <Card sx={card} onKeyPress={handleKeyPress}>
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
        <Button onClick={loginHandler} variant="contained">
          Log In
        </Button>
        <Button onClick={registerHandler} variant="outlined">
          Register
        </Button>
      </CardActions>
    </Card>
  );
});

export default AuthPage;
