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
  login: (newUserId: string, newToken: string) => void;
  logout: () => void;
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

  const dispatch = useDispatch();

  const login = useCallback(
    (newUserId: string, newToken: string) => {
      setToken(newToken);
      setUserId(newUserId);

      dispatch(setUserCredential({ userId: newUserId, token: newToken }));

      localStorage.setItem(storageName, JSON.stringify(newToken));
    },
    [setUserId, setToken],
  );

  const logout = useCallback(() => {
    setUserId('');
    setToken('');

    localStorage.removeItem(storageName);
  }, [setUserId, setToken]);

  const check = useCallback((storageToken) => {
    logout();
  }, []);

  useEffect(() => {
    const storageToken = localStorage.getItem(storageName)
      ? JSON.parse(localStorage.getItem(storageName) || '')
      : '';

    if (storageToken && storageToken != '') {
      check(storageToken);
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        userId,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
});
