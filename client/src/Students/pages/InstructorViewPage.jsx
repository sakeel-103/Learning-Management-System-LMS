import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InstructorViewPage = () => {
    const [activeTab, setActiveTab] = useState('browse');
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        category: '',
        level: '',
        duration: '',
        instructor: '',
        course_description: '',
    });
    const [schedule, setSchedule] = useState({
        type: 'Live',
        startDate: '',
        endDate: '',
        sessions: '',
        duration: ''
    });
    const [prerequisites, setPrerequisites] = useState([]);
    const [materials, setMaterials] = useState({});
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [prereqInput, setPrereqInput] = useState(''); // New state for controlled prerequisite input
    const navigate = useNavigate();

    const categories = [
        'Data Structures',
        'Web Development',
        'Machine Learning',
        'Mobile Development',
        'Cloud Computing',
    ];

    const fetchWithAuth = async (url, options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const headers = {
                ...options.headers,
                'Authorization': `Token ${token}`,
                'Content-Type': options.body instanceof FormData ? undefined : 'application/json'
            };

            if (options.body instanceof FormData) {
                delete headers['Content-Type'];
            }

            const response = await fetch(`http://127.0.0.1:8000/api/v1/${url}`, { ...options, headers });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || errorData.message || 'Request failed');
            }

            if (response.status === 204) {
                return null;
            }

            return await response.json();
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await fetchWithAuth('courses/');
                setCourses(data);
            } catch (err) {
                console.error('Failed to fetch courses:', err);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchMaterials = async () => {
            if (!courses.length) return;

            try {
                const materialPromises = courses.map((course) =>
                    fetchWithAuth(`courses/${course.id}/materials/`)
                );
                const materialData = await Promise.all(materialPromises);

                const materialMap = materialData.reduce((acc, data, index) => {
                    acc[courses[index].id] = data;
                    return acc;
                }, {});

                setMaterials(materialMap);
            } catch (err) {
                console.error('Failed to fetch materials:', err);
            }
        };

        fetchMaterials();
    }, [courses]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputChangeSchedule = (e) => {
        const { name, value } = e.target;
        setSchedule((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddPrerequisite = () => {
        if (prereqInput.trim()) {
            setPrerequisites([...prerequisites, prereqInput.trim()]);
            setPrereqInput('');
        }
    };

    const handleRemovePrerequisite = (index) => {
        setPrerequisites(prerequisites.filter((_, i) => i !== index));
    };

    const handleSaveCourse = async (e) => {
        e.preventDefault();
        try {
            const method = formData.id ? 'PUT' : 'POST';
            const url = formData.id ? `courses/${formData.id}/` : 'courses/';

            await fetchWithAuth(url, {
                method,
                body: JSON.stringify({
                    title: formData.title,
                    category: formData.category,
                    level: formData.level,
                    duration: formData.duration,
                    instructor: formData.instructor,
                    course_description: formData.course_description,
                }),
            });

            setFormData({
                id: null,
                title: '',
                category: '',
                level: '',
                duration: '',
                instructor: '',
                course_description: ''
            });

            const updatedCourses = await fetchWithAuth('courses/');
            setCourses(updatedCourses);
            setActiveTab('browse');
        } catch (err) {
            console.error('Failed to save course:', err);
        }
    };

    const handleEditCourse = async (id) => {
        try {
            const data = await fetchWithAuth(`courses/${id}/`);
            setFormData({
                id: data.id,
                title: data.title,
                category: data.category,
                level: data.level,
                duration: data.duration,
                instructor: data.instructor,
                course_description: data.course_description,
            });

            if (data.start_date) {
                setSchedule({
                    type: data.schedule_type || 'Live',
                    startDate: data.start_date,
                    endDate: data.end_date,
                    sessions: data.sessions || '',
                    duration: data.duration || '',
                });
            }

            if (data.prerequisites) {
                setPrerequisites(data.prerequisites);
            }

            setSelectedCourseId(data.id);
            setActiveTab('create');
        } catch (err) {
            console.error('Failed to fetch course for editing:', err);
        }
    };

    const handleDeleteCourse = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await fetchWithAuth(`courses/${id}/`, { method: 'DELETE' });
                setCourses(courses.filter((course) => course.id !== id));
            } catch (err) {
                console.error('Failed to delete course:', err);
            }
        }
    };

    const handleFileUpload = async (e, type) => {
        if (!selectedCourseId) {
            setError('Please select a course first');
            return;
        }

        const file = e.target.files[0];
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', type);

            await fetchWithAuth(`courses/${selectedCourseId}/upload_materials/`, {
                method: 'POST',
                body: formData,
            });

            const materialsData = await fetchWithAuth(`courses/${selectedCourseId}/materials/`);
            setMaterials((prev) => ({ ...prev, [selectedCourseId]: materialsData }));
        } catch (err) {
            console.error('Failed to upload material:', err);
        }
    };

    const handleSaveSettings = async (e) => {
        e.preventDefault();
        if (!selectedCourseId) {
            setError('Please select a course first');
            return;
        }

        try {
            await fetchWithAuth(`courses/${selectedCourseId}/`, {
                method: 'PATCH',
                body: JSON.stringify({
                    schedule_type: schedule.type,
                    start_date: schedule.startDate,
                    end_date: schedule.endDate,
                    sessions: schedule.sessions,
                    duration: schedule.duration,
                    prerequisites: prerequisites,
                }),
            });

            const updatedCourses = await fetchWithAuth('courses/');
            setCourses(updatedCourses);

            setSchedule({ type: 'Live', startDate: '', endDate: '', sessions: '', duration: '' });
            setPrerequisites([]);
        } catch (err) {
            console.error('Failed to save settings:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 pt-16 w-full overflow-x-hidden">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-center">Loading...</p>
                    </div>
                </div>
            )}
            {error && (
                <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg z-50">
                    <span className="block sm:inline">{error}</span>
                    <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <title>Close</title>
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                    </button>
                </div>
            )}
            <div className="py-12 px-4 sm:px-6 text-center relative shadow-sm bg-gradient-to-br from-gray-50 to-white">
                <div className="relative max-w-7xl mx-auto w-full">
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>
                    <div className="flex flex-col items-center gap-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                Course Management Dashboard
                            </span>
                        </h1>
                    </div>
                    <p className="text-sm sm:text-md mt-3 text-gray-600 max-w-2xl mx-auto">
                        Unlock your potential with TrackAdemy
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            onClick={() => {
                                setFormData({ id: null, title: '', category: '', level: '', duration: '', instructor: '', course_description: '' });
                                setActiveTab('create');
                            }}
                            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-md flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Create New Course
                        </button>
                        <button
                            onClick={() => setActiveTab('browse')}
                            className="bg-white text-indigo-600 border border-gray-100 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all shadow-md flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Manage Existing Courses
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/courses')}
                    className="absolute top-6 sm:top-12 right-2 sm:right-6 px-3 py-1 sm:px-4 sm:py-2 bg-white text-indigo-700 border border-gray-100 rounded-lg shadow-md hover:bg-gray-100 transition-all flex items-center gap-2 text-sm sm:text-base"
                    aria-label="Switch to Student View"
                >
                    <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
                    </svg>
                    Student View
                </button>
            </div>
            <div className="px-2 sm:px-6 py-8 max-w-7xl mx-auto w-full">
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
                                className={`px-3 py-2 font-medium flex items-center gap-2 text-sm sm:text-base ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
                                onClick={() => setActiveTab(tab)}
                                aria-current={activeTab === tab ? 'true' : 'false'}
                            >
                                {tab === 'browse' && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                )}
                                {tab === 'create' && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                )}
                                {tab === 'upload' && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                )}
                                {tab === 'schedule' && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )}
                                {label}
                            </button>
                        ))}
                    </div>
                    {activeTab === 'browse' && (
                        <div className="py-4">
                            <h3 className="text-lg font-medium mb-4 text-gray-800">Your Current Courses</h3>
                            {courses.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-600">No courses found. Create your first course!</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                    {courses.map((course) => (
                                        <div key={course.id} className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-indigo-50 transition-colors w-full">
                                            <div className="mb-2 sm:mb-0">
                                                <h4 className="font-medium text-sm sm:text-base text-gray-800">{course.title}</h4>
                                                <p className="text-xs sm:text-sm text-gray-600">{course.duration} • {course.category}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditCourse(course.id)}
                                                    className="p-2 text-indigo-600 hover:bg-indigo-100 rounded"
                                                    aria-label={`Edit ${course.title}`}
                                                    title="Edit Course"
                                                >
                                                    <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCourse(course.id)}
                                                    className="p-2 text-red-600 hover:bg-red-100 rounded"
                                                    aria-label={`Delete ${course.title}`}
                                                    title="Delete Course"
                                                >
                                                    <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === 'create' && (
                        <div className="py-4">
                            <h3 className="text-lg font-medium mb-4 text-gray-800">
                                {formData.id ? 'Edit Course' : 'Create New Course'}
                            </h3>
                            <form className="space-y-4" onSubmit={handleSaveCourse}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                        placeholder="Enter course title"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
                                        <select
                                            name="level"
                                            value={formData.level}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                            required
                                        >
                                            <option value="">Select Level</option>
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                            <option value="Beginner to Intermediate">Beginner to Intermediate</option>
                                            <option value="Intermediate to Advanced">Intermediate to Advanced</option>
                                            <option value="Beginner to Advanced">Beginner to Advanced</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                        <input
                                            type="text"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                            placeholder="e.g. 3 Months"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                                        <input
                                            type="text"
                                            name="instructor"
                                            value={formData.instructor}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                            placeholder="Instructor name"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Description</label>
                                    <textarea
                                        name="course_description"
                                        value={formData.course_description}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-100 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                        placeholder="Enter detailed course description"
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-end gap-2">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 w-full sm:w-auto shadow-md"
                                        onClick={() => {
                                            setFormData({ id: null, title: '', category: '', level: '', duration: '', instructor: '', course_description: '' });
                                            setActiveTab('browse');
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 w-full sm:w-auto shadow-md"
                                    >
                                        {formData.id ? 'Update Course' : 'Save Course'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    {activeTab === 'upload' && (
                        <div className="py-4">
                            <h3 className="text-lg font-medium mb-4 text-gray-800">Upload Course Materials</h3>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
                                <select
                                    value={selectedCourseId}
                                    onChange={(e) => setSelectedCourseId(e.target.value)}
                                    className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                    required
                                >
                                    <option value="">Select a Course</option>
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {selectedCourseId ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
                                        {['video', 'pdf', 'presentation', 'notes'].map((type) => (
                                            <label key={type} className="text-center p-3 border-2 border-dashed border-gray-100 rounded-lg hover:border-indigo-500 cursor-pointer transition-colors">
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept={type === 'video' ? 'video/*' : type === 'pdf' ? '.pdf' : type === 'presentation' ? '.ppt,.pptx' : '.doc,.docx,.txt'}
                                                    onChange={(e) => handleFileUpload(e, type)}
                                                />
                                                <div className="text-indigo-600 mb-1">
                                                    <svg className="w-6 sm:w-8 h-6 sm:h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={type === 'video' ? 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' : type === 'pdf' ? 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' : type === 'presentation' ? 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' : 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'} />
                                                    </svg>
                                                </div>
                                                <p className="font-medium text-sm sm:text-base text-gray-800">{type.charAt(0).toUpperCase() + type.slice(1)} {type !== 'notes' ? 'Lectures' : ''}</p>
                                                <p className="text-xs text-gray-600">{type === 'video' ? 'MP4, MOV, Max 2GB' : type === 'pdf' ? 'PDF, Max 50MB' : type === 'presentation' ? 'PPT, PPTX, Max 50MB' : 'DOC, DOCX, TXT, Max 20MB'}</p>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="font-medium mb-2 text-gray-800">Uploaded Materials</h4>
                                        {materials[selectedCourseId] && materials[selectedCourseId].length > 0 ? (
                                            <div className="space-y-2">
                                                {materials[selectedCourseId].map((material) => (
                                                    <div key={material.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                        <div>
                                                            <span className="font-medium capitalize">{material.file_type}</span>
                                                            <span className="text-gray-600 ml-2">{material.file.split('/').pop()}</span>
                                                        </div>
                                                        <a
                                                            href={`http://127.0.0.1:8000${material.file}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-indigo-600 hover:text-indigo-800"
                                                        >
                                                            View
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-600">No materials uploaded yet.</p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-600">Please select a course to upload materials</p>
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === 'schedule' && (
                        <div className="py-4">
                            <h3 className="text-lg font-medium mb-4 text-gray-800">Course Schedule & Prerequisites</h3>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
                                <select
                                    value={selectedCourseId}
                                    onChange={(e) => {
                                        const courseId = e.target.value;
                                        setSelectedCourseId(courseId);
                                        if (courseId) {
                                            const course = courses.find(c => c.id.toString() === courseId);
                                            if (course) {
                                                setSchedule({
                                                    type: course.schedule_type || 'Live',
                                                    startDate: course.start_date || '',
                                                    endDate: course.end_date || '',
                                                    sessions: course.sessions || '',
                                                    duration: course.duration || '',
                                                });
                                                setPrerequisites(course.prerequisites || []);
                                                setPrereqInput('');
                                            }
                                        }
                                    }}
                                    className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                    required
                                >
                                    <option value="">Select a Course</option>
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {selectedCourseId ? (
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
                                                            checked={schedule.type === 'Live'}
                                                            onChange={() => setSchedule({ ...schedule, type: 'Live' })}
                                                        />
                                                        <span className="text-gray-700">Live Sessions</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="courseType"
                                                            className="mr-1 focus:ring-indigo-500"
                                                            checked={schedule.type === 'Self-paced'}
                                                            onChange={() => setSchedule({ ...schedule, type: 'Self-paced' })}
                                                        />
                                                        <span className="text-gray-700">Self-paced</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                                                <div>
                                                    <label className="block text-sm text-gray-700 mb-1">Start Date</label>
                                                    <input
                                                        type="date"
                                                        name="startDate"
                                                        value={schedule.startDate}
                                                        onChange={handleInputChangeSchedule}
                                                        className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-700 mb-1">End Date</label>
                                                    <input
                                                        type="date"
                                                        name="endDate"
                                                        value={schedule.endDate}
                                                        onChange={handleInputChangeSchedule}
                                                        className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-700 mb-1">Session Days & Time</label>
                                                <input
                                                    type="text"
                                                    name="sessions"
                                                    value={schedule.sessions}
                                                    onChange={handleInputChangeSchedule}
                                                    className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                    placeholder="e.g. Mon, Wed (7PM-9PM)"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-700 mb-1">Duration</label>
                                                <input
                                                    type="text"
                                                    name="duration"
                                                    value={schedule.duration}
                                                    onChange={handleInputChangeSchedule}
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
                                                        value={prereqInput}
                                                        onChange={(e) => setPrereqInput(e.target.value)}
                                                        className="flex-1 p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                                        placeholder="e.g. Basic Programming"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="p-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 w-full sm:w-auto shadow-md"
                                                        onClick={handleAddPrerequisite}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                                {prerequisites.length > 0 ? (
                                                    <ul className="list-disc pl-5 mt-4 space-y-2">
                                                        {prerequisites.map((prereq, index) => (
                                                            <li key={index} className="flex items-center justify-between">
                                                                <span className="text-gray-800">{prereq}</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemovePrerequisite(index)}
                                                                    className="text-red-600 hover:text-red-800"
                                                                    aria-label={`Remove ${prereq}`}
                                                                >
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-gray-600 mt-2">No prerequisites added yet.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-600">Please select a course to manage schedule and prerequisites</p>
                                </div>
                            )}
                            {selectedCourseId && (
                                <div className="flex justify-end mt-6">
                                    <button
                                        onClick={handleSaveSettings}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 w-full sm:w-auto shadow-md"
                                    >
                                        Save Settings
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstructorViewPage;