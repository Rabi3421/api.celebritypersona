import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class AuthService {
  static async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Decode JWT to get expiry time
        const accessTokenPayload = this.decodeJWT(data.accessToken);
        const refreshTokenPayload = this.decodeJWT(data.refreshToken);
        
        // Store tokens in secure cookies
        Cookies.set('accessToken', data.accessToken, { 
          expires: new Date(accessTokenPayload.exp * 1000),
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        Cookies.set('refreshToken', data.refreshToken, { 
          expires: new Date(refreshTokenPayload.exp * 1000),
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        
        // Store token expiry times
        Cookies.set('accessTokenExpiry', accessTokenPayload.exp.toString(), {
          expires: new Date(refreshTokenPayload.exp * 1000),
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        
        // Store user data
        Cookies.set('user', JSON.stringify(data.user), {
          expires: new Date(refreshTokenPayload.exp * 1000),
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  static async signup(name, email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      
      if (data.success && data.accessToken && data.refreshToken) {
        // Decode JWT to get expiry time
        const accessTokenPayload = this.decodeJWT(data.accessToken);
        const refreshTokenPayload = this.decodeJWT(data.refreshToken);
        
        // Store tokens in secure cookies
        Cookies.set('accessToken', data.accessToken, { 
          expires: new Date(accessTokenPayload.exp * 1000),
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        Cookies.set('refreshToken', data.refreshToken, { 
          expires: new Date(refreshTokenPayload.exp * 1000),
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        
        // Store token expiry times
        Cookies.set('accessTokenExpiry', accessTokenPayload.exp.toString(), {
          expires: new Date(refreshTokenPayload.exp * 1000),
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        
        // Store user data
        Cookies.set('user', JSON.stringify(data.user), {
          expires: new Date(refreshTokenPayload.exp * 1000),
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
      }
      
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  static logout() {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('accessTokenExpiry');
    Cookies.remove('user');
    window.location.href = '/';
  }

  static getToken() {
    return Cookies.get('accessToken');
  }

  static getUser() {
    const userCookie = Cookies.get('user');
    return userCookie ? JSON.parse(userCookie) : null;
  }

  static isAuthenticated() {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  static async refreshToken() {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      console.log('No refresh token available');
      return false;
    }

    try {
      console.log('Attempting to refresh token...');
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (data.success && data.accessToken) {
        console.log('Token refreshed successfully');
        // Decode new JWT to get expiry time
        const accessTokenPayload = this.decodeJWT(data.accessToken);
        
        // Update access token and expiry
        Cookies.set('accessToken', data.accessToken, { 
          expires: new Date(accessTokenPayload.exp * 1000),
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        Cookies.set('accessTokenExpiry', accessTokenPayload.exp.toString(), {
          expires: new Date(accessTokenPayload.exp * 1000),
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        
        // If new refresh token is provided, update it too
        if (data.refreshToken) {
          const refreshTokenPayload = this.decodeJWT(data.refreshToken);
          Cookies.set('refreshToken', data.refreshToken, { 
            expires: new Date(refreshTokenPayload.exp * 1000),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
        }
        
        return { success: true, accessToken: data.accessToken };
      } else {
        console.log('Token refresh failed:', data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      return { success: false, message: 'Network error during token refresh' };
    }
  }

  // Helper method to decode JWT
  static decodeJWT(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('JWT decode error:', error);
      return null;
    }
  }

  // Check if access token is expired or will expire soon (within 5 minutes)
  static isTokenExpired() {
    const expiry = Cookies.get('accessTokenExpiry');
    if (!expiry) return true;
    
    const expiryTime = parseInt(expiry) * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const fiveMinutesFromNow = currentTime + (5 * 60 * 1000); // 5 minutes buffer
    
    return fiveMinutesFromNow >= expiryTime;
  }

  // Enhanced API call method with automatic token refresh
  static async apiCall(url, options = {}) {
    const makeRequest = async (token) => {
      const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      return fetch(url, {
        ...options,
        headers,
      });
    };

    let accessToken = this.getToken();
    
    // Check if token needs refresh
    if (accessToken && this.isTokenExpired()) {
      console.log('Access token expired, attempting refresh...');
      const refreshResult = await this.refreshToken();
      if (refreshResult.success) {
        accessToken = refreshResult.accessToken;
      } else {
        // Refresh failed, redirect to login
        console.log('Token refresh failed, logging out...');
        this.logout();
        return null;
      }
    }

    try {
      const response = await makeRequest(accessToken);
      
      // Check if we got a 401 (unauthorized) - token might be invalid
      if (response.status === 401 && accessToken) {
        console.log('Got 401, attempting token refresh...');
        const refreshResult = await this.refreshToken();
        if (refreshResult.success) {
          // Retry the request with new token
          return makeRequest(refreshResult.accessToken);
        } else {
          // Refresh failed, redirect to login
          this.logout();
          return null;
        }
      }
      
      return response;
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }
}