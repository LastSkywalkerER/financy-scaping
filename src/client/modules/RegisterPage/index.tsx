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
import { registerRequest } from '@core/store/authSlice';

export const RegisterPage: React.FC = React.memo(() => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const { card, cardContent, title, textField, cardActions } = useStyles();
  const dispatch = useDispatch();

  const registerHandler = () => {
    dispatch(
      registerRequest({
        name,
        email,
        password,
        phone: phone.replace(/[ ()-]/g, ''),
      }),
    );
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement | null>) => {
    if (event.key === 'enter') {
      registerHandler();
    }
  };

  const nameHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [],
  );

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

  const phoneHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPhone(event.target.value);
    },
    [],
  );

  return (
    <Card sx={card} onKeyPress={handleKeyPress}>
      <CardContent sx={cardContent}>
        <Typography variant="h5" sx={title}>
          Register
        </Typography>
        <TextField
          sx={textField}
          required
          id="name"
          type="name"
          label="Name"
          name="name"
          onChange={nameHandler}
        />
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
        <TextField
          sx={textField}
          required
          id="phone"
          label="Phone"
          type="phone"
          name="phone"
          onChange={phoneHandler}
        />
      </CardContent>
      <CardActions sx={cardActions}>
        <Button onClick={registerHandler} variant="contained">
          Register
        </Button>
      </CardActions>
    </Card>
  );
});
