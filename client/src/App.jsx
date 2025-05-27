import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import UserNavbar from './components/UserNavbar'
import UserFooter from './components/UserFooter'
import HomePage from './Students/components/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import InstructorDashboard from './Instructors/components/InstructorDashboard'
import StudentDashboard from './Students/components/StudentDashboard'
import CoursePage from './Students/pages/CoursePage'

// Admin Component Imports
import AdminDashboard from './Admin/Dashboard'
import UserManagement from './Admin/components/UserManagement'
import CourseManagement from './Admin/components/CourseManagement'
import AssessmentManagement from './Admin/components/AssessmentManagement'

import './index.css'

function App() {
  return (
    <Router>
      <UserNavbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Role-based Protected Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/courses" element={<CoursePage />} />

        {/* Admin Nested Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="assessments" element={<AssessmentManagement />} />
        </Route>
      </Routes>
      <UserFooter />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  )
}

export default App
