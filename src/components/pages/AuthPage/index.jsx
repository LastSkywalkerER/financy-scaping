'use strict';

import React, { useState } from 'react';
import {Card, CardActions, CardContent, Typography, Button, TextField  } from '@mui/material';
import style from './style.module.sass';
import useHttp from '../../hooks/http.hook';

export default function AuthPage() {
  const SERVERURL = 'http://127.0.0.1:5000';

  const {loading, request, error} = useHttp();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const chanheHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value});
  };

  const registerHamdler = async () => {
    try {
      const data = await request(`${SERVERURL}/api/auth/register`, 'POST', {...form});

      console.log(data);

    } catch (e) {
      
    }
  }

  return (
    <Card sx={{m: 'auto', mt: 10, width: 1/2, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <CardContent sx={{width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h5" sx={{textAlign: 'center'}}>
          Stock Market Analytics
        </Typography>
        <TextField sx={{width: '100%', m: 3}}
          required
          id="name"
          type="text"
          label="Name"
          name="name"
          onChange={chanheHandler}
        />
        <TextField sx={{width: '100%', m: 3}}
          required
          id="email"
          type="email"
          label="Email"
          name="email"
          onChange={chanheHandler}
        />
        <TextField sx={{width: '100%', m: 3}}
          required
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
          onChange={chanheHandler}
        />
        <TextField sx={{width: '100%', m: 3}}
          required
          id="phone"
          type="tel"
          label="Phone number"
          name="phone"
          onChange={chanheHandler}
        />
      </CardContent>
      <CardActions sx={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
        <Button 
          disabled={loading}
          variant="contained">
            Log In
        </Button>
        <Button 
          disabled={loading}
          onClick={registerHamdler}
          variant="outlined">
            Register
        </Button>
      </CardActions>
    </Card>
  )
}
