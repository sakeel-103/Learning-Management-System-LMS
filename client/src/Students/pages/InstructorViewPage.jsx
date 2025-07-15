import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify';


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
    const [prereqInput, setPrereqInput] = useState('');
    const [fileUploadProgress, setFileUploadProgress] = useState({});
    const [pendingMaterials, setPendingMaterials] = useState([]); // {file, materialType, ext}
    const location = useLocation();
    const exploreHandledRef = useRef(false);

    // Fetch all materials for all courses and group by course id
    const fetchAllMaterials = async () => {
        try {
            const allMaterials = await fetchWithAuth('course_class/materials/');
            // Group by course id
            const grouped = {};
            (Array.isArray(allMaterials.results) ? allMaterials.results : allMaterials).forEach(mat => {
                if (!grouped[mat.course]) grouped[mat.course] = [];
                grouped[mat.course].push(mat);
            });
            setMaterials(grouped);
        } catch (err) {
            setError('Failed to fetch materials: ' + (err?.message || ''));
        }
    };
    const navigate = useNavigate();

    const categories = [
        'Data Structures',
        'Web Development',
        'Machine Learning',
        'Mobile Development',
        'Cloud Computing',
    ];
    const verifyInstructor = () => {
        const token = localStorage.getItem('ACCESS_TOKEN')
        if (!token) {
            navigate('/login')
        }
        const decoded = jwtDecode(token)
        if (decoded?.role != '2') {
            toast.error('Your are not a Instructor.! Do not have access.')
            navigate('/login')
        }
    }
    // ================ API calls =================

    const fetchWithAuth = async (url, options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('ACCESS_TOKEN');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
            };

            // Only set Content-Type for JSON data, not for FormData
            if (!(options.body instanceof FormData)) {
                headers['Content-Type'] = 'application/json';
            }
            const fullUrl = url.startsWith('http') ? url : `http://127.0.0.1:8000/api/v1/${url.replace(/^\/+/, '')}`;
            console.log('[fetchWithAuth] URL:', fullUrl, 'Method:', options.method || 'GET');
            if (options.body && typeof options.body === 'string') {
                try { console.log('[fetchWithAuth] Body:', JSON.parse(options.body)); } catch { console.log('[fetchWithAuth] Body:', options.body); }
            }

            const response = await fetch(fullUrl, {
                ...options,
                headers,
                credentials: 'include'
            });
            console.log('[fetchWithAuth] Response status:', response.status, response.statusText);

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (e) {
                    errorData = await response.text();
                    try {
                        // Try to parse as JSON if possible
                        errorData = JSON.parse(errorData);
                    } catch {
                        // If not JSON, use status text
                        errorData = { detail: response.statusText };
                    }
                }
                console.error('[fetchWithAuth] Error response:', errorData);
                throw new Error(
                    errorData.detail ||
                    errorData.message ||
                    errorData.non_field_errors?.[0] ||
                    (typeof errorData === 'string' ? errorData : 'Request failed')
                );
            }

            return response.status === 204 ? null : await response.json();
        } catch (err) {
            setError(err.message);

            // Auto-redirect if unauthorized
            if (err.message.includes('Unauthorized') || err.message.includes('ACCESS_TOKEN')) {
                localStorage.removeItem('ACCESS_TOKEN');
                localStorage.removeItem('REFRESH_TOKEN');
                window.location.href = '/login';
            }

            throw err;
        } finally {
            setLoading(false);
        }
    };

    // ================ End of API calls ==================

    const fetchCourses = async () => {
        try {
            const data = await fetchWithAuth('course_class/');
            setCourses(data);
            return data;
        } catch (err) {
            console.error('Failed to fetch courses:', err);
            throw err;
        }
    };

    useEffect(() => {
        // verifyInstructor()
        fetchCourses();
    }, []);

    useEffect(() => {
        if (courses.length) {
            fetchAllMaterials();
        }
        // eslint-disable-next-line
    }, [courses]);

    useEffect(() => {
        // Debug: log navigation state and data
        console.log('ExploreCourse Debug:', {
            locationState: location.state,
            coursesLength: courses.length,
            materialsKeys: Object.keys(materials),
            exploreHandled: exploreHandledRef.current
        });
        // If navigated with a courseId (from Explore Course), select that course and show materials
        if (
            location.state &&
            location.state.courseId &&
            courses.length > 0 &&
            materials &&
            !exploreHandledRef.current
        ) {
            setSelectedCourseId(location.state.courseId.toString());
            setActiveTab('upload');
            exploreHandledRef.current = true;
        }
    }, [location.state, courses, materials]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    // (moved inside fetchWithAuth above)
    // const response = await fetch(`http://127.0.0.1:8000/api/v1/${url}`, { ...options, headers });

    // Handles changes for schedule-related form fields
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



    const handleEditCourse = async (id) => {
        try {
            const data = await fetchWithAuth(`course_class/${id}/`);
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
                await fetchWithAuth(`course_class/${id}/`, { method: 'DELETE' });
                setCourses(courses.filter((course) => course.id !== id));
            } catch (err) {
                console.error('Failed to delete course:', err);
            }
        }
    };

    const handleFileUpload = (e, type) => {
        if (!selectedCourseId) {
            setError('Please select a course first');
            return;
        }

        const file = e.target.files[0];
        if (!file) return;

        // Map file extension to backend material_type
        let materialType = type;
        const ext = file.name.split('.').pop().toLowerCase();
        if (["txt", "doc", "docx"].includes(ext)) {
            materialType = 'note';
        } else if (["ppt", "pptx"].includes(ext)) {
            materialType = 'presentation';
        } else if (ext === "pdf") {
            materialType = 'pdf';
        } else if (["mp4", "mov"].includes(ext)) {
            materialType = 'video';
        }

        // Only allow backend-supported types
        const allowedTypes = ['video', 'pdf', 'presentation', 'note'];
        if (!allowedTypes.includes(materialType)) {
            setError('Unsupported file type.');
            return;
        }

        // Add to pendingMaterials for later upload
        setPendingMaterials(prev => [...prev, { file, materialType, ext }]);
    };
    // Upload all pending materials when Save is clicked
    const handleUploadPendingMaterials = async () => {
        if (!selectedCourseId) {
            setError('Please select a course first');
            return;
        }
        if (pendingMaterials.length === 0) {
            setError('No files selected to upload.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            for (const mat of pendingMaterials) {
                const formData = new FormData();
                formData.append('file', mat.file);
                formData.append('material_type', mat.materialType);
                formData.append('course', selectedCourseId);
                formData.append('name', mat.file.name);

                // Use fetchWithAuth for proper authentication handling
                await fetchWithAuth('course_class/materials/', {
                    method: 'POST',
                    body: formData,
                    // Don't set Content-Type header for FormData - let browser set it with boundary
                });
            }
            setPendingMaterials([]);
            await fetchAllMaterials();
            toast.success('Files uploaded successfully!');
        } catch (err) {
            console.error('Upload failed:', err);
            setError('Upload failed: ' + (err?.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSettings = async (e) => {
        e.preventDefault();
        if (!selectedCourseId) {
            setError('Please select a course first');
            return;
        }

        try {
            await fetchWithAuth(`course_class/${selectedCourseId}/`, {
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

            const updatedCourses = await fetchWithAuth('course_class/');
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
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
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
            <div className="py-12 px-4 sm:px-6 text-center relative shadow-sm bg-gray-50">
                <div className="relative max-w-7xl mx-auto w-full">
                    <div className="flex flex-col items-center gap-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                            <span className="text-gray-800">
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
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Create New Course
                        </button>
                        <button
                            onClick={() => setActiveTab('browse')}
                            className="bg-white text-blue-600 border border-blue-200 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all shadow-md flex items-center gap-2"
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
                    className="absolute top-6 sm:top-12 right-2 sm:right-6 px-3 py-1 sm:px-4 sm:py-2 bg-white text-blue-600 border border-blue-200 rounded-lg shadow-md hover:bg-blue-50 transition-all flex items-center gap-2 text-sm sm:text-base"
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
                                className={`px-3 py-2 font-medium flex items-center gap-2 text-sm sm:text-base ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
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
                                        <div key={course.id} className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-blue-50 transition-colors w-full">
                                            <div className="mb-2 sm:mb-0">
                                                <h4 className="font-medium text-sm sm:text-base text-gray-800">{course.title}</h4>
                                                <p className="text-xs sm:text-sm text-gray-600">{course.duration} • {course.category}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditCourse(course.id)}
                                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded"
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
                                                <button
                                                    onClick={() => {
                                                        setSelectedCourseId(course.id.toString());
                                                        setActiveTab('upload');
                                                    }}
                                                    className="p-2 text-green-600 hover:bg-green-100 rounded"
                                                    aria-label={`Explore ${course.title}`}
                                                    title="Explore Course Materials"
                                                >
                                                    <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                    Explore
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* section-1 */}
                    {activeTab === 'create' && (
                        <div className="py-4">
                            <h3 className="text-lg font-medium mb-4 text-gray-800">
                                {formData.id ? 'Edit Course' : 'Create New Course'}
                            </h3>
                            <form className="space-y-4" onSubmit={async (e) => {
                                e.preventDefault();
                                try {
                                    const method = formData.id ? 'PUT' : 'POST';
                                    // Use RESTful endpoint for both create and update
                                    const url = formData.id ? `course_class/${formData.id}/` : 'course_class/';

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

                                    // Refresh the courses list after successful save
                                    const updatedCourses = await fetchWithAuth('course_class/');
                                    setCourses(updatedCourses);

                                    // Reset form and switch to browse tab
                                    setFormData({
                                        id: null,
                                        title: '',
                                        category: '',
                                        level: '',
                                        duration: '',
                                        instructor: '',
                                        course_description: ''
                                    });
                                    setActiveTab('browse');
                                } catch (err) {
                                    console.error('Failed to save course:', err);
                                }
                            }}>
                                {/* Form fields remain the same */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
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
                                            className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
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
                                            className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
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
                                            className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
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
                                            className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
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
                                        className="w-full p-2 border border-gray-100 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 shadow-sm"
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
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto shadow-md"
                                    >
                                        {formData.id ? 'Update Course' : 'Save Course'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'upload' && (
                        <div className="py-4">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Upload Course Materials</h2>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
                                <select
                                    value={selectedCourseId}
                                    onChange={(e) => setSelectedCourseId(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select a Course</option>
                                    {courses.length > 0 ? (
                                        courses.map((course) => (
                                            <option key={course.id} value={course.id}>
                                                {course.title}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>No courses available</option>
                                    )}
                                </select>
                            </div>

                            {/* Always visible upload boxes */}
                            {/* Pending files preview before upload */}
                            {pendingMaterials.length > 0 && (
        <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Files to be uploaded (Preview):</h4>
            <ul className="list-disc pl-5 space-y-1">
                {pendingMaterials.map((mat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                        <span>{mat.file.name}</span>
                        <span className="text-xs text-gray-500">({mat.materialType})</span>
                        {/* Preview for supported types */}
                        {mat.materialType === 'video' ? (
                            <video src={URL.createObjectURL(mat.file)} controls className="w-32 h-16 rounded bg-black" />
                        ) : mat.materialType === 'pdf' ? (
                            <iframe src={URL.createObjectURL(mat.file)} title={mat.file.name} className="w-32 h-16 rounded bg-gray-100" />
                        ) : mat.materialType === 'note' ? (
                            <iframe src={URL.createObjectURL(mat.file)} title={mat.file.name} className="w-32 h-16 rounded bg-gray-100" />
                        ) : (
                            <span className="text-gray-400 ml-2">No preview</span>
                        )}
                        <button
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => setPendingMaterials(pendingMaterials.filter((_, i) => i !== idx))}
                            title="Remove file"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                {/* Video Upload Box */}
                                <div className={`border-2 border-dashed ${selectedCourseId ? 'border-blue-400' : 'border-gray-300'} rounded-lg p-4 hover:border-blue-400 transition-colors`}>
                                    <label className="flex flex-col items-center justify-center cursor-pointer h-full">
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="video/*"
                                            onChange={(e) => handleFileUpload(e, 'video')}
                                            disabled={!selectedCourseId}
                                        />
                                        <div className={`mb-2 ${selectedCourseId ? 'text-blue-600' : 'text-gray-400'}`}>
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className={`font-medium text-center ${selectedCourseId ? 'text-gray-800' : 'text-gray-400'}`}>Video</h3>
                                    </label>
                                </div>

                                {/* PDF Upload Box */}
                                <div className={`border-2 border-dashed ${selectedCourseId ? 'border-blue-400' : 'border-gray-300'} rounded-lg p-4 hover:border-blue-400 transition-colors`}>
                                    <label className="flex flex-col items-center justify-center cursor-pointer h-full">
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".pdf"
                                            onChange={(e) => handleFileUpload(e, 'pdf')}
                                            disabled={!selectedCourseId}
                                        />
                                        <div className={`mb-2 ${selectedCourseId ? 'text-blue-600' : 'text-gray-400'}`}>
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className={`font-medium text-center ${selectedCourseId ? 'text-gray-800' : 'text-gray-400'}`}>PDF</h3>
                                    </label>
                                </div>

                                {/* Text Upload Box */}
                                <div className={`border-2 border-dashed ${selectedCourseId ? 'border-blue-400' : 'border-gray-300'} rounded-lg p-4 hover:border-blue-400 transition-colors`}>
                                    <label className="flex flex-col items-center justify-center cursor-pointer h-full">
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".txt"
                                            onChange={(e) => handleFileUpload(e, 'text')}
                                            disabled={!selectedCourseId}
                                        />
                                        <div className={`mb-2 ${selectedCourseId ? 'text-blue-600' : 'text-gray-400'}`}>
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h3 className={`font-medium text-center ${selectedCourseId ? 'text-gray-800' : 'text-gray-400'}`}>TXT</h3>
                                    </label>
                                </div>

                                {/* Docs Upload Box */}
                                <div className={`border-2 border-dashed ${selectedCourseId ? 'border-blue-400' : 'border-gray-300'} rounded-lg p-4 hover:border-blue-400 transition-colors`}>
                                    <label className="flex flex-col items-center justify-center cursor-pointer h-full">
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".doc,.docx"
                                            onChange={(e) => handleFileUpload(e, 'docs')}
                                            disabled={!selectedCourseId}
                                        />
                                        <div className={`mb-2 ${selectedCourseId ? 'text-blue-600' : 'text-gray-400'}`}>
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h3 className={`font-medium text-center ${selectedCourseId ? 'text-gray-800' : 'text-gray-400'}`}>Docs</h3>
                                    </label>
                                </div>
                            </div>


                            {/* Display uploaded materials by type (video, pdf, txt, docs, pptx) with delete option */}
                            {selectedCourseId && materials[selectedCourseId] && materials[selectedCourseId].length > 0 && (() => {
                              // Find the selected course object
                              const selectedCourse = courses.find(c => c.id.toString() === selectedCourseId.toString());
                              if (!selectedCourse) return null;

                              // Only show materials for the selected course
                              const courseMaterials = materials[selectedCourseId];

                              // Handler to delete a material and refresh all materials
                              const handleDeleteMaterial = async (mat) => {
                                if (!window.confirm(`Are you sure you want to delete this ${mat.material_type.toUpperCase()}?`)) return;
                                try {
                                  await fetchWithAuth(`course_class/materials/${mat.id}/`, { method: 'DELETE' });
                                  await fetchAllMaterials();
                                } catch (err) {
                                  setError(`Failed to delete ${mat.material_type}: ` + (err?.message || ''));
                                }
                              };

                              return (
                                <div className="mt-8 space-y-10">
                                  {/* All Materials Combined */}
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2">All Uploaded Materials</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                      {courseMaterials.map(mat => (
                                        <div key={mat.id} className="border rounded-lg p-4 bg-white shadow relative">
                                          <h4 className="font-medium mb-2">{mat.name}</h4>
                                          {/* Preview by type */}
                                          {mat.material_type === 'video' ? (
                                            <video src={mat.file_url || mat.file} controls className="w-full h-48 rounded mb-2 bg-black" />
                                          ) : mat.material_type === 'pdf' ? (
                                            <iframe src={mat.file_url || mat.file} title={mat.name} className="w-full h-48 rounded mb-2 bg-gray-100" />
                                          ) : mat.material_type === 'note' ? (
                                            <iframe src={mat.file_url || mat.file} title={mat.name} className="w-full h-48 rounded mb-2 bg-gray-100" />
                                          ) : (
                                            <div className="w-full h-48 rounded mb-2 bg-gray-100 flex items-center justify-center">
                                              <span className="text-gray-500">Preview not available</span>
                                            </div>
                                          )}
                                          <div className="text-xs text-gray-500">
                                            Uploaded: {new Date(mat.uploaded_at).toLocaleString()}
                                          </div>
                                          <a
                                            href={mat.file_url || mat.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline text-sm"
                                          >
                                            Download {mat.material_type.toUpperCase()}
                                          </a>
                                          <button
                                            title={`Delete ${mat.material_type.toUpperCase()}`}
                                            className="absolute top-2 right-2 p-1 bg-red-100 hover:bg-red-200 rounded-full text-red-600"
                                            onClick={() => handleDeleteMaterial(mat)}
                                          >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}

                            {/* Save button - always visible */}
                            <div className="flex justify-end">
                                <button
                                    className={`px-6 py-2 rounded-lg shadow-md ${selectedCourseId && pendingMaterials.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                    onClick={handleUploadPendingMaterials}
                                    disabled={!selectedCourseId || pendingMaterials.length === 0}
                                >
                                    Save
                                </button>
                            </div>
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
                                    className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
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
                                                            className="mr-1 focus:ring-blue-500"
                                                            checked={schedule.type === 'Live'}
                                                            onChange={() => setSchedule({ ...schedule, type: 'Live' })}
                                                        />
                                                        <span className="text-gray-700">Live Sessions</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="courseType"
                                                            className="mr-1 focus:ring-blue-500"
                                                            checked={schedule.type === 'Self-paced'}
                                                            onChange={() => setSchedule({ ...schedule, type: 'Self-paced' })}
                                                        />
                                                        <span className="text-gray-700">Self-paced</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                                                <div>
                                                    <label className="block text-sm text-gray-700 mb-1">Start Date</label>                                                        <input
                                                            type="date"
                                                            name="startDate"
                                                            value={schedule.startDate}
                                                            onChange={handleInputChangeSchedule}
                                                            className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                                                        />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-700 mb-1">End Date</label>                                                        <input
                                                            type="date"
                                                            name="endDate"
                                                            value={schedule.endDate}
                                                            onChange={handleInputChangeSchedule}
                                                            className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                                                        />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-700 mb-1">Session Days & Time</label>                                                    <input
                                                        type="text"
                                                        name="sessions"
                                                        value={schedule.sessions}
                                                        onChange={handleInputChangeSchedule}
                                                        className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                                                        placeholder="e.g. Mon, Wed (7PM-9PM)"
                                                    />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-700 mb-1">Duration</label>                                                    <input
                                                        type="text"
                                                        name="duration"
                                                        value={schedule.duration}
                                                        onChange={handleInputChangeSchedule}
                                                        className="w-full p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
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
                                                        className="flex-1 p-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                                                        placeholder="e.g. Basic Programming"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto shadow-md"
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
                                        type="button"
                                        onClick={handleSaveSettings}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto shadow-md"
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