import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const HTMLPage = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("introduction");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showMore, setShowMore] = useState(false); // State to toggle visibility of sections after Elements & Tags

    const faqs = [
        {
            question: "What is HTML5?",
            answer: "HTML5 is the fifth and latest version of HyperText Markup Language, used for structuring content on the web with new semantic elements, multimedia support, and APIs.",
        },
        {
            question: "How does HTML5 differ from HTML4?",
            answer: "HTML5 introduces new elements like <article>, <section>, and <video>, supports multimedia without plugins, and includes APIs like Geolocation and Canvas.",
        },
        {
            question: "What are semantic elements in HTML5?",
            answer: "Semantic elements like <header>, <footer>, and <nav> describe their meaning to both browsers and developers, improving accessibility and SEO.",
        },
        {
            question: "What is the purpose of the DOCTYPE declaration?",
            answer: "The <!DOCTYPE html> declaration informs the browser that the document is written in HTML5, ensuring it renders correctly.",
        },
        {
            question: "Can HTML5 work with CSS and JavaScript?",
            answer: "Yes, HTML5 works seamlessly with CSS for styling and JavaScript for interactivity, forming the foundation of modern web development.",
        },
        {
            question: "What are HTML attributes?",
            answer: "Attributes provide additional information about HTML elements, such as id, class, src, and href, and are specified within the opening tag.",
        },
        {
            question: "How do you create a form in HTML5?",
            answer: "HTML5 forms are created using the <form> element, with input types like text, email, and password, and can include validation attributes like required.",
        },
        {
            question: "What is the <canvas> element used for?",
            answer: "The <canvas> element provides a space for drawing graphics, such as animations or games, using JavaScript.",
        },
        {
            question: "What is the role of the <meta> tag in HTML5?",
            answer: "The <meta> tag provides metadata about the document, such as charset, viewport settings, and SEO information, placed in the <head> section.",
        },
        {
            question: "Is HTML5 backward compatible?",
            answer: "Yes, HTML5 is designed to be backward compatible, though some older browsers may not support new elements and APIs fully.",
        },
    ];
    const [openFaqIndexes, setOpenFaqIndexes] = useState(Array(faqs.length).fill(false));

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
        { id: "FAQ", title: "FAQ" },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsSidebarOpen(false);

        // If the clicked section is after "elements-tags" and sections are hidden, show them
        const hiddenSections = ["attributes", "headings-paragraphs", "links-images", "lists", "tables", "forms", "semantic-html", "FAQ"];
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
                className="lg:hidden fixed top-24 left-4 z-50 p-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-md focus:outline-none hover:from-blue-700 hover:to-green-700"
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
                    <h2 className="text-xl font-bold text-gray-800">HTML5 Tutorial</h2>
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
                        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 border-b pb-2">HTML Introduction</h1>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-base sm:text-lg">
                                HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications. It provides the structure for content on the internet, using a system of tags to define elements like headings, paragraphs, links, and more.
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
                    </section>

                    {/* Basic Structure Section */}
                    <section id="basic-structure" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 border-b pb-2">Basic Structure</h1>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-base sm:text-lg">
                                Every HTML document follows a basic structure that includes the DOCTYPE declaration, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, and <code>&lt;body&gt;</code> elements.
                            </p>
                            <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mt-4">
                                <pre className="text-sm sm:text-base">
                                    <code className="text-yellow-400">
                                        {`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>
</head>
<body>
    <h1>Welcome to HTML5</h1>
</body>
</html>`}
                                    </code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><code>&lt;!DOCTYPE html&gt;</code> declares the document type as HTML5</li>
                                <li><code>&lt;head&gt;</code> contains metadata and links to resources</li>
                                <li><code>&lt;body&gt;</code> contains the visible content</li>
                            </ul>
                        </div>
                    </section>

                    {/* Elements & Tags Section */}
                    <section id="elements-tags" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 border-b pb-2">Elements & Tags</h1>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-base sm:text-lg">
                                HTML elements are the building blocks of web pages, defined by tags. Tags are enclosed in angle brackets, and most elements have an opening and closing tag.
                            </p>
                            <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-sm sm:text-base">
                                    <code className="text-yellow-400">
                                        {`<p>This is a paragraph.</p>
<div>
    <h1>Heading Inside a Div</h1>
</div>`}
                                    </code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Tags define the type of element (e.g., <code>&lt;p&gt;</code> for paragraph)</li>
                                <li>Elements can be nested to create complex structures</li>
                                <li>Some elements are self-closing, like <code>&lt;img /&gt;</code></li>
                            </ul>
                        </div>
                    </section>

                    {/* Explore More Button */}
                    {!showMore && (
                        <div className="text-center mb-16">
                            <button
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => setShowMore(true)}
                                aria-label="Explore more HTML5 topics"
                            >
                                Explore More
                            </button>
                        </div>
                    )}

                    {/* Sections Hidden Behind Explore More Button */}
                    {showMore && (
                        <>
                            {/* Attributes Section */}
                            <section id="attributes" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 border-b pb-2">Attributes</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-base sm:text-lg">
                                        HTML attributes provide additional information about elements, specified within the opening tag. They are used to customize the behavior or appearance of elements.
                                    </p>
                                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-sm sm:text-base">
                                            <code className="text-yellow-400">
                                                {`<a href="https://example.com" target="_blank">Visit Example</a>
<img src="image.jpg" alt="Description" width="200" height="100">`}
                                            </code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Attributes are name-value pairs (e.g., <code>href="https://example.com"</code>)</li>
                                        <li>Common attributes include <code>id</code>, <code>class</code>, <code>src</code>, and <code>alt</code></li>
                                        <li>Some attributes are global and can be used on any element</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Headings & Paragraphs Section */}
                            <section id="headings-paragraphs" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 border-b pb-2">Headings & Paragraphs</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-base sm:text-lg">
                                        Headings and paragraphs are fundamental for structuring text content. HTML provides six levels of headings and a paragraph element.
                                    </p>
                                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-sm sm:text-base">
                                            <code className="text-yellow-400">
                                                {`<h1>Main Heading</h1>
<h2>Subheading</h2>
<p>This is a paragraph of text. It can contain multiple sentences.</p>`}
                                            </code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Headings range from <code>&lt;h1&gt;</code> (largest) to <code>&lt;h6&gt;</code> (smallest)</li>
                                        <li><code>&lt;p&gt;</code> is used for blocks of text</li>
                                        <li>Headings are important for SEO and accessibility</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Links & Images Section */}
                            <section id="links-images" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 border-b pb-2">Links & Images</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-base sm:text-lg">
                                        Links and images are essential for navigation and visual content. The <code>&lt;a&gt;</code> tag creates hyperlinks, and the <code>&lt;img&gt;</code> tag embeds images.
                                    </p>
                                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-sm sm:text-base">
                                            <code className="text-yellow-400">
                                                {`<a href="https://example.com" target="_blank">Visit Example</a>
<img src="example.jpg" alt="Example Image" width="200" height="100">`}
                                            </code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li><code>href</code> specifies the link destination</li>
                                        <li><code>alt</code> provides alternative text for images</li>
                                        <li><code>target="_blank"</code> opens links in a new tab</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Lists Section */}
                            <section id="lists" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 border-b pb-2">Lists</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-base sm:text-lg">
                                        HTML supports ordered (numbered) and unordered (bulleted) lists for organizing items.
                                    </p>
                                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-sm sm:text-base">
                                            <code className="text-yellow-400">
                                                {`<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>
<ol>
    <li>First</li>
    <li>Second</li>
</ol>`}
                                            </code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li><code>&lt;ul&gt;</code> creates an unordered list (bullets)</li>
                                        <li><code>&lt;ol&gt;</code> creates an ordered list (numbers)</li>
                                        <li><code>&lt;li&gt;</code> defines list items</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Tables Section */}
                            <section id="tables" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 border-b pb-2">Tables</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-base sm:text-lg">
                                        HTML tables are used to display data in rows and columns, defined with the <code>&lt;table&gt;</code> element.
                                    </p>
                                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-sm sm:text-base">
                                            <code className="text-yellow-400">
                                                {`<table border="1">
    <tr>
        <th>Name</th>
        <th>Age</th>
    </tr>
    <tr>
        <td>John</td>
        <td>30</td>
    </tr>
</table>`}
                                            </code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li><code>&lt;tr&gt;</code> defines a table row</li>
                                        <li><code>&lt;th&gt;</code> defines a header cell</li>
                                        <li><code>&lt;td&gt;</code> defines a data cell</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Forms Section */}
                            <section id="forms" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 border-b pb-2">Forms</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-base sm:text-lg">
                                        HTML forms collect user input, using elements like <code>&lt;input&gt;</code>, <code>&lt;textarea&gt;</code>, and <code>&lt;button&gt;</code>.
                                    </p>
                                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-sm sm:text-base">
                                            <code className="text-yellow-400">
                                                {`<form action="/submit">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <input type="submit" value="Submit">
</form>`}
                                            </code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li><code>&lt;form&gt;</code> defines the form container</li>
                                        <li><code>&lt;input&gt;</code> types include text, email, password, etc.</li>
                                        <li>HTML5 adds validation attributes like <code>required</code></li>
                                    </ul>
                                </div>
                            </section>

                            {/* Semantic HTML Section */}
                            <section id="semantic-html" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 border-b pb-2">Semantic HTML</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-base sm:text-lg">
                                        Semantic HTML uses elements that describe their meaning, improving accessibility, SEO, and code readability.
                                    </p>
                                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-sm sm:text-base">
                                            <code className="text-yellow-400">
                                                {`<header>
    <h1>My Website</h1>
</header>
<main>
    <article>
        <h2>Article Title</h2>
        <p>Content...</p>
    </article>
</main>
<footer>
    <p>&copy; 2025</p>
</footer>`}
                                            </code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Examples include <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;article&gt;</code></li>
                                        <li>Improves accessibility for screen readers</li>
                                        <li>Enhances search engine understanding</li>
                                    </ul>
                                </div>
                            </section>

                            {/* FAQ Section */}
                            <section id="FAQ" className="mb-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
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
                    <section className="mb-16 bg-blue-50 rounded-xl shadow-md p-6 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Additional Resources</h2>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://developer.mozilla.org/en-US/docs/Web/HTML"
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
                                    MDN Web Docs - HTML
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.w3schools.com/html/"
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
                                    W3Schools HTML Tutorial
                                </a>
                            </li>
                        </ul>
                    </section>

                    {/* Call-to-Action Section (Always Visible) */}
                    <section className="py-16 px-6 bg-gradient-to-r from-blue-400 to-green-800 text-white rounded-lg shadow-lg">
                        <div className="max-w-6xl mx-auto text-center">
                            <div className="relative">
                                <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>
                                <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                                    Explore The HTML5 Documentation?
                                </h2>
                                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                                    Join thousands of learners and start building real-world projects today. Enroll now to unlock your potential!
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

export default HTMLPage;