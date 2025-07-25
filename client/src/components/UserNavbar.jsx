import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSearch } from 'react-icons/fa';

function UserNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username");

    const toggleNavbar = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            localStorage.setItem("isLoggedIn", false);
            localStorage.removeItem("username");
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("role");
            alert("Logout Successful.");
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

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white text-gray-800 shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-extrabold text-gray-600 tracking-tight">
                            TrackAdemy
                        </Link>
                    </div>
                    <div className="flex items-center">
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
                                    to="/"
                                    className="text-gray-600 hover:text-blue-400 px-4 py-2 text-base font-semibold transition-colors duration-200"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/courses"
                                    className="text-gray-600 hover:text-blue-400 px-4 py-2 text-base font-semibold transition-colors duration-200"
                                >
                                    Courses
                                </Link>
                                <Link
                                    to="/Components/contact-us-page"
                                    className="text-gray-600 hover:text-blue-800 px-4 py-2 text-base font-semibold transition-colors duration-200"
                                >
                                    Contact Us
                                </Link>
                                <Link
                                    to="/Components/certication-page"
                                    className="text-gray-600 hover:text-blue-400 px-4 py-2 text-base font-semibold transition-colors duration-200"
                                >
                                    Certificates
                                </Link>
                            </div>
                        </div>

                        {/* User Profile and Auth Links */}
                        <div className="flex items-center">
                            <div className="md:block hidden">
                                <div className="ml-6 flex items-center gap-6">
                                    {isLoggedIn ? (
                                        <div className="relative flex flex-col items-center">
                                            <FaUserCircle
                                                onClick={handleDropdownToggle}
                                                className="text-3xl cursor-pointer text-green-800"
                                            />
                                            <span className="text-blue-700 font-semibold text-sm mt-1">{username || "User"}</span>
                                            {showDropdown && (
                                                <div
                                                    ref={dropdownRef}
                                                    className="absolute right-0 top-16 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                                                >
                                                    <Link
                                                        to="/dashboard"
                                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                                        onClick={() => setShowDropdown(false)}
                                                    >
                                                        Dashboard
                                                    </Link>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                                                    >
                                                        Logout
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="text-gray-600 hover:text-blue-400 hover:underline px-4 py-2 text-base font-semibold transition-colors duration-200"
                                            >
                                                Login
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={toggleNavbar}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:text-blue-800 focus:outline-none transition-colors duration-200"
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
                    <div className="px-4 pt-4 pb-3 space-y-2">
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

                        <Link
                            to="/"
                            className="text-gray-600 hover:text-blue-400 px-4 py-2 text-base font-semibold transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <Link
                            to="/courses"
                            className="text-gray-600 hover:text-blue-400 hover:underline block px-4 py-2 text-base font-semibold"
                            onClick={() => setIsOpen(false)}
                        >
                            Courses
                        </Link>
                        <Link
                            to="/Components/contact-us-page"
                            className="text-gray-600 hover:text-blue-400 hover:underline block px-4 py-2 text-base font-semibold"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact Us
                        </Link>
                        {isLoggedIn && (localStorage.getItem("role") === "Instructor" || localStorage.getItem("role") === "Admin") && (
                            <Link
                                to="/manage-courses"
                                className="text-blue-600 hover:text-blue-800 hover:underline block px-4 py-2 text-base font-semibold"
                                onClick={() => setIsOpen(false)}
                            >
                                Manage Courses
                            </Link>
                        )}
                        {isLoggedIn && localStorage.getItem("role") === "Admin" && (
                            <Link
                                to="/admin-panel"
                                className="text-blue-600 hover:text-blue-800 hover:underline block px-4 py-2 text-base font-semibold"
                                onClick={() => setIsOpen(false)}
                            >
                                Admin Panel
                            </Link>
                        )}
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/Components/contact-us-page"
                                    className="text-blue-600 hover:text-blue-800 hover:underline block px-4 py-2 text-base font-semibold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Contact Us
                                </Link>
                                <div className="relative flex flex-col items-start">
                                    <FaUserCircle
                                        onClick={handleDropdownToggle}
                                        className="text-3xl cursor-pointer text-green-800"
                                    />
                                    <span className="text-blue-700 font-semibold text-sm mt-1">{username || "User"}</span>
                                    {showDropdown && (
                                        <div
                                            ref={dropdownRef}
                                            className="absolute left-0 top-16 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                                        >
                                            <Link
                                                to="/dashboard"
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                                onClick={() => {
                                                    setShowDropdown(false);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsOpen(false);
                                                }}
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:text-blue-800 hover:underline block px-4 py-2 text-base font-semibold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default UserNavbar;