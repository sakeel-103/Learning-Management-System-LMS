import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserNavbar from './components/UserNavbar'
import UserFooter from './components/UserFooter'
import HomePage from './Students/components/HomePage'
import './index.css'

function App() {
  return (
    <Router>
      <UserNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
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