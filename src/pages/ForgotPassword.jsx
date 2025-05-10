import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      toast.error('Please enter your email address');
      return;
    }

    if (!validateEmail()) {
      toast.error(error);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call (replace with actual API call later)
      setTimeout(() => {
        setIsSubmitted(true);
        toast.success('Password reset instructions sent to your email');
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error requesting password reset:', error);
      setError(error.message || 'Failed to process request. Please try again later.');
      toast.error(error.message || 'Failed to process request. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-6">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-indigo-100">
            We'll send you instructions to reset your password
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {isSubmitted ? (
            <div className="text-center">
              <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-700">
                  If an account with that email exists, we've sent instructions to reset your password.
                </p>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Check your email inbox and follow the instructions to reset your password.
              </p>
              <p className="mt-4 text-sm text-gray-600">
                Don't see the email? Check your spam folder.
              </p>
              <div className="mt-6">
                <Link
                  to="/login"
                  className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-500"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to login
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md"
                    placeholder="Your email address"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter the email address associated with your account
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
                  {isLoading ? 'Sending...' : 'Send reset instructions'}
                </button>
              </div>

              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-500"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;