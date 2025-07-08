import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserNavbar from './components/UserNavbar'
import UserFooter from './components/UserFooter'
import HomePage from './Students/components/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import AdminDashboard from './Admin/components/AdminDashboard'
import InstructorDashboard from './Instructors/components/InstructorDashboard'
import StudentDashboard from './Students/components/StudentDashboard'
import './index.css'
import CoursePage from './Students/pages/CoursePage';
import DSAPage from './Students/CorseDetails/dsaPage'
import MLAndDS from './Students/CorseDetails/MLAndDS'
import BackendWithJava from './Students/CorseDetails/BackendWithJava'
import DataStructuresAlgorithm from './Students/CorseDetails/DataStructureAlgorithm'
import ScrollToTop from './components/ScrollToTop';
import JavaScriptPage from './Students/DevelopmentAndDS/JavaScriptPage'
import BackendPage from './Students/DevelopmentAndDS/BackendPage'
import CSSPage from './Students/DevelopmentAndDS/CSSPage'
import DjangoPage from './Students/DevelopmentAndDS/DjangoPage'
import FrontendPage from './Students/DevelopmentAndDS/FrontendPage'
import HTMLPage from './Students/DevelopmentAndDS/HTMLPage'
import NodejsPage from './Students/DevelopmentAndDS/NodeJsPage'
import ReactJSPage from './Students/DevelopmentAndDS/ReactPage'
import MachineLearning from './Students/AI&ML/MachineLearning'
import DataScience from './Students/AI&ML/DataScience';
import DataAnalysis from './Students/AI&ML/DataAnalysis'
import DataVisualization from './Students/AI&ML/DataVisualization'
import DeepLearning from './Students/AI&ML/DeepLearning'
import NaturalLanguage from './Students/AI&ML/NaturalLanguage'
import ComputerVision from './Students/AI&ML/ComputerVission'
import ArtificialIntelligence from './Students/AI&ML/ArtificialIntelligence'
import AssessmentPage from './Students/CorseDetails/AssesmentPage'
import DynamicQuizPage from './Students/AssessmentCourses/DynamicQuizPage'
import ContactUsPage from './Students/components/ContanUsPage'
import CertificationPage from './Students/components/CertificationPage'
import CourseFrontPage from './Students/pages/CourseFrontPage'
import PaymentPage from './Students/pages/PaymentPage';
import InstructorViewPage from './Students/pages/InstructorViewPage';
import VerifyEmail from './pages/VerifyEmail'
import InstructorAccess from './Admin/components/InstructorAccess'
import HandleDownloadCertificate from './Students/AssessmentCourses/HandleCertificate'
import QuizResultPage from './Students/CorseDetails/QuizResultPage'
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
        <Route path='/verify-email' element={<VerifyEmail />} />

        {/* Role-based Protected Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path='/admin/instructor-access' element={<InstructorAccess />} />
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/InstructorViewPage" element={<InstructorViewPage />} />
        <Route path="/course_front_page" element={<CourseFrontPage />} />
        <Route path="/courses/dsa-to-development" element={<DSAPage />} />
        <Route path="/courses/machine-learning" element={<MLAndDS />} />
        <Route path="/courses/backend-with-java" element={<BackendWithJava />} />
        <Route path="/courses/data-structure-algorithms" element={<DataStructuresAlgorithm />} />
        <Route path="/courses/AssesmentPage" element={<AssessmentPage />} />
        <Route path="/dvelopmentAndDS/javascriptPage" element={<JavaScriptPage />} />
        <Route path="/dvelopmentAndDS/backendPage" element={<BackendPage />} />
        <Route path="/devlopmentAndDS/cssPage" element={<CSSPage />} />
        <Route path="/DevelopmentAndDS/djangoPage" element={<DjangoPage />} />
        <Route path="/DevelopmentAndDS/frontendPage" element={<FrontendPage />} />
        <Route path="/DevelopmentAndDS/htmlPage" element={<HTMLPage />} />
        <Route path="/DevelopmentAndDS/nodeJsPage" element={<NodejsPage />} />
        <Route path="/DevelopmentAndDS/reactJsPage" element={<ReactJSPage />} />
        <Route path="/AIMLDS/MachineLearningPage" element={<MachineLearning />} />
        <Route path="/AIMLDS/DataSciencePage" element={<DataScience />} />
        <Route path="/AIMLDS/DataAnalysisPage" element={<DataAnalysis />} />
        <Route path="/AIMLDS/DataVisualizationPage" element={<DataVisualization />} />
        <Route path="/AIMLDS/DeepLearningPage" element={<DeepLearning />} />
        <Route path="/AIMLDS/NaturalLanguagePage" element={<NaturalLanguage />} />
        <Route path="/ALMLDS/ComputerVissionPage" element={<ComputerVision />} />
        <Route path="/AIMLDS/ArtificialInteligencePage" element={<ArtificialIntelligence />} />
        <Route path="/Components/contact-us-page" element={<ContactUsPage />} />
        <Route path="/Components/certication-page" element={<CertificationPage />} />

        {/* Payment page */}
        <Route path="/PaymentPage" element={<PaymentPage />} />

        {/* Dynamic Assessment Page */}
        <Route path="/AssessmentCourses/:quizId/start" element={<DynamicQuizPage />} />
        <Route path="/Certi" element={<HandleDownloadCertificate/>}/>
        <Route path="/AssessmentCourses/result/:quizId" element={<QuizResultPage />} />
      </Routes>

      <ScrollToTop />
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