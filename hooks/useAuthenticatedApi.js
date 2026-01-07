import { useState, useCallback } from 'react';
import { AuthService } from '../lib/auth';

// Custom hook for making authenticated API calls
export const useAuthenticatedApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.apiCall(url, options);
      
      if (!response) {
        // Token refresh failed and user was logged out
        setError('Authentication failed. Please login again.');
        setLoading(false);
        return null;
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      console.error('API call error:', err);
      setError(err.message || 'An error occurred');
      setLoading(false);
      throw err;
    }
  }, []);

  return { apiCall, loading, error };
};

// Helper function for common API patterns
export const createApiCall = (baseUrl) => {
  return {
    get: (endpoint, options = {}) => 
      AuthService.apiCall(`${baseUrl}${endpoint}`, {
        method: 'GET',
        ...options
      }),
    
    post: (endpoint, data, options = {}) => 
      AuthService.apiCall(`${baseUrl}${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
        ...options
      }),
    
    put: (endpoint, data, options = {}) => 
      AuthService.apiCall(`${baseUrl}${endpoint}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        ...options
      }),
    
    delete: (endpoint, options = {}) => 
      AuthService.apiCall(`${baseUrl}${endpoint}`, {
        method: 'DELETE',
        ...options
      }),
  };
};

export default useAuthenticatedApi;