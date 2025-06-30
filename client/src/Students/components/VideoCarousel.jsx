import React, { useState, useEffect } from 'react';

const VideoCarousel = () => {
    const [videos, setVideos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch videos from API
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                // Replace with your actual API endpoint
                const apiUrl = 'https://your-api-endpoint.com/videos'; // e.g., 'https://api.yourdomain.com/videos'
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        // Add Authorization token if needed
                        // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }

                const data = await response.json();
                // Adjust based on your API response structure
                // Example: { videos: [{ thumbnail: 'https://...', url: 'https://...', title: '...' }, ...] }
                setVideos(data.videos);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch videos');
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    // Auto-slide effect
    useEffect(() => {
        if (videos.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(videos.length / 5));
        }, 2000); // Change every 2 seconds

        return () => clearInterval(interval);
    }, [videos.length]);

    if (loading) {
        return (
            <section className="container mx-auto py-16 bg-gray-50">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Latest Tutorials</h3>
                <div className="flex justify-center">
                    <div className="w-full max-w-3xl text-center">Loading...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="container mx-auto py-16 bg-gray-50">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Latest Tutorials</h3>
                <div className="flex justify-center">
                    <div className="w-full max-w-3xl text-center text-red-500">{error}</div>
                </div>
            </section>
        );
    }

    // Group videos into sets of 5 (3 in first row, 2 in second row)
    const videoGroups = [];
    for (let i = 0; i < videos.length; i += 5) {
        videoGroups.push(videos.slice(i, i + 5));
    }

    return (
        <section className="container mx-auto py-16 bg-gray-50">
            <div className="flex justify-between items-center mb-12">
                <h3 className="text-3xl font-bold text-gray-800">Latest Tutorials</h3>
                <a href="/tutorials" className="text-indigo-600 font-semibold hover:underline">
                    VIEW ALL
                </a>
            </div>
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {videoGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="w-full flex-shrink-0">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* First row: 3 videos */}
                                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {group.slice(0, 3).map((video, index) => (
                                        <a
                                            key={index}
                                            href={video.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block transform transition-all duration-300 hover:-translate-y-1"
                                        >
                                            <div className="relative rounded-lg shadow-md overflow-hidden">
                                                <img
                                                    src={video.thumbnail}
                                                    alt={video.title}
                                                    className="w-full h-40 object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <svg
                                                        className="w-12 h-12 text-white opacity-80 hover:opacity-100 transition-opacity"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                                                    {video.duration || '7s'}
                                                </div>
                                            </div>
                                            <p className="mt-2 text-gray-700 text-sm font-medium truncate">{video.title}</p>
                                        </a>
                                    ))}
                                </div>
                                {/* Second row: 2 videos */}
                                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    {group.slice(3, 5).map((video, index) => (
                                        <a
                                            key={index}
                                            href={video.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block transform transition-all duration-300 hover:-translate-y-1"
                                        >
                                            <div className="relative rounded-lg shadow-md overflow-hidden">
                                                <img
                                                    src={video.thumbnail}
                                                    alt={video.title}
                                                    className="w-full h-40 object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <svg
                                                        className="w-12 h-12 text-white opacity-80 hover:opacity-100 transition-opacity"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                                                    {video.duration || '6s'}
                                                </div>
                                            </div>
                                            <p className="mt-2 text-gray-700 text-sm font-medium truncate">{video.title}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination Dots */}
                <div className="flex justify-center mt-6 gap-2">
                    {videoGroups.map((_, index) => (
                        <span
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-orange-500' : 'bg-gray-300'
                                }`}
                        ></span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoCarousel;