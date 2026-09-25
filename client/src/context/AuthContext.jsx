import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('userInfo');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const { success, error: toastError } = useToast();

  useEffect(() => {
    const handleLogoutEvent = () => {
      setUser(null);
    };
    window.addEventListener('auth-logout', handleLogoutEvent);
    return () => window.removeEventListener('auth-logout', handleLogoutEvent);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      success(`Welcome back, ${data.name}!`);
      return { success: true, user: data };
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please verify credentials.';
      toastError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, phone, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { name, email, phone, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      success(`Account created successfully! Welcome to Mutahir Hardware.`);
      return { success: true, user: data };
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      toastError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    success('You have logged out.');
  };

  const updateProfile = async (userData) => {
    try {
      const { data } = await api.put('/auth/profile', userData);
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      success('Profile updated successfully.');
      return { success: true, user: updatedUser };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update profile.';
      toastError(msg);
      return { success: false, message: msg };
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
