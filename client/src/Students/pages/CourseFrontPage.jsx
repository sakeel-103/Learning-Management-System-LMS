import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const courses = [
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
        materialsCount: { videos: 10, pdfs: 10, presentations: 8, notes: 18 },
        instructor: 'Shradha Khapra',
        price: '₹999',
        thumbnail: 'https://via.placeholder.com/600x400',
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
        materialsCount: { videos: 10, pdfs: 8, presentations: 5, notes: 8 },
        instructor: 'Aman Dhatarwal',
        price: '₹1499',
        thumbnail: 'https://via.placeholder.com/600x400',
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
        materialsCount: { videos: 4, pdfs: 5, presentations: 5, notes: 5 },
        instructor: 'Love Babbar',
        price: '₹1999',
        thumbnail: 'https://via.placeholder.com/600x400',
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
        schedule: { type: 'Self-paced', accessPeriod: '6 Months' },
        materialsCount: { videos: 2, pdfs: 1, presentations: 5, notes: 2 },
        instructor: 'Code With Harry',
        price: '₹799',
        thumbnail: 'https://via.placeholder.com/600x400',
    },
];

const BuyCourse = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const navigate = useNavigate();

    const categories = [
        'All',
        'Data Structures',
        'Web Development',
        'Machine Learning',
        'Mobile Development',
        'Cloud Computing',
    ];

    const filteredCourses = selectedCategory === 'All'
        ? courses
        : courses.filter((course) => course.category === selectedCategory);

    const handlePurchase = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
    };

    const confirmPurchase = () => {
        setIsModalOpen(false);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 pt-16 w-full overflow-x-hidden">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 w-full">
                {/* Breadcrumb */}
                <div className="mb-6">
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                            Buy a Course
                        </span>
                    </h1>
                    <p className="text-sm sm:text-md mt-3 text-gray-600 max-w-2xl">
                        Unlock your potential with TrackAdemy’s expert-led courses.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Filter by Category
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-1 shadow-sm ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-100'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Course List */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Available Courses
                    </h2>
                    {filteredCourses.length === 0 ? (
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="relative bg-white text-gray-800 rounded-xl shadow-sm transform hover:-translate-y-1 transition-all duration-300 ease-in-out hover:shadow-md border border-gray-100"
                                >
                                    <div className="h-40 rounded-t-xl overflow-hidden relative bg-gradient-to-r from-blue-400 to-green-800">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
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
                                    </div>
                                    <div className="p-5 space-y-3">
                                        <h3 className="text-lg font-bold text-gray-800">{course.title}</h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-600">{course.stats}</span>
                                            <span className="text-sm text-yellow-400 font-semibold">
                                                ★ {course.rating}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-600">{course.level}</p>
                                            <p className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                                                {course.duration}
                                            </p>
                                        </div>
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
                                        <p className="text-lg font-semibold text-gray-800">Price: {course.price}</p>
                                        <button
                                            onClick={() => handlePurchase(course)}
                                            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-md"
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-md border border-gray-100">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-800">Purchase Confirmation</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800"
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
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                            Thank you for purchasing{' '}
                            <span className="font-semibold">{selectedCourse.title}</span>!
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                            You can now start your learning journey.
                        </p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                View Dashboard
                            </button>
                            <button
                                onClick={confirmPurchase}
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700"
                            >
                                Go to Course
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyCourse;