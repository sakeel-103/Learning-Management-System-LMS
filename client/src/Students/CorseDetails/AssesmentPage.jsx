import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AssessmentPage = () => {
    const navigate = useNavigate();

    const courses = [
        {
            id: "html",
            name: "HTML",
            bannerTitle: "Master HTML5 in 2025",
            bannerDesc: "Build the foundation of web development with HTML. Start your quiz to test your skills!",
            bannerCode: `// HTML Example\nconst html = "<h1>Hello, World!</h1>";`,
        },
        {
            id: "dsa",
            name: "Data Structures & Algorithms",
            bannerTitle: "Data Structure & Algorithms in 2025",
            bannerDesc: "Sharpen your problem-solving skills with Data Structures & Algorithms. Take the quiz now!",
            bannerCode: `// DSA Example\nconst stack = new Stack();\nstack.push(5);`,
        },
        {
            id: "web-dev",
            name: "Web Development (Full Stack)",
            bannerTitle: "Become a Full Stack Developer in 2025",
            bannerDesc: "Master both frontend and backend with our Web Development quiz. Get started!",
            bannerCode: `// Web Dev Example\nconst app = express();\napp.get('/', (req, res) => res.send('Hello'));`,
        },
        {
            id: "ai-ml",
            name: "AI & Machine Learning",
            bannerTitle: "AI & ML in 2025",
            bannerDesc: "Explore the future of technology with AI & Machine Learning. Test your knowledge now!",
            bannerCode: `// AI/ML Example\nconst model = tf.sequential();\nmodel.add(tf.layers.dense({units: 1}));`,
        },
        {
            id: "python",
            name: "Python",
            bannerTitle: "Master Python in 2025",
            bannerDesc: "Unlock the power of Python programming. Start your quiz to evaluate your skills!",
            bannerCode: `// Python Example\ndef greet():\n    print("Hello, Python!");`,
        },
        {
            id: "java",
            name: "Java with Backend",
            bannerTitle: "Java & Backend in 2025",
            bannerDesc: "Build robust backend systems with Java. Take the quiz to test your expertise!",
            bannerCode: `// Java Example\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}`,
        },
    ];

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleCourseSelect = (courseId) => {
        setSelectedCourse(courseId);
        setIsSidebarOpen(false);
    };

    const handleBackToCourse = () => {
        navigate("/");
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleStartQuiz = (courseId) => {
        const newPath = courseId === "dsa"
            ? `/AssessmentCourses/data-structure-algorithm`
            : `/AssessmentCourses/${courseId}-questions-page`;
        navigate(newPath);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile Sidebar Toggle */}
            <button
                className="lg:hidden fixed top-24 left-4 z-50 p-2 bg-blue-500 text-white rounded-md focus:outline-none"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                </svg>
            </button>

            {/* Sidebar for Course Selection */}
            <div
                className={`w-64 bg-white shadow-md fixed h-[calc(100vh-5rem)] transition-transform duration-300 ease-in-out z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:sticky lg:top-0 lg:h-screen lg:translate-x-0`}
                style={{ top: "5rem" }}
            >
                <div className="p-4 border-b pt-14">
                    <h2 className="text-xl font-bold text-gray-800">Course Assessments</h2>
                </div>
                <div className="h-[calc(100%-4rem)]">
                    <nav className="p-4">
                        <ul className="space-y-2">
                            {courses.map((course) => (
                                <li key={course.id}>
                                    <button
                                        onClick={() => handleCourseSelect(course.id)}
                                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${selectedCourse === course.id
                                            ? "bg-blue-100 text-blue-700 font-medium"
                                            : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        {course.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full overflow-x-hidden lg:ml-0 lg:px-4">
                <div className="p-4 sm:p-8 pt-20 sm:pt-24 pb-8">
                    <div className="text-center mb-16 py-12 px-4 bg-gradient-to-r from-green-50 to-indigo-50 rounded-xl shadow-sm">
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-indigo-600">
                                Course Assessment Portal
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Test your knowledge with our comprehensive assessments across various technical courses. Select a course to get started!
                        </p>
                    </div>

                    {/* Course-Specific Banner */}
                    {!selectedCourse ? (
                        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Choose a Course</h2>
                            <p className="text-sm sm:text-base text-gray-700">
                                Select a course from the sidebar to start your assessment journey.
                            </p>
                        </div>
                    ) : (
                        <div className="mb-16 bg-gradient-to-r from-blue-400 to-green-800 rounded-2xl shadow-xl overflow-hidden border border-white/10">
                            <div className="relative p-4 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                                <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                                {/* Content */}
                                <div className="relative z-10 mb-6 md:mb-0 md:mr-8">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                            {courses.find((c) => c.id === selectedCourse).bannerTitle.split(" in")[0]}
                                        </span>{" "}
                                        in 2025
                                    </h2>
                                    <p className="text-base sm:text-lg text-white/90 max-w-lg">
                                        {courses.find((c) => c.id === selectedCourse).bannerDesc}
                                    </p>
                                    <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                        <button
                                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                                            onClick={() => handleStartQuiz(selectedCourse)}
                                        >
                                            Start Your Quiz
                                        </button>
                                        <button
                                            className="px-6 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
                                            onClick={handleBackToCourse}
                                        >
                                            Back to Courses
                                        </button>
                                    </div>
                                </div>

                                {/* Code Snippet */}
                                <div className="relative z-10 bg-green-900/80 backdrop-blur-sm p-5 rounded-xl border border-white/10 shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300 w-full md:w-auto">
                                    <div className="flex space-x-2 mb-3">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <pre className="text-yellow-400 font-mono text-xs sm:text-sm overflow-x-auto">
                                        <code>{courses.find((c) => c.id === selectedCourse).bannerCode}</code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CTA Section */}
                    <section className="py-10 px-6 bg-gradient-to-r from-blue-400 to-green-800 text-white rounded-xl shadow-md">
                        <div className="max-w-6xl mx-auto text-center relative">
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
                                Ready to Test More Courses?
                            </h2>
                            <p className="text-base sm:text-base mb-6 max-w-lg mx-auto">
                                Explore assessments in other technical domains and elevate your skills to the next level.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <button
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                                    onClick={() => navigate("/courses")}
                                >
                                    Explore Courses
                                </button>
                                <button
                                    className="px-6 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
                                    onClick={() => navigate("/contact")}
                                >
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AssessmentPage;