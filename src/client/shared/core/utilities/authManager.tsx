import React, { useCallback } from 'react';
import useHttp from '@core/hooks/http.hook';
import { useAuth } from '@core/hooks/useAuth';

export default function authManager() {
  const { login } = useAuth();
  const { request } = useHttp();

  const fetchRegister = useCallback(
    async (form) => {
      try {
        const data = await request(`/api/auth/register`, 'POST', {
          ...form,
        });
      } catch (e) {}
    },
    [request],
  );

  const fetchLogin = useCallback(
    async (form) => {
      try {
        const data = await request(`/api/auth/login`, 'POST', {
          ...form,
        });

        login(data.userID, data.token);
      } catch (e) {}
    },
    [login, request],
  );

  return { fetchRegister, fetchLogin };
}
