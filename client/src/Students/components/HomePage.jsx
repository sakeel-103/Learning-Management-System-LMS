import { Link } from 'react-router-dom'
import { FaBook, FaChartLine, FaCertificate, FaVideo } from 'react-icons/fa'
import UserFooter from '../../components/UserFooter'

function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="container mx-auto pt-36 pb-16 py-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Welcome to Your Learning Journey</h2>
                <p className="text-lg md:text-xl mb-8 text-gray-600">Access a wide range of courses, track your progress, and earn certifications.</p>
                <Link
                    to="/register"
                    className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition:duration-400"
                >
                    Get Started
                </Link>
            </section>

            {/* Features Section */}
            <section className="container mx-auto py-16">
                <h3 className="text-3xl font-semibold text-center mb-12 text-gray-800">Why Choose Us?</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        {
                            icon: <FaBook className="text-4xl text-blue-600 mx-auto mb-4" />,
                            title: "Online & Offline Learning",
                            desc: "Learn anytime, anywhere with flexible access to courses.",
                        },
                        {
                            icon: <FaVideo className="text-4xl text-blue-600 mx-auto mb-4" />,
                            title: "Live & Recorded Classes",
                            desc: "Join live sessions or watch recorded lectures at your convenience.",
                        },
                        {
                            icon: <FaChartLine className="text-4xl text-blue-600 mx-auto mb-4" />,
                            title: "Progress Tracking",
                            desc: "Monitor your learning progress with detailed dashboards.",
                        },
                        {
                            icon: <FaCertificate className="text-4xl text-blue-600 mx-auto mb-4" />,
                            title: "Earn Certifications",
                            desc: "Get certified upon course completion with verifiable certificates.",
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] text-center transform transition-transform duration-300 hover:-translate-y-2"
                        >
                            {feature.icon}
                            <h4 className="text-xl font-medium mb-2 text-gray-700">{feature.title}</h4>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* Call-to-Action Section */}
            <section className="bg-gray-600 text-white py-16 text-center">
                <div className="container mx-auto">
                    <h3 className="text-3xl font-semibold mb-4">Ready to Start Learning?</h3>
                    <p className="text-lg mb-8">Join thousands of learners and explore courses tailored for you.</p>
                    <Link
                        to="/register"
                        className="bg-white text-black font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-400 transition"
                    >
                        Sign Up Now
                    </Link>
                </div>
            </section>

            {/* Footer Section */}
            <UserFooter />
        </div>
    )
}

export default HomePage