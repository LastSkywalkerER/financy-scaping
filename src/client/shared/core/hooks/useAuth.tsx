import React, {
  useCallback,
  useEffect,
  createContext,
  useState,
  useContext,
} from 'react';
import { setUserCredential } from '@core/store/userSlice';
import { useDispatch } from 'react-redux';

interface InitialAuth {
  userId: string;
  token: string;
  loading: boolean;
  login: (newUserId: string, newToken: string) => void;
  logout: () => void;
  getStorageToken: () => string;
}

const AuthContext = createContext({} as InitialAuth);

export const useAuth = () => useContext(AuthContext);

const storageName = 'token';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default React.memo(function AuthProvider({ children }: Props) {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const login = useCallback(
    (newUserId: string, newToken: string) => {
      localStorage.setItem(storageName, JSON.stringify(newToken));

      setToken(newToken);
      setUserId(newUserId);

      dispatch(setUserCredential({ userId: newUserId, token: newToken }));
      setLoading(false);
    },
    [setUserId, setToken],
  );

  const logout = useCallback(() => {
    setUserId('');
    setToken('');

    localStorage.removeItem(storageName);
  }, [setUserId, setToken]);

  const getStorageToken = useCallback(() => {
    return localStorage.getItem(storageName)
      ? JSON.parse(localStorage.getItem(storageName) || '')
      : '';
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
        token,
        login,
        logout,
        loading,
        getStorageToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
});
