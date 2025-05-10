import axios from 'axios';

// Define API base URL - update with your actual backend URL when available
const API_URL = 'http://localhost:8000/api/auth/';

// Register user with role
const register = async (userData) => {
  try {
    // For development/demo purposes, simulate a successful API call
    // In production, uncomment the actual API call
    // const response = await axios.post(API_URL + 'register', userData);
    
    // Simulated response for now
    const response = {
      data: {
        success: true,
        message: 'Registration successful!'
      }
    };
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// Login user
const login = async (credentials) => {
  try {
    // For development/demo purposes, simulate a successful API call
    // In production, uncomment the actual API call
    // const response = await axios.post(API_URL + 'login', credentials);
    
    // Simulate API response based on email for testing different roles
    const user = {
      id: 1,
      name: 'Test User',
      email: credentials.email,
      role: credentials.email.includes('admin') ? 'Admin' : 
            credentials.email.includes('instructor') ? 'Instructor' : 'Student',
    };
    
    const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
    
    const response = {
      data: {
        success: true,
        token: token,
        user: user
      }
    };
    
    // Save to localStorage
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', response.data.user.name || response.data.user.email);
      localStorage.setItem('role', response.data.user.role);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
};

// Get current user
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// Request password reset
const forgotPassword = async (email) => {
  try {
    // For development/demo purposes, simulate a successful API call
    // In production, uncomment the actual API call
    // const response = await axios.post(API_URL + 'forgot-password', { email });
    
    // Simulated response
    const response = {
      data: {
        success: true,
        message: 'Password reset email sent!'
      }
    };
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to process request' };
  }
};

// Reset password with token
const resetPassword = async (token, password) => {
  try {
    // For development/demo purposes, simulate a successful API call
    // In production, uncomment the actual API call
    // const response = await axios.post(API_URL + 'reset-password', { token, password });
    
    // Simulated response
    const response = {
      data: {
        success: true,
        message: 'Password has been reset successfully!'
      }
    };
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to reset password' };
  }
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword
};

export default authService;