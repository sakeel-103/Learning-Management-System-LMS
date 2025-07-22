import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify';
import axios from 'axios';
import NotificationBell from '../../components/NotificationBell';


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

    // Add state for quizzes and questions for dropdowns
    const [quizzes, setQuizzes] = useState([]);
    const [questions, setQuestions] = useState([]);

    // Add state for quizzes, questions, choices, and assignments for management
    const [allQuizzes, setAllQuizzes] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [allChoices, setAllChoices] = useState([]);
    const [allAssignments, setAllAssignments] = useState([]);

    // Add state for editing
    const [editItem, setEditItem] = useState(null); // {type, data}

    // Fetch quizzes and questions for dropdowns
    const fetchQuizzes = async () => {
        try {
            const data = await fetchWithAuth('assessment/quizzes/');
            setQuizzes(Array.isArray(data) ? data : (data.results || []));
        } catch (err) {
            setQuizzes([]);
        }
    };
    const fetchQuestions = async () => {
        try {
            const data = await fetchWithAuth('assessment/questions/');
            setQuestions(Array.isArray(data) ? data : (data.results || []));
        } catch (err) {
            setQuestions([]);
        }
    };

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
            if (!token) throw new Error('No authentication token found');

            const headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
            };

            // Only set Content-Type for JSON data, not for FormData
            if (!(options.body instanceof FormData)) {
                headers['Content-Type'] = 'application/json';
            }
            const fullUrl = url.startsWith('http') ? url : `http://127.0.0.1:8000/api/v1/${url.replace(/^\/+/, '')}`;
            const response = await fetch(fullUrl, { ...options, headers, credentials: 'include' });

            // If DELETE or 204 No Content, just return null
            if (response.status === 204 || options.method === 'DELETE') {
                return null;
            }

            const text = await response.text();
            const data = text ? JSON.parse(text) : null;

            if (!response.ok) {
                throw new Error(data?.detail || data?.message || 'Request failed');
            }
            return data;
        } catch (err) {
            setError(err.message);
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
        if (activeTab === 'assessment') {
            fetchQuizzes();
            fetchQuestions();
        }
    }, [activeTab]);

    // Fetch all data when tab is active
    useEffect(() => {
        if (activeTab === 'manage') {
            fetchWithAuth('assessment/quizzes/').then(setAllQuizzes).catch(() => setAllQuizzes([]));
            fetchWithAuth('assessment/questions/').then(setAllQuestions).catch(() => setAllQuestions([]));
            fetchWithAuth('assessment/choices/').then(setAllChoices).catch(() => setAllChoices([]));
            fetchWithAuth('assessment/assignments/').then(setAllAssignments).catch(() => setAllAssignments([]));
        }
    }, [activeTab]);

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

    // Add state for forms
    const [quizForm, setQuizForm] = useState({ title: '', description: '', course: '', start_time: '', end_time: '' });
    const [assignmentForm, setAssignmentForm] = useState({ title: '', description: '', course: '', assignment_file: null });
    const [questionForm, setQuestionForm] = useState({ quiz: '', question_text: '', question_type: 'mcq', points: 1 });
    const [choiceForm, setChoiceForm] = useState({ question: '', choice_text: '', is_correct: false });

    // Delete handler
    const handleDelete = async (type, id) => {
        try {
            await fetchWithAuth(`assessment/${type}/${id}/`, { method: 'DELETE' });
            // Refresh after delete
            if (type === 'quizzes') fetchWithAuth('assessment/quizzes/').then(setAllQuizzes);
            if (type === 'questions') fetchWithAuth('assessment/questions/').then(setAllQuestions);
            if (type === 'choices') fetchWithAuth('assessment/choices/').then(setAllChoices);
            if (type === 'assignments') fetchWithAuth('assessment/assignments/').then(setAllAssignments);
        } catch (err) {
            if (err.message.includes('No Quiz matches')) {
                alert('This quiz was already deleted or does not exist.');
            } else {
                alert('Failed to delete. ' + err.message);
            }
        }
    };

    // For quizzes
    const handleEditQuiz = async (id) => {
        try {
            const data = await fetchWithAuth(`assessment/quizzes/${id}/`);
            setEditItem({ type: 'quiz', data });
        } catch (err) {
            console.error('Failed to fetch quiz for editing:', err);
        }
    };

    // For questions
    const handleEditQuestion = async (id) => {
        try {
            const data = await fetchWithAuth(`assessment/questions/${id}/`);
            setEditItem({ type: 'question', data });
        } catch (err) {
            console.error('Failed to fetch question for editing:', err);
        }
    };

    // For choices
    const handleEditChoice = async (id) => {
        try {
            const data = await fetchWithAuth(`assessment/choices/${id}/`);
            setEditItem({ type: 'choice', data });
        } catch (err) {
            console.error('Failed to fetch choice for editing:', err);
        }
    };

    // For assignments
    const handleEditAssignment = async (id) => {
        try {
            const data = await fetchWithAuth(`assessment/assignments/${id}/`);
            setEditItem({ type: 'assignment', data });
        } catch (err) {
            console.error('Failed to fetch assignment for editing:', err);
        }
    };

    // Helper to convert local datetime-local string to UTC ISO string
    const toUTCISOString = (localDateTimeStr) => {
        if (!localDateTimeStr) return '';
        const local = new Date(localDateTimeStr);
        return local.toISOString();
    };

    const [showQuizSelect, setShowQuizSelect] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    const handleCreateQuestions = () => {
      setShowQuizSelect(true);
    };

    const handleQuizSelect = (quiz) => {
      setSelectedQuiz(quiz);
      setShowQuizSelect(false);
      // Now show the AddQuestionForm for this quiz
    };

    const [selectedQuizForQuestion, setSelectedQuizForQuestion] = useState(null);

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
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl font-bold text-black">Course Management Dashboard</h1>
                                    <NotificationBell userRole="admin" />
                                </div>
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
                            { tab: 'assessment', label: 'Assessment Tools' },
                            { tab: 'manage', label: 'Manage Assessment' },
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
                                {tab === 'assessment' && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m-3-7v3m0 0H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-3" />
                                    </svg>
                                )}
                                {tab === 'manage' && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5M12 6v6m0 0v6m0-6h6m-6 0H6" />
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

                              const handleTimeUpdate = (event, material) => {
                                const watchedSeconds = event.target.currentTime;
                                const videoDuration = event.target.duration;
                              
                                if (Math.floor(watchedSeconds) % 2 !==0) return;
                                axios.post(
                                    'http://localhost:8000/api/v1/progress/update/',
                                    {
                                        video: material.id,
                                        watched_seconds: watchedSeconds,
                                        video_duration: videoDuration
                                    },
                                    {
                                        headers: {
                                        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
                                        "Content-Type": "application/json"
                                        },
                                    }
                                ).catch((err) => console.error("Progress update failed:", err));
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
                                            <video src={mat.file_url || mat.file} controls className="w-full h-48 rounded mb-2 bg-black" onTimeUpdate={(e) => handleTimeUpdate(e, mat)}/>
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
                                          {mat.material_type === 'video' && mat.progress_percent !== undefined && (
                                            <div className="text-green-600 font-medium">
                                                {mat.progress_percent}% Completed
                                            </div>
                                            )}
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
                    {activeTab === 'assessment' && (
                        <div className="py-4">
                            <h3 className="text-lg font-medium mb-4 text-gray-800">Assessment Tools</h3>
                            <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Quiz Creation Card */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                                    <h3 className="text-xl font-bold mb-4 text-blue-700">Create Quiz</h3>
                                    <form onSubmit={async (e) => {
                                        e.preventDefault();
                                        if (!quizForm.title || !quizForm.description || !quizForm.course || !quizForm.start_time || !quizForm.end_time) {
                                            toast.error('All fields are required.');
                                            return;
                                        }
                                        await fetchWithAuth('assessment/quizzes/', {
                                            method: 'POST',
                                            body: JSON.stringify({
                                                ...quizForm,
                                                course: quizForm.course,
                                                start_time: toUTCISOString(quizForm.start_time),
                                                end_time: toUTCISOString(quizForm.end_time),
                                            }),
                                        });
                                        setQuizForm({ title: '', description: '', course: '', start_time: '', end_time: '' });
                                        toast.success('Quiz created!');
                                        fetchQuizzes();
                                        window.dispatchEvent(new CustomEvent('assessment-data-created', { detail: { courseId: quizForm.course } }));
                                    }}>
                                        <input type="text" placeholder="Title" value={quizForm.title} onChange={e => setQuizForm(f => ({ ...f, title: e.target.value }))} className="border p-2 mb-2 w-full rounded" required />
                                        <input type="text" placeholder="Description" value={quizForm.description} onChange={e => setQuizForm(f => ({ ...f, description: e.target.value }))} className="border p-2 mb-2 w-full rounded" required />
                                        <select value={quizForm.course} onChange={e => setQuizForm(f => ({ ...f, course: e.target.value }))} className="border p-2 mb-2 w-full rounded" required>
                                            <option value="">Select Course</option>
                                            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                        </select>
                                        <div className="mb-2">
                                            <label className="block mb-1 font-medium">Start Time *</label>
                                            <input
                                                type="datetime-local"
                                                value={quizForm.start_time}
                                                onChange={e => setQuizForm(f => ({ ...f, start_time: e.target.value }))}
                                                className="border p-2 w-full rounded"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="block mb-1 font-medium">End Time *</label>
                                            <input
                                                type="datetime-local"
                                                value={quizForm.end_time}
                                                onChange={e => setQuizForm(f => ({ ...f, end_time: e.target.value }))}
                                                className="border p-2 w-full rounded"
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Create Quiz</button>
                                    </form>
                                </div>
                                {/* Assignment Creation Card */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100 mb-8">
                                    <h3 className="text-xl font-bold mb-4 text-green-700">Create Assignment</h3>
                                    <form onSubmit={async (e) => {
                                        e.preventDefault();
                                        if (!assignmentForm.title || !assignmentForm.description || !assignmentForm.assignment_type || !assignmentForm.due_date || !assignmentForm.max_points) {
                                            toast.error('All fields are required.');
                                            return;
                                        }
                                        const formData = new FormData();
                                        formData.append('title', assignmentForm.title);
                                        formData.append('description', assignmentForm.description);
                                        formData.append('assignment_type', assignmentForm.assignment_type);
                                        formData.append('due_date', assignmentForm.due_date);
                                        formData.append('max_points', assignmentForm.max_points);
                                        formData.append('course', assignmentForm.course);
                                        if (assignmentForm.assignment_file) formData.append('assignment_file', assignmentForm.assignment_file);

                                        await fetchWithAuth('assessment/assignments/', {
                                            method: 'POST',
                                            body: formData,
                                            headers: {},
                                        });
                                        setAssignmentForm({ title: '', description: '', assignment_type: '', due_date: '', max_points: '', assignment_file: null, course: '' });
                                        toast.success('Assignment created!');
                                        window.dispatchEvent(new CustomEvent('assessment-data-created'));
                                    }}>
                                        <div className="mb-4">
                                            <label className="block mb-1 font-medium">Title *</label>
                                            <input
                                                type="text"
                                                placeholder="Assignment Title"
                                                value={assignmentForm.title}
                                                onChange={e => setAssignmentForm(f => ({ ...f, title: e.target.value }))}
                                                className="border p-2 mb-2 w-full rounded"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-1 font-medium">Description *</label>
                                            <textarea
                                                placeholder="Assignment Description"
                                                value={assignmentForm.description}
                                                onChange={e => setAssignmentForm(f => ({ ...f, description: e.target.value }))}
                                                className="border p-2 mb-2 w-full rounded"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-1 font-medium">Assignment Type *</label>
                                            <select
                                                value={assignmentForm.assignment_type}
                                                onChange={e => setAssignmentForm(f => ({ ...f, assignment_type: e.target.value }))}
                                                className="border p-2 mb-2 w-full rounded"
                                                required
                                            >
                                                <option value="">Select Type</option>
                                                <option value="individual">Individual</option>
                                                <option value="group">Group</option>
                                                <option value="peer_review">Peer Review</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-1 font-medium">Due Date *</label>
                                            <input
                                                type="datetime-local"
                                                value={assignmentForm.due_date}
                                                onChange={e => setAssignmentForm(f => ({ ...f, due_date: e.target.value }))}
                                                className="border p-2 mb-2 w-full rounded"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-1 font-medium">Max Points *</label>
                                            <input
                                                type="number"
                                                value={assignmentForm.max_points}
                                                onChange={e => setAssignmentForm(f => ({ ...f, max_points: e.target.value }))}
                                                className="border p-2 mb-2 w-full rounded"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-1 font-medium">File (optional)</label>
                                            <input
                                                type="file"
                                                onChange={e => setAssignmentForm(f => ({ ...f, assignment_file: e.target.files[0] }))}
                                                className="border p-2 mb-2 w-full rounded"
                                            />
                                        </div>
                                        <div className="mb-4">
                                          <label className="block mb-1 font-medium">Course *</label>
                                          <select
                                            value={assignmentForm.course}
                                            onChange={e => setAssignmentForm(f => ({ ...f, course: e.target.value }))}
                                            className="border p-2 mb-2 w-full rounded"
                                            required
                                          >
                                            <option value="">Select Course</option>
                                            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                          </select>
                                        </div>
                                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
                                            Create Assignment
                                        </button>
                                    </form>
                                </div>
                                {/* Question Creation Card (REPLACED) */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                                    <h3 className="text-xl font-bold mb-4 text-purple-700">Create Question (with Choices)</h3>
                                    <CreateQuestionWithChoices quizzes={quizzes} onCreated={fetchQuestions} fetchWithAuth={fetchWithAuth} />
                                </div>
                                {/* Choice Creation Card */}
                               
                            </div>
                        </div>
                    )}
                    {activeTab === 'manage' && (
                        <div className="py-4">
                            <h3 className="text-lg font-medium mb-4 text-gray-800">Manage Assessment</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                                    <h4 className="font-medium mb-2 text-blue-700">Quizzes</h4>
                                    <ul className="space-y-2">
                                        {allQuizzes.map(q => (
                                            <li key={q.id} className="flex items-center justify-between bg-blue-50 p-2 rounded-lg">
                                                <span>{q.title}</span>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleDelete('quizzes', q.id)}
                                                        className="p-1 text-red-600 hover:bg-red-100 rounded-full"
                                                        title="Delete Quiz"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditQuiz(q.id)}
                                                        className="p-1 text-blue-600 hover:bg-blue-100 rounded-full"
                                                        title="Edit Quiz"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
                                    <h4 className="font-medium mb-2 text-green-700">Questions</h4>
                                    <ul className="space-y-2">
                                        {allQuestions.map(q => (
                                            <li key={q.id} className="flex items-center justify-between bg-green-50 p-2 rounded-lg">
                                                <span>{q.question_text}</span>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleDelete('questions', q.id)}
                                                        className="p-1 text-red-600 hover:bg-red-100 rounded-full"
                                                        title="Delete Question"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditQuestion(q.id)}
                                                        className="p-1 text-blue-600 hover:bg-blue-100 rounded-full"
                                                        title="Edit Question"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                                    <h4 className="font-medium mb-2 text-purple-700">Choices</h4>
                                    <ul className="space-y-2">
                                        {allChoices.map(c => (
                                            <li key={c.id} className="flex items-center justify-between bg-purple-50 p-2 rounded-lg">
                                                <span>{c.choice_text}</span>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleDelete('choices', c.id)}
                                                        className="p-1 text-red-600 hover:bg-red-100 rounded-full"
                                                        title="Delete Choice"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditChoice(c.id)}
                                                        className="p-1 text-blue-600 hover:bg-blue-100 rounded-full"
                                                        title="Edit Choice"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-yellow-100">
                                    <h4 className="font-medium mb-2 text-yellow-700">Assignments</h4>
                                    <div className="bg-white rounded-2xl shadow p-8 border border-gray-100 max-w-4xl mx-auto mt-8">
                                      <h2 className="text-xl font-bold mb-6 text-gray-900">Existing Assignments</h2>
                                      <ul className="space-y-4">
                                        {allAssignments.length === 0 && (
                                          <li className="text-gray-500">No assignments found.</li>
                                        )}
                                        {allAssignments.map(a => (
                                          <li key={a.id} className="flex flex-col md:flex-row md:items-center md:justify-between bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                                            <div>
                                              <div className="font-semibold text-lg text-gray-900">{a.title}</div>
                                              <div className="text-gray-600 text-sm">{a.description}</div>
                                              <div className="text-gray-500 text-xs mt-1">
                                                {a.due_date && <>Due: {new Date(a.due_date).toLocaleDateString()} {new Date(a.due_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</>}
                                              </div>
                                            </div>
                                            <div className="flex gap-6 mt-4 md:mt-0">
                                              <button
                                                onClick={() => handleEditAssignment(a.id)}
                                                className="text-blue-600 hover:underline font-medium"
                                              >
                                                Edit
                                              </button>
                                              <button
                                                onClick={() => handleDelete('assignments', a.id)}
                                                className="text-red-600 hover:underline font-medium"
                                              >
                                                Delete
                                              </button>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {editItem && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h3 className="text-lg font-bold mb-4">Edit {editItem.type.charAt(0).toUpperCase() + editItem.type.slice(1)}</h3>
      <form onSubmit={async (e) => {
        e.preventDefault();
        // Collect updated fields from form inputs
        const updated = {
          ...editItem.data,
          course_id: editItem.data.course_id || editItem.data.course, // use the correct field
          due_date: editItem.data.due_date || "2024-12-31", // set a valid date
          // ...other fields...
        };
        const typeToEndpoint = {
          quiz: 'quizzes',
          question: 'questions',
          choice: 'choices',
          assignment: 'assignments',
        };
        await fetchWithAuth(`assessment/${typeToEndpoint[editItem.type]}/${editItem.data.id}/`, {
          method: 'PATCH',
          body: JSON.stringify(updated),
        });
        // No need to call .json() again!
        setEditItem(null);
        // Refresh lists
        if (editItem.type === 'quiz') fetchWithAuth('assessment/quizzes/').then(setAllQuizzes);
        if (editItem.type === 'question') fetchWithAuth('assessment/questions/').then(setAllQuestions);
        // ...same for choices and assignments
      }}>
        {/* Render form fields based on editItem.type and editItem.data */}
        <input
          type="text"
          value={editItem.data.title || editItem.data.question_text || ''}
          onChange={e => setEditItem({
            ...editItem,
            data: { ...editItem.data, title: e.target.value, question_text: e.target.value }
          })}
          className="border p-2 mb-2 w-full rounded"
        />
        {/* Add more fields as needed */}
        <div className="flex gap-2 justify-end">
          <button type="button" onClick={() => setEditItem(null)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  </div>
)}
        </div>
    );
};

function CreateQuestionWithChoices({ quizzes, onCreated, fetchWithAuth }) {
    const [quizId, setQuizId] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [choices, setChoices] = useState([{ text: "" }, { text: "" }]);
    const [correctIndex, setCorrectIndex] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChoiceChange = (idx, value) => {
        const updated = [...choices];
        updated[idx].text = value;
        setChoices(updated);
    };

    const handleAddChoice = () => setChoices([...choices, { text: "" }]);

    const handleRemoveChoice = (idx) => {
        if (choices.length > 2) {
            setChoices(choices.filter((_, i) => i !== idx));
            if (correctIndex === idx) setCorrectIndex(null);
            else if (correctIndex > idx) setCorrectIndex(correctIndex - 1);
        }
    };

    const handleCorrectChange = (idx) => setCorrectIndex(idx);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!quizId || !questionText || choices.some(c => !c.text) || correctIndex === null) {
            alert("Please fill all fields and select the correct answer.");
            return;
        }
        setLoading(true);
        try {
            // 1. Create the question
            const questionRes = await fetchWithAuth('assessment/questions/', {
                method: 'POST',
                body: JSON.stringify({
                    quiz: quizId,
                    question_text: questionText,
                    question_type: 'mcq',
                    points: 1,
                }),
            });
            const question = questionRes && questionRes.id ? questionRes : (questionRes.results ? questionRes.results[0] : null);
            if (!question || !question.id) throw new Error("Failed to create question");

            // 2. Create all choices
            for (let i = 0; i < choices.length; i++) {
                await fetchWithAuth('assessment/choices/', {
                    method: 'POST',
                    body: JSON.stringify({
                        question: question.id,
                        choice_text: choices[i].text,
                        is_correct: i === correctIndex,
                    }),
                });
            }
            setQuizId("");
            setQuestionText("");
            setChoices([{ text: "" }, { text: "" }]);
            setCorrectIndex(null);
            if (onCreated) onCreated();
            alert("Question and choices created!");
        } catch (err) {
            alert("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
            <div className="mb-2">
                <label className="font-semibold">Quiz</label>
                <select value={quizId} onChange={e => setQuizId(e.target.value)} className="border p-2 mb-2 w-full rounded" required>
                    <option value="">Select Quiz</option>
                    {quizzes.map(q => <option key={q.id} value={q.id}>{q.title}</option>)}
                </select>
            </div>
            <div className="mb-2">
                <label className="font-semibold">Question</label>
                <input
                    type="text"
                    className="w-full border rounded p-2 mt-1"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="font-semibold">Choices</label>
                {choices.map((choice, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                        <input
                            type="radio"
                            name="correct"
                            checked={correctIndex === idx}
                            onChange={() => handleCorrectChange(idx)}
                            className="mr-2 accent-green-500"
                        />
                        <input
                            type="text"
                            className="border rounded p-2 flex-1"
                            value={choice.text}
                            onChange={e => handleChoiceChange(idx, e.target.value)}
                            required
                        />
                        {choices.length > 2 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveChoice(idx)}
                                className="ml-2 text-red-500"
                            >
                                &#10005;
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddChoice}
                    className="text-blue-500 mt-2"
                >
                    + Add Choice
                </button>
            </div>
            <button
                type="submit"
                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? "Saving..." : "Save Question"}
            </button>
        </form>
    );
}
export default InstructorViewPage;