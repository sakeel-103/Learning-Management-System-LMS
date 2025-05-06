import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle, FaChevronDown } from 'react-icons/fa'

function UserNavbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const navigate = useNavigate()
    const dropdownRef = useRef(null)

    // Authentication state using localStorage (to match reference)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const username = localStorage.getItem("username")

    const toggleNavbar = () => setIsOpen(!isOpen)

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?")
        if (confirmed) {
            localStorage.setItem("isLoggedIn", false)
            localStorage.removeItem("username")
            alert("Logout Successful.")
            navigate("/login")
        }
        setShowDropdown(false)
    }

    const handleDropdownToggle = () => {
        setShowDropdown((prev) => !prev)
    }

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowDropdown(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white text-gray-800 shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Brand/Logo (Unchanged as per request) */}
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-blue-500">TrackAdemy</Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center">
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <div className="py-1 flex justify-evenly items-center">
                                    <Link
                                        to="/courses"
                                        className="text-blue-600 hover:text-green-500 hover:underline block px-4 py-2 text-base font-bold"
                                    >
                                        Courses
                                    </Link>
                                    <Link
                                        to="/dashboard"
                                        className="text-blue-600 hover:text-green-500 hover:underline block px-4 py-2 text-base font-bold"
                                    >
                                        Dashboard
                                    </Link>
                                    {isLoggedIn && (localStorage.getItem("role") === "Instructor" || localStorage.getItem("role") === "Admin") ? (
                                        <Link
                                            to="/manage-courses"
                                            className="text-blue-600 hover:text-green-500 hover:underline block px-4 py-2 text-base font-bold"
                                        >
                                            Manage Courses
                                        </Link>
                                    ) : null}
                                    {isLoggedIn && localStorage.getItem("role") === "Admin" ? (
                                        <Link
                                            to="/admin-panel"
                                            className="text-blue-600 hover:text-green-500 hover:underline block px-4 py-2 text-base font-bold"
                                        >
                                            Admin Panel
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="md:block hidden">
                                <div className="ml-4 flex items-center md:ml-6 gap-6">
                                    {isLoggedIn ? (
                                        <div className="relative flex gap-3 items-center">
                                            <FaUserCircle
                                                onClick={handleDropdownToggle}
                                                className="text-3xl cursor-pointer text-green-800"
                                            />
                                            <span className="text-green-700 font-bold">{username || "User"}</span>
                                            {showDropdown && (
                                                <div
                                                    ref={dropdownRef}
                                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
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
                                                className="text-blue-600 hover:text-green-500 hover:underline block px-4 py-2 text-base font-bold"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to="/register"
                                                className="text-blue-600 hover:text-green-500 hover:underline block px-4 py-2 text-base font-bold"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <div className="-mr-2 flex md:hidden">
                                <button
                                    onClick={toggleNavbar}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-green-800 hover:text-gray-600 focus:outline-none"
                                >
                                    {isOpen ? (
                                        <svg
                                            className="h-6 w-6"
                                            stroke="#15803D"
                                            fill="#15803D"
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
                                            stroke="#15803D"
                                            fill="#15803D"
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
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/courses"
                            className="text-blue-600 hover:text-green-500 hover:underline block px-4 py-2 text-base font-bold"
                            onClick={() => setIsOpen(false)}
                        >
                            Courses
                        </Link>
                        <Link
                            to="/dashboard"
                            className="text-blue-600 hover:text-green-500 hover:underline block px-4 py-2 text-base font-bold"
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>
                        {isLoggedIn && (localStorage.getItem("role") === "Instructor" || localStorage.getItem("role") === "Admin") ? (
                            <Link
                                to="/manage-courses"
                                className="text-blue-600 hover:text-green-500 hover:underline block px-4 py-2 text-base font-bold"
                                onClick={() => setIsOpen(false)}
                            >
                                Manage Courses
                            </Link>
                        ) : null}
                        {isLoggedIn && localStorage.getItem("role") === "Admin" ? (
                            <Link
                                to="/admin-panel"
                                className="text-blue-600 hover:text-green-500 hover:underline block px-4 py-2 text-base font-bold"
                                onClick={() => setIsOpen(false)}
                            >
                                Admin Panel
                            </Link>
                        ) : null}
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-blue-600 hover:text-green-500 hover:underline block px-4 py-2 text-base font-bold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout()
                                        setIsOpen(false)
                                    }}
                                    className="text-blue-600 hover:text-green-500 hover:underline block px-4 py-2 text-base font-bold w-full text-left"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:text-green-500 hover:underline block px-4 py-2 text-base font-bold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-blue-600 hover:text-green-500 hover:underline block px-4 py-2 text-base font-bold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default UserNavbar