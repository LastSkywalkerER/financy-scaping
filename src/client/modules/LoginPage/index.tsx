import React, { useState, useCallback } from 'react';
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
import { loginRequest } from '@core/store/authSlice';

export const LoginPage: React.FC = React.memo(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { card, cardContent, title, textField, cardActions } = useStyles();
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(loginRequest({ email, password }));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement | null>) => {
    if (event.key === 'enter') {
      loginHandler();
    }
  };

  const emailHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [],
  );

  const passwordHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [],
  );

  return (
    <Card sx={card} onKeyPress={handleKeyPress}>
      <CardContent sx={cardContent}>
        <Typography variant="h5" sx={title}>
          Login
        </Typography>
        <TextField
          sx={textField}
          required
          id="email"
          type="email"
          label="Email"
          name="email"
          onChange={emailHandler}
        />
        <TextField
          sx={textField}
          required
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
          onChange={passwordHandler}
        />
      </CardContent>
      <CardActions sx={cardActions}>
        <Button onClick={loginHandler} variant="contained">
          Log In
        </Button>
      </CardActions>
    </Card>
  );
});
