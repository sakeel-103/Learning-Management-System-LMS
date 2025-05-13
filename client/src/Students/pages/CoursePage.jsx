import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CourseCard = ({ course }) => {
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            className="relative bg-white text-gray-800 rounded-lg shadow-sm transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg"
            role="article"
            aria-labelledby={`course-title-${course.id}`}
        >
            <div className="h-40 rounded-t-lg overflow-hidden relative bg-gradient-to-r from-blue-500 to-blue-600">
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
                                className="w-4 h-4 text-blue-600"
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
                    <span className="text-xs text-gray-500">{course.stats}</span>
                    <span className="text-sm text-yellow-500 font-semibold">
                        ★ {course.rating}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">{course.level}</p>
                    {course.duration && (
                        <p className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {course.duration}
                        </p>
                    )}
                </div>

                {course.schedule && course.schedule.sessions && (
                    <div className="flex items-center text-sm text-gray-600">
                        <svg
                            className="w-4 h-4 mr-1 text-gray-500"
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
                            className="w-4 h-4 mr-1 text-gray-500"
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
                            className="text-blue-600 text-xs flex items-center hover:underline focus:outline-none"
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
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
                    aria-label={`Enroll in ${course.title}`}
                >
                    Explore Course
                </button>
            </div>
        </div>
    );
};

const CoursePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
            title: 'DSA to Development: A Complete Guide',
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
            title: 'JAVA Backend Development - LIVE',
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

    const filteredCourses = selectedCategory === 'All'
        ? courses
        : courses.filter((course) => course.category === selectedCategory);

    // === Testimonials Section ===
    const testimonials = [
        {
            initials: "JS",
            name: "John Smith",
            role: "Software Engineer at Tech Co.",
            quote: "The DSA course helped me crack interviews at top tech companies. The structured approach and practice problems were exactly what I needed.",
            color: "blue"
        },
        {
            initials: "AP",
            name: "Anjali Patel",
            role: "Full Stack Developer",
            quote: "I transitioned from a non-tech role to development after completing the Web Development course. The hands-on projects were invaluable.",
            color: "purple"
        },
        {
            initials: "RK",
            name: "Raj Kumar",
            role: "Data Scientist",
            quote: "The Machine Learning course provided a perfect balance of theory and practical implementation. I'm now confidently building ML models for my company.",
            color: "green"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-500 to-gray-50 text-gray-400 pt-16 ">

            {/* Header Section */}
            <div className="bg-white py-12 px-6 text-center relative shadow-sm">
                <h1 className="text-4xl font-bold tracking-tight text-gray-600">
                    Discover TrackAdemy Courses
                </h1>
                <p className="text-md mt-3 text-gray-600 max-w-2xl mx-auto transition-opacity duration-1000">
                    {taglines[currentTagline]}
                </p>
                <div className="mt-6 flex justify-center">
                    <form
                        onSubmit={handleSearch}
                        className="relative w-full max-w-lg flex items-center"
                        role="search"
                    >
                        <input
                            type="text"
                            placeholder="Search for your next course..."
                            className="bg-white text-gray-800 placeholder-gray-400 p-4 pr-20 rounded-md w-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search courses"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={resetSearch}
                                    className="text-gray-500 hover:text-gray-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                            <button type="submit" className="text-blue-500 hover:text-blue-600 transition-colors duration-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Category Filters */}
            <div className="px-6 py-8 max-w-7xl mx-auto ">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Explore by Category</h2>
                <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 ${selectedCategory === category
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Featured Courses Section */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Top Picks for You</h2>
                        <button
                            onClick={() => navigate('/courses')}
                            className="text-gray-600 hover:text-green-700 font-medium"
                        >
                            See All Courses ➔
                        </button>
                    </div>
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="bg-white rounded-lg p-5 animate-pulse">
                                    <div className="h-36 bg-gray-200 rounded-md mb-4"></div>
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
                                className="mt-4 text-blue-600 hover:text-blue-700 underline"
                            >
                                View All Courses
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Classroom Courses */}
                <div className="mt-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Classroom Courses</h2>
                        <button
                            onClick={() => navigate('/courses')}
                            className="text-gray-600 hover:text-green-700 font-medium"
                        >
                            See All Courses ➔
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>

                {/* Live Classes of Each Course */}
                <div className="mt-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Live Classes</h2>
                        <button
                            onClick={() => navigate('/courses')}
                            className="text-gray-600 hover:text-green-700 font-medium"
                        >
                            See All Courses ➔
                        </button>
                    </div>
                    {filteredCourses.filter(course => course.schedule && course.schedule.type === 'Live').length === 0 ? (
                        <div className="text-center text-gray-600 py-12">
                            <p className="text-lg">No live classes available for this category.</p>
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className="mt-4 text-blue-600 hover:text-blue-700 underline"
                            >
                                View All Courses
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredCourses
                                .filter(course => course.schedule && course.schedule.type === 'Live')
                                .map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                        </div>
                    )}
                </div>

                {/* Offline Classes with Recorded Videos */}
                <div className="mt-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Offline Classes with Recorded Videos</h2>
                        <button
                            onClick={() => navigate('/courses')}
                            className="text-gray-600 hover:text-green-700 font-medium"
                        >
                            See All Courses ➔
                        </button>
                    </div>
                    {filteredCourses.filter(course => course.schedule && course.schedule.type === 'Self-paced').length === 0 ? (
                        <div className="text-center text-gray-600 py-12">
                            <p className="text-lg">No self-paced courses available for this category.</p>
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className="mt-4 text-blue-600 hover:text-blue-700 underline"
                            >
                                View All Courses
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredCourses
                                .filter(course => course.schedule && course.schedule.type === 'Self-paced')
                                .map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                        </div>
                    )}
                </div>

                {/* Testimonials Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
                        Student Success Stories
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg border border-gray-100 relative overflow-hidden"
                            >
                                <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-${testimonial.color}-50 opacity-70`}></div>
                                <div className="absolute top-4 right-4">
                                    <svg
                                        className={`w-6 h-6 text-${testimonial.color}-300 opacity-50`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12h.01M9 16h.01M9 8h.01M15 12h.01M15 16h.01M15 8h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex items-center mb-6">
                                    <div className={`w-14 h-14 rounded-full bg-${testimonial.color}-100 flex items-center justify-center text-${testimonial.color}-600 font-bold text-lg shadow-sm`}>
                                        {testimonial.initials}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {testimonial.role}
                                        </p>
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
            </div>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                aria-label="Scroll to top"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                </svg>
            </button>
        </div>
    );
};

export default CoursePage;