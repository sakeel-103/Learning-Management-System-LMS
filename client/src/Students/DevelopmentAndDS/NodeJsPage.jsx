import React, { useState } from "react";

const NodejsPage = () => {
    const [activeSection, setActiveSection] = useState("introduction");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showMore, setShowMore] = useState(false); // State to toggle visibility of sections after HTTP Server

    // FAQ open/close state
    const faqs = [
        {
            question: "What is Node.js?",
            answer: "Node.js is a JavaScript runtime built on Chrome's V8 engine, allowing you to run JavaScript on the server side to build scalable network applications.",
        },
        {
            question: "Is Node.js single-threaded?",
            answer: "Yes, Node.js is single-threaded but uses an event-driven, non-blocking I/O model to handle concurrency efficiently.",
        },
        {
            question: "What are modules in Node.js?",
            answer: "Modules are reusable pieces of code in Node.js, encapsulated in separate files, which can be imported using require() or ES modules.",
        },
        {
            question: "What is the Event Loop in Node.js?",
            answer: "The Event Loop is a core concept in Node.js that manages asynchronous operations, ensuring non-blocking execution of code.",
        },
        {
            question: "What is Express in Node.js?",
            answer: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and API applications.",
        },
        {
            question: "What is middleware in Node.js?",
            answer: "Middleware functions are functions that have access to the request and response objects and can modify them or terminate the request-response cycle.",
        },
        {
            question: "How does Node.js handle databases?",
            answer: "Node.js can connect to databases like MongoDB or MySQL using libraries such as Mongoose or the mysql package.",
        },
        {
            question: "How can you handle errors in Node.js?",
            answer: "Errors can be handled using try-catch blocks, error-first callbacks, or middleware in frameworks like Express.",
        },
        {
            question: "What is npm in Node.js?",
            answer: "npm (Node Package Manager) is the default package manager for Node.js, used to install and manage dependencies.",
        },
        {
            question: "Can Node.js be used for microservices?",
            answer: "Yes, Node.js is well-suited for microservices due to its lightweight nature, scalability, and support for asynchronous operations.",
        },
    ];
    const [openFaqIndexes, setOpenFaqIndexes] = useState(Array(faqs.length).fill(false));

    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "modules", title: "Modules" },
        { id: "file-system", title: "File System" },
        { id: "http-server", title: "HTTP Server" },
        { id: "event-loop", title: "Event Loop" },
        { id: "express", title: "Express Framework" },
        { id: "middleware", title: "Middleware" },
        { id: "database", title: "Database Integration" },
        { id: "error-handling", title: "Error Handling" },
        { id: "FAQ", title: "FAQ" },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsSidebarOpen(false);

        // If the clicked section is after "http-server" and sections are hidden, show them
        const hiddenSections = ["event-loop", "express", "middleware", "database", "error-handling", "FAQ"];
        if (hiddenSections.includes(sectionId) && !showMore) {
            setShowMore(true);
        }

        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile Viewport button */}
            <button
                className="lg:hidden fixed top-24 left-4 z-50 p-2 bg-blue-400 text-white rounded-md focus:outline-none"
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

            {/* Sidebar */}
            <div
                className={`w-64 bg-white shadow-md fixed h-[calc(100vh-5rem)] transition-transform duration-300 ease-in-out z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:sticky lg:top-0 lg:h-screen lg:translate-x-0`}
                style={{ top: "5rem" }}
            >
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Node.js Tutorial</h2>
                </div>
                <div className="h-[calc(100%-4rem)] overflow-y-auto">
                    <nav className="p-4">
                        <ul className="space-y-2">
                            {sections.map((section) => (
                                <li key={section.id}>
                                    <a
                                        href={`#${section.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleSectionClick(section.id);
                                        }}
                                        className={`block px-4 py-2 rounded-md transition-colors ${activeSection === section.id
                                                ? "bg-blue-100 text-blue-700 font-medium"
                                                : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full overflow-x-hidden lg:ml-0 lg:px-6">
                <div className="p-4 sm:p-8 pt-20 sm:pt-36 pb-8">
                    {/* Hero Title Section */}
                    <div className="text-center mb-16 py-12 px-4 bg-gradient-to-r from-green-50 to-indigo-50 rounded-xl shadow-sm">
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-indigo-600">
                                Basics & Advanced of Node.js
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Learn Node.js with this comprehensive tutorial covering all fundamental concepts and advanced features. Master the runtime that powers scalable server-side applications.
                        </p>
                    </div>

                    {/* Node.js Hero Banner */}
                    <div className="mb-16 bg-gradient-to-r from-blue-400 to-green-800 rounded-2xl shadow-xl overflow-hidden border border-white/10">
                        <div className="relative p-4 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                            {/* Content */}
                            <div className="relative z-10 mb-6 md:mb-0 md:mr-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                        Master Node.js
                                    </span>{" "}
                                    in 2025
                                </h2>
                                <p className="text-base sm:text-lg text-white/90 max-w-lg">
                                    Unlock the full potential of server-side development with the world's leading JavaScript runtime
                                </p>
                                <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                    <button className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg">
                                        Start Learning Now
                                    </button>
                                    <button className="px-6 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all">
                                        Explore Projects
                                    </button>
                                </div>
                            </div>

                            {/* Code snippet with animation */}
                            <div className="relative z-10 bg-green-900/80 backdrop-blur-sm p-5 rounded-xl border border-white/10 shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300 w-full md:w-auto">
                                <div className="flex space-x-2 mb-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <pre className="text-yellow-400 font-mono text-xs sm:text-sm md:text-base overflow-x-auto">
                                    <code>
                                        {`// Node.js Server Example\n`}
                                        {`const http = require('http');\n`}
                                        {`const server = http.createServer((req, res) => {\n`}
                                        {`  res.end('Hello, Node.js!');\n`}
                                        {`});\n`}
                                        {`server.listen(3000, () => console.log('Server running'));`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Introduction Section */}
                    <section id="introduction" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Introduction to Node.js
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a browser. Built on Chrome's V8 JavaScript engine, Node.js enables developers to build scalable and high-performance server-side applications using JavaScript.
                                <br />
                                This tutorial will guide you through the basics and advanced concepts of Node.js, including modules, file handling, creating servers, and working with frameworks like Express.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`// Simple Node.js script\nconsole.log("Hello, Node.js!");`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Features:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Asynchronous and event-driven</li>
                                <li>Single-threaded but highly scalable</li>
                                <li>Rich ecosystem with npm packages</li>
                                <li>Supports both RESTful APIs and real-time applications</li>
                                <li>Cross-platform compatibility</li>
                            </ul>
                        </div>
                    </section>

                    {/* Modules Section */}
                    <section id="modules" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Modules in Node.js
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Node.js uses a modular system to organize code. You can create your own modules or use built-in ones like <code>fs</code> (file system) or <code>http</code>.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`// math.js (Custom Module)\nexports.add = (a, b) => a + b;\n\n// app.js\nconst math = require('./math');\nconsole.log(math.add(2, 3)); // Output: 5`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Use <code>require()</code> to import modules</li>
                                <li>Export functionality using <code>module.exports</code></li>
                                <li>Node.js supports ES modules with <code>import/export</code></li>
                            </ul>
                        </div>
                    </section>

                    {/* File System Section */}
                    <section id="file-system" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            File System in Node.js
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                The <code>fs</code> module in Node.js allows you to work with the file system, enabling operations like reading, writing, and deleting files.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`const fs = require('fs');\n\n// Write to a file\nfs.writeFileSync('example.txt', 'Hello, Node.js!');\n\n// Read from a file\nconst data = fs.readFileSync('example.txt', 'utf8');\nconsole.log(data);`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Supports both synchronous and asynchronous methods</li>
                                <li>Common methods: <code>readFile</code>, <code>writeFile</code>, <code>appendFile</code></li>
                                <li>Can handle directories and file metadata</li>
                            </ul>
                        </div>
                    </section>

                    {/* HTTP Server Section */}
                    <section id="http-server" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            HTTP Server in Node.js
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Node.js provides the <code>http</code> module to create a basic web server that can handle HTTP requests and responses.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain');\n  res.end('Hello, Node.js Server!');\n});\n\nserver.listen(3000, () => {\n  console.log('Server running on port 3000');\n});`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Handles HTTP requests and responses</li>
                                <li>Can serve static files or dynamic content</li>
                                <li>Often used with frameworks like Express for more features</li>
                            </ul>
                        </div>
                    </section>

                    {/* Explore More Button */}
                    {!showMore && (
                        <div className="text-center mb-16">
                            <button
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => setShowMore(true)}
                                aria-label="Explore more Node.js topics"
                            >
                                Explore More
                            </button>
                        </div>
                    )}

                    {/* Sections Hidden Behind Explore More Button */}
                    {showMore && (
                        <>
                            {/* Event Loop Section */}
                            <section id="event-loop" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Event Loop in Node.js
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        The Event Loop is a fundamental concept in Node.js that enables asynchronous, non-blocking operations, allowing the runtime to handle multiple tasks efficiently.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`console.log('Start');\n\nsetTimeout(() => {\n  console.log('Timer callback');\n}, 0);\n\nconsole.log('End');\n\n// Output: Start, End, Timer callback`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Manages asynchronous callbacks</li>
                                        <li>Phases include timers, I/O callbacks, and more</li>
                                        <li>Ensures non-blocking I/O operations</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Express Framework Section */}
                            <section id="express" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Express Framework
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Express is a popular Node.js framework that simplifies the process of building web applications and APIs by providing a robust set of features.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello, Express!');\n});\n\napp.listen(3000, () => {\n  console.log('Express server running on port 3000');\n});`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Simplifies routing and middleware setup</li>
                                        <li>Supports RESTful APIs and template engines</li>
                                        <li>Highly extensible with middleware</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Middleware Section */}
                            <section id="middleware" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Middleware in Node.js
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Middleware functions in Node.js (especially in Express) are functions that execute during the request-response cycle, with access to the request and response objects.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`const express = require('express');\nconst app = express();\n\n// Middleware\napp.use((req, res, next) => {\n  console.log('Request URL:', req.url);\n  next();\n});\n\napp.get('/', (req, res) => {\n  res.send('Hello, Middleware!');\n});\n\napp.listen(3000);`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Can modify request/response objects</li>
                                        <li>Used for logging, authentication, etc.</li>
                                        <li>Call <code>next()</code> to pass control to the next middleware</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Database Integration Section */}
                            <section id="database" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Database Integration in Node.js
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Node.js can connect to various databases like MongoDB, MySQL, or PostgreSQL using appropriate libraries or ORMs.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`// Using MongoDB with Mongoose\nconst mongoose = require('mongoose');\n\nmongoose.connect('mongodb://localhost:27017/mydb');\n\nconst User = mongoose.model('User', { name: String });\n\n// Create a user\nconst user = new User({ name: 'Alice' });\nuser.save().then(() => console.log('User saved'));`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Popular libraries: Mongoose (MongoDB), Sequelize (SQL)</li>
                                        <li>Supports both NoSQL and SQL databases</li>
                                        <li>Use connection pooling for scalability</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Error Handling Section */}
                            <section id="error-handling" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Error Handling in Node.js
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Node.js provides several ways to handle errors, including try-catch blocks, error-first callbacks, and Express middleware.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`// Express Error Handling\nconst express = require('express');\nconst app = express();\n\napp.get('/', (req, res, next) => {\n  try {\n    throw new Error('Something went wrong');\n  } catch (err) {\n    next(err);\n  }\n});\n\napp.use((err, req, res, next) => {\n  res.status(500).send('Error: ' + err.message);\n});\n\napp.listen(3000);`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Use try-catch for synchronous code</li>
                                        <li>Error-first callbacks for asynchronous operations</li>
                                        <li>Express middleware for centralized error handling</li>
                                    </ul>
                                </div>
                            </section>

                            {/* FAQ Section */}
                            <section id="FAQ" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Frequently Asked Questions (FAQ)
                                </h2>
                                <div className="space-y-4">
                                    {faqs.map((faq, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                            <button
                                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                                                onClick={() => {
                                                    setOpenFaqIndexes((prev) => {
                                                        const updated = [...prev];
                                                        updated[index] = !updated[index];
                                                        return updated;
                                                    });
                                                }}
                                            >
                                                <div className="flex items-start">
                                                    <span className="text-gray-500 mr-3 font-medium">{index + 1}.</span>
                                                    <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                                                </div>
                                                <svg
                                                    className={`w-5 h-5 text-gray-500 transform transition-transform ${openFaqIndexes[index] ? "rotate-180" : ""
                                                        }`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                            {openFaqIndexes[index] && (
                                                <div className="px-6 pb-4 pt-2 bg-white">
                                                    <div className="flex">
                                                        <span className="text-gray-300 mr-3 font-medium">→</span>
                                                        <p className="text-gray-600">{faq.answer}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}

                    {/* Resources Section (Always Visible) */}
                    <section className="mb-16 bg-blue-50 rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Additional Resources</h2>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://nodejs.org/en/docs/"
                                    className="text-blue-600 hover:underline flex items-center"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                        />
                                    </svg>
                                    Node.js Official Documentation
                                </a>
                            </li>
                            <li>
                                <a href="https://expressjs.com/" className="text-blue-600 hover:underline flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                        />
                                    </svg>
                                    Express Documentation
                                </a>
                            </li>
                        </ul>
                    </section>

                    {/* Call-to-Action Section (Always Visible) */}
                    <section className="py-16 px-6 bg-gradient-to-r from-blue-400 to-green-800 text-white">
                        <div className="max-w-6xl mx-auto text-center">
                            <div className="relative">
                                <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>
                                <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                                    Ready to Learn Node.js?
                                </h2>
                                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                                    Join thousands of learners and start building scalable server-side applications today. Enroll now to unlock your potential!
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                    <button
                                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
                                        onClick={() => { }}
                                        aria-label="Enroll now in the course"
                                    >
                                        Enroll Now
                                    </button>
                                    <button
                                        className="px-8 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                                        onClick={() => { }}
                                        aria-label="Contact us for more information"
                                    >
                                        Contact Us
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default NodejsPage;