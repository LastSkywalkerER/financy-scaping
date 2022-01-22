import React, {
  useCallback,
  useEffect,
  createContext,
  useState,
  useContext,
} from 'react';

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

  const login = useCallback(
    (newUserId: string, newToken: string) => {
      setUserId(newUserId);
      setToken(newToken);

      localStorage.setItem(storageName, JSON.stringify(newToken));
    },
    [setUserId, setToken],
  );

  const logout = useCallback(() => {
    setUserId('');
    setToken('');

    localStorage.removeItem(storageName);
  }, [setUserId, setToken]);

  useEffect(() => {
    const storageToken = localStorage.getItem(storageName)
      ? JSON.parse(localStorage.getItem(storageName) || '')
      : '';

    if (storageToken && storageToken != '') {
      login('', storageToken);
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