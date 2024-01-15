/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

import { toast } from 'react-toastify';

import ApiService from '../services/api.service';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storagedToken = localStorage.getItem('[@auth-session]')

    if (storagedToken) {
      return true;
    }
    return false;
  });

  const handleCreateSession = async (data) => {

    try {

      setLoading(true);

      const response = await ApiService.post('/session', data);

      if (response.status === 200) {
        setIsAuthenticated(true);

        const session = response.data.session;

        setToken(session);

        localStorage.setItem('[@auth-session]', session)

        return true;
      }

      setLoading(false);

      toast.error('Ocorreu algum erro ao realizar login, tente novamente.');
    } catch (error) {
      setLoading(false);
      toast.error('Ocorreu algum erro ao realizar login, tente novamente.');
    }
  };

  const logout = () => {

    setToken('');
    setIsAuthenticated(false);

    localStorage.removeItem('[@auth-session]');

    window.location.href = '/';
  };

  return (
    <SessionContext.Provider value={{ loading, handleCreateSession, isAuthenticated, token, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  return context;
};
