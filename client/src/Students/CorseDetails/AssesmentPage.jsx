import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HandleDownloadCertificate from "../AssessmentCourses/HandleCertificate";

const API_BASE = "http://127.0.0.1:8000/api/v1";
const API="http://127.0.0.1:8000/api";
const AssessmentPage = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loadingQuizId, setLoadingQuizId] = useState(null);
    const [quizError, setQuizError] = useState("");
    const [certificateLoading, setCertificateLoading] = useState(false);
    const [certificateError, setCertificateError] = useState("");

    // Fetch courses on mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch(`${API_BASE}/course_class/`);
                const data = await res.json();
                setCourses(data);
            } catch {
                setCourses([]);
                alert("Failed to load courses.");
            }
        };
        fetchCourses();
    }, []);

    // Fetch quizzes and assignments when a course is selected
    useEffect(() => {
        if (selectedCourse) {
            const fetchQuizzes = async () => {
                try {
                    const res = await fetch(`${API_BASE}/assessment/quizzes/by_course/${selectedCourse.id}/`);
                    const data = await res.json();
                    setQuizzes(Array.isArray(data) ? data : []);
                } catch {
                    setQuizzes([]);
                }
            };
            const fetchAssignments = async () => {
                try {
                    const res = await fetch(`${API_BASE}/assessment/assignments/?course=${selectedCourse.id}`);
                    setAssignments(await res.json());
                } catch {
                    setAssignments([]);
                }
            };
            fetchQuizzes();
            fetchAssignments();
        } else {
            setQuizzes([]);
            setAssignments([]);
        }
    }, [selectedCourse]);

    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
        setIsSidebarOpen(false);
    };

    const handleBackToCourse = () => {
        setSelectedCourse(null);
        setQuizzes([]);
        setAssignments([]);
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleStartQuiz = async (quizId) => {
        setLoadingQuizId(quizId);
        setQuizError("");
        try {
            const res = await fetch(`${API_BASE}/assessment/quizzes1/start/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quiz_id: quizId })
            });
            if (!res.ok) throw new Error("Failed to start quiz");
            // Optionally, you can use the returned attempt_id for analytics or state
            await res.json();
            navigate(`/AssessmentCourses/${quizId}`);
        } catch (err) {
            setQuizError(err.message);
        } finally {
            setLoadingQuizId(null);
        }
    };

    // Certificate download handler
    const handleDownloadCertificate = async ({
        API_BASE,
        selectedCourse,
        setCertificateLoading,
        setCertificateError,
        navigate
    }) => {
        setCertificateLoading(true);
        setCertificateError("");

        try {
            const token = localStorage.getItem('ACCESS_TOKEN');
            if (!token) throw new Error('Authentication token missing. Please login again.');

            // Use the correct endpoint and send the token
            const res = await fetch(
                `${API}/certification/check-eligibility/?course_id=${selectedCourse.id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            const data = await res.json();

            if (!res.ok || !data.eligible) {
                throw new Error(data.message || 'Not eligible for certificate');
            }

            // Compose HTML certificate
            const html = `<!DOCTYPE html>
<html lang='en'>
<head><meta charset='UTF-8'><title>Certificate of Completion</title></head>
<body style='font-family:sans-serif;text-align:center;padding:40px;background:#f9fafb;'>
  <div style='max-width:600px;margin:auto;background:white;border-radius:16px;box-shadow:0 2px 16px #0001;padding:40px;'>
    <h1 style='color:#2563eb;font-size:2.5rem;margin-bottom:0.5em;'>Certificate of Completion</h1>
    <h2 style='color:#16a34a;margin-bottom:1.5em;'>Traceacademy</h2>
    <p style='font-size:1.2rem;margin-bottom:2em;'>This is to certify that</p>
    <h2 style='font-size:2rem;color:#0f172a;margin-bottom:0.5em;'>${data.user_name || 'Student'}</h2>
    <p style='font-size:1.1rem;margin-bottom:2em;'>has successfully completed the course</p>
    <h3 style='font-size:1.5rem;color:#2563eb;margin-bottom:0.5em;'>${data.course_title}</h3>
    <p style='font-size:1.1rem;margin-bottom:2em;'>Duration: <b>${data.duration || 'N/A'}</b></p>
    <p style='color:#64748b;margin-bottom:2em;'>Issued on: ${new Date().toLocaleDateString()}</p>
    <div style='margin-top:2em;'>
      <span style='font-size:0.9rem;color:#94a3b8;'>Verification Code: ${data.verification_code}</span>
    </div>
  </div>
</body>
</html>`;

            // Download as HTML file
            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Traceacademy_Certificate_${data.course_title.replace(/\s+/g, '_')}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Optionally navigate after download
            if (navigate) {
                navigate('/certi');
            }
        } catch (err) {
            setCertificateError(err.message);
        } finally {
            setCertificateLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
            {/* Sidebar */}
            <button
                className="lg:hidden fixed top-24 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-lg"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                </svg>
            </button>
            <aside
                className={`w-72 bg-white shadow-xl fixed h-screen pt-24 z-40 transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:sticky lg:top-0 lg:h-screen lg:translate-x-0`}
            >
                <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-xl">
                    <h2 className="text-2xl font-bold">Courses</h2>
                </div>
                <nav className="p-6 overflow-y-auto h-[calc(100%-4rem)]">
                    <ul className="space-y-2">
                        {courses.map((course) => (
                            <li key={course.id}>
                                <button
                                    onClick={() => handleCourseSelect(course)}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors font-medium shadow-sm ${
                                        selectedCourse && selectedCourse.id === course.id
                                            ? "bg-gradient-to-r from-blue-100 to-green-100 text-blue-800"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    {course.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
                <div className="w-full max-w-5xl">
                    <div className="text-center mb-12 py-10 px-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl shadow-lg">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-green-600">
                                Assessment & Assignment Portal
                            </span>
                        </h1>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            Test your knowledge and complete assignments across various technical courses. Select a course to get started!
                        </p>
                    </div>

                    {/* Course Details and Features */}
                    {!selectedCourse ? (
                        <div className="bg-white rounded-xl shadow-md p-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Choose a Course</h2>
                            <p className="text-base text-gray-700">
                                Select a course from the sidebar to view available quizzes and assignments.
                            </p>
                        </div>
                    ) : (
                        <div className="mb-16 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                            <div className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                                <div className="flex-1">
                                    <h2 className="text-3xl font-extrabold text-blue-800 mb-2">{selectedCourse.title}</h2>
                                    <p className="text-lg text-gray-700 mb-4">{selectedCourse.description || "Ready to test your knowledge and skills?"}</p>
                                    <div className="flex flex-wrap gap-4 mb-4">
                                        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                            {selectedCourse.level || "All Levels"}
                                        </span>
                                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                            {selectedCourse.category || "General"}
                                        </span>
                                    </div>
                                    <button
                                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg shadow hover:from-blue-700 hover:to-green-700 transition-all"
                                        onClick={handleBackToCourse}
                                    >
                                        Back to Courses
                                    </button>
                                </div>
                                <div className="flex-1 flex flex-col gap-8">
                                    {/* Quizzes */}
                                    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 shadow">
                                        <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Available Quizzes
                                        </h3>
                                        {quizzes.length === 0 ? (
                                            <p className="text-gray-600">No quizzes available for this course.</p>
                                        ) : (
                                            <ul className="space-y-2">
                                                {(Array.isArray(quizzes) ? quizzes : []).map((quiz) => (
                                                    <li key={quiz.id} className="flex items-center justify-between bg-white rounded-lg px-4 py-2 shadow-sm">
                                                        <span className="font-medium text-gray-800">{quiz.title}</span>
                                                        <button
                                                            className="ml-4 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
                                                            onClick={() => navigate(`/AssessmentCourses/${quiz.id}/start`)}
                                                            disabled={loadingQuizId === quiz.id}
                                                        >
                                                            Start Quiz
                                                        </button>
                                                        {quizError && loadingQuizId === quiz.id && <p className="text-red-500 text-sm mt-2">{quizError}</p>}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    {/* Assignments */}
                                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 shadow">
                                        <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Available Assignments
                                        </h3>
                                        {assignments.length === 0 ? (
                                            <p className="text-gray-600">No assignments available for this course.</p>
                                        ) : (
                                            <ul className="space-y-2">
                                                {assignments.map((assignment) => (
                                                    <li key={assignment.id}>
                                                        <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2 shadow-sm">
                                                            <span className="font-medium text-gray-800">{assignment.title}</span>
                                                            <button
                                                                className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                                                onClick={() => alert('Assignment details/submission coming soon!')}
                                                            >
                                                                View / Submit
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    {/* Download Certificate */}
                                    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 shadow mt-6 flex flex-col items-center">
                                        {/* {<h3 className="text-xl font-bold text-indigo-700 mb-3 flex items-center gap-2">
                                            <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Download Certificate
                                        </h3> } */}
                                        <button
                                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition-all"
                                            onClick={() =>
                                                handleDownloadCertificate({
                                                    API_BASE,
                                                    selectedCourse,
                                                    setCertificateLoading,
                                                    setCertificateError,
                                                    navigate
                                                })
                                            }
                                            disabled={certificateLoading}
                                        >
                                            {certificateLoading ? 'Preparing...' : 'Download Certificate'}
                                        </button>
                                        {certificateError && <p className="text-red-500 mt-2">{certificateError}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AssessmentPage;