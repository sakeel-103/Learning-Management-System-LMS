import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, Upload, UserIcon, MailIcon, PhoneIcon } from 'lucide-react';
import authService from '../services/authService';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    phone: '',
    role: 'STUDENT',
    profile_picture: null,
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      if (files[0]) {
        setFormData({
          ...formData,
          [name]: files[0]
        });

        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const registerRes = await authService.register(formData);
    if (registerRes) {
      navigate('/login');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-green-800 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in relative">
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Section: LMS Information */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-8">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 tracking-tight">
            <span className="inline-block animate-text-reveal bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">Join</span>{' '}
            <span className="inline-block animate-text-reveal [animation-delay:200ms] bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">Our</span>{' '}
            <span className="inline-block animate-text-reveal [animation-delay:400ms] bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">Learning</span>{' '}
            <span className="inline-block animate-text-reveal [animation-delay:600ms] bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">Community</span>
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-lg mx-auto md:mx-0">
            Start your educational journey with our comprehensive courses, expert instructors, and flexible learning options. Create an account to unlock endless possibilities!
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:from-blue-700 hover:to-green-700 transition duration-300 transform hover:-translate-y-1"
            >
              Sign In
            </Link>
            <Link
              to="/courses"
              className="bg-white text-indigo-700 font-semibold py-3 px-8 rounded-lg shadow-md border border-gray-100 hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1"
            >
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Right Section: Registration Form */}
        <div className="w-full md:w-2/3 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-100 transform transition-all duration-300 hover:shadow-md">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-white">Create your account</h2>
              <p className="mt-1 text-indigo-200">Join our learning platform today</p>
            </div>
          </div>

          <div className="p-4">
            <form className="space-y-2" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <UserIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <UserIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <PhoneIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <MailIcon className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
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
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
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
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      value={formData.password2}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="h-4 w-4 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-gray-400" />
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
                  className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="STUDENT">Student</option>
                  <option value="INSTRUCTOR">Instructor</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <div className="mt-1 flex justify-center items-center px-2 py-2 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {profilePreview ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={profilePreview}
                          alt="Profile preview"
                          className="h-12 w-12 rounded-full object-cover mb-2"
                        />
                        <button
                          type="button"
                          className="text-sm text-indigo-600 hover:text-indigo-500"
                          onClick={() => {
                            setProfilePreview(null);
                            setFormData({ ...formData, profile_picture: null });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-6 w-6 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="profile_picture"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="profile_picture"
                              name="profile_picture"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex items-center">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    className="h-3 w-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label htmlFor="agreeToTerms" className="text-gray-700">
                    I agree to the <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">Terms of Service</Link> and <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</Link>
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
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

            <div className="mt-2 text-center">
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