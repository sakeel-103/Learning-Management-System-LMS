import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CourseCard = ({ title, stats, rating, level, provider, price, duration, id }) => {
    const navigate = useNavigate();

    return (
        <div className="relative bg-white text-gray-800 rounded-lg p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
            <div className="h-36 rounded-md overflow-hidden mb-4 relative bg-blue-100">
                <h2 className="relative text-xl font-bold text-center p-4 z-10 text-gray-800">{title}</h2>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{stats}</span>
                    <span className="text-sm text-yellow-500 font-semibold">★ {rating}</span>
                </div>
                <p className="text-sm text-gray-600">{level}</p>
                {duration && <p className="text-sm text-gray-600">{duration}</p>}
                {price && <p className="text-sm text-blue-600 font-bold">{price}</p>}
                {provider && <p className="text-xs text-gray-500">By {provider}</p>}
                <button
                    onClick={() => navigate(`/course/${id}`)}
                    className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                    Discover Now
                </button>
            </div>
        </div>
    );
};

CourseCard.propTypes = {
    title: PropTypes.string.isRequired,
    stats: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    seats: PropTypes.string,
    provider: PropTypes.string,
    price: PropTypes.string,
    duration: PropTypes.string,
    id: PropTypes.string.isRequired,
};

const CoursePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    //  === Tagline Section Texts ===
    const taglines = [
        'Elevate your skills with immersive learning',
        'Master coding with expert-led courses',
        'Unlock your potential with TrackAdemy',
    ];
    const [currentTagline, setCurrentTagline] = useState(0);

    const courses = [
        {
            id: '1',
            title: 'DSA to Development: A Complete Guide',
            stats: '1k+ Interested Users',
            rating: '4.4',
            level: 'Beginner to Advance',
            duration: '3 Months',
            category: 'Data Structures',
        },
        {
            id: '2',
            title: 'JAVA Backend Development - LIVE',
            stats: '3k+ Interested Users',
            rating: '4.7',
            level: 'Intermediate to Advance',
            duration: '4 Months',
            category: 'Web Development',
        },
        {
            id: '3',
            title: 'Complete Machine Learning & Data Science Program',
            stats: '1.5k+ Interested Users',
            rating: '4.7',
            level: 'Beginner to Advance',
            duration: '6 Months',
            category: 'Machine Learning',
        },
        {
            id: '4',
            title: 'Data Structures and Algorithms - Self Paced',
            stats: '1+ Interested Geeks',
            rating: '4.7',
            level: 'Beginner to Advance',
            duration: '2 Months',
            category: 'Data Structures',
        },
    ];

    const categories = ['All', 'Data Structures', 'Web Development', 'Machine Learning'];

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

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-600 to-gray-50s text-gray-400 pt-16">

            {/* Header Section */}
            <div className="bg-white py-12 px-6 text-center relative shadow-sm">
                <h1 className="text-4xl font-bold tracking-tight text-gray-600">
                    Discover TrackAdemy Courses
                </h1>
                <p className="text-md mt-3 text-gray-600 max-w-2xl mx-auto transition-opacity duration-1000">
                    {taglines[currentTagline]}
                </p>
                <div className="mt-6 flex justify-center">
                    <form onSubmit={handleSearch} className="relative w-full max-w-lg flex items-center">
                        <input
                            type="text"
                            placeholder="Search for your next course..."
                            className="bg-white text-gray-800 placeholder-gray-400 p-4 pr-20 rounded-md w-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
            <div className="px-6 py-8 max-w-7xl mx-auto">
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
                        <button className="text-gray-600 hover:text-green-700 font-medium">See All Courses ➔</button>
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
                                <CourseCard
                                    key={course.id}
                                    id={course.id}
                                    title={course.title}
                                    stats={course.stats}
                                    rating={course.rating}
                                    level={course.level}
                                    seats={course.seats}
                                    provider={course.provider}
                                    price={course.price}
                                    duration={course.duration}
                                />
                            ))}
                        </div>
                    )}
                </div>

                { /* Class room course*/}
                <div className="mt-12" >
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Classroom Courses</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                stats={course.stats}
                                rating={course.rating}
                                level={course.level}
                                provider={course.provider}
                                price={course.price}
                                duration={course.duration}
                            />
                        ))}
                    </div>
                </div>

                {/*Live Classes of Each Courses */}
                <div className='mt-12'>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Live Classes</h2>

                </div>

                {/* Offline Classes with Recorded Videos*/}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Offline Classes with Recorded Videos</h2>

                </div>

                {/*  */}
                <div></div>

                {/* */}
                <div>

                </div>


            </div>
        </div>
    );
};

export default CoursePage;