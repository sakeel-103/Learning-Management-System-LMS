import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PythonQuestionsPage = () => {
    const navigate = useNavigate();

    const questions = [
        // MCQ Questions
        {
            id: 1,
            text: "What is the default value of a variable in Python if not initialized?",
            options: ["0", "null", "None", "undefined"],
            correct: 3,
            complexity: "simple",
            explanation: "In Python, if a variable is not initialized, it is set to None by default.",
            type: "mcq",
        },
        {
            id: 2,
            text: "Which keyword is used to define a function in Python?",
            options: ["function", "def", "func", "define"],
            correct: 2,
            complexity: "simple",
            explanation: "The 'def' keyword is used to define a function in Python.",
            type: "mcq",
        },
        {
            id: 3,
            text: "What is the output of 'print(2 ** 3)' in Python?",
            options: ["6", "8", "9", "5"],
            correct: 2,
            complexity: "simple",
            explanation: "The '**' operator in Python is used for exponentiation. 2 ** 3 equals 8.",
            type: "mcq",
        },
        {
            id: 4,
            text: "Which of the following is not a Python data type?",
            options: ["list", "tuple", "array", "set"],
            correct: 3,
            complexity: "simple",
            explanation: "'array' is not a built-in Python data type; it is provided by the 'array' module or NumPy. The others are built-in types.",
            type: "mcq",
        },
        {
            id: 5,
            text: "What does the 'len()' function do in Python?",
            options: ["Returns the type of a variable", "Returns the length of an object", "Converts a string to a list", "Prints a variable"],
            correct: 2,
            complexity: "simple",
            explanation: "The 'len()' function returns the length (number of items) of an object like a string, list, or tuple.",
            type: "mcq",
        },
        {
            id: 6,
            text: "Which method is used to add an element to the end of a list in Python?",
            options: ["add()", "append()", "insert()", "extend()"],
            correct: 2,
            complexity: "simple",
            explanation: "The 'append()' method adds a single element to the end of a list in Python.",
            type: "mcq",
        },
        {
            id: 7,
            text: "What is the output of 'print([1, 2, 3] + [4, 5])' in Python?",
            options: ["[1, 2, 3, 4, 5]", "[5, 7, 8]", "[1, 2, 3][4, 5]", "Error"],
            correct: 1,
            complexity: "simple",
            explanation: "The '+' operator concatenates two lists in Python, resulting in [1, 2, 3, 4, 5].",
            type: "mcq",
        },
        {
            id: 8,
            text: "Which of the following is a mutable data type in Python?",
            options: ["str", "tuple", "list", "int"],
            correct: 3,
            complexity: "simple",
            explanation: "'list' is a mutable data type in Python, meaning its elements can be changed after creation.",
            type: "mcq",
        },
        {
            id: 9,
            text: "What does the 'range(3)' function generate in Python?",
            options: ["[0, 1, 2, 3]", "[1, 2, 3]", "[0, 1, 2]", "Error"],
            correct: 3,
            complexity: "simple",
            explanation: "'range(3)' generates a sequence of numbers from 0 to 2 (excluding 3), i.e., [0, 1, 2] when converted to a list.",
            type: "mcq",
        },
        {
            id: 10,
            text: "Which exception is raised when trying to access an undefined variable in Python?",
            options: ["KeyError", "NameError", "IndexError", "ValueError"],
            correct: 2,
            complexity: "simple",
            explanation: "A 'NameError' is raised when a variable is not defined in the current scope.",
            type: "mcq",
        },
        {
            id: 11,
            text: "What is the purpose of the 'pass' statement in Python?",
            options: ["To exit a loop", "To skip a loop iteration", "A placeholder that does nothing", "To raise an exception"],
            correct: 3,
            complexity: "simple",
            explanation: "The 'pass' statement is a null operation used as a placeholder in Python where syntactically some code is required.",
            type: "mcq",
        },
        {
            id: 12,
            text: "What is the output of 'print(\"Hello\"[1:4])' in Python?",
            options: ["Hell", "ello", "ell", "Hel"],
            correct: 3,
            complexity: "complex",
            explanation: "String slicing in Python with [1:4] extracts characters from index 1 to 3 (excluding 4), resulting in 'ell'.",
            type: "mcq",
        },
        {
            id: 13,
            text: "Which keyword is used to handle exceptions in Python?",
            options: ["try", "catch", "throw", "error"],
            correct: 1,
            complexity: "simple",
            explanation: "The 'try' keyword is used to define a block of code that will be tested for exceptions in Python.",
            type: "mcq",
        },
        {
            id: 14,
            text: "What does the 'zip()' function do in Python?",
            options: ["Compresses files", "Combines multiple iterables into tuples", "Splits a string", "Creates a list"],
            correct: 2,
            complexity: "complex",
            explanation: "The 'zip()' function combines elements from multiple iterables into tuples, e.g., zip([1, 2], ['a', 'b']) yields (1, 'a'), (2, 'b').",
            type: "mcq",
        },
        {
            id: 15,
            text: "Which library is commonly used for data manipulation in Python?",
            options: ["pandas", "tkinter", "pygame", "flask"],
            correct: 1,
            complexity: "simple",
            explanation: "'pandas' is a popular Python library for data manipulation and analysis, providing data structures like DataFrames.",
            type: "mcq",
        },
        // Subjective Questions with Code Snippets
        {
            id: 16,
            text: "Write a Python program to print the first 10 even numbers.",
            complexity: "simple",
            type: "subjective",
            answer: `for i in range(2, 21, 2):
    print(i, end=" ")
# Output: 2 4 6 8 10 12 14 16 18 20`
        },
        {
            id: 17,
            text: "Write a Python program to check if a string is a palindrome.",
            complexity: "simple",
            type: "subjective",
            answer: `s = "radar"
if s == s[::-1]:
    print(f"{s} is a palindrome")
else:
    print(f"{s} is not a palindrome")
# Output: radar is a palindrome`
        },
        {
            id: 18,
            text: "Write a Python program to find the sum of elements in a list.",
            complexity: "simple",
            type: "subjective",
            answer: `numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
print(f"Sum of elements: {total}")
# Output: Sum of elements: 15`
        },
        {
            id: 19,
            text: "Write a Python program to count the occurrences of a character in a string.",
            complexity: "simple",
            type: "subjective",
            answer: `s = "hello world"
char = "l"
count = s.count(char)
print(f"The character '{char}' occurs {count} times in '{s}'")
# Output: The character 'l' occurs 3 times in 'hello world'`
        },
        {
            id: 20,
            text: "Write a Python program to print a square pattern of stars (4x4).",
            complexity: "simple",
            type: "subjective",
            answer: `size = 4
for i in range(size):
    print("* " * size)
# Output:
# * * * * 
# * * * * 
# * * * * 
# * * * *`
        },
    ];

    // State management
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(60);
    const [showExplanation, setShowExplanation] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Timer logic
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
            {/* Main Content */}
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
                                Python Assessment
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Test your knowledge in Python programming with a mix of multiple-choice and subjective questions. Good luck!
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
                                    Check your subjective answers below with provided solutions.
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
                                            <p className="text-sm text-gray-600 mt-2">Sample Solution:</p>
                                            <pre className="text-sm font-mono text-gray-700 bg-blue-50 p-2 rounded mt-1">
                                                {question.answer}
                                            </pre>
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
                                        Python Quiz
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
                                                    className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors ${selectedOption === index + 1 ? "bg-blue-100 text-gray-800" : "hover:bg-gray-50"}`}
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
                                            placeholder="Write your answer here..."
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
                                                className={`w-5 h-5 text-gray-700 transform transition-transform ${showExplanation ? "rotate-180" : ""}`}
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
                                className={`lg:hidden mt-6 bg-white rounded-xl shadow-md p-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? "block" : "hidden"}`}
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
                                    <p className="text-base mb-6 max-w-lg mx-auto">
                                        Explore assessments in other technical domains and elevate your skills to the next level.
                                    </p>
                                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                        <button
                                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                                            onClick={() => navigate("/courses/AssesmentPage")}
                                        >
                                            Explore Courses
                                        </button>
                                        <button
                                            className="px-6 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all shadow-md hover:shadow-lg"
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

export default PythonQuestionsPage;