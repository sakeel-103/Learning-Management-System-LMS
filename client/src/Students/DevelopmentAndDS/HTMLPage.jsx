import React, { useState } from "react";

const HTMLPage = () => {
    const [activeSection, setActiveSection] = useState("introduction");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "basic-structure", title: "Basic Structure" },
        { id: "elements-tags", title: "Elements & Tags" },
        { id: "attributes", title: "Attributes" },
        { id: "headings-paragraphs", title: "Headings & Paragraphs" },
        { id: "links-images", title: "Links & Images" },
        { id: "lists", title: "Lists" },
        { id: "tables", title: "Tables" },
        { id: "forms", title: "Forms" },
        { id: "semantic-html", title: "Semantic HTML" },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Main Content Area */}
            <div className="flex flex-1">
                {/* Mobile Sidebar Toggle */}
                <button
                    className="lg:hidden fixed top-24 left-4 z-50 p-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-md focus:outline-none hover:from-blue-700 hover:to-green-700"
                    onClick={toggleSidebar}
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
                        <h2 className="text-xl font-bold text-gray-800">HTML5 Tutorial</h2>
                    </div>
                    <div className="h-[calc(100%-4rem)] overflow-y-auto">
                        <nav className="p-4">
                            <ul className="space-y-2">
                                {sections.map((section) => (
                                    <li key={section.id}>
                                        <a
                                            href={`#${section.id}`}
                                            onClick={() => {
                                                setActiveSection(section.id);
                                                setIsSidebarOpen(false);
                                            }}
                                            className={`block px-4 py-2 rounded-md transition-colors ${activeSection === section.id
                                                ? "bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 font-medium"
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
                        {/* Hero Section */}
                        <section className="text-gray-600 mb-16">
                            <div className="text-center py-12 px-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl shadow-sm">
                                <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-6">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                                        Basics & Advanced of HTML5
                                    </span>
                                </h1>
                                <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                                    Master HTML5 with this comprehensive guide covering everything from fundamental structure to advanced semantic elements.
                                </p>
                            </div>
                        </section>

                        {/* Introduction Section */}
                        <section id="introduction" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 border-b pb-2">HTML Introduction</h1>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-base sm:text-lg">
                                        HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications.
                                    </p>
                                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                                        <h3 className="font-semibold text-blue-700 mb-2">Key Features:</h3>
                                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                            <li>Defines the structure of web content</li>
                                            <li>Uses a system of tags and attributes</li>
                                            <li>Platform-independent</li>
                                            <li>Supported by all modern browsers</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Basic Structure Section */}
                        <section id="basic-structure" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 border-b pb-2">Basic Structure</h1>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-base sm:text-lg">
                                        Every HTML document has a basic structure that includes the DOCTYPE declaration, html, head, and body elements.
                                    </p>
                                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                        <pre className="text-sm sm:text-base">
                                            <code className="text-green-400">
                                                {`<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>
    <!-- Content goes here -->
</body>
</html>`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Elements & Tags Section */}
                        <section id="elements-tags" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 border-b pb-2">Elements & Tags</h1>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-base sm:text-lg">
                                        HTML elements are the building blocks of HTML pages, represented by tags.
                                    </p>
                                    <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                                        <h3 className="font-semibold text-green-700 mb-2">Common Elements:</h3>
                                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                            <li><code>&lt;div&gt;</code> - Division or section</li>
                                            <li><code>&lt;p&gt;</code> - Paragraph</li>
                                            <li><code>&lt;a&gt;</code> - Anchor (link)</li>
                                            <li><code>&lt;img /&gt;</code> - Image</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Continue with other sections following the same pattern */}
                        <section id="attributes" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                            <div>{/* Content */}</div>
                        </section>

                        <section id="headings-paragraphs" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                            <div>{/* Content */}</div>
                        </section>

                        <section id="links-images" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                            <div>{/* Content */}</div>
                        </section>

                        <section id="lists" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                            <div>{/* Content */}</div>
                        </section>

                        <section id="tables" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                            <div>{/* Content */}</div>
                        </section>

                        <section id="forms" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                            <div>{/* Content */}</div>
                        </section>

                        <section id="semantic-html" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                            <div>{/* Content */}</div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HTMLPage;