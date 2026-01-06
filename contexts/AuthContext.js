"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../lib/auth';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = AuthService.getToken();
      const userData = AuthService.getUser();

      if (token && userData) {
        setUser(userData);
      } else if (token && !userData) {
        // Token exists but no user data, try to refresh
        const refreshed = await AuthService.refreshToken();
        if (!refreshed) {
          AuthService.logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const result = await AuthService.login(email, password);
    if (result.success) {
      setUser(result.user);
    }
    setLoading(false);
    return result;
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    const result = await AuthService.signup(name, email, password);
    setLoading(false);
    return result;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};