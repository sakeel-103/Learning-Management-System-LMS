import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const CSSPage = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const conditionalSections = [
        "css-backgrounds",
        "css-borders",
        "css-margins",
        "css-padding",
        "css-height-width",
        "css-box-model",
        "css-outline",
        "css-text",
        "css-fonts",
        "css-icons",
        "css-links",
        "css-lists",
        "css-tables",
        "css-display",
        "css-max-width",
    ];

    // List of sections for the sidebar
    const sections = [
        { id: "css-home", label: "CSS HOME" },
        { id: "css-introduction", label: "CSS Introduction" },
        { id: "css-syntax", label: "CSS Syntax" },
        { id: "css-selectors", label: "CSS Selectors" },
        { id: "css-how-to", label: "CSS How To" },
        { id: "css-comments", label: "CSS Comments" },
        { id: "css-colors", label: "CSS Colors" },
        { id: "css-backgrounds", label: "CSS Backgrounds" },
        { id: "css-borders", label: "CSS Borders" },
        { id: "css-margins", label: "CSS Margins" },
        { id: "css-padding", label: "CSS Padding" },
        { id: "css-height-width", label: "CSS Height/Width" },
        { id: "css-box-model", label: "CSS Box Model" },
        { id: "css-outline", label: "CSS Outline" },
        { id: "css-text", label: "CSS Text" },
        { id: "css-fonts", label: "CSS Fonts" },
        { id: "css-icons", label: "CSS Icons" },
        { id: "css-links", label: "CSS Links" },
        { id: "css-lists", label: "CSS Lists" },
        { id: "css-tables", label: "CSS Tables" },
        { id: "css-display", label: "CSS Display" },
        { id: "css-max-width", label: "CSS Max-width" },
    ];

    // Handle sidebar link clicks
    const handleSectionClick = (sectionId) => {
        // If the clicked section is after "CSS Colors", set it as the active section
        if (conditionalSections.includes(sectionId)) {
            setActiveSection(sectionId);
        } else {
            // For sections before "CSS Colors", reset the active section
            setActiveSection(null);
        }

        // Smooth scroll to the section
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Toggle sidebar on mobile
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
                    <h2 className="text-xl font-bold text-gray-800">CSS Tutorial</h2>
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
                                            setIsSidebarOpen(false);
                                        }}
                                        className={`block px-4 py-2 rounded-md transition-colors ${activeSection === section.id
                                            ? "bg-blue-100 text-blue-700 font-medium"
                                            : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        {section.label}
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
                                Basics & Advanced of CSS3
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Learn CSS3 with this comprehensive tutorial covering all fundamental concepts and advanced features. Master the styling techniques that bring modern web designs to life.
                        </p>
                    </div>

                    {/* CSS Hero Banner */}
                    <div className="mb-16 bg-gradient-to-r from-blue-400 to-green-800 rounded-2xl shadow-xl overflow-hidden border border-white/10">
                        <div className="relative p-4 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                            {/* Content */}
                            <div className="relative z-10 mb-6 md:mb-0 md:mr-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                        Master CSS3
                                    </span>{" "}
                                    in 2025
                                </h2>
                                <p className="text-base sm:text-lg text-white/90 max-w-lg">
                                    Unlock the full potential of web design with the world's most powerful styling language
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
                                        {`/* CSS Example */\n`}
                                        {`.button {\n`}
                                        {`  background: linear-gradient(to right, #3b82f6, #22c55e);\n`}
                                        {`  color: white;\n`}
                                        {`  padding: 10px 20px;\n`}
                                        {`  border-radius: 8px;\n`}
                                        {`}`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* CSS HOME */}
                    <section id="css-home" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS HOME</h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                Welcome to the CSS tutorial! CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML. It controls the layout, colors, fonts, and overall visual appearance of web pages, making them more attractive and user-friendly. This tutorial will guide you through the basics to advanced concepts of CSS3, the latest version of CSS, which introduces new features like animations, transitions, and flexible layouts.
                            </p>
                        </div>
                    </section>

                    {/* CSS Introduction */}
                    <section id="css-introduction" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Introduction</h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                CSS (Cascading Style Sheets) is a stylesheet language that describes the presentation of a document written in HTML or XML. It allows you to control the layout, colors, fonts, and overall appearance of web pages. CSS separates content from design, enabling developers to create visually appealing websites while maintaining clean and semantic HTML structure. This tutorial will cover everything from basic syntax to advanced features like animations and responsive design.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-4">
                                Example of an external CSS file linked to HTML:
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <h3 className="text-lg font-semibold mb-2 text-white">HTML File (index.html):</h3>
                                <pre className="text-xs sm:text-sm">
                                    {`<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Hello, CSS!</h1>
</body>
</html>`}
                                </pre>
                                <h3 className="text-lg font-semibold mt-4 mb-2 text-white">CSS File (styles.css):</h3>
                                <pre className="text-xs sm:text-sm">
                                    {`h1 {
    color: blue;
    font-size: 24px;
}`}
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* CSS Syntax */}
                    <section id="css-syntax" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Syntax</h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                A CSS rule consists of a selector and a declaration block. The selector targets the HTML element to style, and the declaration block contains one or more declarations (property-value pairs) enclosed in curly braces `{ }`. Each declaration is separated by a semicolon `;`.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-4">
                                Syntax example:
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    {`selector {
    property: value;
    property: value;
}`}
                                </pre>
                                <p className="mt-4 text-white">Example:</p>
                                <pre className="text-xs sm:text-sm">
                                    {`p {
    color: red;
    font-size: 16px;
}`}
                                </pre>
                                <p className="mt-4 text-white">
                                    This rule applies a red color and 16px font size to all <code>&lt;p&gt;</code> elements.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CSS Selectors */}
                    <section id="css-selectors" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Selectors</h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                CSS selectors are used to target HTML elements for styling. Common selectors include:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base leading-relaxed">
                                <li><strong>Element Selector</strong>: Targets elements by tag name (e.g., <code>p</code>).</li>
                                <li><strong>Class Selector</strong>: Targets elements with a specific class (e.g., <code>.my-class</code>).</li>
                                <li><strong>ID Selector</strong>: Targets an element with a specific ID (e.g., <code>#my-id</code>).</li>
                                <li><strong>Attribute Selector</strong>: Targets elements with a specific attribute (e.g., <code>[type="text"]</code>).</li>
                                <li><strong>Pseudo-class Selector</strong>: Targets elements in a specific state (e.g., <code>a:hover</code>).</li>
                            </ul>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                <p className="text-white">Example:</p>
                                <pre className="text-xs sm:text-sm">
                                    {`/* Element Selector */
h1 {
    color: navy;
}

/* Class Selector */
.my-class {
    background-color: yellow;
}

/* ID Selector */
#my-id {
    border: 1px solid black;
}`}
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* CSS How To */}
                    <section id="css-how-to" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS How To</h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                CSS can be added to HTML in three ways:
                            </p>
                            <ol className="list-decimal pl-6 space-y-1 text-gray-700 text-sm sm:text-base leading-relaxed">
                                <li><strong>Inline CSS</strong>: Using the <code>style</code> attribute in an HTML tag.</li>
                                <li><strong>Internal CSS</strong>: Using a <code>&lt;style&gt;</code> tag in the <code>&lt;head&gt;</code> section.</li>
                                <li><strong>External CSS</strong>: Using a separate <code>.css</code> file linked with a <code>&lt;link&gt;</code> tag.</li>
                            </ol>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                <p className="text-white">Inline CSS Example:</p>
                                <pre className="text-xs sm:text-sm">
                                    {`<p style="color: green;">This is green text.</p>`}
                                </pre>
                                <p className="mt-4 text-white">Internal CSS Example:</p>
                                <pre className="text-xs sm:text-sm">
                                    {`<head>
    <style>
        p {
            color: blue;
        }
    </style>
</head>`}
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* CSS Comments */}
                    <section id="css-comments" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Comments</h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                Comments in CSS are used to explain code and improve readability. They are written between <code>/*</code> and <code>*/</code> and are ignored by the browser.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                <p className="text-white">Example:</p>
                                <pre className="text-xs sm:text-sm">
                                    {`/* This is a comment */
p {
    color: purple; /* This sets the text color to purple */
}`}
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* CSS Colors */}
                    <section id="css-colors" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Colors</h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                CSS supports various ways to specify colors, including color names, hexadecimal values, RGB, RGBA, HSL, and HSLA. Colors can be applied to text, backgrounds, borders, and more.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                <p className="text-white">Examples:</p>
                                <pre className="text-xs sm:text-sm">
                                    {`p {
    color: red; /* Color name */
    background-color: #ff0000; /* Hexadecimal */
    border-color: rgb(255, 0, 0); /* RGB */
    color: rgba(255, 0, 0, 0.5); /* RGBA with opacity */
}`}
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Conditional Sections (Hidden by Default, Displayed on Click) */}

                    {/* CSS Backgrounds */}
                    {activeSection === "css-backgrounds" && (
                        <section id="css-backgrounds" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Backgrounds</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    The <code>background</code> property in CSS is used to style the background of an element. It can set the background color, image, position, size, and more.
                                </p>
                                <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                    <p className="text-white">Example:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`div {
    background-color: lightblue;
    background-image: url('image.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}`}
                                    </pre>
                                    <p className="mt-4 text-white">Shorthand:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`div {
    background: lightblue url('image.jpg') no-repeat center/cover;
}`}
                                    </pre>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CSS Borders */}
                    {activeSection === "css-borders" && (
                        <section id="css-borders" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Borders</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    The <code>border</code> property styles the border around an element. It can specify the width, style, and color of the border.
                                </p>
                                <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                    <p className="text-white">Example:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`div {
    border-width: 2px;
    border-style: solid;
    border-color: black;
}`}
                                    </pre>
                                    <p className="mt-4 text-white">Shorthand:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`div {
    border: 2px solid black;
}`}
                                    </pre>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CSS Margins */}
                    {activeSection === "css-margins" && (
                        <section id="css-margins" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Margins</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    The <code>margin</code> property defines the space outside an element, creating distance between the element and its neighbors. Margins can be set for all sides or individually (<code>margin-top</code>, <code>margin-right</code>, etc.).
                                </p>
                                <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                    <p className="text-white">Example:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`div {
    margin: 20px; /* All sides */
    margin-top: 10px;
    margin-right: 15px;
    margin-bottom: 10px;
    margin-left: 15px;
}`}
                                    </pre>
                                    <p className="mt-4 text-white">Shorthand:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`div {
    margin: 10px 15px 10px 15px; /* Top, Right, Bottom, Left */
}`}
                                    </pre>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CSS Padding */}
                    {activeSection === "css-padding" && (
                        <section id="css-padding" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Padding</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    The <code>padding</code> property defines the space inside an element, between its content and its border. Like margins, padding can be set for all sides or individually.
                                </p>
                                <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                    <p className="text-white">Example:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`div {
    padding: 20px; /* All sides */
    padding-top: 10px;
    padding-right: 15px;
    padding-bottom: 10px;
    padding-left: 15px;
}`}
                                    </pre>
                                    <p className="mt-4 text-white">Shorthand:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`div {
    padding: 10px 15px 10px 15px; /* Top, Right, Bottom, Left */
}`}
                                    </pre>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CSS Height/Width */}
                    {activeSection === "css-height-width" && (
                        <section id="css-height-width" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Height/Width</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    The <code>height</code> and <code>width</code> properties set the dimensions of an element. They can be specified in units like <code>px</code>, <code>%</code>, <code>vw</code>, <code>vh</code>, or <code>rem</code>.
                                </p>
                                <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                    <p className="text-white">Example:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`div {
    width: 200px;
    height: 100px;
    background-color: lightgray;
}`}
                                    </pre>
                                    <p className="mt-4 text-white">Using percentage:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`div {
    width: 50%;
    height: 50vh;
}`}
                                    </pre>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CSS Box Model */}
                    {activeSection === "css-box-model" && (
                        <section id="css-box-model" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Box Model</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    The CSS box model represents the structure of an element as a rectangular box, consisting of content, padding, border, and margin. The total width and height of an element are calculated as: content + padding + border + margin.
                                </p>
                                <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                    <p className="text-white">Example:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`div {
    width: 200px;
    height: 100px;
    padding: 10px;
    border: 2px solid black;
    margin: 20px;
}`}
                                    </pre>
                                    <p className="mt-4 text-white">
                                        Total width = 200px (content) + 10px (left padding) + 10px (right padding) + 2px (left border) + 2px (right border) + 20px (left margin) + 20px (right margin) = 264px.
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CSS Outline */}
                    {activeSection === "css-outline" && (
                        <section id="css-outline" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Outline</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    The <code>outline</code> property draws a line around an element, outside its border. It is often used for highlighting elements (e.g., during focus) and does not affect the element’s dimensions like borders do.
                                </p>
                                <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                    <p className="text-white">Example:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`button {
    outline: 2px solid blue;
    outline-offset: 5px;
}`}
                                    </pre>
                                    <p className="mt-4 text-white">Shorthand:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`button {
    outline: 2px solid blue;
    outline-offset: 5px;
}`}
                                    </pre>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CSS Text */}
                    {activeSection === "css-text" && (
                        <section id="css-text" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Text</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    CSS provides several properties to style text, such as <code>text-align</code>, <code>text-decoration</code>, <code>text-transform</code>, and <code>line-height</code>.
                                </p>
                                <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                    <p className="text-white">Example:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`p {
    text-align: center;
    text-decoration: underline;
    text-transform: uppercase;
    line-height: 1.5;
}`}
                                    </pre>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CSS Fonts */}
                    {activeSection === "css-fonts" && (
                        <section id="css-fonts" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Fonts</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    The <code>font</code> property styles text fonts, including <code>font-family</code>, <code>font-size</code>, <code>font-weight</code>, and <code>font-style</code>.
                                </p>
                                <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                    <p className="text-white">Example:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`p {
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
    font-style: italic;
}`}
                                    </pre>
                                    <p className="mt-4 text-white">Shorthand:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`p {
    font: italic bold 16px Arial, sans-serif;
}`}
                                    </pre>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CSS Icons */}
                    {activeSection === "css-icons" && (
                        <section id="css-icons" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Icons</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    CSS can be used to style icons, often by integrating icon libraries like Font Awesome. Icons can be styled with properties like <code>color</code> and <code>font-size</code>.
                                </p>
                                <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                    <p className="text-white">Example (using Font Awesome):</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

<i class="fas fa-star"></i>

i.fas {
    color: gold;
    font-size: 24px;
}
`}
                                    </pre>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CSS Links */}
                    {activeSection === "css-links" && (
                        <section id="css-links" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Links</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    Links (<code>&lt;a&gt;</code> elements) can be styled using pseudo-classes like <code>:link</code>, <code>:visited</code>, <code>:hover</code>, and <code>:active</code>.
                                </p>
                                <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                    <p className="text-white">Example:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`a:link {
    color: blue;
}
a:visited {
    color: purple;
}
a:hover {
    color: red;
}
a:active {
    color: green;
}`}
                                    </pre>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CSS Lists */}
                    {activeSection === "css-lists" && (
                        <section id="css-lists" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Lists</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    CSS can style lists (<code>&lt;ul&gt;</code> and <code>&lt;ol&gt;</code>) using properties like <code>list-style-type</code>, <code>list-style-image</code>, and <code>list-style-position</code>.
                                </p>
                                <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                    <p className="text-white">Example:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`ul {
    list-style-type: square;
    list-style-position: inside;
}
ul li {
    list-style-image: url('bullet.png');
}`}
                                    </pre>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CSS Tables */}
                    {activeSection === "css-tables" && (
                        <section id="css-tables" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Tables</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    CSS can style tables using properties like <code>border</code>, <code>border-collapse</code>, <code>width</code>, and <code>text-align</code>.
                                </p>
                                <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                    <p className="text-white">Example:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`table {
    width: 100%;
    border-collapse: collapse;
}
th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: center;
}`}
                                    </pre>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CSS Display */}
                    {activeSection === "css-display" && (
                        <section id="css-display" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Display</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    The <code>display</code> property controls the layout of an element. Common values include <code>block</code>, <code>inline</code>, <code>inline-block</code>, <code>none</code>, and <code>flex</code>.
                                </p>
                                <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                    <p className="text-white">Example:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`span {
    display: block; /* Makes an inline element behave like a block */
}
div {
    display: none; /* Hides the element */
}
.container {
    display: flex;
}`}
                                    </pre>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CSS Max-width */}
                    {activeSection === "css-max-width" && (
                        <section id="css-max-width" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">CSS Max-width</h2>
                            <div className="space-y-4">
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    The <code>max-width</code> property sets the maximum width of an element, preventing it from growing beyond a specified value. It’s often used for responsive design.
                                </p>
                                <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                    <p className="text-white">Example:</p>
                                    <pre className="text-xs sm:text-sm">
                                        {`div {
    max-width: 500px;
    margin: 0 auto;
    background-color: lightgray;
}`}
                                    </pre>
                                    <p className="mt-4 text-white">
                                        This ensures the <code>div</code> doesn’t exceed 500px in width and centers it with <code>margin: 0 auto</code>.
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Resources Section */}
                    <section className="mb-16 bg-blue-50 rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Additional Resources</h2>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://developer.mozilla.org/en-US/docs/Web/CSS"
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
                                    MDN CSS Documentation
                                </a>
                            </li>
                            <li>
                                <a href="https://css-tricks.com/" className="text-blue-600 hover:underline flex items-center">
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
                                    CSS-Tricks
                                </a>
                            </li>
                        </ul>
                    </section>

                    {/* Call-to-Action Section */}
                    <section className="py-16 px-6 bg-gradient-to-r from-blue-400 to-green-800 text-white">
                        <div className="max-w-6xl mx-auto text-center">
                            <div className="relative">
                                <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>
                                <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                                    Ready to Learn CSS3?
                                </h2>
                                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                                    Join thousands of learners and start building stunning web designs today. Enroll now to unlock your potential!
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

export default CSSPage;