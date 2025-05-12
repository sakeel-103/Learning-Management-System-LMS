import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

function UserFooter() {
    return (
        <footer className="bg-gray-700 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                {/* Navigation Links */}
                <div className="flex justify-center space-x-8 mb-6">
                    <Link to="/about" className="text-white text-base font-bold hover:text-blue-600 hover:underline">
                        About
                    </Link>
                    <Link to="/contact" className="text-white text-base font-bold hover:text-blue-600 hover:underline">
                        Contact
                    </Link>
                    <Link to="/privacy" className="text-white text-base font-bold hover:text-blue-600 hover:underline">
                        Privacy Policy
                    </Link>
                </div>

                {/* Social Media Icons (Placeholder in case the image includes them) */}
                <div className="flex justify-center space-x-6 mb-6">
                    <a
                        href="https://www.LinkedIn.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-500 transform transition-transform duration-300 hover:scale-110 animate-blink"
                    >
                        <FaLinkedin className="text-2xl" />
                    </a>
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-500 transform transition-transform duration-300 hover:scale-110 animate-blink"
                    >
                        <FaFacebook className="text-2xl" />
                    </a>
                    <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-500 transform transition-transform duration-300 hover:scale-110 animate-blink"
                    >
                        <FaTwitter className="text-2xl" />
                    </a>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-500 transform transition-transform duration-300 hover:scale-110 animate-blink"
                    >
                        <FaInstagram className="text-2xl" />
                    </a>
                </div>


                {/* Copyright */}
                <p className="text-white">© 2025 TrackAdemy. | Design Esthetics | All rights reserved.</p>
            </div>
        </footer>
    )
}

export default UserFooter