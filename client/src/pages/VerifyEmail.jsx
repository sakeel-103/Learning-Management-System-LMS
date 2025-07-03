import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MailIcon, EyeIcon, EyeOffIcon, KeyIcon, RefreshCwIcon } from 'lucide-react';
import api from '../api';

function VerifyEmail() {
  const [currentStep, setCurrentStep] = useState('requestOTP'); // requestOTP, verifyOTP
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
  });
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
      const res = await api.post('/api/v1/accounts/otp/request/', {
        email: formData.email
      })
      if (res.status === 200) {
        toast.success(res.data.message);
        setCurrentStep('verifyOTP');
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.error || 'Failed to send OTP');
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // validations
    if (!formData.otp || formData.otp.length !== 6) {
      toast.error('Enter a valid otp.')
      setIsLoading(false)
      return
    }
    try {
      const res = await api.post('api/v1/accounts/otp/verify/', {
        email: formData.email,
        otp: formData.otp
      })
      if (res.status === 200) {
        toast.success('OTP verified successfully.');
        navigate('/login')
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error || 'Invalid OTP');
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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'requestOTP':
        return renderRequestOTPForm();
      case 'verifyOTP':
        return renderVerifyOTPForm();
      default:
        return renderRequestOTPForm();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Verify your Email</h2>
            <p className="mt-2 text-indigo-200">We'll help you to veify your account</p>
          </div>
        </div>

        <div className="p-8">
          {renderStepIndicator()}
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
