import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services';

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

interface SignInCredentials {
  email: string;
  password: string;
  remind: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextData {
  user: User;
  token: string;
  signUp(credentials: SignUpCredentials): Promise<void>;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token =
      localStorage.getItem('@TodoApp:token') ||
      sessionStorage.getItem('@TodoApp:token');
    const user =
      localStorage.getItem('@TodoApp:user') ||
      sessionStorage.getItem('@TodoApp:user');

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signUp = useCallback(async ({ name, email, password }) => {
    await api.post('/users', {
      name,
      email,
      password,
    });
  }, []);

  const signIn = useCallback(async ({ email, password, remind }) => {
    const response = await api.post('/auth', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (remind) {
      localStorage.setItem('@TodoApp:token', token);
      localStorage.setItem('@TodoApp:user', JSON.stringify(user));
    } else {
      sessionStorage.setItem('@TodoApp:token', token);
      sessionStorage.setItem('@TodoApp:user', JSON.stringify(user));
    }

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem('@TodoApp:token');
    sessionStorage.removeItem('@TodoApp:user');
    localStorage.removeItem('@TodoApp:token');
    localStorage.removeItem('@TodoApp:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, token: data.token, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within a AuthProvider');

  return context;
}

export { AuthProvider, useAuth };
