import { useState } from 'react';
import UsersCRUD from './UsersCRUD';
import CoursesCRUD from './CoursesCRUD';
import AssessmentsCRUD from './AssessmentsCRUD';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderTab = () => {
    switch (activeTab) {
      case 'users':
        return <UsersCRUD />;
      case 'courses':
        return <CoursesCRUD />;
      case 'assessments':
        return <AssessmentsCRUD />;
      default:
        return <UsersCRUD />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-300'}`}
        >
          Manage Users
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded ${activeTab === 'courses' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-300'}`}
        >
          Manage Courses
        </button>
        <button
          onClick={() => setActiveTab('assessments')}
          className={`px-4 py-2 rounded ${activeTab === 'assessments' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-300'}`}
        >
          Manage Assessments
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow-md rounded p-4">
        {renderTab()}
      </div>
    </div>
  );
};

export default AdminPanel;
