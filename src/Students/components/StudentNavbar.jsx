import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSearch, FaBookOpen, FaGraduationCap, FaCertificate, FaSignOutAlt, FaBell, FaQuestionCircle } from 'react-icons/fa';
import useAuthStore from '../stores/authStore';

function StudentNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState(3); // Example notification count
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Get authentication state from authStore
    const { isAuthenticated, user, role, logout } = useAuthStore();
    const username = user?.name || localStorage.getItem("username") || "Student";

    const toggleNavbar = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            logout();
            navigate("/login");
        }
        setShowDropdown(false);
    };

    const handleDropdownToggle = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowDropdown(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white text-gray-800 shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Brand/Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight flex items-center">
                            <FaGraduationCap className="mr-2" />
                            TrackAdemy
                        </Link>
                    </div>

                    {/* Navigation Links and Search Bar */}
                    <div className="flex items-center">
                        {/* Desktop Search Bar */}
                        <div className="hidden md:flex items-center mr-6">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search courses..."
                                    className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            </form>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    to="/courses"
                                    className="text-gray-600 hover:text-blue-500 px-4 py-2 text-base font-semibold transition-colors duration-200 flex items-center"
                                >
                                    <FaBookOpen className="mr-1" /> Courses
                                </Link>
                                <Link
                                    to="/student/dashboard"
                                    className="text-gray-600 hover:text-blue-500 px-4 py-2 text-base font-semibold transition-colors duration-200 flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                    </svg> Dashboard
                                </Link>
                                <Link
                                    to="/my-learning"
                                    className="text-gray-600 hover:text-blue-500 px-4 py-2 text-base font-semibold transition-colors duration-200 flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                    </svg> My Learning
                                </Link>
                                <Link
                                    to="/certificates"
                                    className="text-gray-600 hover:text-blue-500 px-4 py-2 text-base font-semibold transition-colors duration-200 flex items-center"
                                >
                                    <FaCertificate className="mr-1" /> Certificates
                                </Link>
                            </div>
                        </div>

                        {/* User Profile, Notifications and Logout */}
                        <div className="flex items-center">
                            <div className="md:flex items-center hidden">
                                {/* Notifications */}
                                <div className="relative mr-4">
                                    <button className="text-gray-600 hover:text-blue-500 transition-colors duration-200 relative">
                                        <FaBell className="text-xl" />
                                        {notifications > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {notifications}
                                            </span>
                                        )}
                                    </button>
                                </div>
                                
                                {/* Help */}
                                <Link to="/help" className="text-gray-600 hover:text-blue-500 mr-6 transition-colors duration-200">
                                    <FaQuestionCircle className="text-xl" />
                                </Link>
                            </div>

                            <div className="md:block hidden">
                                <div className="ml-4 flex items-center gap-3">
                                    <div className="relative">
                                        <div 
                                            onClick={handleDropdownToggle}
                                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-full py-1 px-3 transition-colors duration-200"
                                        >
                                            <FaUserCircle className="text-2xl text-blue-600" />
                                            <span className="text-gray-800 font-medium">{username}</span>
                                        </div>
                                        {showDropdown && (
                                            <div
                                                ref={dropdownRef}
                                                className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-100"
                                            >
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <p className="text-sm text-gray-500">Signed in as</p>
                                                    <p className="text-sm font-semibold text-gray-800 truncate">{user?.email || "student@example.com"}</p>
                                                </div>
                                                <Link
                                                    to="/profile"
                                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                                    onClick={() => setShowDropdown(false)}
                                                >
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                    </svg>
                                                    Profile
                                                </Link>
                                                <Link
                                                    to="/settings"
                                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                                    onClick={() => setShowDropdown(false)}
                                                >
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                    </svg>
                                                    Settings
                                                </Link>
                                                <div className="border-t border-gray-100 my-1"></div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 w-full text-left"
                                                >
                                                    <FaSignOutAlt className="w-5 h-5 mr-2" />
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={toggleNavbar}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
                                >
                                    {isOpen ? (
                                        <svg
                                            className="h-6 w-6"
                                            stroke="currentColor"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-6 w-6"
                                            stroke="currentColor"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-4 pt-4 pb-3 space-y-1">
                        {/* Mobile Search Bar */}
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search courses..."
                                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            </div>
                        </form>

                        {/* User info on mobile */}
                        <div className="flex items-center py-3 border-b border-gray-200 mb-2">
                            <FaUserCircle className="text-3xl text-blue-600 mr-2" />
                            <div>
                                <p className="font-medium text-gray-800">{username}</p>
                                <p className="text-sm text-gray-500">{user?.email || "student@example.com"}</p>
                            </div>
                        </div>

                        <Link
                            to="/courses"
                            className="flex items-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            <FaBookOpen className="mr-3 text-gray-500" />
                            Courses
                        </Link>
                        <Link
                            to="/student/dashboard"
                            className="flex items-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            Dashboard
                        </Link>
                        <Link
                            to="/my-learning"
                            className="flex items-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                            My Learning
                        </Link>
                        <Link
                            to="/certificates"
                            className="flex items-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            <FaCertificate className="mr-3 text-gray-500" />
                            Certificates
                        </Link>
                        <Link
                            to="/profile"
                            className="flex items-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            Profile
                        </Link>

                        {/* Notifications in mobile menu */}
                        <Link
                            to="/notifications"
                            className="flex items-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            <FaBell className="mr-3 text-gray-500" />
                            Notifications
                            {notifications > 0 && (
                                <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {notifications}
                                </span>
                            )}
                        </Link>

                        <div className="border-t border-gray-200 my-2"></div>
                        
                        <button
                            onClick={() => {
                                handleLogout();
                                setIsOpen(false);
                            }}
                            className="flex items-center w-full text-left text-red-600 hover:bg-red-50 px-3 py-3 rounded-md text-base font-medium"
                        >
                            <FaSignOutAlt className="mr-3" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default StudentNavbar;