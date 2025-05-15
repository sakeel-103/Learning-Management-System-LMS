import api from '../api';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:8000/api/auth/';

// Register user with role
const register = async (formData) => {
  if (formData.password !== formData.password2) {
    toast.error('Passwords do not match');
    return;
  }
  if (!formData.agreeToTerms) {
    toast.error('You must agree to the terms and conditions');
    return;
  }

  try {
    const res = await api.post('/api/v1/accounts/register/', {
      username: formData.username,
      password: formData.password,
      password2: formData.password2,
      email: formData.email,
      role: formData.role,
      phone: formData.phone,
      first_name: formData.first_name,
      last_name: formData.last_name,
      profile_picture: formData.profile_picture
    });
    if (res.status === 201) {
      toast.success('Registered successfully.')
      return true
    } else {
      toast.error('Failed to register.')
      return false
    }

  } catch (error) {
    console.log(error);

    if (error.response && error.response.data) {
      const errors = error.response.data;

      // Collect all error messages into a single array
      const messages = [];

      Object.keys(errors).forEach((field) => {
        errors[field].forEach((msg) => {
          messages.push(`${field}: ${msg}`);
        });
      });

      // Display each message using toast
      messages.forEach((message) => toast.error(message));
    } else {
      toast.error('Registration failed');
    }

    return false
  }
};

// Login user
const login = async (formData) => {
  try {
    const res = await api.post('/api/v1/accounts/login/', {
      username: formData.username,
      password: formData.password
    })
    if (res.status === 200) {
      localStorage.setItem('ACCESS_TOKEN', res.data.access)
      localStorage.setItem('REFRESH_TOKEN', res.data.refresh)
      toast.success('Login successfull.')
      return true
    }
    toast.error('Invalid credentials or Unauthorized.')
    return false
  } catch (error) {
    console.log(error);

    if (error?.response?.data?.detail) {
      toast.error(error.response.data.detail)
    } else {
      toast.error('Login failed');
    }
    return false
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
const forgotPassword = async (userEmail) => {
  try {
    // For development/demo purposes, simulate a successful API call
    // In production, uncomment the actual API call
    // const response = await axios.post(API_URL + 'forgot-password', { email: userEmail });

    // Log for debugging
    console.log('Requesting password reset for:', userEmail);

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
const resetPassword = async (resetToken, newPasswordValue) => {
  try {
    // For development/demo purposes, simulate a successful API call
    // In production, uncomment the actual API call
    /*
    const response = await axios.post(API_URL + 'reset-password', { 
      token: resetToken, 
      password: newPasswordValue 
    });
    */

    // Log for debugging
    console.log('Resetting password with token:', resetToken, 'New password length:', newPasswordValue.length);

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