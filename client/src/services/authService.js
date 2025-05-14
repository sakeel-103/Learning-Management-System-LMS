// import axios from 'axios'; // Uncomment when making actual API calls

// Define API base URL - update with your actual backend URL when available
const API_URL = 'http://localhost:8000/api/auth/';

// Register user with role
const register = async (userData) => {
  try {
    // For development/demo purposes, simulate a successful API call
    // In production, uncomment the code below
    /*
    // Format the data for the backend
    const formattedData = {
      name: `${userData.userFirstName} ${userData.userLastName}`,
      email: userData.userEmail,
      password: userData.userPassword,
      role: userData.accountType,
      profilePicture: userData.profileImage
    };
    const response = await axios.post(API_URL + 'register', formattedData);
    */
    
    // Log the userData for debugging
    console.log('Register with:', userData);
    
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
    /*
    // Format the credentials to match backend expectations
    const formattedCredentials = {
      email: credentials.userEmail,
      password: credentials.userPassword
    };
    const response = await axios.post(API_URL + 'login', formattedCredentials);
    */
    
    // Log for debugging
    console.log('Login attempt with:', credentials.userEmail);
    
    // Simulate API response based on email for testing different roles
    const user = {
      id: 1,
      name: 'Test User',
      email: credentials.userEmail,
      role: credentials.userEmail.includes('admin') ? 'Admin' : 
            credentials.userEmail.includes('instructor') ? 'Instructor' : 'Student',
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