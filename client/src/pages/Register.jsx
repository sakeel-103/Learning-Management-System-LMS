import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, Upload, UserIcon, MailIcon, PhoneIcon } from 'lucide-react';
import authService from '../services/authService';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    role: '1',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const registerRes = await authService.register(formData);
    if (registerRes) {
      navigate('/verify-email');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 animate-fade-in relative">
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-teal-400 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-8">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 tracking-tight">
            <span className="inline-block animate-text-reveal bg-clip-text text-transparent bg-gray-600">Your</span>{' '}
            <span className="inline-block animate-text-reveal [animation-delay:200ms] bg-clip-text text-transparent bg-gray-600">Learning</span>{' '}
            <span className="inline-block animate-text-reveal [animation-delay:400ms] bg-clip-text text-transparent bg-gray-600">Management</span>{' '}
            <span className="inline-block animate-text-reveal [animation-delay:600ms] bg-clip-text text-transparent bg-gray-600">System</span>
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-lg mx-auto md:mx-0">
            Unlock a world of knowledge with our comprehensive courses, expert instructors, and flexible learning options. Sign in to continue your journey!
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="/register"
              className="bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:from-blue-700 hover:to-green-700 transition duration-300 transform hover:-translate-y-1"
            >
              Get Started
            </Link>
            <Link
              to="/courses"
              className="bg-white text-indigo-700 font-semibold py-3 px-8 rounded-lg shadow-md border border-gray-100 hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1"
            >
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Right Section: Login Form */}
        <div className="w-full md:w-1/2 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-md">
          <div className="bg-teal-600 p-6">
            <h2 className="text-3xl font-extrabold text-center text-white">Create your account</h2>
            <p className="mt-2 text-center text-white-600">Join our learning platform today</p>
          </div>

          <div className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.password}
                      onChange={handleChange}
                    />
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
                  <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="password2"
                      id="password2"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.password2}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Account Type
                </label>
                <select
                  id="role"
                  name="role"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="1">Student</option>
                  <option value="2">Instructor</option>
                </select>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeToTerms" className="text-gray-700">
                    I agree to the <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">Terms of Service</Link> and <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</Link>
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : "Create Account"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
