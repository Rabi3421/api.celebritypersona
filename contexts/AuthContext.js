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
        // Check if token is expired and needs refresh
        if (AuthService.isTokenExpired()) {
          console.log('Token expired on initialization, attempting refresh...');
          const refreshResult = await AuthService.refreshToken();
          if (refreshResult.success) {
            setUser(userData);
          } else {
            console.log('Token refresh failed on initialization, logging out...');
            AuthService.logout();
          }
        } else {
          setUser(userData);
        }
      } else if (token && !userData) {
        // Token exists but no user data, try to refresh
        const refreshResult = await AuthService.refreshToken();
        if (!refreshResult.success) {
          AuthService.logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();

    // Set up periodic token refresh check (every 4 minutes)
    const tokenRefreshInterval = setInterval(async () => {
      const token = AuthService.getToken();
      const user = AuthService.getUser();
      
      if (token && user && AuthService.isTokenExpired()) {
        console.log('Periodic token refresh check - token expired, refreshing...');
        const refreshResult = await AuthService.refreshToken();
        if (!refreshResult.success) {
          console.log('Periodic token refresh failed, logging out...');
          AuthService.logout();
        }
      }
    }, 4 * 60 * 1000); // Check every 4 minutes

    return () => clearInterval(tokenRefreshInterval);
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
    if (result.success && result.user) {
      setUser(result.user);
    }
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