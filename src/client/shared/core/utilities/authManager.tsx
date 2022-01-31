import useHttp from '@core/hooks/http.hook';
import { useAuth } from '@core/hooks/useAuth';
import React from 'react';

export default function authManager() {
  const { login } = useAuth();
  const { request } = useHttp();

  const fetchRegister = async (form) => {
    try {
      const data = await request(`/api/auth/register`, 'POST', {
        ...form,
      });
    } catch (e) {}
  };

  const fetchLogin = async (form) => {
    try {
      const data = await request(`/api/auth/login`, 'POST', {
        ...form,
      });

      login(data.userID, data.token);
    } catch (e) {}
  };

  return { fetchRegister, fetchLogin };
}
