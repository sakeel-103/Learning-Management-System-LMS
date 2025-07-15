import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import UserNavbar from "../../components/UserNavbar";
import html2canvas from "html2canvas";

import jsPDF from "jspdf";
import { jwtDecode } from "jwt-decode";

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
    const [submittingAssignmentId, setSubmittingAssignmentId] = useState(null);
    const [submittedAssignments, setSubmittedAssignments] = useState({});
    const certificateRef = useRef();
    const [attemptedQuizzes, setAttemptedQuizzes] = useState({});

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

    useEffect(() => {
        const fetchSubmissions = async () => {
            const token = localStorage.getItem('ACCESS_TOKEN');
            if (!token) return;
            const res = await fetch(`${API_BASE}/assessment/assignments/view_assignment_submissions/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const submissions = await res.json();
                const submittedIds = {};
                submissions.forEach(submission => {
                    submittedIds[String(submission.assignment)] = true;
                });
                setSubmittedAssignments(submittedIds);
            }
        };
        fetchSubmissions();
     
      
    }, []);

    useEffect(() => {
        const fetchAttempted = async () => {
            const token = localStorage.getItem('ACCESS_TOKEN');
            if (!token || !quizzes.length) return;
            const attempted = {};
            for (const quiz of quizzes) {
                try {
                    const res = await fetch(`${API_BASE}/assessment/quizzes/${quiz.id}/attempt-status/`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        attempted[quiz.id] = data.attempted;
                    }
                } catch {}
            }
            setAttemptedQuizzes(attempted);
        };
        fetchAttempted();
    }, [quizzes]);

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
            const data = await res.json();
            if (!res.ok) {
                if (data.error && data.error.includes("already submitted")) {
                    alert("You have already submitted this quiz.");
                    return;
                }
                throw new Error(data.error || "Failed to start quiz");
            }
            navigate(`/AssessmentCourses/${quizId}`);
        } catch (err) {
            setQuizError(err.message);
        } finally {
            setLoadingQuizId(null);
        }
    };

    // Certificate download handler
    const handleDownloadCertificate = () => {
        if (!selectedCourse) return;

        // Get user email from localStorage
        let user = JSON.parse(localStorage.getItem("user"));
        let studentEmail = user?.email || "student@example.com";
        let studentName = studentEmail.split("@")[0];

        const courseTitle = selectedCourse.title || "Course Title";
        const today = new Date();
        const dateStr = today.toLocaleDateString();

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "pt",
            format: [900, 650],
        });

        // Blue border
        doc.setDrawColor("#1e293b");
        doc.setLineWidth(8);
        doc.rect(10, 10, 880, 630);

        // Gold accent corners
        doc.setDrawColor("#FFD700");
        doc.setLineWidth(6);
        doc.line(10, 10, 80, 10);
        doc.line(10, 10, 10, 80);
        doc.line(890, 10, 820, 10);
        doc.line(890, 10, 890, 80);
        doc.line(10, 640, 10, 570);
        doc.line(10, 640, 80, 640);
        doc.line(890, 640, 820, 640);
        doc.line(890, 640, 890, 570);

        // Company/Logo (top left)
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor("#1e293b");
        doc.text("TrackAcademy", 40, 60);

        // CERTIFICATE OF COMPLETION
        doc.setFont("times", "bold");
        doc.setFontSize(36);
        doc.setTextColor("#22223b");
        doc.text("CERTIFICATE OF", 450, 120, { align: "center" });
        doc.text("COMPLETION", 450, 170, { align: "center" });

        // Student Name (script font)
        doc.setFont("times", "italic");
        doc.setFontSize(32);
        doc.setTextColor("#2563eb");
        doc.text(studentName.replace(/[^a-zA-Z0-9 ]/g, ''), 450, 230, { align: "center" });

        // Completion statement
        doc.setFont("helvetica", "normal");
        doc.setFontSize(16);
        doc.setTextColor("#22223b");
        doc.text(
            "has successfully completed the online course:",
            450,
            260,
            { align: "center" }
        );

        // Course Title
        doc.setFont("times", "bold");
        doc.setFontSize(22);
        doc.setTextColor("#1e293b");
        doc.text(courseTitle.toUpperCase(), 450, 295, { align: "center" });

        // Description
        doc.setFont("helvetica", "normal");
        doc.setFontSize(13);
        doc.setTextColor("#444");
        doc.text(
            "This professional has demonstrated initiative and a commitment to deepening their skills and advancing their career. Well done!",
            450,
            330,
            { align: "center", maxWidth: 700 }
        );

        // Date and signature
        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.setTextColor("#22223b");
        doc.text(`Date: ${dateStr}`, 120, 570);
        doc.text("CEO, TrackAcademy", 700, 570);
        doc.setFontSize(12);
        doc.text("(Signature)", 700, 590);

        // Badge (top right)
        doc.setDrawColor("#FFD700");
        doc.setFillColor("#FFD700");
        doc.circle(820, 70, 45, "FD");
        doc.setDrawColor("#1e293b");
        doc.setFillColor("#fff");
        doc.circle(820, 70, 35, "FD");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(28);
        doc.setTextColor("#1e293b");
        doc.text("DE", 820, 80, { align: "center" });

        // Save PDF
        doc.save(`Certificate_${courseTitle.replace(/\s+/g, "_")}.pdf`);
    };

    // Instructor check
    let isInstructor = false;
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            // Accept both 'role' and 'user_type' for compatibility
            isInstructor = decoded.role === '2' || decoded.user_type === 2 || decoded.user_type === '2';
        } catch (e) {
            isInstructor = false;
        }
    }

    if (!token) {
      alert("You are not logged in. Please log in again.");
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        alert("Session expired, please log in again.");
        localStorage.clear();
        navigate("/login");
        return;
      }
    } catch (e) {
      alert("Invalid session, please log in again.");
      localStorage.clear();
      navigate("/login");
      return;
    }

    return (
        <>
            <UserNavbar />
            <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-green-50 mt-12">
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
                    className={`w-56 bg-white shadow-2xl border-r border-blue-100 fixed h-screen pt-24 z-40 transition-transform duration-300 ease-in-out
                        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:sticky lg:top-0 lg:h-screen lg:translate-x-0`}
                >
                    <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-xl shadow">
                        <h2 className="text-2xl font-bold tracking-tight">Courses</h2>
                    </div>
                    <nav className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
                        <ul className="space-y-1">
                            {courses.map((course) => (
                                <li key={course.id}>
                                    <button
                                        onClick={() => handleCourseSelect(course)}
                                        className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors font-medium shadow-sm border border-transparent hover:border-blue-300 hover:shadow-md
                                            ${selectedCourse && selectedCourse.id === course.id
                                                ? "bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 border-blue-400"
                                                : "text-gray-700 hover:bg-gray-100"}
                                        `}
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
                        <div className="text-center mb-12 py-10 px-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl shadow-2xl border border-blue-100">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
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
                            <div className="bg-white rounded-2xl shadow-xl p-10 text-center border border-blue-100">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">Choose a Course</h2>
                                <p className="text-base text-gray-700">
                                    Select a course from the sidebar to view available quizzes and assignments.
                                </p>
                            </div>
                        ) : (
                            <div className="mb-16 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                                <div className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                                    <div className="flex-1 md:max-w-xl">
                                        <h2 className="text-3xl font-extrabold text-blue-800 mb-2 tracking-tight">{selectedCourse.title}</h2>
                                        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-justify hidden sm:block">
                                            {(selectedCourse.course_description || "Ready to test your knowledge and skills?")
                                                .split(/\n{2,}/)
                                                .map((para, idx) => (
                                                    <span key={idx}>{para.trim()}<br/></span>
                                                ))}
                                        </p>
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
                                        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-2 sm:p-4 md:p-6 shadow-xl border border-blue-100">
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
                                                    {(Array.isArray(quizzes) ? quizzes : []).map((quiz) => {
                                                        const now = new Date();
                                                        const start = quiz.start_time ? new Date(quiz.start_time) : null;
                                                        const end = quiz.end_time ? new Date(quiz.end_time) : null;
                                                        let canStart = false;
                                                        if (start && end) {
                                                            canStart = now >= start && now < end;
                                                        } else if (start) {
                                                            canStart = now >= start;
                                                        } else if (end) {
                                                            canStart = now < end;
                                                        } else {
                                                            canStart = true;
                                                        }
                                                        const isAttempted = attemptedQuizzes[quiz.id];

                                                        return (
                                                            <li key={quiz.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-lg px-4 py-2 shadow-sm border border-blue-100 hover:shadow-md transition">
                                                                <div className="flex-1">
                                                                    <span className="font-medium text-gray-800 block">{quiz.title}</span>
                                                                    <div className="text-xs text-gray-500 mt-1">
                                                                        {quiz.start_time && (
                                                                            <div className="font-bold text-blue-700">Start time: {new Date(quiz.start_time).toLocaleString()}</div>
                                                                        )}
                                                                        {quiz.end_time && (
                                                                            <div className="font-bold text-red-700">End time: {new Date(quiz.end_time).toLocaleString()}</div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 sm:mt-0">
                                                                    {isAttempted ? (
                                                                        <button
                                                                            className="ml-4 px-4 py-1 rounded font-semibold shadow min-w-[110px] text-center bg-gray-400 text-white cursor-not-allowed"
                                                                            disabled
                                                                        >
                                                                            Submitted
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            className="ml-4 px-4 py-1 rounded font-semibold shadow min-w-[110px] text-center bg-blue-600 text-white hover:bg-blue-700 transition"
                                                                            onClick={() => navigate(`/AssessmentCourses/${quiz.id}/start`)}
                                                                        >
                                                                            Start Quiz
                                                                        </button>
                                                                    )}
                                                                    {quizError && loadingQuizId === quiz.id && <p className="text-red-500 text-sm mt-2">{quizError}</p>}
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            )}
                                        </div>
                                        {/* Assignments */}
                                        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-2 sm:p-4 md:p-6 shadow-xl border border-green-100">
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
                                                    {assignments.map((assignment) => {
                                                        const isSubmitted = submittedAssignments[String(assignment.id)];
                                                        console.log(`Assignment: ${assignment.id}, isSubmitted: ${isSubmitted}`);
                                                        return (
                                                            <li key={assignment.id}>
                                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between bg-white rounded-lg px-4 py-2 shadow-sm border border-green-100 hover:shadow-md transition">
                                                                    <span className="font-medium text-gray-800 mb-2 sm:mb-0 sm:flex-1">{assignment.title}</span>
                                                                    <form
                                                                        className="flex gap-2 items-center"
                                                                        onSubmit={async (e) => {
                                                                            e.preventDefault();
                                                                            const fileInput = e.target.elements[`file-${assignment.id}`];
                                                                            if (!fileInput.files.length) return;
                                                                            setSubmittingAssignmentId(assignment.id);
                                                                            const formData = new FormData();
                                                                            formData.append("submission_file", fileInput.files[0]);
                                                                            const token = localStorage.getItem('ACCESS_TOKEN');
                                                                            if (!token) {
                                                                                alert("You are not logged in. Please log in again.");
                                                                                navigate("/login");
                                                                                return;
                                                                            }
                                                                            try {
                                                                                const decoded = jwtDecode(token);
                                                                                const now = Date.now() / 1000;
                                                                                if (decoded.exp < now) {
                                                                                    alert("Session expired, please log in again.");
                                                                                    localStorage.clear();
                                                                                    navigate("/login");
                                                                                    return;
                                                                                }
                                                                                const res = await fetch(
                                                                                    `http://127.0.0.1:8000/api/v1/assessment/assignments/${assignment.id}/student_upload/`,
                                                                                    {
                                                                                        method: "POST",
                                                                                        headers: { Authorization: `Bearer ${token}` },
                                                                                        body: formData,
                                                                                    }
                                                                                );
                                                                                if (res.status === 401) {
                                                                                    alert("Session expired, please log in again.");
                                                                                    localStorage.clear();
                                                                                    navigate("/login");
                                                                                    return;
                                                                                }
                                                                                if (res.ok) {
                                                                                    setSubmittedAssignments((prev) => ({
                                                                                        ...prev,
                                                                                        [assignment.id]: true,
                                                                                    }));
                                                                                } else {
                                                                                    alert("Submission failed.");
                                                                                }
                                                                            } catch {
                                                                                alert("Submission failed.");
                                                                            } finally {
                                                                                    setSubmittingAssignmentId(null);
                                                                                }
                                                                            }}
                                                                        >
                                                                            {assignment.assignment_file && (
                                                                                <a
                                                                                    href={assignment.assignment_file}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold shadow text-sm min-w-[110px] text-center"
                                                                                    style={{ whiteSpace: "nowrap" }}
                                                                                >
                                                                                    View
                                                                                </a>
                                                                            )}
                                                                            {!isSubmitted && (
                                                                                <>
                                                                                    <label className="relative cursor-pointer bg-white border border-blue-300 rounded px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-50 shadow-sm min-w-[110px] text-center">
                                                                                        <span>
                                                                                            Choose File
                                                                                        </span>
                                                                                        <input
                                                                                            type="file"
                                                                                            name={`file-${assignment.id}`}
                                                                                            className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                                                                                            required
                                                                                        />
                                                                                    </label>
                                                                                    <button
                                                                                        type="submit"
                                                                                        className={`px-3 py-1 rounded text-sm font-semibold shadow min-w-[110px] text-center ${
                                                                                            isSubmitted
                                                                                                ? "bg-gray-400 text-white cursor-not-allowed"
                                                                                                : "bg-blue-600 text-white hover:bg-blue-700 transition"
                                                                                        }`}
                                                                                        disabled={isSubmitted || submittingAssignmentId === assignment.id}
                                                                                    >
                                                                                        {isSubmitted
                                                                                            ? "Submitted"
                                                                                            : submittingAssignmentId === assignment.id
                                                                                            ? "Submitting..."
                                                                                            : "Submit"}
                                                                                    </button>
                                                                                </>
                                                                            )}
                                                                            {isSubmitted && (
                                                                                <span className="px-3 py-1 bg-green-200 text-green-800 rounded font-semibold text-sm">Submitted</span>
                                                                            )}
                                                                        </form>
                                                                    </div>
                                                                </li>
                                                            );
                                                        })}
                                                </ul>
                                            )}
                                        </div>
                                        {/* Download Certificate */}
                                        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 shadow-xl mt-6 flex flex-col items-center border border-indigo-100">
                                            <button
                                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition-all"
                                                onClick={handleDownloadCertificate}
                                            >
                                                Download Certificate
                                            </button>
                                            {certificateError && <p className="text-red-500 mt-2">{certificateError}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {isInstructor && selectedCourse && (
                            <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 my-8 shadow">
                                <h3 className="text-lg font-bold text-yellow-800 mb-2">Instructor Tools</h3>
                                <p className="text-yellow-700 mb-2">You are an instructor. Here you can add new quizzes and assignments for this course.</p>
                                {/* TODO: Add forms/components for creating quizzes and assignments here */}
                                <div className="flex gap-4">
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">Create Quiz</button>
                                    <button className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600">Create Assignment</button>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Hidden certificate for rendering */}
                    {/* <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
                        <CertificateTemplate
                            ref={certificateRef}
                            studentName={user?.name || "Student Name"}
                            courseTitle={selectedCourse?.title || "Course Title"}
                        />
                    </div> */}
                </main>
            </div>
        </>
    );
};

export default AssessmentPage;

