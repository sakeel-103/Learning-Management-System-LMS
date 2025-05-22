import React, { useState } from "react";

const JavaScriptPage = () => {
    const [activeSection, setActiveSection] = useState("introduction");

    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "variable-scope", title: "Variable Scope" },
        { id: "global-variables", title: "Global Variables" },
        { id: "function-parameters", title: "Function Parameters" },
        { id: "objects", title: "Objects" },
        { id: "number", title: "Number" },
        { id: "boolean", title: "Boolean" },
        { id: "strings", title: "Strings" },
        { id: "arrays", title: "Arrays" },
        { id: "date", title: "Date" },
        { id: "dataview", title: "DataView" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="w-64 bg-white shadow-md fixed h-full overflow-y-auto">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">JavaScript Tutorial</h2>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    onClick={() => setActiveSection(section.id)}
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

            {/* Main Content Started here */}
            <div className="flex-1 ml-64 p-8 pt-36">
                <div className="text-center mb-16 py-12 px-4 bg-gradient-to-r from-green-50 to-indigo-50 rounded-xl shadow-sm">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-indigo-600">
                            Basics of JavaScript
                        </span>
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Learn JavaScript programming with this comprehensive tutorial covering all fundamental concepts and advanced features. Master the language that powers the modern web.
                    </p>
                </div>

                {/* JavaScript Hero Banner */}
                <div className="mb-16 bg-gradient-to-r from-blue-400 to-green-800 rounded-2xl shadow-xl overflow-hidden border border-white/10">
                    <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                        {/* Glow effect */}
                        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                        {/* Content */}
                        <div className="relative z-10 mb-6 md:mb-0 md:mr-8">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">Master JavaScript</span> in 2024
                            </h2>
                            <p className="text-lg text-white/90 max-w-lg">
                                Unlock the full potential of web development with the world's most popular programming language
                            </p>
                            <div className="mt-6 flex space-x-4">
                                <button className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg">
                                    Start Learning Now
                                </button>
                                <button className="px-6 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all">
                                    Explore Projects
                                </button>
                            </div>
                        </div>

                        {/* Code snippet with animation */}
                        <div className="relative z-10 bg-green-900/80 backdrop-blur-sm p-5 rounded-xl border border-white/10 shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300">
                            <div className="flex space-x-2 mb-3">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <pre className="text-yellow-400 font-mono text-sm md:text-base overflow-x-auto">
                                <code>
                                    {`// Interactive code example\n`}
                                    {`document.querySelector('button')\n`}
                                    {`  .addEventListener('click', () => {\n`}
                                    {`    console.log('🚀 JavaScript is awesome!');\n`}
                                    {`  });`}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Introduction Section */}
                <section id="introduction" className="mb-16 bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Introduction to JavaScript</h2>
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            JavaScript is a versatile programming language primarily used for web development. It enables interactive web pages and is an essential part of web applications. <br />

                            This JavaScript tutorial has been designed for beginners as well as working professionals to help them understand the basic to advanced concepts and functionalities of JavaScript. It covers most of the important concepts related to JavaScript such as operators, control flow, functions, objects, OOPs, Asynchronous JavaScript, Events, DOM manipulation and much more.
                        </p>
                        <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                            <pre className="text-sm">
                                <code>// Simple JavaScript example\nconsole.log("Hello, World!");</code>
                            </pre>
                        </div>
                        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Key Features:</h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Lightweight, interpreted programming language</li>
                            <li>Object-oriented capabilities</li>
                            <li>Client-side execution</li>
                            <li>Dynamic typing</li>
                            <li>First-class functions</li>
                            <li>Prototype-based inheritance</li>
                        </ul>
                    </div>
                </section>

                {/* Variable Scope Section */}
                <section id="variable-scope" className="mb-16 bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Variable Scope in JavaScript</h2>
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            JavaScript variables are used to store data that can be changed later on. These variables can be thought of as named containers. You can place data into these containers and then refer to the data simply by naming the container.
                            <br />JavaScript has three types of variable scope: global scope, function scope, and block scope (introduced in ES6).
                        </p>
                        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Scope Rules:</h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li><code>var</code> declarations are function-scoped</li>
                            <li><code>let</code> and <code>const</code> declarations are block-scoped</li>
                            <li>Variables declared without any keyword become global</li>
                            <li>Each function creates a new scope</li>
                        </ul>
                    </div>
                </section>

                {/* Global Variables Section */}
                <section id="global-variables" className="mb-16 bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Global Variables in JavaScript</h2>
                    <div className="space-y-4">
                        <h3>What is Global Scopr?</h3>
                        <p className="text-gray-700">
                            Scope of a variable stand for where it will be available to use inside the programme. Variable having global scope are accessible everywhere inside the programme.
                            <br />Global variables are accessible from anywhere in your JavaScript code. They are declared outside of functions or without any declaration keyword.
                        </p>
                        <h2>What is Automatically Global?</h2>
                        <p className="text-gray-700">
                            When we initialize a variable without it's declaration first, it results in making that variable global automatically. The reason behind this behavior is, initialization without declaration is the same as initializing the variable into the window object like this window.myVal = 10 in the code below.
                        </p>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                            <h4 className="font-semibold text-yellow-600">Best Practice:</h4>
                            <p className="text-yellow-700">
                                Minimize the use of global variables to avoid naming collisions and maintain cleaner code. Use modules or closures to encapsulate your variables.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Function Parameters Section */}
                <section id="function-parameters" className="mb-16 bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Function Parameters in JavaScript</h2>
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            Function parameters allow you to pass values to functions. JavaScript supports default parameters, rest parameters, and destructuring in function signatures.
                        </p>
                        <h1 className="text-2xl ">What is javascript Parameters?</h1>
                        <p className="text-gray-600">
                            Parameters in JavaScript are variables declared in a function's definition, serving as placeholders for values that will be passed into the function when it is called. They allow functions to accept input and operate on it, making them more versatile and reusable. When a function is invoked, the actual values passed to it are called arguments, which are then assigned to the corresponding parameters within the function's scope.
                        </p>

                        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Key Concepts:</h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Default parameters provide fallback values</li>
                            <li>Rest parameters collect arguments into an array</li>
                            <li>Destructuring allows extracting object properties</li>
                            <li>Parameters are local to the function scope</li>
                        </ul>
                    </div>
                </section>

                {/* Objects Section */}
                <section id="objects" className="mb-16 bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Objects in JavaScript</h2>
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            Objects are key-value pairs that allow you to store and manage data. They support methods, computed property names, and prototype-based inheritance.
                        </p>
                        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Key Features:</h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Properties can be accessed using dot or bracket notation</li>
                            <li>Methods are functions stored as object properties</li>
                            <li>Objects can inherit properties via prototypes</li>
                            <li>ES6 introduced shorthand property and method syntax</li>
                        </ul>
                    </div>
                </section>

                {/* Number Section */}
                <section id="number" className="mb-16 bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Number in JavaScript</h2>
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            The Number type represents both integers and floating-point numbers. JavaScript provides methods and properties for numerical operations.
                        </p>
                        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>All numbers in JavaScript are 64-bit floating-point</li>
                            <li><code>Number</code> object provides utility methods</li>
                            <li><code>Math</code> object for mathematical operations</li>
                            <li>Special values: <code>NaN</code>, <code>Infinity</code></li>
                        </ul>
                    </div>
                </section>

                {/* Boolean Section */}
                <section id="boolean" className="mb-16 bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Boolean in JavaScript</h2>
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            Booleans represent <code>true</code> or <code>false</code> values and are commonly used in conditional statements and logical operations.
                        </p>
                        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Truthy values: non-zero numbers, non-empty strings, objects</li>
                            <li>Falsy values: <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code></li>
                            <li>Logical operators: <code>&&</code>, <code>||</code>, <code>!</code></li>
                        </ul>
                    </div>
                </section>

                {/* Strings Section */}
                <section id="strings" className="mb-16 bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Strings in JavaScript</h2>
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            Strings represent text and provide a variety of methods for manipulation, such as slicing, concatenation, and formatting.
                        </p>
                        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Key Features:</h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Immutable, but methods return new strings</li>
                            <li>Template literals for string interpolation</li>
                            <li>Common methods: <code>toUpperCase</code>, <code>slice</code>, <code>includes</code></li>
                            <li>Unicode support for emojis and special characters</li>
                        </ul>
                    </div>
                </section>

                {/* Arrays Section */}
                <section id="arrays" className="mb-16 bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Arrays in JavaScript</h2>
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            Arrays are ordered lists that store multiple values. They come with methods for iteration, transformation, and manipulation.
                        </p>
                        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Key Features:</h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Dynamic resizing</li>
                            <li>Methods like <code>map</code>, <code>filter</code>, <code>reduce</code></li>
                            <li>Zero-based indexing</li>
                            <li>Can store mixed data types</li>
                        </ul>
                    </div>
                </section>

                {/* Date Section */}
                <section id="date" className="mb-16 bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Date in JavaScript</h2>
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            The <code>Date</code> object is used to work with dates and times. It provides methods to get and set date components.
                        </p>
                        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Based on Unix timestamp (milliseconds since Jan 1, 1970)</li>
                            <li>Methods like <code>getFullYear</code>, <code>getMonth</code>, <code>getDate</code></li>
                            <li>Parsing and formatting dates</li>
                            <li>Timezone considerations</li>
                        </ul>
                    </div>
                </section>

                {/* DataView Section */}
                <section id="dataview" className="mb-16 bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">DataView in JavaScript</h2>
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            The <code>DataView</code> object provides a low-level interface for reading and writing multiple number types in an <code>ArrayBuffer</code>.
                        </p>
                        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Key Features:</h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Works with <code>ArrayBuffer</code> for binary data</li>
                            <li>Supports multiple data types (e.g., Int16, Float32)</li>
                            <li>Handles endianness (big-endian or little-endian)</li>
                            <li>Used in low-level operations like WebGL or file handling</li>
                        </ul>
                    </div>
                </section>

                {/* FAQ Section */}


                {/* Resources Section */}
                <section className="bg-blue-50 rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Additional Resources</h2>
                    <ul className="space-y-3">
                        <li>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" className="text-blue-600 hover:underline flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                MDN JavaScript Documentation
                            </a>
                        </li>
                        <li>
                            <a href="https://javascript.info/" className="text-blue-600 hover:underline flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                The Modern JavaScript Tutorial
                            </a>
                        </li>
                        <li>
                            <a href="https://eloquentjavascript.net/" className="text-blue-600 hover:underline flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Eloquent JavaScript (Free Book)
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default JavaScriptPage;