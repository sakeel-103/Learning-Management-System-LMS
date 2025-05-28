import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DataStructuresAlgorithm = () => {
    const [activeSection, setActiveSection] = useState('intro');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const sidebarRef = useRef(null);

    const handleScroll = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Click outside to close sidebar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    const InteractiveBullet = ({ title, content }) => {
        const [isExpanded, setIsExpanded] = React.useState(false);

        return (
            <li className="cursor-pointer group" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-start">
                    <span className={`inline-block w-3 h-3 rounded-full mt-1 mr-2 flex-shrink-0 transition-all 
                            ${isExpanded ? 'bg-blue-500 transform scale-125' : 'bg-gray-300 group-hover:bg-gray-400'}`}></span>
                    <div>
                        <h5 className={`font-medium ${isExpanded ? 'text-blue-600' : 'text-gray-700'} group-hover:text-blue-600`}>
                            {title}
                        </h5>
                        {isExpanded && (
                            <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg animate-fadeIn">
                                {content}
                            </p>
                        )}
                    </div>
                </div>
            </li>
        );
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Menu Button for Mobile */}
            <button
                className="lg:hidden fixed top-24 left-4 z-50 p-2 bg-blue-400 text-white rounded-md focus:outline-none"
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
                        strokeWidth="2"
                        d={isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                    />
                </svg>
            </button>

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={`w-64 bg-white shadow-md fixed h-[calc(100vh-5rem)] transition-transform duration-300 ease-in-out z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:sticky lg:top-0 lg:h-screen lg:translate-x-0`}
                style={{ top: '5rem' }}
            >
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">DSA Tutorial</h2>
                </div>
                <div className="h-[calc(100%-4rem)] overflow-y-auto">
                    <nav className="p-4">
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="#intro"
                                    className={`flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 ${activeSection === 'intro' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                                        }`}
                                    onClick={() => handleScroll('intro')}
                                >
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    DSA Intro
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#what-is-dsa"
                                    className={`flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 ${activeSection === 'what-is-dsa' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                                        }`}
                                    onClick={() => handleScroll('what-is-dsa')}
                                >
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    What is DSA?
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#algorithms"
                                    className={`flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 ${activeSection === 'algorithms' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                                        }`}
                                    onClick={() => handleScroll('algorithms')}
                                >
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    What are Algorithms?
                                </Link>
                            </li>

                            {/* Arrays Section */}
                            <li className="mt-4">
                                <div className="flex items-center text-gray-800 font-semibold p-3 border-b border-gray-200">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    Arrays
                                </div>
                                <ul className="ml-6 mt-2 space-y-1">
                                    <li>
                                        <Link
                                            to="#arrays"
                                            className={`block p-2 pl-4 rounded-lg transition-all duration-200 hover:bg-gray-100 ${activeSection === 'arrays' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                                                }`}
                                            onClick={() => handleScroll('arrays')}
                                        >
                                            DSA Arrays
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#sorting"
                                            className={`block p-2 pl-4 rounded-lg transition-all duration-200 hover:bg-gray-100 ${activeSection === 'sorting' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                                                }`}
                                            onClick={() => handleScroll('sorting')}
                                        >
                                            Sorting Algorithms
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#searching"
                                            className={`block p-2 pl-4 rounded-lg transition-all duration-200 hover:bg-gray-100 ${activeSection === 'searching' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                                                }`}
                                            onClick={() => handleScroll('searching')}
                                        >
                                            Searching Algorithms
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            {/* Linked Lists Section */}
                            <li className="mt-4">
                                <div className="flex items-center text-gray-800 font-semibold p-3 border-b border-gray-200">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Linked Lists
                                </div>
                                <ul className="ml-6 mt-2 space-y-1">
                                    <li>
                                        <Link
                                            to="#linked-lists"
                                            className={`block p-2 pl-4 rounded-lg transition-all duration-200 hover:bg-gray-100 ${activeSection === 'linked-lists' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                                                }`}
                                            onClick={() => handleScroll('linked-lists')}
                                        >
                                            DSA Linked Lists
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#ll-operations"
                                            className={`block p-2 pl-4 rounded-lg transition-all duration-200 hover:bg-gray-100 ${activeSection === 'll-operations' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                                                }`}
                                            onClick={() => handleScroll('ll-operations')}
                                        >
                                            Linked List Operations
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            {/* Stacks & Queues Section */}
                            <li className="mt-4">
                                <div className="flex items-center text-gray-800 font-semibold p-3 border-b border-gray-200">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h12v12H6V6z" />
                                    </svg>
                                    Stacks & Queues
                                </div>
                                <ul className="ml-6 mt-2 space-y-1">
                                    <li>
                                        <Link
                                            to="#stacks"
                                            className={`block p-2 pl-4 rounded-lg transition-all duration-200 hover:bg-gray-100 ${activeSection === 'stacks' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                                                }`}
                                            onClick={() => handleScroll('stacks')}
                                        >
                                            DSA Stacks
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#queues"
                                            className={`block p-2 pl-4 rounded-lg transition-all duration-200 hover:bg-gray-100 ${activeSection === 'queues' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                                                }`}
                                            onClick={() => handleScroll('queues')}
                                        >
                                            DSA Queues
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            {/* Hash Table Section */}
                            <li className="mt-4">
                                <div className="flex items-center text-gray-800 font-semibold p-3 border-b border-gray-200">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                    </svg>
                                    Hash Table
                                </div>
                                <ul className="ml-6 mt-2 space-y-1">
                                    <li>
                                        <Link
                                            to="#hash-table"
                                            className={`block p-2 pl-4 rounded-lg transition-all duration-200 hover:bg-gray-100 ${activeSection === 'hash-table' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                                                }`}
                                            onClick={() => handleScroll('hash-table')}
                                        >
                                            DSA Hash Table
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#hash-sets"
                                            className={`block p-2 pl-4 rounded-lg transition-all duration-200 hover:bg-gray-100 ${activeSection === 'hash-sets' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                                                }`}
                                            onClick={() => handleScroll('hash-sets')}
                                        >
                                            DSA Hash Sets
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#hash-maps"
                                            className={`block p-2 pl-4 rounded-lg transition-all duration-200 hover:bg-gray-100 ${activeSection === 'hash-maps' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                                                }`}
                                            onClick={() => handleScroll('hash-maps')}
                                        >
                                            DSA Hash Maps
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 w-full overflow-x-hidden lg:ml-0 lg:px-6">
                <div className="p-4 sm:p-8 pt-20 sm:pt-36 pb-8">
                    {/* Intro Section */}
                    <section id="intro" className="mb-16 py-12 px-4 bg-gradient-to-r from-green-50 to-indigo-50 rounded-xl shadow-sm text-center">
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-indigo-600">
                                Data Structure And Algorithms
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Master Data Structures and Algorithms to excel in coding interviews and development in 3 months!
                        </p>
                    </section>

                    {/* Hero Banner */}
                    <div className="mb-16 bg-gradient-to-r from-blue-400 to-green-800 rounded-2xl shadow-xl overflow-hidden border border-white/10">
                        <div className="relative p-4 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                            {/* Glow effect */}
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                            {/* Content */}
                            <div className="relative z-10 mb-6 md:mb-0 md:mr-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                        Master DSA
                                    </span>{" "}
                                    in 2025
                                </h2>
                                <p className="text-base sm:text-lg text-white/90 max-w-lg">
                                    Unlock the power of efficient coding with the core concepts of Data Structures and Algorithms
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
                                        {`// Simple array example\n`}
                                        {`int arr[] = {5, 2, 9, 1, 7};\n`}
                                        {`for(int i = 0; i < 5; i++) {\n`}
                                        {`    cout << arr[i] << " ";\n`}
                                        {`}`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Course Overview Section */}
                    <section id="overview" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Course Overview</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">Rating & Popularity</h3>
                                <p className="text-yellow-400">★ 4.4 <span className="text-gray-600">(1K+ Interested Users)</span></p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">Level & Duration</h3>
                                <p>Beginner to Advanced | 3 Months</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">Schedule</h3>
                                <p>Mon, Wed (7PM-9PM IST)</p>
                            </div>
                        </div>
                        <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold mb-2">Why Learn DSA?</h3>
                            <p className="text-gray-600">Data Structures and Algorithms are the backbone of efficient coding. Mastering DSA helps you solve complex problems, ace coding interviews, and build scalable applications. This course bridges the gap from beginner to advanced, preparing you for real-world development.</p>
                        </div>
                    </section>

                    {/* Introduction Section */}
                    <section id="what-is-dsa" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-2">What are Data Structures?</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                Data structures are specialized formats for organizing, processing, retrieving and storing data. They provide a way to manage large amounts of data efficiently for uses such as large databases and internet indexing services.
                            </p>
                            <p className="text-gray-600">
                                In computer science, a data structure is a data organization, management, and storage format that enables efficient access and modification. More precisely, a data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data.
                            </p>
                            <p className="text-gray-600">
                                Common data structures include arrays, linked lists, stacks, queues, trees, and graphs. Each structure has different strengths and weaknesses that make it suitable for specific types of applications. Choosing the right data structure can significantly impact the performance and efficiency of an algorithm.
                            </p>
                        </div>
                    </section>

                    {/* Algorithms Definition Section */}
                    <section id="algorithms" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-2">What are Algorithms?</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                An algorithm is a finite sequence of well-defined, computer-implementable instructions, typically to solve a class of problems or to perform a computation. Algorithms are unambiguous specifications for performing calculation, data processing, automated reasoning, and other tasks.
                            </p>
                            <p className="text-gray-600">
                                In mathematics and computer science, an algorithm is a finite sequence of rigorous instructions, typically used to solve a class of specific problems or to perform a computation. Algorithms are used as specifications for performing calculations and data processing.
                            </p>
                            <p className="text-gray-600">
                                Good algorithms are crucial to the performance of all software systems. Algorithmic efficiency can be analyzed through formal methods and is an important consideration in software development. Common algorithm categories include sorting, searching, graph traversal, and dynamic programming.
                            </p>
                        </div>
                    </section>

                    {/* Technologies Section */}
                    <section id="technologies" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-12 text-center border-b pb-2">
                            Technologies Covered
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* C++ Card */}
                            <a
                                href="https://isocpp.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-center w-14 h-14 bg-blue-50 rounded-lg mb-4">
                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">C++</h3>
                                    <p className="text-gray-600 text-sm">Implementation Language</p>
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                </div>
                            </a>

                            {/* Python Card */}
                            <a
                                href="https://www.python.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-center w-14 h-14 bg-yellow-50 rounded-lg mb-4">
                                        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors">Python</h3>
                                    <p className="text-gray-600 text-sm">Alternative Language</p>
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                </div>
                            </a>

                            {/* Big-O Notation Card */}
                            <a
                                href="https://en.wikipedia.org/wiki/Big_O_notation"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-center w-14 h-14 bg-green-50 rounded-lg mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">Big-O Notation</h3>
                                    <p className="text-gray-600 text-sm">Complexity Analysis</p>
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                </div>
                            </a>

                            {/* LeetCode Card */}
                            <a
                                href="https://leetcode.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-center w-14 h-14 bg-orange-50 rounded-lg mb-4">
                                        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">LeetCode</h3>
                                    <p className="text-gray-600 text-sm">Practice Platform</p>
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                </div>
                            </a>
                        </div>
                    </section>

                    {/* Syllabus Section */}
                    <section id="syllabus" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-12 text-center border-b pb-2">
                            Structured Learning Path
                        </h2>
                        <div className="space-y-8">
                            {/* Module 1: Foundations */}
                            <div className="bg-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg">
                                <div className="p-6 sm:p-8">
                                    <div className="flex items-center mb-6">
                                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-4">
                                            <span className="text-blue-600 font-bold text-xl">1</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800">Foundational Concepts</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Key Topics Column */}
                                        <div>
                                            <h4 className="font-semibold text-lg text-blue-800 mb-3 border-b pb-2">Key Topics</h4>
                                            <ul className="space-y-3">
                                                <InteractiveBullet
                                                    title="Time & Space Complexity"
                                                    content="Learn Big-O, Omega, and Theta notations. Analyze best, average, and worst case scenarios for algorithms. Understand how to calculate complexity for loops, recursive functions, and nested operations."
                                                />
                                                <InteractiveBullet
                                                    title="Arrays & Linked Lists"
                                                    content="Arrays: Contiguous memory, random access, fixed size. Linked Lists: Dynamic size, pointer manipulation, insertion/deletion efficiency. Implement operations for both and compare their tradeoffs."
                                                />
                                                <InteractiveBullet
                                                    title="Stacks & Queues"
                                                    content="Stack (LIFO): Push/pop operations, call stack, DFS. Queue (FIFO): Enqueue/dequeue, BFS, circular queues. Implement using both arrays and linked lists."
                                                />
                                                <InteractiveBullet
                                                    title="Hash Tables"
                                                    content="Hash functions, collision resolution (chaining/open addressing), load factor. Implement basic dictionary operations and analyze time complexity."
                                                />
                                            </ul>
                                        </div>
                                        {/* Learning Approach Column */}
                                        <div>
                                            <h4 className="font-semibold text-lg text-purple-800 mb-3 border-b pb-2">Learning Approach</h4>
                                            <ul className="space-y-3">
                                                <InteractiveBullet
                                                    title="Start with Complexity Analysis"
                                                    content="Practice analyzing code snippets to determine time complexity. Begin with simple loops, progress to nested loops, then recursive functions. Use visualizations to understand growth rates."
                                                />
                                                <InteractiveBullet
                                                    title="Implement Data Structures"
                                                    content="Build each structure from scratch in your language of choice. Focus on core operations: insertion, deletion, search. Test edge cases (empty, single element, full capacity)."
                                                />
                                                <InteractiveBullet
                                                    title="Solve Basic Problems"
                                                    content="Begin with LeetCode Easy problems (e.g., Two Sum, Reverse Linked List). Focus on understanding before optimizing. Time yourself after initial comfort."
                                                />
                                                <InteractiveBullet
                                                    title="Compare Tradeoffs"
                                                    content="Create comparison tables showing when to use array vs linked list, or hash table vs binary search. Understand memory usage patterns."
                                                />
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Module 2: Sorting & Searching */}
                            <div className="bg-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg">
                                <div className="p-6 sm:p-8">
                                    <div className="flex items-center mb-6">
                                        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mr-4">
                                            <span className="text-green-600 font-bold text-xl">2</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800">Sorting & Searching Algorithms</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Key Topics Column */}
                                        <div>
                                            <h4 className="font-semibold text-lg text-green-800 mb-3 border-b pb-2">Key Topics</h4>
                                            <ul className="space-y-3">
                                                <InteractiveBullet
                                                    title="Comparison Sorts"
                                                    content="Bubble Sort: O(n²) stable. Selection Sort: O(n²) unstable. Insertion Sort: O(n²) stable, efficient for small/nearly-sorted data. Merge Sort: O(n log n) stable, divide-and-conquer."
                                                />
                                                <InteractiveBullet
                                                    title="Partitioning Sorts"
                                                    content="Quick Sort: O(n log n) average, O(n²) worst, unstable. Heap Sort: O(n log n) in-place, unstable. Understand pivot selection and partitioning approaches."
                                                />
                                                <InteractiveBullet
                                                    title="Non-Comparison Sorts"
                                                    content="Counting Sort: O(n+k) for small integer ranges. Radix Sort: O(nk) for numbers. Bucket Sort: When input is uniformly distributed."
                                                />
                                                <InteractiveBullet
                                                    title="Search Algorithms"
                                                    content="Linear Search: O(n) universal. Binary Search: O(log n) requires sorted data. Interpolation Search: O(log log n) for uniform distributions."
                                                />
                                            </ul>
                                        </div>
                                        {/* Learning Approach Column */}
                                        <div>
                                            <h4 className="font-semibold text-lg text-yellow-800 mb-3 border-b pb-2">Learning Approach</h4>
                                            <ul className="space-y-3">
                                                <InteractiveBullet
                                                    title="Implement All Sorts"
                                                    content="Code each algorithm from scratch. Visualize each step. Compare performance on different input sizes and distributions (random, sorted, reverse-sorted)."
                                                />
                                                <InteractiveBullet
                                                    title="Master Binary Search"
                                                    content="Practice variations: find first/last occurrence, count occurrences, search rotated arrays. Learn to identify when problems can be reduced to binary search."
                                                />
                                                <InteractiveBullet
                                                    title="Analyze Tradeoffs"
                                                    content="Create decision trees for when to use each sort. Consider stability, memory usage, and average/worst-case performance for your use case."
                                                />
                                                <InteractiveBullet
                                                    title="Hybrid Algorithms"
                                                    content="Study real-world implementations like Timsort (Merge+Insertion) and Introsort (Quick+Heap). Understand why hybrids are often used in practice."
                                                />
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Module 3: Trees & Graphs */}
                            <div className="bg-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg">
                                <div className="p-6 sm:p-8">
                                    <div className="flex items-center mb-6">
                                        <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mr-4">
                                            <span className="text-orange-600 font-bold text-xl">3</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800">Tree & Graph Structures</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Key Topics Column */}
                                        <div>
                                            <h4 className="font-semibold text-lg text-orange-800 mb-3 border-b pb-2">Key Topics</h4>
                                            <ul className="space-y-3">
                                                <InteractiveBullet
                                                    title="Binary Trees"
                                                    content="Tree terminology (root, leaf, depth, height). Traversals: inorder (LNR), preorder (NLR), postorder (LRN). Implement recursive and iterative versions."
                                                />
                                                <InteractiveBullet
                                                    title="Binary Search Trees"
                                                    content="Invariant: left < parent < right. Operations: search/insert/delete. Understand degenerate cases leading to O(n) performance. Balanced variants: AVL and Red-Black trees."
                                                />
                                                <InteractiveBullet
                                                    title="Graph Representations"
                                                    content="Adjacency matrix (O(1) lookup, O(V²) space). Adjacency list (O(1) insert, O(V+E) space). Edge list. Choose based on expected operations."
                                                />
                                                <InteractiveBullet
                                                    title="Graph Algorithms"
                                                    content="BFS (queue, shortest path unweighted). DFS (stack/recursion, connectivity). Topological sort (DAGs). Dijkstra's (weighted, no negatives). Bellman-Ford (with negatives)."
                                                />
                                            </ul>
                                        </div>
                                        {/* Learning Approach Column */}
                                        <div>
                                            <h4 className="font-semibold text-lg text-red-800 mb-3 border-b pb-2">Learning Approach</h4>
                                            <ul className="space-y-3">
                                                <InteractiveBullet
                                                    title="Draw Before Coding"
                                                    content="Visualize tree/graph problems on paper first. Sketch example inputs and expected outputs. Annotate traversal orders."
                                                />
                                                <InteractiveBullet
                                                    title="Master Recursion"
                                                    content="Tree problems often have natural recursive solutions. Practice thinking recursively: base case, recursive case, combining results."
                                                />
                                                <InteractiveBullet
                                                    title="Implement Traversals"
                                                    content="Code all traversal methods both recursively and iteratively. Understand when each is appropriate (DFS for paths, BFS for levels)."
                                                />
                                                <InteractiveBullet
                                                    title="Solve Pattern Problems"
                                                    content="Practice common patterns: level-order traversal, tree diameter, graph connectivity, cycle detection, topological sorting."
                                                />
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Module 4: Advanced Concepts */}
                            <div className="bg-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg">
                                <div className="p-6 sm:p-8">
                                    <div className="flex items-center mb-6">
                                        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mr-4">
                                            <span className="text-purple-600 font-bold text-xl">4</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800">Advanced Problem Solving</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Key Topics Column */}
                                        <div>
                                            <h4 className="font-semibold text-lg text-purple-800 mb-3 border-b pb-2">Key Topics</h4>
                                            <ul className="space-y-3">
                                                <InteractiveBullet
                                                    title="Dynamic Programming"
                                                    content="Memoization (top-down) vs tabulation (bottom-up). Identify optimal substructure and overlapping subproblems. Classic problems: Fibonacci, Knapsack, LCS, Coin Change."
                                                />
                                                <InteractiveBullet
                                                    title="Greedy Algorithms"
                                                    content="Make locally optimal choices hoping for global optimum. Proof techniques: greedy stays ahead, exchange argument. Examples: Interval Scheduling, Huffman Coding."
                                                />
                                                <InteractiveBullet
                                                    title="Backtracking"
                                                    content="Systematically explore possibilities using recursion + pruning. Solve constraint satisfaction problems: N-Queens, Sudoku, Subset Sum."
                                                />
                                                <InteractiveBullet
                                                    title="Advanced Patterns"
                                                    content="Sliding Window (subarray problems). Two Pointers (sorted array pairs). Fast & Slow pointers (cycle detection). Bit Manipulation (optimization)."
                                                />
                                            </ul>
                                        </div>
                                        {/* Learning Approach Column */}
                                        <div>
                                            <h4 className="font-semibold text-lg text-indigo-800 mb-3 border-b pb-2">Learning Approach</h4>
                                            <ul className="space-y-3">
                                                <InteractiveBullet
                                                    title="Recognize DP Patterns"
                                                    content="Identify when problems involve: 1) Choices at each step 2) Repeating subproblems. Start with 1D then 2D DP tables. Practice state transition formulation."
                                                />
                                                <InteractiveBullet
                                                    title=" Prove Greedy Correctness"
                                                    content="Don't assume greedy works - prove it for each problem. Start with obvious greedy approaches, then test edge cases."
                                                />
                                                <InteractiveBullet
                                                    title="Backtracking Templates"
                                                    content="Learn the standard pattern: choose, explore, unchoose. Prune invalid paths early. Apply to permutation/combination problems."
                                                />
                                                <InteractiveBullet
                                                    title="Master Problem Patterns"
                                                    content="Categorize problems by technique. Maintain a pattern journal. Solve variations of core problems to build intuition."
                                                />
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Arrays Section */}
                    <section id="arrays" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Array Data Structure</h2>
                            <p className="mt-4 text-base sm:text-lg text-gray-600">
                                A foundational data structure that stores elements in contiguous memory locations
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is an Array?</h3>
                            <p className="text-gray-700 mb-6">
                                An array is a collection of items stored at contiguous memory locations. It allows storing multiple items of the same type together, making it efficient to access elements using numerical indices.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div>
                                    <h4 className="text-xl font-medium text-gray-800 mb-3">Key Features</h4>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-start">
                                            <span className="text-blue-600 mr-2">•</span>
                                            <span>Fixed size (static arrays) or dynamic size</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-600 mr-2">•</span>
                                            <span>All elements must be of the same type</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-600 mr-2">•</span>
                                            <span>Elements accessed via zero-based index</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-600 mr-2">•</span>
                                            <span>Memory is allocated contiguously</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-gray-800 mb-3">Memory Representation</h4>
                                    <div className="flex justify-start space-x-2">
                                        {['A', 'B', 'C', 'D', 'E'].map((item, index) => (
                                            <div key={index} className="text-center">
                                                <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-md border border-blue-200">
                                                    {item}
                                                </div>
                                                <div className="text-xs mt-1 text-gray-600">Index {index}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Array Operations</h3>
                            <div className="overflow-x-auto mb-10">
                                <table className="min-w-full border border-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Operation</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Time Complexity</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-4 py-3 text-sm text-gray-800">Access</td>
                                            <td className="px-4 py-3 text-sm font-mono text-gray-800">O(1)</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">Access element by index</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-sm text-gray-800">Search</td>
                                            <td className="px-4 py-3 text-sm font-mono text-gray-800">O(n)</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">Find element by value</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-sm text-gray-800">Insertion</td>
                                            <td className="px-4 py-3 text-sm font-mono text-gray-800">O(n)</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">Add new element</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-sm text-gray-800">Deletion</td>
                                            <td className="px-4 py-3 text-sm font-mono text-gray-800">O(n)</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">Remove element</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Array Concepts</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-medium text-gray-800 mb-2">Initialization</h4>
                                    <p className="text-gray-700">
                                        Arrays are declared by specifying their type and size (for static arrays) or initialized with values.
                                        Different languages have varying syntax but all follow the same principle - creating a container
                                        that holds multiple values of the same type in sequential memory locations.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-800 mb-2">Element Access</h4>
                                    <p className="text-gray-700">
                                        Arrays provide constant-time O(1) access to any element using its index. This is because the memory
                                        address of any element can be calculated directly using the formula:
                                        <span className="font-mono bg-gray-100 px-2 py-1 rounded">base_address + (index × element_size)</span>.
                                        The first element is typically at index 0.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-800 mb-2">Modification</h4>
                                    <p className="text-gray-700">
                                        Updating an array element is an O(1) operation since you can directly access any position.
                                        However, inserting or deleting elements (except at the end for dynamic arrays) requires O(n) time
                                        because it may involve shifting all subsequent elements to maintain continuity.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-800 mb-2">Traversal</h4>
                                    <p className="text-gray-700">
                                        Arrays are typically traversed using loops that increment an index counter. The linear memory layout
                                        makes sequential access very efficient. Most languages provide built-in methods to get the array length
                                        which is crucial for bounds checking during traversal.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sorting Algorithms Section */}
                    <section id="sorting" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Sorting Algorithms</h2>
                            <p className="mt-2 text-base sm:text-lg text-gray-600">
                                Methods to arrange data in ascending or descending order.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Bubble Sort</h3>
                                <p className="text-gray-700">
                                    Compares and swaps adjacent elements if out of order.
                                </p>
                                <ul className="list-disc pl-5 mt-2 text-gray-700">
                                    <li>Complexity: O(n²)</li>
                                    <li>Simple to implement.</li>
                                    <li>No extra memory needed.</li>
                                    <li>Inefficient for large datasets.</li>
                                    <li>Slow due to O(n²) time.</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Selection Sort</h3>
                                <p className="text-gray-700">
                                    Selects smallest element from unsorted part and adds to sorted part.
                                </p>
                                <ul className="list-disc pl-5 mt-2 text-gray-700">
                                    <li>Complexity: O(n²)</li>
                                    <li>Good for small lists.</li>
                                    <li>No extra memory needed.</li>
                                    <li>Poor for large lists.</li>
                                    <li>Not stable.</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Insertion Sort</h3>
                                <p className="text-gray-700">
                                    Builds sorted array one element at a time via comparisons.
                                </p>
                                <ul className="list-disc pl-5 mt-2 text-gray-700">
                                    <li>Complexity: O(n²)</li>
                                    <li>Efficient for small or nearly sorted data.</li>
                                    <li>Adaptive and stable.</li>
                                    <li>Inefficient for large lists.</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Merge Sort</h3>
                                <p className="text-gray-700">
                                    Divides array, sorts halves, and merges them.
                                </p>
                                <ul className="list-disc pl-5 mt-2 text-gray-700">
                                    <li>Complexity: O(n log n)</li>
                                    <li>Stable and good for linked lists.</li>
                                    <li>Requires O(n) extra space.</li>
                                    <li>Slower for small datasets.</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Sort</h3>
                                <p className="text-gray-700">
                                    Partitions array around a pivot and recursively sorts sub-arrays.
                                </p>
                                <ul className="list-disc pl-5 mt-2 text-gray-700">
                                    <li>Complexity: O(n log n) average, O(n²) worst</li>
                                    <li>Fast in practice.</li>
                                    <li>Cache efficient.</li>
                                    <li>Not stable.</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Heap Sort</h3>
                                <p className="text-gray-700">
                                    Uses a binary heap to sort, similar to selection sort.
                                </p>
                                <ul className="list-disc pl-5 mt-2 text-gray-700">
                                    <li>Complexity: O(n log n)</li>
                                    <li>Uses O(1) extra space.</li>
                                    <li>Guaranteed O(n log n).</li>
                                    <li>Not stable, poor cache performance.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Searching Algorithms Section */}
                    <section id="searching" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Searching Algorithms</h2>
                            <p className="mt-4 text-base sm:text-lg text-gray-600">
                                Techniques for finding elements within data structures efficiently
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center mb-6">
                                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-800">Linear Search</h3>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-gray-700">
                                        Sequentially checks each element of the list until a match is found or the whole list has been searched.
                                    </p>
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                        <h4 className="font-medium text-blue-800 mb-2">Characteristics:</h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-start">
                                                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">✓</span>
                                                <span><strong>Time Complexity:</strong> O(n) worst case</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">✓</span>
                                                <span><strong>Space Complexity:</strong> O(1)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">✓</span>
                                                <span><strong>Works on:</strong> Both sorted and unsorted arrays</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800 mb-2">Implementation:</h4>
                                        <pre className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto text-sm">
                                            <code>
                                                {`function linearSearch(arr, target) {
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === target) return i;
  }
  return -1;
}`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                            {/* Binary Search */}
                            <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center mb-6">
                                    <div className="bg-green-100 p-2 rounded-lg mr-4">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-800">Binary Search</h3>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-gray-700">
                                        Efficient algorithm for finding an item from a sorted list by repeatedly dividing the search interval in half.
                                    </p>
                                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                        <h4 className="font-medium text-green-800 mb-2">Characteristics:</h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-start">
                                                <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">✓</span>
                                                <span><strong>Time Complexity:</strong> O(log n)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">✓</span>
                                                <span><strong>Space Complexity:</strong> O(1) iterative, O(log n) recursive</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">✓</span>
                                                <span><strong>Requires:</strong> Sorted array</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800 mb-2">Implementation:</h4>
                                        <pre className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto text-sm">
                                            <code>
                                                {`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while(left <= right) {
    const mid = Math.floor((left + right) / 2);
    if(arr[mid] === target) return mid;
    if(arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Linked Lists Section */}
                    <section id="linked-lists" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Linked Lists</h2>
                            <p className="mt-4 text-base sm:text-lg text-gray-600">
                                Linear data structures where elements are linked using pointers
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                            {[
                                {
                                    type: "Singly Linked List",
                                    desc: "Each node contains data and a pointer to the next node",
                                    pros: ["Simple implementation", "Efficient insertion/deletion at head"],
                                    cons: ["No backward traversal", "More memory than array for same data"]
                                },
                                {
                                    type: "Doubly Linked List",
                                    desc: "Nodes contain data and pointers to both next and previous nodes",
                                    pros: ["Bidirectional traversal", "Easier deletion of nodes"],
                                    cons: ["More memory per node", "More complex implementation"]
                                },
                                {
                                    type: "Circular Linked List",
                                    desc: "Last node points back to first node, forming a circle",
                                    pros: ["Circular traversal", "Useful for round-robin scheduling"],
                                    cons: ["Risk of infinite loops", "More complex implementation"]
                                }
                            ].map((list, index) => (
                                <div key={index} className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{list.type}</h3>
                                    <p className="text-gray-700 mb-4">{list.desc}</p>
                                    <div className="space-y-3">
                                        <div className="bg-purple-50 p-3 rounded-lg">
                                            <h4 className="text-sm font-medium text-purple-800 mb-1">Advantages</h4>
                                            <ul className="text-xs text-gray-700 space-y-1">
                                                {list.pros.map((pro, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <svg className="w-3 h-3 text-purple-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                        </svg>
                                                        {pro}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-pink-50 p-3 rounded-lg">
                                            <h4 className="text-sm font-medium text-pink-800 mb-1">Limitations</h4>
                                            <ul className="text-xs text-gray-700 space-y-1">
                                                {list.cons.map((con, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <svg className="w-3 h-3 text-pink-500 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                        </svg>
                                                        {con}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Linked List Operations */}
                        <div id="ll-operations" className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Linked List Operations</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-medium text-gray-800 mb-4">Common Operations</h4>
                                    <div className="space-y-4">
                                        {[
                                            {
                                                operation: "Insertion",
                                                desc: "Adding a new node at beginning, middle or end",
                                                complexity: "O(1) at head, O(n) at position"
                                            },
                                            {
                                                operation: "Deletion",
                                                desc: "Removing a node from the list",
                                                complexity: "O(1) at head, O(n) at position"
                                            },
                                            {
                                                operation: "Traversal",
                                                desc: "Visiting each node of the list",
                                                complexity: "O(n)"
                                            },
                                            {
                                                operation: "Search",
                                                desc: "Finding a node with given value",
                                                complexity: "O(n)"
                                            }
                                        ].map((op, i) => (
                                            <div key={i} className="border-l-4 border-purple-500 pl-4">
                                                <h5 className="font-medium text-gray-800">{op.operation}</h5>
                                                <p className="text-sm text-gray-600 mb-1">{op.desc}</p>
                                                <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded-full">{op.complexity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-800 mb-4">Implementation Example</h4>
                                    <pre className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto text-sm">
                                        <code>
                                            {`class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  // Insert at head
  insertFirst(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }
  
  // Insert at end
  insertLast(data) {
    const newNode = new Node(data);
    if(!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while(current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
}`}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Stacks and Queues Section */}
                    <section id="stacks" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Stacks</h2>
                            <p className="mt-2 text-base sm:text-lg text-gray-600">
                                A linear data structure following the Last In, First Out (LIFO) principle.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">What is a Stack?</h3>
                            <p className="text-gray-700">
                                A stack is a collection of elements with two main operations: push (add to the top) and pop (remove from the top). It follows the Last In, First Out (LIFO) principle, meaning the last element added is the first one to be removed.
                            </p>
                            <ul className="list-disc pl-5 mt-2 text-gray-700">
                                <li>Complexity: O(1) for push and pop operations.</li>
                                <li>Useful for: Undo mechanisms, function call stack, DFS.</li>
                                <li>Can be implemented using arrays or linked lists.</li>
                            </ul>
                        </div>
                    </section>

                    <section id="queues" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Queues</h2>
                            <p className="mt-2 text-base sm:text-lg text-gray-600">
                                A linear data structure following the First In, First Out (FIFO) principle.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">What is a Queue?</h3>
                            <p className="text-gray-700">
                                A queue is a collection of elements with two main operations: enqueue (add to the rear) and dequeue (remove from the front). It follows the First In, First Out (FIFO) principle, meaning the first element added is the first one to be removed.
                            </p>
                            <ul className="list-disc pl-5 mt-2 text-gray-700">
                                <li>Complexity: O(1) for enqueue and dequeue operations.</li>
                                <li>Useful for: Task scheduling, BFS, buffering.</li>
                                <li>Can be implemented using arrays, linked lists, or circular arrays.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Hash Tables Section (Continued) */}
                    <section id="hash-table" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Hash Tables</h2>
                            <p className="mt-2 text-base sm:text-lg text-gray-600">
                                A data structure that maps keys to values for efficient lookup
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">What is a Hash Table?</h3>
                            <p className="text-gray-700 mb-4">
                                A hash table is a data structure that implements an associative array abstract data type, a structure that can map keys to values. It uses a hash function to compute an index into an array where an element will be stored or searched.
                            </p>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                <li>Complexity: O(1) average case for lookup, insertion, and deletion.</li>
                                <li>Useful for: Dictionaries, caching, indexing databases.</li>
                                <li>Challenges: Collision handling (e.g., chaining, open addressing).</li>
                            </ul>
                        </div>

                        {/* Hash Sets Section */}
                        <div id="hash-sets" className="mt-12 bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Hash Sets</h3>
                            <div className="space-y-4">
                                <p className="text-gray-700">
                                    A hash set is a collection of unique elements implemented using a hash table. It does not allow duplicate values and provides efficient operations for checking the existence of an element.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-800 mb-3">Key Features</h4>
                                        <ul className="space-y-2 text-gray-700">
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-2">•</span>
                                                <span>Ensures uniqueness of elements</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-2">•</span>
                                                <span>O(1) average time for add, remove, and contains</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-2">•</span>
                                                <span>No order preservation</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-800 mb-3">Example Implementation</h4>
                                        <pre className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto text-sm">
                                            <code>
                                                {`class HashSet {
  constructor() {
    this.table = new Array(100);
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.table.length;
  }

  add(key) {
    const index = this.hash(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }
    if (!this.table[index].includes(key)) {
      this.table[index].push(key);
    }
  }

  contains(key) {
    const index = this.hash(key);
    return this.table[index] && this.table[index].includes(key);
  }
}`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hash Maps Section */}
                        <div id="hash-maps" className="mt-12 bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Hash Maps</h3>
                            <div className="space-y-4">
                                <p className="text-gray-700">
                                    A hash map is a data structure that maps keys to values, allowing efficient retrieval of values based on their keys. It extends the concept of a hash set by associating each key with a specific value.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-800 mb-3">Key Features</h4>
                                        <ul className="space-y-2 text-gray-700">
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-2">•</span>
                                                <span>Key-value pair storage</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-2">•</span>
                                                <span>O(1) average time for get, put, and remove</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-2">•</span>
                                                <span>Handles collisions via chaining or probing</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-800 mb-3">Example Implementation</h4>
                                        <pre className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto text-sm">
                                            <code>
                                                {`class HashMap {
  constructor() {
    this.table = new Array(100);
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.table.length;
  }

  put(key, value) {
    const index = this.hash(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }
    const entry = this.table[index].find(item => item[0] === key);
    if (entry) {
      entry[1] = value;
    } else {
      this.table[index].push([key, value]);
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    if (bucket) {
      const entry = bucket.find(item => item[0] === key);
      return entry ? entry[1] : undefined;
    }
    return undefined;
  }
}`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Call to Action Section (Footer) */}
                    <section className="py-12 px-4 sm:px-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg text-center text-white">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            Ready to Master Data Structures & Algorithms?
                        </h2>
                        <p className="text-base sm:text-lg mb-6 max-w-2xl mx-auto">
                            Join thousands of learners in 2025 and take your coding skills to the next level with our comprehensive DSA course!
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <button
                                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
                                onClick={() => navigate('/signup')}
                            >
                                Enroll Now
                            </button>
                            <button
                                className="px-6 py-3 border-2 border-white/50 text-white font-medium rounded-lg hover:bg-white/20 transition-all"
                                onClick={() => navigate('/contact')}
                            >
                                Contact Us
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DataStructuresAlgorithm;