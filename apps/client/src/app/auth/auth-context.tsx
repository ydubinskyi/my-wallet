import React, { useState } from 'react';

import * as authService from './auth.service';
import {
  AuthContextValue,
  LoginDetails,
  RegisterDetails,
  UserDetails,
} from './types';

const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
});
AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [user, setUser] = useState<UserDetails>(null);

  const isAuthenticated = () => !!user?.access_token;

  const login = React.useCallback(
    (form: LoginDetails) =>
      authService.login(form).then((user) => setUser(user)),
    [setUser]
  );
  const register = React.useCallback(
    (form: RegisterDetails) =>
      authService.register(form).then((user) => setUser(user)),
    [setUser]
  );
  const logout = React.useCallback(() => {
    authService.logout();
    setUser(null);
  }, [setUser]);

  const value = React.useMemo(() => ({ user, login, logout, register }), [
    login,
    logout,
    register,
    user,
    isAuthenticated,
  ]);

  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthContext, AuthProvider };
