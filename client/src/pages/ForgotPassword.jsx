import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MailIcon, EyeIcon, EyeOffIcon, KeyIcon, RefreshCwIcon } from 'lucide-react';

function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState('requestOTP'); // requestOTP, verifyOTP, resetPassword
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    new_password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // This would be replaced with actual API call in production
      console.log('Requesting OTP for:', formData.email);
      
      // Simulate API delay
      setTimeout(() => {
        toast.success('OTP sent to your email address');
        setCurrentStep('verifyOTP');
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error(error.message || 'Failed to send OTP');
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // This would be replaced with actual API call in production
      console.log('Verifying OTP:', formData.otp);
      
      // Simulate API delay
      setTimeout(() => {
        toast.success('OTP verified successfully');
        setCurrentStep('resetPassword');
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error(error.message || 'Invalid OTP');
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (formData.new_password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);

    try {
      // This would be replaced with actual API call in production
      console.log('Resetting password:', {
        email: formData.email,
        otp: formData.otp,
        new_password: formData.new_password
      });
      
      // Simulate API delay
      setTimeout(() => {
        toast.success('Password reset successfully');
        navigate('/login');
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${currentStep === 'requestOTP' ? 'border-indigo-600 bg-indigo-100 text-indigo-600' : 'border-gray-300 text-gray-500'}`}>
        1
      </div>
      <div className={`w-8 h-1 ${currentStep === 'requestOTP' ? 'bg-gray-300' : 'bg-indigo-500'}`}></div>
      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${currentStep === 'verifyOTP' ? 'border-indigo-600 bg-indigo-100 text-indigo-600' : 'border-gray-300 text-gray-500'}`}>
        2
      </div>
      <div className={`w-8 h-1 ${currentStep === 'resetPassword' ? 'bg-indigo-500' : 'bg-gray-300'}`}></div>
      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${currentStep === 'resetPassword' ? 'border-indigo-600 bg-indigo-100 text-indigo-600' : 'border-gray-300 text-gray-500'}`}>
        3
      </div>
    </div>
  );

  const renderRequestOTPForm = () => (
    <form onSubmit={handleRequestOTP} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <div className="mt-1 relative">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MailIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          We'll send a verification code to this email address
        </p>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : "Send Verification Code"}
        </button>
      </div>
    </form>
  );

  const renderVerifyOTPForm = () => (
    <form onSubmit={handleVerifyOTP} className="space-y-6">
      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
          Verification Code
        </label>
        <div className="mt-1">
          <input
            id="otp"
            name="otp"
            type="text"
            placeholder="Enter 6-digit code"
            required
            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.otp}
            onChange={handleChange}
            maxLength={6}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Enter the verification code sent to {formData.email}
        </p>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep('requestOTP')}
          className="py-2 px-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center py-2 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : "Verify"}
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleRequestOTP}
          className="flex items-center justify-center mx-auto text-sm text-indigo-600 hover:text-indigo-500"
        >
          <RefreshCwIcon className="h-4 w-4 mr-1" /> Resend code
        </button>
      </div>
    </form>
  );

  const renderResetPasswordForm = () => (
    <form onSubmit={handleResetPassword} className="space-y-6">
      <div>
        <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <div className="mt-1 relative">
          <input
            id="new_password"
            name="new_password"
            type={showPassword ? "text" : "password"}
            required
            className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="••••••••"
            value={formData.new_password}
            onChange={handleChange}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <KeyIcon className="h-5 w-5 text-gray-400" />
          </div>
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Must be at least 8 characters with mixed case, numbers, and symbols
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="mt-1 relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            required
            className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <KeyIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep('verifyOTP')}
          className="py-2 px-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center py-2 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : "Reset Password"}
        </button>
      </div>
    </form>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'requestOTP':
        return renderRequestOTPForm();
      case 'verifyOTP':
        return renderVerifyOTPForm();
      case 'resetPassword':
        return renderResetPasswordForm();
      default:
        return renderRequestOTPForm();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Reset your password</h2>
            <p className="mt-2 text-indigo-200">We'll help you get back into your account</p>
          </div>
        </div>
        
        <div className="p-8">
          {renderStepIndicator()}
          {renderCurrentStep()}
          
          <div className="mt-6 text-center">
            <Link to="/login" className="flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
