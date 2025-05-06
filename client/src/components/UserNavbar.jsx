import { Link } from 'react-router-dom'

function UserNavbar() {
    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4">
                <Link to="/" className="text-2xl font-bold">LMS Platform</Link>
                <div className="space-x-6">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/login" className="hover:underline">Login</Link>
                    <Link to="/register" className="hover:underline">Register</Link>
                </div>
            </div>
        </nav>
    )
}

export default UserNavbar