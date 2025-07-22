import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import NotificationBell from '../../components/NotificationBell';

function StudentDashboard() {
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    enrolledCourses: 3,
    completedCourses: 1,
    inProgressCourses: 2,
    upcomingAssignments: 5,
    averageGrade: 87,
    certificates: 1
  });

  useEffect(() => {
    // Check if user is authenticated and has Admin role
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      navigate('/login')
    }
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role != '1') {
        navigate('/login')
      }
      setUser(decoded.username)
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white overflow-hidden shadow-lg rounded-lg mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
              <NotificationBell userRole="student" />
            </div>
            <p className="mt-2 text-indigo-100">Welcome back, {user || 'Student'}</p>
          </div>

          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-blue-800">Courses</h2>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.enrolledCourses}</p>
                <p className="text-sm text-blue-500 mt-1">{stats.completedCourses} completed, {stats.inProgressCourses} in progress</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-green-800">Average Grade</h2>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.averageGrade}%</p>
                <p className="text-sm text-green-500 mt-1">Across all courses</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-purple-800">Certificates</h2>
                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.certificates}</p>
                <p className="text-sm text-purple-500 mt-1">Earned so far</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center py-3 px-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors">
                  Browse Course Catalog
                </button>
                <button className="flex items-center justify-center py-3 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors">
                  Continue Learning
                </button>
                <button className="flex items-center justify-center py-3 px-4 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-colors">
                  View Assignments
                </button>
                <button className="flex items-center justify-center py-3 px-4 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition-colors">
                  Join Discussion Forum
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Your Courses</h2>
            </div>
            <div className="px-6 py-5">
              <ul className="divide-y divide-gray-200">
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Introduction to Web Development
                      </p>
                      <p className="text-sm text-gray-500">
                        Progress: 75% complete
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none">
                        Continue
                      </button>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Data Science Fundamentals
                      </p>
                      <p className="text-sm text-gray-500">
                        Progress: 30% complete
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    <div>
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none">
                        Continue
                      </button>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Mobile App Development
                      </p>
                      <p className="text-sm text-gray-500">
                        Progress: 100% complete
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    <div>
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none">
                        View Certificate
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Assignments</h2>
            </div>
            <div className="px-6 py-5">
              <ul className="divide-y divide-gray-200">
                <li className="py-3">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">JavaScript Final Project</p>
                      <p className="text-sm text-gray-500">Due: May 15, 2025</p>
                    </div>
                    <div className="ml-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Urgent
                      </span>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">Data Analysis Exercise</p>
                      <p className="text-sm text-gray-500">Due: May 20, 2025</p>
                    </div>
                    <div className="ml-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Upcoming
                      </span>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">UI/UX Design Presentation</p>
                      <p className="text-sm text-gray-500">Due: May 25, 2025</p>
                    </div>
                    <div className="ml-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        New
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
