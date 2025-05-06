import { Link } from 'react-router-dom'
import { FaBook, FaChartLine, FaCertificate, FaVideo } from 'react-icons/fa'
import UserNavbar from './UserNavbar'

function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <header>
                <UserNavbar />
                {/* Hero Section */}
                <div className="container mx-auto py-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Welcome to Your Learning Journey</h2>
                    <p className="text-lg md:text-xl mb-8 text-gray-600">Access a wide range of courses, track your progress, and earn certifications.</p>
                    <Link
                        to="/register"
                        className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="container mx-auto py-16">
                <h3 className="text-3xl font-semibold text-center mb-12 text-gray-800">Why Choose Us?</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <FaBook className="text-4xl text-blue-600 mx-auto mb-4" />
                        <h4 className="text-xl font-medium mb-2 text-gray-700">Online & Offline Learning</h4>
                        <p className="text-gray-600">Learn anytime, anywhere with flexible access to courses.</p>
                    </div>
                    <div className="text-center">
                        <FaVideo className="text-4xl text-blue-600 mx-auto mb-4" />
                        <h4 className="text-xl font-medium mb-2 text-gray-700">Live & Recorded Classes</h4>
                        <p className="text-gray-600">Join live sessions or watch recorded lectures at your convenience.</p>
                    </div>
                    <div className="text-center">
                        <FaChartLine className="text-4xl text-blue-600 mx-auto mb-4" />
                        <h4 className="text-xl font-medium mb-2 text-gray-700">Progress Tracking</h4>
                        <p className="text-gray-600">Monitor your learning progress with detailed dashboards.</p>
                    </div>
                    <div className="text-center">
                        <FaCertificate className="text-4xl text-blue-600 mx-auto mb-4" />
                        <h4 className="text-xl font-medium mb-2 text-gray-700">Earn Certifications</h4>
                        <p className="text-gray-600">Get certified upon course completion with verifiable certificates.</p>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="bg-blue-600 text-white py-16 text-center">
                <div className="container mx-auto">
                    <h3 className="text-3xl font-semibold mb-4">Ready to Start Learning?</h3>
                    <p className="text-lg mb-8">Join thousands of learners and explore courses tailored for you.</p>
                    <Link
                        to="/register"
                        className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition"
                    >
                        Sign Up Now
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default HomePage