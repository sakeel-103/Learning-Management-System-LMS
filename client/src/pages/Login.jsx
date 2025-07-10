import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, LogInIcon } from 'lucide-react';
import authService from '../services/authService';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepSignedIn: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const loginRes = await authService.login(formData);
    if (!loginRes) {
      setIsLoading(false);
      return;
    }
    const decoded = jwtDecode(localStorage.getItem('ACCESS_TOKEN'))
    if (decoded?.role == '3') {
      navigate('/admin/dashboard')
      return
    }
    if (decoded?.role == '2') {
      navigate('/InstructorViewPage')
      return
    }
    navigate('/student/dashboard');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in relative">
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-8">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 tracking-tight">
            <span className="inline-block text-gray-800">Your</span>{' '}
            <span className="inline-block text-gray-800">Learning</span>{' '}
            <span className="inline-block text-gray-800">Management</span>{' '}
            <span className="inline-block text-gray-800">System</span>
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-lg mx-auto md:mx-0">
            Unlock a world of knowledge with our comprehensive courses, expert instructors, and flexible learning options. Sign in to continue your journey!
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1"
            >
              Get Started
            </Link>
            <Link
              to="/courses"
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md border border-blue-200 hover:bg-blue-50 transition duration-300 transform hover:-translate-y-1"
            >
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Right Section: Login Form */}
        <div className="w-full md:w-1/2 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
          <div className="bg-blue-600 p-6">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white">Welcome back</h2>
              <p className="mt-2 text-white-600">Sign in to access your learning journey</p>
            </div>
          </div>

          <div className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="yourname@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
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
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="keepSignedIn"
                    name="keepSignedIn"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={formData.keepSignedIn}
                    onChange={handleChange}
                  />
                  <label htmlFor="keepSignedIn" className="ml-2 block text-sm text-gray-700">
                    Keep me signed in
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (<>
                    <LogInIcon className="mr-2 h-5 w-5" />
                    Sign in
                  </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;