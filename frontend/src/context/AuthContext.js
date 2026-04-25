import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('digitech_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/api/auth/me')
        .then(r => setAdmin(r.data.admin))
        .catch(() => { localStorage.removeItem('digitech_token'); delete axios.defaults.headers.common['Authorization']; })
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('digitech_token', data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setAdmin(data.admin);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('digitech_token');
    delete axios.defaults.headers.common['Authorization'];
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading, isAdmin: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};
