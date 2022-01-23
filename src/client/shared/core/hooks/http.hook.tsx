import { useState, useCallback } from 'react';
import { config } from '@config';
import { useAuth } from './useAuth';

export default function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
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

        return data;
      } catch (e: any) {
        setLoading(true);
        setError(e.message);
        throw e;
      }
    },
    [],
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
}
