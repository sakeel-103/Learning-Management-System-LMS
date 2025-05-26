import React, { useState } from "react";

const BackendPage = () => {
    const [activeSection, setActiveSection] = useState("introduction");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showMore, setShowMore] = useState(false); // State to toggle visibility of sections after APIs

    const faqs = [
        {
            question: "What is backend development?",
            answer: "Backend development involves creating the server-side logic, databases, and APIs that power the functionality of a website or application.",
        },
        {
            question: "What is the difference between frontend and backend?",
            answer: "Frontend focuses on the user interface and experience, while backend handles server-side logic, databases, and application functionality.",
        },
        {
            question: "What is Node.js, and why is it popular?",
            answer: "Node.js is a JavaScript runtime that allows server-side scripting, popular for its non-blocking I/O model and scalability.",
        },
        {
            question: "What are APIs, and why are they important?",
            answer: "APIs (Application Programming Interfaces) enable communication between different systems, allowing the frontend to interact with backend services.",
        },
        {
            question: "How do you secure a backend application?",
            answer: "Security measures include using HTTPS, validating user input, implementing authentication, and protecting against SQL injection and XSS attacks.",
        },
        {
            question: "What is the role of databases in backend development?",
            answer: "Databases store and manage application data, enabling the backend to retrieve, update, and delete information as needed.",
        },
        {
            question: "What is Express.js?",
            answer: "Express.js is a minimal and flexible Node.js framework for building RESTful APIs and web applications.",
        },
        {
            question: "What is authentication in backend development?",
            answer: "Authentication verifies user identity, often using tokens (e.g., JWT) or sessions to secure access to resources.",
        },
        {
            question: "How do you deploy a backend application?",
            answer: "Deployment involves hosting the application on a server (e.g., AWS, Heroku) and configuring it with environment variables and a production-ready setup.",
        },
        {
            question: "What are some scalability techniques for backend systems?",
            answer: "Scalability techniques include load balancing, caching, database sharding, and using microservices architecture.",
        },
    ];
    const [openFaqIndexes, setOpenFaqIndexes] = useState(Array(faqs.length).fill(false));

    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "nodejs", title: "Node.js in Backend" },
        { id: "express", title: "Express.js in Backend" },
        { id: "databases", title: "Databases in Backend" },
        { id: "apis", title: "APIs in Backend" },
        { id: "authentication", title: "Authentication" },
        { id: "security", title: "Security" },
        { id: "deployment", title: "Deployment" },
        { id: "scalability", title: "Scalability" },
        { id: "FAQ", title: "FAQ" },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsSidebarOpen(false);

        // If the clicked section is after "apis" and sections are hidden, show them
        const hiddenSections = ["authentication", "security", "deployment", "scalability", "FAQ"];
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
            {/* Mobile Sidebar Toggle */}
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
                    <h2 className="text-xl font-bold text-gray-800">Backend Tutorial</h2>
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
                                Basics & Advanced of Backend
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Learn backend development with this comprehensive tutorial covering Node.js, Express.js, databases, APIs, and more. Master the skills to build robust and scalable server-side applications.
                        </p>
                    </div>

                    {/* Backend Hero Banner */}
                    <div className="mb-16 bg-gradient-to-r from-blue-400 to-green-800 rounded-2xl shadow-xl overflow-hidden border border-white/10">
                        <div className="relative p-4 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                            {/* Content */}
                            <div className="relative z-10 mb-6 md:mb-0 md:mr-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                        Master Backend
                                    </span>{" "}
                                    in 2025
                                </h2>
                                <p className="text-base sm:text-lg text-white/90 max-w-lg">
                                    Build powerful server-side applications with modern backend technologies
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
                                        {`// Backend Example\n`}
                                        {`const express = require('express');\n`}
                                        {`const app = express();\n`}
                                        {`app.get('/', (req, res) => {\n`}
                                        {`  res.send('Hello, Backend!');\n`}
                                        {`});\n`}
                                        {`app.listen(3000);`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Introduction Section */}
                    <section id="introduction" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Introduction to Backend Development
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Backend development focuses on the server-side of web applications, handling logic, databases, APIs, and security. It ensures that the frontend has the data and functionality it needs to operate smoothly.
                                <br />
                                This tutorial will guide you through the core concepts of backend development, including Node.js, Express.js, databases, APIs, authentication, and deployment.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`// Simple Node.js Server\nconst http = require('http');\nconst server = http.createServer((req, res) => {\n  res.end('Hello, Backend!');\n});\nserver.listen(3000);`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Areas:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Server-side logic with Node.js</li>
                                <li>API development with Express.js</li>
                                <li>Data management with databases</li>
                                <li>Security and authentication</li>
                                <li>Deployment and scalability</li>
                            </ul>
                        </div>
                    </section>

                    {/* Node.js in Backend Section */}
                    <section id="nodejs" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Node.js in Backend
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Node.js is a JavaScript runtime that allows developers to run JavaScript on the server side, enabling scalable and efficient backend applications.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`const http = require('http');\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('Hello, Node.js!');\n});\nserver.listen(3000);`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Non-blocking I/O for high performance</li>
                                <li>Large ecosystem of packages via npm</li>
                                <li>Ideal for real-time applications</li>
                            </ul>
                        </div>
                    </section>

                    {/* Express.js in Backend Section */}
                    <section id="express" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Express.js in Backend
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Express.js is a minimal and flexible Node.js framework for building RESTful APIs and web applications, simplifying routing and middleware integration.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`const express = require('express');\nconst app = express();\n\napp.get('/api', (req, res) => {\n  res.json({ message: 'Hello, Express!' });\n});\n\napp.listen(3000);`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Simplifies routing and HTTP methods</li>
                                <li>Supports middleware for request processing</li>
                                <li>Lightweight and highly extensible</li>
                            </ul>
                        </div>
                    </section>

                    {/* Databases in Backend Section */}
                    <section id="databases" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Databases in Backend
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Databases store and manage application data, allowing the backend to perform CRUD (Create, Read, Update, Delete) operations.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`// Using MongoDB with Mongoose\nconst mongoose = require('mongoose');\nmongoose.connect('mongodb://localhost/mydb');\n\nconst User = mongoose.model('User', { name: String });\nconst user = new User({ name: 'John' });\nuser.save();`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>SQL databases: MySQL, PostgreSQL</li>
                                <li>NoSQL databases: MongoDB, Redis</li>
                                <li>ORMs like Sequelize simplify database interactions</li>
                            </ul>
                        </div>
                    </section>

                    {/* APIs in Backend Section */}
                    <section id="apis" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            APIs in Backend
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                APIs (Application Programming Interfaces) allow the frontend to communicate with the backend, providing endpoints to fetch or send data.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`app.get('/api/users', (req, res) => {\n  const users = [{ id: 1, name: 'John' }];\n  res.json(users);\n});`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>RESTful APIs use HTTP methods (GET, POST, etc.)</li>
                                <li>Return data in JSON format</li>
                                <li>Secure with authentication and rate limiting</li>
                            </ul>
                        </div>
                    </section>

                    {/* Explore More Button */}
                    {!showMore && (
                        <div className="text-center mb-16">
                            <button
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => setShowMore(true)}
                                aria-label="Explore more Backend topics"
                            >
                                Explore More
                            </button>
                        </div>
                    )}

                    {/* Sections Hidden Behind Explore More Button */}
                    {showMore && (
                        <>
                            {/* Authentication Section */}
                            <section id="authentication" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Authentication
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Authentication verifies user identity, often using tokens (e.g., JWT) or sessions to secure access to resources.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`const jwt = require('jsonwebtoken');\napp.post('/login', (req, res) => {\n  const token = jwt.sign({ user: 'John' }, 'secret');\n  res.json({ token });\n});`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>JWT for stateless authentication</li>
                                        <li>OAuth for third-party login (e.g., Google)</li>
                                        <li>Secure password storage with bcrypt</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Security Section */}
                            <section id="security" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Security in Backend
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Backend security protects applications from threats like SQL injection, XSS, and unauthorized access.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`app.use(helmet()); // Adds security headers\napp.use(express.json()); // Parse JSON safely`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Use HTTPS to encrypt data in transit</li>
                                        <li>Sanitize and validate user input</li>
                                        <li>Implement CORS for API access control</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Deployment Section */}
                            <section id="deployment" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Deployment
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Deployment involves hosting the backend application on a server, configuring it for production, and ensuring it runs reliably.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`// Using PM2 for production\nconst pm2 = require('pm2');\npm2.start({\n  script: 'server.js',\n  instances: 'max',\n});`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Host on platforms like AWS, Heroku, or DigitalOcean</li>
                                        <li>Use environment variables for configuration</li>
                                        <li>Monitor with tools like PM2 or Docker</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Scalability Section */}
                            <section id="scalability" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Scalability
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Scalability ensures a backend can handle increased traffic and data as the application grows.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`// Redis for caching\nconst redis = require('redis');\nconst client = redis.createClient();\nclient.set('key', 'value');`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Use load balancers to distribute traffic</li>
                                        <li>Implement caching with Redis or Memcached</li>
                                        <li>Scale databases with sharding or replication</li>
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
                                <a
                                    href="https://expressjs.com/"
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
                                    Express.js Official Documentation
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
                                    Ready to Learn Backend Development?
                                </h2>
                                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                                    Join thousands of learners and start building robust server-side applications today. Enroll now to unlock your potential!
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

export default BackendPage;