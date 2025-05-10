import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

function InstructorDashboard() {
  const { user, isAuthenticated, role } = useAuthStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCourses: 5,
    enrolledStudents: 127,
    completionRate: 68,
    averageRating: 4.7,
    pendingReviews: 14,
    earnings: 2450
  });

  useEffect(() => {
    // Check if user is authenticated and has Instructor role
    if (!isAuthenticated || role !== 'Instructor') {
      navigate('/login');
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white overflow-hidden shadow-lg rounded-lg mb-8">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">Instructor Dashboard</h1>
            <p className="mt-2 text-blue-100">Welcome back, {user?.name || 'Instructor'}</p>
          </div>
          
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-blue-800">Your Courses</h2>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalCourses}</p>
                <p className="text-sm text-blue-500 mt-1">{stats.enrolledStudents} total students</p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-amber-800">Completion Rate</h2>
                <p className="text-3xl font-bold text-amber-600 mt-2">{stats.completionRate}%</p>
                <p className="text-sm text-amber-500 mt-1">Average across all courses</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-green-800">Earnings</h2>
                <p className="text-3xl font-bold text-green-600 mt-2">${stats.earnings}</p>
                <p className="text-sm text-green-500 mt-1">This month</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center py-3 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors">
                  Create New Course
                </button>
                <button className="flex items-center justify-center py-3 px-4 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition-colors">
                  Manage Existing Courses
                </button>
                <button className="flex items-center justify-center py-3 px-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors">
                  Student Assessments
                </button>
                <button className="flex items-center justify-center py-3 px-4 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-colors">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Student Reviews</h2>
            </div>
            <div className="px-6 py-5">
              <div className="flex items-center mb-4">
                <div className="text-3xl font-bold text-gray-800">{stats.averageRating}</div>
                <div className="ml-2 flex text-yellow-400">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                </div>
                <div className="ml-2 text-sm text-gray-600">Average rating</div>
              </div>
              <ul className="divide-y divide-gray-200">
                <li className="py-3">
                  <div className="flex items-start">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">Great course structure!</p>
                      <p className="text-sm text-gray-500">The content was very well organized and easy to follow.</p>
                      <div className="flex text-yellow-400 mt-1">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                      </div>
                    </div>
                    <div className="ml-4 text-sm text-gray-500">2d ago</div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex items-start">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">Very informative!</p>
                      <p className="text-sm text-gray-500">I learned a lot from this course, highly recommended.</p>
                      <div className="flex text-yellow-400 mt-1">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                      </div>
                    </div>
                    <div className="ml-4 text-sm text-gray-500">1w ago</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Schedule</h2>
            </div>
            <div className="px-6 py-5">
              <ul className="divide-y divide-gray-200">
                <li className="py-3">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">Live Session: Web Development Basics</p>
                      <p className="text-sm text-gray-500">Today, 2:00 PM - 3:30 PM</p>
                    </div>
                    <div className="ml-4">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none">
                        Start
                      </button>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">Q&A Session: JavaScript</p>
                      <p className="text-sm text-gray-500">Tomorrow, 10:00 AM - 11:00 AM</p>
                    </div>
                    <div className="ml-4">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none">
                        Prepare
                      </button>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">Assignment Review</p>
                      <p className="text-sm text-gray-500">May 12, 3:00 PM - 4:00 PM</p>
                    </div>
                    <div className="ml-4">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none">
                        View
                      </button>
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

export default InstructorDashboard;