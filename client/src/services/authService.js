import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { toast } from 'react-toastify';

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
      password: formData.password,
      password2: formData.password2,
      email: formData.email,
      user_type: formData.role,
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
      email: formData.email,
      password: formData.password
    });

    if (res.status === 200) {
      const decoded = jwtDecode(res.data.access)
      console.log('Token', decoded)
      localStorage.setItem('ACCESS_TOKEN', res.data.access);
      localStorage.setItem('REFRESH_TOKEN', res.data.refresh);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', decoded.email);
      toast.success('Login successful.');
      return true;
    }

    toast.error('Invalid credentials or Unauthorized.');
    return false;
  } catch (error) {
    console.log(error);

    if (error?.response?.data?.detail) {
      toast.error(error.response.data.detail);
    } else {
      toast.error('Login failed');
    }
    return false;
  }
};


// Logout user
const logout = () => {
  localStorage.removeItem('ACCESS_TOKEN')
  localStorage.removeItem('REFRESH_TOKEN')
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