import React, { useState, useCallback, ReactElement } from 'react';
import { config } from '@config';
import { useAuth } from './useAuth';
import { useDispatch } from 'react-redux';
import { messageOccurred } from '@core/store/userMessageSlice';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const dispatch = useDispatch();

  const request = useCallback(
    async (
      url: string,
      method = 'GET',
      body: any = null,
      headers: { [key: string]: string } = {},
    ) => {
      setLoading(true);
      try {
        headers['auth'] = token;
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${config.SERVERURL}${url}`, {
          method,
          body,
          headers,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Can't connect to server`);
        }

        setLoading(false);

        if (data.message) {
          dispatch(messageOccurred({ message: data.message, type: 'success' }));
        }

        return data;
      } catch (e: any) {
        setLoading(true);
        dispatch(messageOccurred({ message: e.message, type: 'error' }));
        throw e;
      }
    },
    [setLoading, token, dispatch],
  );

  const clearError = () => setError(null);

  return { loading, request, error, clearError };
};

export default useHttp;
