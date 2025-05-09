import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

function AdminDashboard() {
  const { user, isAuthenticated, role } = useAuthStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 145,
    totalInstructors: 24,
    totalCourses: 37,
    activeUsers: 89,
    pendingApprovals: 12,
    recentJoins: 7
  });

  useEffect(() => {
    // Check if user is authenticated and has Admin role
    if (!isAuthenticated || role !== 'Admin') {
      navigate('/login');
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white overflow-hidden shadow-lg rounded-lg mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="mt-2 text-indigo-100">Welcome back, {user?.name || 'Administrator'}</p>
          </div>
          
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-blue-800">Students</h2>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalStudents}</p>
                <p className="text-sm text-blue-500 mt-1">+{stats.recentJoins} new this week</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-green-800">Instructors</h2>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalInstructors}</p>
                <p className="text-sm text-green-500 mt-1">{stats.pendingApprovals} pending approvals</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-purple-800">Courses</h2>
                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalCourses}</p>
                <p className="text-sm text-purple-500 mt-1">Across all categories</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center py-3 px-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors">
                  Approve Instructor Requests
                </button>
                <button className="flex items-center justify-center py-3 px-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors">
                  Manage Course Categories
                </button>
                <button className="flex items-center justify-center py-3 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors">
                  View System Reports
                </button>
                <button className="flex items-center justify-center py-3 px-4 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition-colors">
                  Configure System Settings
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Recent Activities</h2>
            </div>
            <div className="px-6 py-5">
              <ul className="divide-y divide-gray-200">
                <li className="py-3">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">New instructor registration</p>
                      <p className="text-sm text-gray-500">John Doe requested instructor approval</p>
                    </div>
                    <div className="ml-4 text-sm text-gray-500">2h ago</div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">New course added</p>
                      <p className="text-sm text-gray-500">Advanced Python Programming by Sarah Johnson</p>
                    </div>
                    <div className="ml-4 text-sm text-gray-500">5h ago</div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">Student enrollment spike</p>
                      <p className="text-sm text-gray-500">23 new students enrolled in Web Development</p>
                    </div>
                    <div className="ml-4 text-sm text-gray-500">1d ago</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">System Notifications</h2>
            </div>
            <div className="px-6 py-5">
              <ul className="divide-y divide-gray-200">
                <li className="py-3">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-red-600">System backup required</p>
                      <p className="text-sm text-gray-500">Last backup was 7 days ago</p>
                    </div>
                    <div className="ml-4">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none">
                        Action
                      </button>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-yellow-600">Storage space warning</p>
                      <p className="text-sm text-gray-500">80% of available storage used</p>
                    </div>
                    <div className="ml-4">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none">
                        Review
                      </button>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-green-600">System update available</p>
                      <p className="text-sm text-gray-500">Version 2.3.4 is ready to install</p>
                    </div>
                    <div className="ml-4">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none">
                        Update
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

export default AdminDashboard;