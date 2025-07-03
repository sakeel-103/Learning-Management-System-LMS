import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const ReactJSPage = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("introduction");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showMore, setShowMore] = useState(false); // State to toggle visibility of sections after State

    const faqs = [
        {
            question: "What is React?",
            answer: "React is a JavaScript library for building user interfaces, particularly single-page applications, using a component-based architecture.",
        },
        {
            question: "Is React a framework or a library?",
            answer: "React is a library, not a framework. It focuses on the UI layer and can be used with other libraries or frameworks.",
        },
        {
            question: "What are React components?",
            answer: "Components are reusable building blocks in React that encapsulate UI logic, styling, and behavior.",
        },
        {
            question: "What is the difference between state and props?",
            answer: "State is internal, mutable data managed within a component, while props are external, immutable data passed to a component.",
        },
        {
            question: "What are React Hooks?",
            answer: "Hooks are functions that let you use state and other React features in functional components, introduced in React 16.8.",
        },
        {
            question: "How does React Router work?",
            answer: "React Router is a library for routing in React applications, allowing navigation between different components based on URL paths.",
        },
        {
            question: "What is the Context API?",
            answer: "The Context API allows you to share state across the component tree without passing props manually at every level.",
        },
        {
            question: "How can you optimize React performance?",
            answer: "Use techniques like memoization (React.memo), lazy loading, code splitting, and avoiding unnecessary re-renders.",
        },
        {
            question: "What is JSX?",
            answer: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript, used in React to define UI components.",
        },
        {
            question: "Can React work with TypeScript?",
            answer: "Yes, React supports TypeScript, which adds static types to JavaScript, improving code reliability and developer experience.",
        },
    ];
    const [openFaqIndexes, setOpenFaqIndexes] = useState(Array(faqs.length).fill(false));

    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "components", title: "Components" },
        { id: "state", title: "State" },
        { id: "props", title: "Props" },
        { id: "event-handling", title: "Event Handling" },
        { id: "hooks", title: "Hooks" },
        { id: "react-router", title: "React Router" },
        { id: "context-api", title: "Context API" },
        { id: "performance-optimization", title: "Performance Optimization" },
        { id: "FAQ", title: "FAQ" },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsSidebarOpen(false);

        // If the clicked section is after "state" and sections are hidden, show them
        const hiddenSections = ["props", "event-handling", "hooks", "react-router", "context-api", "performance-optimization", "FAQ"];
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
                    <h2 className="text-xl font-bold text-gray-800">React JS Tutorial</h2>
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
                                Basics & Advanced of React JS
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Learn React JS with this comprehensive tutorial covering all fundamental concepts and advanced features. Master the library that powers modern web applications.
                        </p>
                    </div>

                    {/* React Hero Banner */}
                    <div className="mb-16 bg-gradient-to-r from-blue-400 to-green-800 rounded-2xl shadow-xl overflow-hidden border border-white/10">
                        <div className="relative p-4 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                            {/* Content */}
                            <div className="relative z-10 mb-6 md:mb-0 md:mr-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                        Master React JS
                                    </span>{" "}
                                    in 2025
                                </h2>
                                <p className="text-base sm:text-lg text-white/90 max-w-lg">
                                    Unlock the full potential of web development with the world's most popular JavaScript library
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
                                        {`// React Component Example\n`}
                                        {`import React from 'react';\n`}
                                        {`const MyComponent = () => (\n`}
                                        {`  <div className="text-white">\n`}
                                        {`    Hello, React!\n`}
                                        {`  </div>\n`}
                                        {`);\n`}
                                        {`export default MyComponent;`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Introduction Section */}
                    <section id="introduction" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Introduction to React JS
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                React JS is a popular JavaScript library for building user interfaces, developed by Facebook. It allows developers to create reusable UI components and manage the state of an application efficiently. React uses a virtual DOM to optimize rendering, making it ideal for building fast and interactive web applications.
                                <br />
                                This React tutorial is designed for beginners and professionals alike, covering basic to advanced concepts such as components, state, props, hooks, routing, and more.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`import React from 'react';\nReactDOM.render(<h1>Hello, React!</h1>, document.getElementById('root'));`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Features:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Component-based architecture</li>
                                <li>Virtual DOM for efficient updates</li>
                                <li>Unidirectional data flow</li>
                                <li>Support for JSX syntax</li>
                                <li>Rich ecosystem with tools like React Router and Redux</li>
                            </ul>
                        </div>
                    </section>

                    {/* Components Section */}
                    <section id="components" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Components in React
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                React applications are built using components, which are reusable pieces of UI. Components can be either functional (using hooks) or class-based, and they can accept inputs called props.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`// Functional Component\nconst Greeting = ({ name }) => {\n  return <h1>Hello, {name}!</h1>;\n};\n\n// Usage\n<Greeting name="User" />`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Components can be nested to build complex UIs</li>
                                <li>Functional components are preferred over class components</li>
                                <li>Components should be pure and predictable</li>
                            </ul>
                        </div>
                    </section>

                    {/* State Section */}
                    <section id="state" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            State in React
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                State is a built-in object that holds data that may change over time. In functional components, state is managed using the <code>useState</code> hook.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`import React, { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n};`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>State is private to the component</li>
                                <li>Updating state triggers a re-render</li>
                                <li>Use <code>useState</code> for simple state management</li>
                            </ul>
                        </div>
                    </section>

                    {/* Explore More Button */}
                    {!showMore && (
                        <div className="text-center mb-16">
                            <button
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => setShowMore(true)}
                                aria-label="Explore more React JS topics"
                            >
                                Explore More
                            </button>
                        </div>
                    )}

                    {/* Sections Hidden Behind Explore More Button */}
                    {showMore && (
                        <>
                            {/* Props Section */}
                            <section id="props" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Props in React
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Props (short for properties) are read-only inputs passed to components to customize their behavior or appearance.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`const Welcome = (props) => {\n  return <h1>Welcome, {props.name}!</h1>;\n};\n\n// Usage\n<Welcome name="Alice" />`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Props are immutable within the component</li>
                                        <li>Can pass any data type as props</li>
                                        <li>Use defaultProps for default values</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Event Handling Section */}
                            <section id="event-handling" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Event Handling in React
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        React handles events using event handlers, which are passed as props to elements. Event names use camelCase (e.g., <code>onClick</code>).
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`const Button = () => {\n  const handleClick = () => alert('Button clicked!');\n  return <button onClick={handleClick}>Click Me</button>;\n};`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Events are synthetic, wrapping native DOM events</li>
                                        <li>Pass functions, not function calls, to event handlers</li>
                                        <li>Can prevent default behavior using <code>event.preventDefault()</code></li>
                                    </ul>
                                </div>
                            </section>

                            {/* Hooks Section */}
                            <section id="hooks" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Hooks in React
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Hooks allow functional components to use state and lifecycle features. Common hooks include <code>useState</code>, <code>useEffect</code>, and <code>useContext</code>.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`import React, { useState, useEffect } from 'react';\n\nconst Timer = () => {\n  const [seconds, setSeconds] = useState(0);\n  useEffect(() => {\n    const interval = setInterval(() => setSeconds(s => s + 1), 1000);\n    return () => clearInterval(interval);\n  }, []);\n  return <p>Seconds: {seconds}</p>;\n};`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Hooks can only be called at the top level</li>
                                        <li><code>useEffect</code> handles side effects</li>
                                        <li>Custom hooks can be created for reusable logic</li>
                                    </ul>
                                </div>
                            </section>

                            {/* React Router Section */}
                            <section id="react-router" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    React Router
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        React Router is a library for routing in React applications, enabling navigation between different components based on URL paths.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';\n\nconst App = () => (\n  <Router>\n    <Switch>\n      <Route path="/about" component={About} />\n      <Route path="/" component={Home} />\n    </Switch>\n  </Router>\n);`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Uses declarative routing with components</li>
                                        <li>Supports nested routes and dynamic routing</li>
                                        <li>Provides hooks like <code>useHistory</code> and <code>useParams</code></li>
                                    </ul>
                                </div>
                            </section>

                            {/* Context API Section */}
                            <section id="context-api" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Context API in React
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        The Context API provides a way to share data across the component tree without passing props manually at every level.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`const ThemeContext = React.createContext('light');\n\nconst App = () => (\n  <ThemeContext.Provider value="dark">\n    <ThemedComponent />\n  </ThemeContext.Provider>\n);\n\nconst ThemedComponent = () => {\n  const theme = React.useContext(ThemeContext);\n  return <div>Theme: {theme}</div>;\n};`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Avoids prop drilling</li>
                                        <li>Best for global state like themes or user data</li>
                                        <li>Use with <code>useContext</code> hook in functional components</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Performance Optimization Section */}
                            <section id="performance-optimization" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Performance Optimization in React
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        React provides several techniques to optimize performance, such as memoization, lazy loading, and avoiding unnecessary re-renders.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`import React, { memo } from 'react';\n\nconst ExpensiveComponent = memo(() => {\n  return <div>Expensive Render</div>;\n});\n\nconst Parent = () => {\n  const [count, setCount] = React.useState(0);\n  return (\n    <div>\n      <ExpensiveComponent />\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n};`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Techniques:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Use <code>React.memo</code> to prevent unnecessary re-renders</li>
                                        <li>Lazy load components with <code>React.lazy</code> and <code>Suspense</code></li>
                                        <li>Optimize hooks with <code>useMemo</code> and <code>useCallback</code></li>
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
                                    href="https://reactjs.org/docs/getting-started.html"
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
                                    React Official Documentation
                                </a>
                            </li>
                            <li>
                                <a href="https://reactrouter.com/" className="text-blue-600 hover:underline flex items-center">
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
                                    React Router Documentation
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
                                    Ready to Learn React JS?
                                </h2>
                                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                                    Join thousands of learners and start building modern web applications today. Enroll now to unlock your potential!
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                    <button
                                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
                                        onClick={() => navigate('/Login')} // Corrected navigation
                                        aria-label="Enroll now in the course"
                                    >
                                        Enroll Now
                                    </button>
                                    <button
                                        className="px-8 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                                        onClick={() => navigate('/Components/contact-us-page')}
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

export default ReactJSPage;