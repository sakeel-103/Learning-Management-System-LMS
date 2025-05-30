import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HtmlQuestionsPage = () => {
    const navigate = useNavigate();

    const questions = [
        {
            id: 1,
            text: "What is the correct HTML element for the largest heading?",
            options: ["<h6>", "<head>", "<h1>", "<heading>"],
            correct: 3,
            complexity: "simple",
            explanation: "The <h1> element is used for the largest heading in HTML, providing the highest level of importance and visibility.",
            type: "mcq",
        },
        {
            id: 2,
            text: "Which HTML5 element is used to define navigation links?",
            options: ["<nav>", "<link>", "<menu>", "<navbar>"],
            correct: 1,
            complexity: "complex",
            explanation: "The <nav> element is a semantic HTML5 element used to define a block of navigation links, improving accessibility and SEO.",
            type: "mcq",
        },
        {
            id: 3,
            text: "What does the 'alt' attribute in an <img> tag do?",
            options: ["Sets image size", "Provides alternative text", "Links to another page", "Defines image source"],
            correct: 2,
            complexity: "simple",
            explanation: "The 'alt' attribute provides alternative text for an image, used by screen readers and displayed if the image fails to load.",
            type: "mcq",
        },
        {
            id: 4,
            text: "Which tag is used to create a hyperlink?",
            options: ["<a>", "<link>", "<href>", "<url>"],
            correct: 1,
            complexity: "simple",
            explanation: "The <a> tag, with the 'href' attribute, is used to create hyperlinks to other web pages or resources.",
            type: "mcq",
        },
        {
            id: 5,
            text: "What is the purpose of the <meta charset='UTF-8'> tag?",
            options: ["Sets page title", "Defines character encoding", "Links CSS", "Embeds JavaScript"],
            correct: 2,
            complexity: "complex",
            explanation: "The <meta charset='UTF-8'> tag specifies the character encoding for the HTML document, ensuring proper text display.",
            type: "mcq",
        },
        {
            id: 6,
            text: "Which element is used to group inline elements?",
            options: ["<div>", "<span>", "<section>", "<article>"],
            correct: 2,
            complexity: "simple",
            explanation: "The <span> element is used to group inline elements for styling or scripting without affecting the document structure.",
            type: "mcq",
        },
        {
            id: 7,
            text: "What is the role of the <footer> element in HTML5?",
            options: ["Defines page header", "Contains navigation", "Holds footer content", "Embeds media"],
            correct: 3,
            complexity: "simple",
            explanation: "The <footer> element is a semantic tag that typically contains footer content like copyright or contact information.",
            type: "mcq",
        },
        {
            id: 8,
            text: "Which input type is used for email validation in HTML5 forms?",
            options: ["type='text'", "type='email'", "type='url'", "type='submit'"],
            correct: 2,
            complexity: "complex",
            explanation: "The 'type=email' input validates that the entered text follows an email format, enhancing form usability.",
            type: "mcq",
        },
        {
            id: 9,
            text: "What does the <canvas> element do?",
            options: ["Embeds video", "Draws graphics", "Creates tables", "Defines forms"],
            correct: 2,
            complexity: "simple",
            explanation: "The <canvas> element provides a drawing surface for graphics, animations, or games using JavaScript.",
            type: "mcq",
        },
        {
            id: 10,
            text: "Which attribute makes an input field mandatory?",
            options: ["required", "mandatory", "validate", "must"],
            correct: 1,
            complexity: "simple",
            explanation: "The 'required' attribute ensures that an input field must be filled out before submitting a form.",
            type: "mcq",
        },
        {
            id: 11,
            text: "Write the HTML code to create a simple webpage with a heading 'Welcome' and a paragraph 'This is my first webpage!'.",
            complexity: "simple",
            type: "subjective",
        },
        {
            id: 12,
            text: "Create an HTML form with a text input for a username and a submit button.",
            complexity: "complex",
            type: "subjective",
        },
        {
            id: 13,
            text: "Write the HTML code to embed an image with the source 'image.jpg' and an alt text 'Sample Image'.",
            complexity: "simple",
            type: "subjective",
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(60);
    const [showExplanation, setShowExplanation] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const question = questions[currentQuestion];
        const timerDuration = question.complexity === "complex" ? 90 : 60;
        setTimeLeft(timerDuration);

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    handleNext();
                    return prev;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestion]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleOptionChange = (optionIndex) => {
        setSelectedOption(optionIndex);
        setAnswers({ ...answers, [currentQuestion]: { type: "mcq", value: optionIndex } });
    };

    const handleSubjectiveChange = (e) => {
        setAnswers({ ...answers, [currentQuestion]: { type: "subjective", value: e.target.value } });
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            const prevAnswer = answers[currentQuestion - 1];
            setSelectedOption(prevAnswer && prevAnswer.type === "mcq" ? prevAnswer.value : null);
            setShowExplanation(false);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            const nextAnswer = answers[currentQuestion + 1];
            setSelectedOption(nextAnswer && nextAnswer.type === "mcq" ? nextAnswer.value : null);
            setShowExplanation(false);
        } else {
            handleSubmit();
        }
    };

    const handleQuestionSelect = (index) => {
        setCurrentQuestion(index);
        const answer = answers[index];
        setSelectedOption(answer && answer.type === "mcq" ? answer.value : null);
        setShowExplanation(false);
        setIsSidebarOpen(false);
    };

    const calculateScore = () => {
        let mcqScore = 0;
        const mcqQuestions = questions.filter((q) => q.type === "mcq");
        mcqQuestions.forEach((question, index) => {
            const userAnswer = answers[index];
            if (userAnswer && userAnswer.type === "mcq" && userAnswer.value === question.correct) {
                mcqScore += 1;
            }
        });
        return mcqScore;
    };

    const handleSubmit = () => {
        const finalScore = calculateScore();
        setScore(finalScore);
        setShowScore(true);
        console.log("User answers:", answers);
    };

    const handleBackToCourse = () => {
        navigate("/courses/AssesmentPage");
    };

    const handleRetakeQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setAnswers({});
        setTimeLeft(60);
        setShowExplanation(false);
        setShowScore(false);
        setScore(0);
        setIsSidebarOpen(false);
    };

    const toggleExplanation = () => {
        setShowExplanation(!showExplanation);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-50 flex-col lg:flex-row overflow-x-hidden">
            <div className="flex-1 w-full max-w-full lg:pr-72 lg:pl-4 px-0">
                <div className="p-4 sm:p-8 pt-20 sm:pt-24 pb-8">
                    {/* Mobile Sidebar Toggle */}
                    <button
                        className="lg:hidden mb-4 w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-all"
                        onClick={toggleSidebar}
                        aria-label="Toggle question navigation"
                    >
                        <svg
                            className="w-5 h-5"
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
                        <span>{isSidebarOpen ? "Hide Navigation" : "Show Navigation"}</span>
                    </button>

                    {/* Header */}
                    <div className="text-center mb-16 py-12 px-4 bg-gradient-to-r from-green-50 to-indigo-50 rounded-xl shadow-sm">
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-indigo-600">
                                HTML Assessment
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Test your HTML knowledge with a mix of multiple-choice and subjective questions. Good luck!
                        </p>
                    </div>

                    {/* Show Score Summary or Quiz Content */}
                    {showScore ? (
                        <div className="bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                Your Assessment Results
                            </h2>
                            <div className="mb-6">
                                <p className="text-lg font-medium text-gray-700">
                                    Your Score: {score} / {questions.filter((q) => q.type === "mcq").length} (MCQs)
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Subjective answers are pending evaluation by an instructor.
                                </p>
                            </div>

                            {/* MCQ Results */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">MCQ Results</h3>
                                {questions.map((question, index) => {
                                    if (question.type !== "mcq") return null;
                                    const userAnswer = answers[index];
                                    const isCorrect = userAnswer && userAnswer.value === question.correct;
                                    return (
                                        <div
                                            key={question.id}
                                            className="border border-gray-200 rounded-lg p-4 mb-4"
                                        >
                                            <p className="text-sm font-medium text-gray-800">
                                                Q{question.id}. {question.text}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Your Answer: {userAnswer ? question.options[userAnswer.value - 1] : "Not answered"}
                                            </p>
                                            <p className={`text-sm mt-1 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                                                {isCorrect ? "Correct" : "Incorrect"}
                                            </p>
                                            {!isCorrect && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Correct Answer: {question.options[question.correct - 1]}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Subjective Answers */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Subjective Answers</h3>
                                {questions.map((question, index) => {
                                    if (question.type !== "subjective") return null;
                                    const userAnswer = answers[index];
                                    return (
                                        <div
                                            key={question.id}
                                            className="border border-gray-200 rounded-lg p-4 mb-4"
                                        >
                                            <p className="text-sm font-medium text-gray-800">
                                                Q{question.id}. {question.text}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">Your Answer:</p>
                                            <pre className="text-sm font-mono text-gray-700 bg-gray-50 p-2 rounded mt-1">
                                                {userAnswer && userAnswer.value ? userAnswer.value : "Not answered"}
                                            </pre>
                                            <p className="text-sm text-gray-600 mt-1">Status: Pending evaluation</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex flex-wrap gap-4 justify-between">
                                <button
                                    onClick={handleBackToCourse}
                                    className="px-6 py-3 border-2 border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-all shadow-md hover:shadow-lg"
                                >
                                    Back to Courses
                                </button>
                                <button
                                    onClick={handleRetakeQuiz}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                                >
                                    Retake Quiz
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Quiz Content */}
                            <div className="bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <div className="mb-6">
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                        HTML Quiz
                                    </h2>
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-lg font-medium text-gray-700">
                                            Question {currentQuestion + 1} of {questions.length}
                                        </p>
                                        <p className="text-sm sm:text-base text-gray-700">
                                            Time Left: <span className="font-semibold">{formatTime(timeLeft)}</span>
                                        </p>
                                    </div>
                                    <p className="text-lg sm:text-base text-gray-800">{questions[currentQuestion].text}</p>
                                </div>

                                {/* MCQ or Subjective Input */}
                                {questions[currentQuestion].type === "mcq" ? (
                                    <div className="space-y-1">
                                        {questions[currentQuestion].options.map((option, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                                <label
                                                    className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors ${selectedOption === index + 1 ? "bg-blue-100 text-gray-800" : "hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <div className="flex items-center">
                                                        <span className="text-gray-500 mr-3 font-medium">{index + 1}.</span>
                                                        <span className="text-sm sm:text-base text-gray-700">{option}</span>
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name="option"
                                                        value={index + 1}
                                                        checked={selectedOption === index + 1}
                                                        onChange={() => handleOptionChange(index + 1)}
                                                        className="form-radio h-4 w-4 text-blue-400"
                                                    />
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="mt-4">
                                        <textarea
                                            className="w-full h-32 p-4 border border-gray-200 rounded-lg text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Write your HTML code here..."
                                            value={answers[currentQuestion]?.value || ""}
                                            onChange={handleSubjectiveChange}
                                        />
                                    </div>
                                )}

                                {/* Explanation for MCQs */}
                                {questions[currentQuestion].type === "mcq" && (
                                    <div className="mt-4">
                                        <button
                                            onClick={toggleExplanation}
                                            className="w-full px-6 py-4 text-left flex justify-between items-center border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
                                        >
                                            <h3 className="text-lg font-medium text-gray-800">
                                                {showExplanation ? "Hide Explanation" : "Discuss It"}
                                            </h3>
                                            <svg
                                                className={`w-5 h-5 text-gray-700 transform transition-transform ${showExplanation ? "rotate-180" : ""
                                                    }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {showExplanation && (
                                            <div className="mt-2 px-6 py-4 bg-blue-50 rounded-lg">
                                                <div className="flex">
                                                    <span className="text-gray-400 mr-3 font-medium">→</span>
                                                    <p className="text-sm sm:text-base text-gray-700">
                                                        {questions[currentQuestion].explanation}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="mt-12 flex flex-wrap gap-4 justify-between">
                                    <button
                                        onClick={handleBackToCourse}
                                        className="px-6 py-3 border-2 border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-all shadow-md hover:shadow-lg"
                                    >
                                        Back to Courses
                                    </button>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handlePrevious}
                                            disabled={currentQuestion === 0}
                                            className={`px-6 py-3 font-medium rounded-lg transition-all shadow-md hover:shadow-lg ${currentQuestion === 0
                                                ? "bg-gray-200 text-gray-900 cursor-not-allowed"
                                                : "bg-white text-indigo-600 hover:bg-gray-100"
                                                }`}
                                        >
                                            Previous
                                        </button>
                                        {currentQuestion < questions.length - 1 ? (
                                            <button
                                                onClick={handleNext}
                                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                                            >
                                                Next
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleSubmit}
                                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                                            >
                                                Submit
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-6">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-blue-600 to-green-600 h-3 rounded-full transition-all duration-300"
                                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Sidebar (Question Navigation) */}
                            <div
                                className={`lg:hidden mt-6 bg-white rounded-xl shadow-md p-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? "block" : "hidden"
                                    }`}
                            >
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                                    Question Navigation
                                </h3>
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 shadow-sm">
                                    <div className="grid grid-cols-5 gap-2">
                                        {questions.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleQuestionSelect(index)}
                                                className={`p-2 rounded-full text-sm font-medium transition-colors ${index === currentQuestion
                                                    ? "bg-blue-100 text-blue-700"
                                                    : answers[index] !== undefined
                                                        ? "bg-gray-100 text-gray-700"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                    }`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* CTA Section */}
                            <section className="py-10 px-6 bg-gradient-to-r from-blue-400 to-green-800 text-white rounded-xl shadow-md mt-16">
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
                                            onClick={() => navigate("/assessment")}
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
                        </>
                    )}
                </div>
            </div>

            {/* Right Sidebar for Question Navigation (Desktop) */}
            <div className="hidden lg:block w-64 bg-white shadow-lg rounded-xl m-4 fixed right-4 top-24 h-[calc(100vh-8rem)]">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Question Navigation</h2>
                </div>
                <div className="p-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 shadow-sm">
                        <div className="grid grid-cols-4 gap-2">
                            {questions.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuestionSelect(index)}
                                    className={`p-2 rounded-full text-sm font-medium transition-colors ${index === currentQuestion
                                        ? "bg-blue-100 text-blue-700"
                                        : answers[index] !== undefined
                                            ? "bg-gray-100 text-gray-700"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HtmlQuestionsPage;