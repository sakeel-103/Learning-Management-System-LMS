import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// === import images ===
import pic1 from '../assets/pic1.jpg';
import pic2 from '../assets/pic2.jpg';
import pic3 from '../assets/pic3.jpg';
import banner from '../assets/banner.png';

import AdminDashboard from './../../Admin/components/AdminDashboard';
import JavaScriptPage from './../DevelopmentAndDS/JavaScriptPage';

const CourseCard = ({ course, section }) => {
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            className="relative bg-white text-gray-800 rounded-xl shadow-sm transform hover:-translate-y-1 transition-all duration-300 ease-in-out hover:shadow-md border border-gray-100 w-full"
            role="article"
            aria-labelledby={`course-title-${course.id}`}
        >
            <div className="h-40 rounded-t-xl overflow-hidden relative bg-gradient-to-r from-blue-400 to-green-800">
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2
                        id={`course-title-${course.id}`}
                        className="text-xl font-bold text-center p-4 text-white"
                    >
                        {course.title}
                    </h2>
                </div>
                {course.materialsCount && (
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                        <div className="flex items-center space-x-1">
                            <svg
                                className="w-4 h-4 text-indigo-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="text-xs font-medium text-gray-700">
                                {course.materialsCount.videos}
                            </span>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">{course.stats}</span>
                    <span className="text-sm text-yellow-400 font-semibold">
                        ★ {course.rating}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">{course.level}</p>
                    {course.duration && (
                        <p className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                            {course.duration}
                        </p>
                    )}
                </div>

                {course.schedule && course.schedule.sessions && (
                    <div className="flex items-center text-sm text-gray-600">
                        <svg
                            className="w-4 h-4 mr-1 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span>{course.schedule.sessions}</span>
                    </div>
                )}

                {course.instructor && (
                    <div className="flex items-center text-sm text-gray-600">
                        <svg
                            className="w-4 h-4 mr-1 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        <span>{course.instructor}</span>
                    </div>
                )}

                {course.prerequisites && (
                    <div>
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="text-indigo-600 text-xs flex items-center hover:underline focus:outline-none"
                            aria-expanded={showDetails}
                            aria-controls={`prerequisites-${course.id}`}
                        >
                            {showDetails ? 'Hide Details' : 'Show Prerequisites'}
                            <svg
                                className={`w-4 h-4 ml-1 transform ${showDetails ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {showDetails && (
                            <div
                                id={`prerequisites-${course.id}`}
                                className="mt-2 bg-gray-50 p-2 rounded text-sm"
                            >
                                <p className="font-medium text-xs text-gray-700 mb-1">
                                    Prerequisites:
                                </p>
                                <ul className="list-disc ml-4 text-xs text-gray-600">
                                    {course.prerequisites.map((prereq, idx) => (
                                        <li key={idx}>{prereq}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                <button
                    onClick={() => {
                        if (section === 'top-picks') {
                            if (course.id === '1') {
                                console.log('Navigating to DSA Page for Top Picks');
                                navigate('/courses/dsa-to-development');
                            } else if (course.id === '2') {
                                console.log('Navigating to Java Backend Development Page for Top Picks');
                                navigate('/courses/backend-with-java');
                            } else if (course.id === '3') {
                                console.log('Navigating to Machine Learning & Data Science Page for Top Picks');
                                navigate('/courses/machine-learning');
                            } else if (course.id === '4') {
                                console.log('Navigating to Data Structures Self-Paced Page for Top Picks');
                                navigate('/courses/data-structure-algorithms');
                            }
                        } else if (section === 'live-classes') {
                            if (course.id === '1') {
                                console.log('Navigating to DSA Page for Top Picks');
                                navigate('/courses/dsa-to-development');
                            } else if (course.id === '2') {
                                console.log('Navigating to Java Backend Development Page for Live Classes');
                                navigate('/courses/backend-with-java');
                            } else if (course.id === '3') {
                                console.log('Navigating to Machine Learning & Data Science Page for Live Classes');
                                navigate('/courses/machine-learning');
                            }
                        } else if (section === 'self-paced') {
                            if (course.id === '4') {
                                console.log('Navigating to Data Structures Self-Paced Page for Self-paced Learning');
                                navigate('/courses/data-structure-algorithms');
                            }
                        } else {
                            console.log(`Navigating to default course page: /course/${course.id}`);
                            navigate(`/course/${course.id}`);
                        }
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-md"
                    aria-label={`Enroll in ${course.title}`}
                >
                    Explore Course
                </button>
            </div>
        </div>
    );
};

CourseCard.propTypes = {
    course: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        stats: PropTypes.string.isRequired,
        rating: PropTypes.string.isRequired,
        level: PropTypes.string.isRequired,
        duration: PropTypes.string,
        schedule: PropTypes.object,
        instructor: PropTypes.string,
        prerequisites: PropTypes.arrayOf(PropTypes.string),
        materialsCount: PropTypes.shape({
            videos: PropTypes.number,
            pdfs: PropTypes.number,
            presentations: PropTypes.number,
            notes: PropTypes.number,
        }),
    }).isRequired,
    section: PropTypes.string,
};

const CoursePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [isInstructorView, setIsInstructorView] = useState(false);
    const [activeTab, setActiveTab] = useState('browse');
    const navigate = useNavigate();

    //  === Tagline Section Texts ===
    const taglines = [
        'Elevate your skills with immersive learning',
        'Master coding with expert-led courses',
        'Unlock your potential with TrackAdemy',
    ];
    const [currentTagline, setCurrentTagline] = useState(0);

    const categories = [
        'All',
        'Data Structures',
        'Web Development',
        'Machine Learning',
        'Mobile Development',
        'Cloud Computing',
    ];

    const courses = useMemo(() => [
        {
            id: '1',
            title: 'Full Stack Development: A Complete Guide',
            stats: '1k+ Interested Users',
            rating: '4.4',
            level: 'Beginner to Advanced',
            duration: '3 Months',
            category: 'Data Structures',
            prerequisites: ['Basic Programming', 'Computer Science Fundamentals'],
            schedule: {
                startDate: '2025-06-01',
                endDate: '2025-09-01',
                sessions: 'Mon, Wed (7PM-9PM)',
                type: 'Live',
            },
            materialsCount: {
                videos: 10,
                pdfs: 10,
                presentations: 8,
                notes: 18,
            },
            instructor: 'Shradha Khapra',
        },
        {
            id: '2',
            title: 'JAVA Backend Development: Complete Course',
            stats: '3k+ Interested Users',
            rating: '4.7',
            level: 'Intermediate to Advanced',
            duration: '4 Months',
            category: 'Web Development',
            prerequisites: ['Basic Java', 'OOP Concepts'],
            schedule: {
                startDate: '2025-07-01',
                endDate: '2025-11-01',
                sessions: 'Tue, Thu (6PM-8PM)',
                type: 'Live',
            },
            materialsCount: {
                videos: 10,
                pdfs: 8,
                presentations: 5,
                notes: 8,
            },
            instructor: 'Aman Dhatarwal',
        },
        {
            id: '3',
            title: 'Complete Machine Learning & Data Science Program',
            stats: '1.5k+ Interested Users',
            rating: '4.7',
            level: 'Beginner to Advanced',
            duration: '6 Months',
            category: 'Machine Learning',
            prerequisites: ['Python Basics', 'Statistics'],
            schedule: {
                startDate: '2025-06-15',
                endDate: '2025-12-15',
                sessions: 'Sat, Sun (10AM-1PM)',
                type: 'Live',
            },
            materialsCount: {
                videos: 4,
                pdfs: 5,
                presentations: 5,
                notes: 5,
            },
            instructor: 'Love Babbar',
        },
        {
            id: '4',
            title: 'Data Structures and Algorithms - Self Paced',
            stats: '1k+ Interested Users',
            rating: '4.7',
            level: 'Beginner to Advanced',
            duration: '2 Months',
            category: 'Data Structures',
            prerequisites: ['Programming Fundamentals'],
            schedule: {
                type: 'Self-paced',
                accessPeriod: '6 Months',
            },
            materialsCount: {
                videos: 2,
                pdfs: 1,
                presentations: 5,
                notes: 2,
            },
            instructor: 'Code With Harry',
        },
    ], []);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        const taglineInterval = setInterval(() => {
            setCurrentTagline((prev) => (prev + 1) % taglines.length);
        }, 5000);
        return () => {
            clearTimeout(timer);
            clearInterval(taglineInterval);
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    const resetSearch = () => {
        setSearchQuery('');
    };

    const filteredCourses = useMemo(() => {
        return selectedCategory === 'All'
            ? courses
            : courses.filter((course) => course.category === selectedCategory);
    }, [selectedCategory, courses]);

    const liveCourses = useMemo(() => {
        return filteredCourses.filter(
            (course) => course.schedule && course.schedule.type === 'Live',
        );
    }, [filteredCourses]);

    const selfPacedCourses = useMemo(() => {
        return filteredCourses.filter(
            (course) => course.schedule && course.schedule.type === 'Self-paced',
        );
    }, [filteredCourses]);

    // === Testimonials Section ===
    const testimonials = [
        {
            initials: "JS",
            name: "A k Singh",
            role: "Software Engineer at Tech Co.",
            quote: "The DSA course helped me crack interviews at top tech companies. The structured approach and practice problems were exactly what I needed.",
            color: "green",
            img: pic1
        },
        {
            initials: "AP",
            name: "Anjali Patel",
            role: "Full Stack Developer",
            quote: "I transitioned from a non-tech role to development after completing the Web Development course. The hands-on projects were invaluable.",
            color: "blue",
            img: pic2
        },
        {
            initials: "RK",
            name: "Raj Kumar",
            role: "Data Scientist",
            quote: "The Machine Learning course provided a perfect balance of theory and practical implementation. I'm now confidently building ML models for my company.",
            color: "purple",
            img: pic3
        }
    ];

    // Handler for assessment button
    const handleStartAssessment = () => {
        navigate('/assessment');
    };

    return (
        <>
            <style>
                {`
                    @media (max-width: 640px) {
                        .no-horizontal-scroll {
                            overflow-x: hidden !important;
                        }
                        .category-buttons {
                            display: flex;
                            flex-wrap: wrap;
                            overflow-x: auto;
                            scrollbar-width: none; /* Firefox */
                            -ms-overflow-style: none; /* IE and Edge */
                        }
                        .category-buttons::-webkit-scrollbar {
                            display: none; /* Chrome, Safari, and Opera */
                        }
                    }
                `}
            </style>
            <div className="min-h-screen bg-gray-50 text-gray-800 pt-16 w-full overflow-x-hidden">
                {/* Header Section */}
                <div
                    className="py-12 px-4 sm:px-6 text-center relative shadow-sm bg-gradient-to-br from-gray-50 to-white no-horizontal-scroll"
                >
                    {/* Main body content starts */}
                    <div className="relative max-w-7xl mx-auto w-full">
                        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>
                        <div className="flex flex-col items-center gap-6">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                    {isInstructorView
                                        ? 'Course Management Dashboard'
                                        : 'Discover TrackAdemy Courses'}
                                </span>
                            </h1>
                        </div>
                        <p className="text-sm sm:text-md mt-3 text-gray-600 max-w-2xl mx-auto transition-opacity duration-1000">
                            {taglines[currentTagline]}
                        </p>

                        {isInstructorView ? (
                            <div className="mt-6 flex justify-center gap-4">
                                <button
                                    onClick={() => navigate('/instructor/create-course')}
                                    className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-md flex items-center gap-2"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    Create New Course
                                </button>
                                <button
                                    onClick={() => setActiveTab('browse')}
                                    className="bg-white text-indigo-600 border border-gray-100 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all shadow-md flex items-center gap-2"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                    Manage Existing Courses
                                </button>
                            </div>
                        ) : (
                            <div className="mt-6 flex justify-center">
                                <form
                                    onSubmit={handleSearch}
                                    className="relative w-full max-w-lg flex items-center"
                                    role="search"
                                >
                                    <input
                                        type="text"
                                        placeholder="Search for your next course..."
                                        className="bg-white text-gray-800 placeholder-gray-400 p-4 pr-20 rounded-lg w-full border border-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        aria-label="Search courses"
                                    />
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
                                        {searchQuery && (
                                            <button
                                                type="button"
                                                onClick={resetSearch}
                                                className="text-gray-600 hover:text-gray-800"
                                                aria-label="Clear search"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                        <button
                                            type="submit"
                                            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                                            aria-label="Submit search"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Instructor toggle button */}
                    <button
                        onClick={() => setIsInstructorView(!isInstructorView)}
                        className="absolute top-6 sm:top-12 right-2 sm:right-6 px-3 py-1 sm:px-4 sm:py-2 bg-white text-indigo-700 border border-gray-100 rounded-lg shadow-md hover:bg-gray-100 transition-all flex items-center gap-2 text-sm sm:text-base"
                        aria-label={
                            isInstructorView ? 'Switch to Student View' : 'Switch to Instructor View'
                        }
                    >
                        <svg
                            className="w-4 sm:w-5 h-4 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    isInstructorView
                                        ? 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                                        : 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13 районC4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253'
                                }
                            />
                        </svg>
                        {isInstructorView ? 'Student View' : 'Instructor View'}
                    </button>
                </div>

                {/* Main Content body starts */}
                <div className="px-2 sm:px-6 py-8 max-w-7xl mx-auto w-full no-horizontal-scroll">
                    {isInstructorView ? (
                        <div>

                            {/* Instructor Tabs */}
                            <div className="bg-white rounded-xl p-4 shadow-sm mb-8 border border-gray-100">
                                <div className="flex flex-wrap border-b border-gray-100">
                                    {[
                                        { tab: 'browse', label: 'Browse Courses' },
                                        { tab: 'create', label: 'Create/Edit' },
                                        { tab: 'upload', label: 'Upload Materials' },
                                        { tab: 'schedule', label: 'Schedule & Prerequisites' },
                                    ].map(({ tab, label }) => (
                                        <button
                                            key={tab}
                                            className={`px-3 py-2 font-medium flex items-center gap-2 text-sm sm:text-base ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                                                }`}
                                            onClick={() => setActiveTab(tab)}
                                            aria-current={activeTab === tab ? 'true' : 'false'}
                                        >
                                            {tab === 'browse' && (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                    />
                                                </svg>
                                            )}
                                            {tab === 'create' && (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                </svg>
                                            )}
                                            {tab === 'upload' && (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                                    />
                                                </svg>
                                            )}
                                            {tab === 'schedule' && (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            )}
                                            {label}
                                        </button>
                                    ))}
                                </div>

                                {/* Part-1 */}
                                {activeTab === 'browse' && (
                                    <div className="py-4">
                                        <h3 className="text-lg font-medium mb-4 text-gray-800">Your Current Courses</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                            {courses.map((course) => (
                                                <div
                                                    key={course.id}
                                                    className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-indigo-50 transition-colors w-full"
                                                >
                                                    <div className="mb-2 sm:mb-0">
                                                        <h4 className="font-medium text-sm sm:text-base text-gray-800">{course.title}</h4>
                                                        <p className="text-xs sm:text-sm text-gray-600">
                                                            {course.duration} • {course.category}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => navigate(`/instructor/edit-course/${course.id}`)}
                                                            className="p-2 text-indigo-600 hover:bg-indigo-100 rounded"
                                                            aria-label={`Edit ${course.title}`}
                                                            title="Edit Course"
                                                        >
                                                            <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => alert(`Delete ${course.title}?`)}
                                                            className="p-2 text-red-600 hover:bg-red-100 rounded"
                                                            aria-label={`Delete ${course.title}`}
                                                            title="Delete Course"
                                                        >
                                                            <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Part-2 */}
                                {activeTab === 'create' && (
                                    <div className="py-4">
                                        <h3 className="text-lg font-medium mb-4 text-gray-800">Create or Edit Course</h3>
                                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                    placeholder="Enter course title"
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                                    <select
                                                        className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                        required
                                                    >
                                                        {categories
                                                            .filter((cat) => cat !== 'All')
                                                            .map((category) => (
                                                                <option key={category} value={category}>
                                                                    {category}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
                                                    <select
                                                        className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                        required
                                                    >
                                                        <option>Beginner</option>
                                                        <option>Intermediate</option>
                                                        <option>Advanced</option>
                                                        <option>Beginner to Intermediate</option>
                                                        <option>Intermediate to Advanced</option>
                                                        <option>Beginner to Advanced</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                                    <input
                                                        type="text"
                                                        className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                        placeholder="e.g. 3 Months"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                                                    <input
                                                        type="text"
                                                        className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                        placeholder="Instructor name"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Course Description</label>
                                                <textarea
                                                    className="w-full p-2 border border-gray-100 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                    placeholder="Enter detailed course description"
                                                    required
                                                ></textarea>
                                            </div>
                                            <div className="flex flex-col sm:flex-row justify-end gap-2">
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 w-full sm:w-auto shadow-md"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 w-full sm:w-auto shadow-md"
                                                >
                                                    Save Course
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {/* Part-3 */}
                                {activeTab === 'upload' && (
                                    <div className="py-4">
                                        <h3 className="text-lg font-medium mb-4 text-gray-800">Upload Course Materials</h3>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
                                            <select
                                                className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                required
                                            >
                                                {courses.map((course) => (
                                                    <option key={course.id} value={course.id}>
                                                        {course.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
                                            <label className="text-center p-3 border-2 border-dashed border-gray-100 rounded-lg hover:border-indigo-500 cursor-pointer transition-colors">
                                                <input type="file" className="hidden" accept="video/*" />
                                                <div className="text-indigo-600 mb-1">
                                                    <svg className="w-6 sm:w-8 h-6 sm:h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className="font-medium text-sm sm:text-base text-gray-800">Video Lectures</p>
                                                <p className="text-xs text-gray-600">MP4, MOV, Max 2GB</p>
                                            </label>
                                            <label className="text-center p-3 border-2 border-dashed border-gray-100 rounded-lg hover:border-indigo-500 cursor-pointer transition-colors">
                                                <input type="file" className="hidden" accept=".pdf" />
                                                <div className="text-indigo-600 mb-1">
                                                    <svg className="w-6 sm:w-8 h-6 sm:h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className="font-medium text-sm sm:text-base text-gray-800">PDF Documents</p>
                                                <p className="text-xs text-gray-600">PDF, Max 50MB</p>
                                            </label>
                                            <label className="text-center p-3 border-2 border-dashed border-gray-100 rounded-lg hover:border-indigo-500 cursor-pointer transition-colors">
                                                <input type="file" className="hidden" accept=".ppt,.pptx" />
                                                <div className="text-indigo-600 mb-1">
                                                    <svg className="w-6 sm:w-8 h-6 sm:h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className="font-medium text-sm sm:text-base text-gray-800">Presentations</p>
                                                <p className="text-xs text-gray-600">PPT, PPTX, Max 50MB</p>
                                            </label>
                                            <label className="text-center p-3 border-2 border-dashed border-gray-100 rounded-lg hover:border-indigo-500 cursor-pointer transition-colors">
                                                <input type="file" className="hidden" accept=".doc,.docx,.txt" />
                                                <div className="text-indigo-600 mb-1">
                                                    <svg className="w-6 sm:w-8 h-6 sm:h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className="font-medium text-sm sm:text-base text-gray-800">Notes</p>
                                                <p className="text-xs text-gray-600">DOC, DOCX, TXT, Max 20MB</p>
                                            </label>
                                        </div>
                                        <div className="mt-4">
                                            <h4 className="font-medium mb-2 text-gray-800">Uploaded Materials</h4>
                                        </div>
                                    </div>
                                )}

                                {/* Part-4 */}
                                {activeTab === 'schedule' && (
                                    <div className="py-4">
                                        <h3 className="text-lg font-medium mb-4 text-gray-800">Course Schedule & Prerequisites</h3>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
                                            <select
                                                className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                required
                                            >
                                                {courses.map((course) => (
                                                    <option key={course.id} value={course.id}>
                                                        {course.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                            <div>
                                                <h4 className="font-medium mb-2 text-gray-800">Schedule Settings</h4>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-sm text-gray-700 mb-1">Course Type</label>
                                                        <div className="flex flex-wrap gap-4">
                                                            <label className="flex items-center">
                                                                <input
                                                                    type="radio"
                                                                    name="courseType"
                                                                    className="mr-1 focus:ring-indigo-500"
                                                                    defaultChecked
                                                                />
                                                                <span className="text-gray-700">Live Sessions</span>
                                                            </label>
                                                            <label className="flex items-center">
                                                                <input type="radio" name="courseType" className="mr-1 focus:ring-indigo-500" />
                                                                <span className="text-gray-700">Self-paced</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                                                        <div>
                                                            <label className="block text-sm text-gray-700 mb-1">Start Date</label>
                                                            <input
                                                                type="date"
                                                                className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm text-gray-700 mb-1">End Date</label>
                                                            <input
                                                                type="date"
                                                                className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm text-gray-700 mb-1">Session Days & Time</label>
                                                        <input
                                                            type="text"
                                                            className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                            placeholder="e.g. Mon, Wed (7PM-9PM)"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm text-gray-700 mb-1">Duration</label>
                                                        <input
                                                            type="text"
                                                            className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                            placeholder="e.g. 3 Months"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-2 text-gray-800">Prerequisites</h4>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-sm text-gray-700 mb-1">Add Prerequisite</label>
                                                        <div className="flex flex-col sm:flex-row gap-2">
                                                            <input
                                                                type="text"
                                                                className="flex-1 p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                                placeholder="e.g. Basic Programming"
                                                            />
                                                            <button className="p-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 w-full sm:w-auto shadow-md">
                                                                Add
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-6">
                                            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 w-full sm:w-auto shadow-md">
                                                Save Settings
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Category Filters */}
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                                    Explore by Category
                                </h2>
                                <div className="flex flex-wrap gap-3 mb-8 w-full category-buttons">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-1 shadow-sm ${selectedCategory === category
                                                ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md'
                                                : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-100'
                                                }`}
                                            aria-current={selectedCategory === category ? 'true' : 'false'}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>

                                {/* Featured Courses Section */}
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            Top Picks for You
                                        </h2>
                                        <button
                                            onClick={() => navigate('/courses')}
                                            className="text-gray-600 border border-gray-100 rounded-lg px-4 py-1 text-sm font-medium hover:bg-gray-100 transition-all duration-200 shadow-sm"
                                        >
                                            See All Courses ➔
                                        </button>
                                    </div>
                                    {isLoading ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full no-horizontal-scroll">
                                            {[...Array(4)].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-white rounded-xl p-5 animate-pulse shadow-sm w-full"
                                                >
                                                    <div className="h-40 bg-gray-200 rounded-t-xl mb-4"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : filteredCourses.length === 0 ? (
                                        <div className="text-center text-gray-600 py-12">
                                            <p className="text-lg">No courses found for this category.</p>
                                            <button
                                                onClick={() => setSelectedCategory('All')}
                                                className="text-gray-600 border border-gray-100 rounded-lg px-4 py-1 text-sm font-medium hover:bg-gray-100 transition-all duration-200 shadow-sm"
                                            >
                                                View All Courses
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full no-horizontal-scroll">
                                            {filteredCourses.map((course) => (
                                                <CourseCard key={course.id} course={course} section="top-picks" />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Live Classes Section */}
                                <div className="mt-12">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            Live Classes
                                        </h2>
                                        <button
                                            onClick={() => navigate('/courses')}
                                            className="text-gray-600 border border-gray-100 rounded-lg px-4 py-1 text-sm font-medium hover:bg-gray-100 transition-all duration-200 shadow-sm"
                                        >
                                            See All Courses ➔
                                        </button>
                                    </div>
                                    {liveCourses.length === 0 ? (
                                        <div className="text-center text-gray-600 py-12">
                                            <p className="text-lg">
                                                No live classes available for this category.
                                            </p>
                                            <button
                                                onClick={() => setSelectedCategory('All')}
                                                className="text-gray-600 border border-gray-100 rounded-lg px-4 py-1 text-sm font-medium hover:bg-gray-100 transition-all duration-200 shadow-sm"
                                            >
                                                View All Courses
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full no-horizontal-scroll">
                                            {liveCourses.map((course) => (
                                                <CourseCard key={course.id} course={course} section="live-classes" />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Self-paced Courses */}
                                <div className="mt-12">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            Self-paced Learning
                                        </h2>
                                        <button
                                            onClick={() => navigate('/courses')}
                                            className="text-gray-600 border border-gray-100 rounded-lg px-4 py-1 text-sm font-medium hover:bg-gray-100 transition-all duration-200 shadow-sm"
                                        >
                                            See All Courses ➔
                                        </button>
                                    </div>
                                    {selfPacedCourses.length === 0 ? (
                                        <div className="text-center text-gray-600 py-12">
                                            <p className="text-lg">
                                                No self-paced courses available for this category.
                                            </p>
                                            <button
                                                onClick={() => setSelectedCategory('All')}
                                                className="text-gray-600 border border-gray-100 rounded-lg px-4 py-1 text-sm font-medium hover:bg-gray-100 transition-all duration-200 shadow-sm"
                                            >
                                                View All Courses
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full no-horizontal-scroll">
                                            {selfPacedCourses.map((course) => (
                                                <CourseCard key={course.id} course={course} section="self-paced" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Banner Section */}
                            <div className="mt-16 mb-8">
                                <div
                                    className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-2xl shadow-2xl overflow-hidden bg-cover bg-center w-full"
                                    style={{
                                        backgroundImage: `url(${banner})`,
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black/40"></div>
                                    <div className="relative z-10 text-center">
                                        <h2
                                            className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight animate-[fadeInUp_0.6s_ease-out]"
                                        >
                                            Join Our Community of Learners
                                        </h2>
                                        <p
                                            className="text-lg md:text-xl mb-6 max-w-md mx-auto font-light animate-[fadeInUp_0.6s_ease-out_0.2s] animate-delay-200"
                                        >
                                            Enroll in our courses and start your learning journey today!
                                        </p>
                                        <button
                                            onClick={() => navigate('/courses')}
                                            className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md animate-[fadeInUp_0.6s_ease-out_0.4s]"
                                        >
                                            Explore Courses ➔
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Development Sections */}
                            <div className="mb-16 mt-16">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">Development/Data Science</h2>
                                    <a href="#" className="text-gray-600 border border-gray-300 rounded-full px-4 py-1 text-sm font-medium hover:bg-gray-100 transition-all duration-200">See All</a>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <a href="/dvelopmentAndDS/javascriptPage" className="bg-green-100 text-green-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-green-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        JavaScript <span>→</span>
                                    </a>
                                    <a href="/DevelopmentAndDS/htmlPage" className="bg-blue-100 text-blue-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-blue-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        HTML <span>→</span>
                                    </a>
                                    <a href="/devlopmentAndDS/cssPage" className="bg-purple-100 text-purple-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-purple-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        CSS <span>→</span>
                                    </a>
                                    <a href="/DevelopmentAndDS/reactJsPage" className="bg-yellow-100 text-yellow-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-yellow-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        ReactJS <span>→</span>
                                    </a>
                                    <a href="/DevelopmentAndDS/nodeJsPage" className="bg-red-100 text-red-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-red-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        Node.js <span>→</span>
                                    </a>
                                    <a href="/DevelopmentAndDS/djangoPage" className="bg-indigo-100 text-indigo-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-indigo-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        Django <span>→</span>
                                    </a>
                                    <a href="/DevelopmentAndDS/frontendPage" className="bg-teal-100 text-teal-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-teal-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        Frontend Develop... <span>→</span>
                                    </a>
                                    <a href="/dvelopmentAndDS/backendPage" className="bg-orange-100 text-orange-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-orange-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        Backend Developm... <span>→</span>
                                    </a>
                                </div>
                            </div>

                            {/* AI, ML & Data Science Section */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">AI, ML & Data Science</h2>
                                    <a href="#" className="text-gray-600 border border-gray-300 rounded-full px-4 py-1 text-sm font-medium hover:bg-gray-100 transition-all duration-200">See All</a>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <a href="/AIMLDS/MachineLearningPage" className="bg-green-100 text-green-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-green-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        Machine Learning <span>→</span>
                                    </a>
                                    <a href="/AIMLDS/DataSciencePage"
                                        className="bg-blue-100 text-blue-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-blue-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        Data Science <span>→</span>
                                    </a>
                                    <a href="/AIMLDS/DataAnalysisPage" className="bg-purple-100 text-purple-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-purple-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        Data Analysis <span>→</span>
                                    </a>
                                    <a href="../AIMLDS/DataVisualizationPage" className="bg-yellow-100 text-yellow-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-yellow-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        Data Visualization <span>→</span>
                                    </a>
                                    <a href="../AIMLDS/DeepLearningPage" className="bg-red-100 text-red-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-red-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        Deep Learning <span>→</span>
                                    </a>
                                    <a href="../AIMLDS/NaturalLanguagePage" className="bg-indigo-100 text-indigo-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-indigo-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        Natural Language (NLP) <span>→</span>
                                    </a>
                                    <a href="/ALMLDS/ComputerVissionPage" className="bg-teal-100 text-teal-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-teal-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        Computer Vission <span>→</span>
                                    </a>
                                    <a href="/AIMLDS/ArtificialInteligencePage" className="bg-orange-100 text-orange-800 py-3 px-6 rounded-lg flex justify-between items-center hover:bg-orange-50 hover:scale-105 transition-all duration-300 ease-in-out">
                                        Artificial Intelligence (AI) <span>→</span>
                                    </a>
                                </div>
                            </div>

                            {/* Testimonials Section */}
                            <div className="mt-16 w-full no-horizontal-scroll">
                                <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
                                    Student Success Stories
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                                    {testimonials.map((testimonial, index) => (
                                        <div
                                            key={index}
                                            className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl shadow-sm transform hover:-translate-y-1 transition-all duration-300 ease-in-out hover:shadow-md border border-gray-100 relative overflow-hidden w-full"
                                        >
                                            <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-${testimonial.color}-100 opacity-70`}></div>
                                            <div className="flex flex-col sm:flex-row items-center mb-6">
                                                <div className="w-full sm:w-1/2 flex items-center justify-center">
                                                    <img
                                                        src={testimonial.img}
                                                        alt={`${testimonial.name}'s avatar`}
                                                        className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-${testimonial.color}-200 shadow-sm`}
                                                    />
                                                </div>
                                                <div className="w-full sm:w-1/2 flex flex-col justify-center sm:ml-4 mt-4 sm:mt-0">
                                                    <h3 className="font-semibold text-lg text-center sm:text-left text-gray-800">{testimonial.name}</h3>
                                                    <p className="text-sm text-gray-600 text-center sm:text-left">{testimonial.role}</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 italic relative z-10 mb-4">
                                                "{testimonial.quote}"
                                            </p>
                                            <div className="mt-4 text-yellow-400 flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className="text-lg">★</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Assessment POrtal */}
                            <section className="bg-gradient-to-r from-blue-100 to-green-100 py-10">
                                <div className="container mx-auto text-center">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                        Ready to Test Your Knowledge?
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-6">
                                        Dive into our interactive assessment portal and challenge yourself!
                                    </p>
                                    <button
                                        onClick={() => navigate('/courses/AssesmentPage')}
                                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                                    >
                                        Start Assessment
                                    </button>
                                </div>
                            </section>


                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CoursePage;