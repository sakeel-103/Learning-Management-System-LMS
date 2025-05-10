import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaMobile, FaSms, FaKey } from 'react-icons/fa';
import useAuthStore from '../stores/authStore';

function Login() {
  const [authMethod, setAuthMethod] = useState('password'); // 'password' or 'otp'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mobileNumber: '',
    otp: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const switchAuthMethod = (method) => {
    setAuthMethod(method);
    setError('');
    setOtpSent(false);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate mobile number
    if (!formData.mobileNumber || !/^\d{10}$/.test(formData.mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      toast.error('Please enter a valid mobile number');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call to send OTP (replace with actual API call later)
      setTimeout(() => {
        toast.success('OTP sent to your mobile number');
        setOtpSent(true);
        setIsLoading(false);
        
        // Start countdown for OTP resend button (30 seconds)
        setOtpCountdown(30);
        const countdownInterval = setInterval(() => {
          setOtpCountdown((prevCount) => {
            if (prevCount <= 1) {
              clearInterval(countdownInterval);
              return 0;
            }
            return prevCount - 1;
          });
        }, 1000);
      }, 1500);
    } catch (error) {
      console.error('Send OTP error:', error);
      setError(error.message || 'Failed to send OTP. Please try again.');
      toast.error(error.message || 'Failed to send OTP. Please try again.');
      setIsLoading(false);
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate form
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      toast.error('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call (replace with actual API call later)
      setTimeout(() => {
        // Mock successful login for demo
        const user = {
          id: 1,
          name: 'Test User',
          email: formData.email,
          role: formData.email.includes('admin') ? 'Admin' : 
                formData.email.includes('instructor') ? 'Instructor' : 'Student',
        };
        
        // Update global state
        login(user);
        
        toast.success('Login successful!');
        
        // Redirect based on role
        switch(user.role) {
          case 'Admin':
            navigate('/admin/dashboard');
            break;
          case 'Instructor':
            navigate('/instructor/dashboard');
            break;
          case 'Student':
          default:
            navigate('/student/dashboard');
            break;
        }
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Invalid email or password');
      toast.error(error.message || 'Invalid email or password');
      setIsLoading(false);
    }
  };

  const handleOTPLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate OTP
    if (!formData.otp || !/^\d{6}$/.test(formData.otp)) {
      setError('Please enter a valid 6-digit OTP');
      toast.error('Please enter a valid OTP');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call to verify OTP (replace with actual API call later)
      setTimeout(() => {
        // Mock successful login for demo
        const user = {
          id: 2,
          name: 'Mobile User',
          mobileNumber: formData.mobileNumber,
          role: 'Student', // Default role for OTP login
        };
        
        // Update global state
        login(user);
        
        toast.success('OTP verification successful!');
        navigate('/student/dashboard');
      }, 1000);
    } catch (error) {
      console.error('OTP verification error:', error);
      setError(error.message || 'Invalid OTP. Please try again.');
      toast.error(error.message || 'Invalid OTP. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-6">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-indigo-100">
            Access your learning journey
          </p>
        </div>
        
        {/* Authentication Method Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => switchAuthMethod('password')}
            className={`flex-1 py-4 px-4 text-center font-medium text-sm ${
              authMethod === 'password'
                ? 'text-indigo-600 border-b-2 border-indigo-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaLock className="inline-block mr-2" />
            Password Login
          </button>
          <button
            onClick={() => switchAuthMethod('otp')}
            className={`flex-1 py-4 px-4 text-center font-medium text-sm ${
              authMethod === 'otp'
                ? 'text-indigo-600 border-b-2 border-indigo-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaSms className="inline-block mr-2" />
            OTP Login
          </button>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {authMethod === 'password' ? (
            <form className="space-y-6" onSubmit={handlePasswordLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md"
                    placeholder="Password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Signing in...' : 'Sign in with Password'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {!otpSent ? (
                <form onSubmit={handleSendOTP}>
                  <div className="mb-6">
                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMobile className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="mobileNumber"
                        name="mobileNumber"
                        type="tel"
                        pattern="[0-9]{10}"
                        required
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md"
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      We'll send a 6-digit OTP to this number
                    </p>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleOTPLogin}>
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                        Enter OTP
                      </label>
                      {otpCountdown > 0 ? (
                        <span className="text-sm text-gray-500">
                          Resend in {otpCountdown}s
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOTP}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaKey className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="otp"
                        name="otp"
                        type="text"
                        pattern="[0-9]{6}"
                        required
                        value={formData.otp}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md"
                        placeholder="6-digit OTP"
                        maxLength="6"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      OTP sent to: {formData.mobileNumber}
                    </p>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? 'Verifying...' : 'Verify & Login'}
                    </button>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-sm font-medium text-gray-500 hover:text-gray-700 w-full text-center"
                    >
                      Use a different number
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;