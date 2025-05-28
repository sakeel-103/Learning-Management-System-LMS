import React, { useState } from 'react';
import lov from '../images/lov.jpg';
import harry from '../images/harry.jpg';
import aman from '../images/aman.jpg';
import assist1 from '../images/assist1.jpg';
import assist2 from '../images/assist2.jpg';

const DSAPage = () => {
    const [showPlatforms, setShowPlatforms] = useState(false);
    const [showVideos, setShowVideos] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showMoreBenefits, setShowMoreBenefits] = useState(false);

    const [openWeeks, setOpenWeeks] = useState({});
    const toggleWeek = (week) => {
        setOpenWeeks((prev) => ({ ...prev, [week]: !prev[week] }));
    };
    const [showAssistants, setShowAssistants] = useState(false);
    const toggleAssistants = () => {
        setShowAssistants(true);
    };

    return (
        <>
            <div className="min-h-screen overflow-x-hidden bg-gray-50">

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-400 to-green-800 text-white py-16 px-6 pt-36">
                    <div className="relative max-w-6xl mx-auto text-center">
                        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                Full Stack Development: A Complete Guide
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
                            Master front-end, back-end, databases, and DevOps to build dynamic, scalable web applications from scratch.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <button
                                className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
                                onClick={() => { }}
                            >
                                Start Learning Now
                            </button>
                            <button
                                className="px-6 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
                                onClick={() => { }}
                            >
                                Explore Projects
                            </button>
                        </div>
                    </div>
                </section>

                {/* Course Section */}
                <section id="overview" className="py-12 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b pb-2">Course Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">Rating & Popularity</h3>
                                <p className="text-yellow-400">★ 4.6 <span className="text-gray-600">(2K+ Interested Users)</span></p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">Level & Duration</h3>
                                <p className="text-gray-600">Beginner to Advanced | 4 Months</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">Schedule</h3>
                                <p className="text-gray-600">Tue, Thu (7PM-9PM IST)</p>
                            </div>
                        </div>
                        <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg border border-gray-100">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Why Learn Full Stack Development?</h3>
                            <p className="text-gray-600 mb-4">
                                Full-stack development is important because it enables developers to build entire web applications
                                from front-end to back-end, leading to more efficient development, improved communication,
                                and cost savings for businesses. It also provides developers with a broader skillset, making them
                                more valuable and adaptable in a rapidly evolving technological landscape.
                            </p>
                            <p className="text-gray-600 font-medium mb-2">Here's why full-stack development is important:</p>
                            <button
                                className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                                onClick={() => setShowMoreBenefits(!showMoreBenefits)}
                                aria-label={showMoreBenefits ? 'Hide benefits details' : 'Show benefits details'}
                            >
                                {showMoreBenefits ? 'Show Less' : 'See Details'}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 ml-1 transition-transform duration-200 ${showMoreBenefits ? 'transform rotate-180' : ''}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {showMoreBenefits && (
                                <div className="mt-4 space-y-4 animate-fadeIn">
                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 h-6 w-6 text-indigo-600 mr-3 mt-0.5">1.</div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">Efficiency and Speed</h4>
                                                <p className="text-gray-600 text-sm">
                                                    Full-stack developers can work on both front-end and back-end, streamlining development
                                                    and enabling faster prototyping.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 h-6 w-6 text-indigo-600 mr-3 mt-0.5">2.</div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">Cost Savings</h4>
                                                <p className="text-gray-600 text-sm">
                                                    Businesses save money by hiring fewer specialized developers, especially beneficial for startups.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 text-indigo-600 mr-3 mt-0.5">3.</div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Comprehensive Understanding</h4>
                                            <p className="text-gray-600 text-sm">
                                                Holistic view of development process enables better decision making and optimization
                                                across the entire application.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 text-indigo-600 mr-3 mt-0.5">4.</div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Adaptability</h4>
                                            <p className="text-gray-600 text-sm">
                                                Proficiency in multiple technologies makes full-stack developers adaptable to changing
                                                project requirements and new tools.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 text-indigo-600 mr-3 mt-0.5">5.</div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Improved Communication</h4>
                                            <p className="text-gray-600 text-sm">
                                                Better collaboration between teams as they understand both front-end and back-end needs.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 text-indigo-600 mr-3 mt-0.5">6.</div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Career Opportunities</h4>
                                            <p className="text-gray-600 text-sm">
                                                High demand across industries leads to better job prospects and higher salaries.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Technologies Section */}
                <section id="technologies" className="py-12 px-6 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b pb-2">Technologies Covered</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-blue-100 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Front-End</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    <li>HTML5: Structure web content</li>
                                    <li>CSS3 & Tailwind: Responsive styling</li>
                                    <li>JavaScript (ES6+): Interactive UIs</li>
                                    <li>React: Component-based UI framework</li>
                                    <li>Next.js: Server-side rendering and static site generation</li>
                                </ul>
                            </div>
                            <div className="bg-green-100 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                                <h3 className="text-xl font-semibold mb-3 text-green-700">Back-End</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    <li>Node.js: JavaScript runtime for server-side</li>
                                    <li>Express.js: Web framework for Node.js</li>
                                    <li>MongoDB: NoSQL database</li>
                                    <li>MySQL: Relational database management</li>
                                    <li>GraphQL: Query language for APIs</li>
                                </ul>
                            </div>
                            <div className="bg-purple-100 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                                <h3 className="text-xl font-semibold mb-3 text-purple-700">DevOps & Tools</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    <li>Git: Version control system</li>
                                    <li>Docker: Containerization platform</li>
                                    <li>AWS: Cloud computing services</li>
                                    <li>Jest: Testing framework</li>
                                    <li>CI/CD: Continuous integration/deployment</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Instructor Section */}
                <section className="py-16 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b pb-2">Meet Your Expert Instructors</h2>
                        <div className="grid md:grid-cols-3 gap-8">

                            {/* Card-1 */}
                            <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 group">
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full mb-6 overflow-hidden border-2 border-gray-200 group-hover:border-indigo-600 transition-all duration-300 mx-auto">
                                        <img
                                            src={lov}
                                            alt="Dr. APJ Abdul Kalam, Senior Architect Instructor"
                                            className="w-full h-full object-cover"
                                            onError={(e) => (e.target.src = '/Students/images/instructor-fallback.jpg')}
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Senior Architect</h3>
                                        <p className="text-gray-600 mb-4 text-center">
                                            Former Microsoft & Amazon engineer with 12+ years in system design
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs hover:bg-indigo-200 transition-colors duration-300">Cloud</span>
                                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs hover:bg-indigo-200 transition-colors duration-300">Microservices</span>
                                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs hover:bg-indigo-200 transition-colors duration-300">AWS</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card-2 */}
                            <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 group">
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full mb-6 overflow-hidden border-2 border-gray-200 group-hover:border-indigo-600 transition-all duration-300 mx-auto">
                                        <img
                                            src={harry}
                                            alt="Savitribai Phule, Lead Educator Instructor"
                                            className="w-full h-full object-cover"
                                            onError={(e) => (e.target.src = '/Students/images/instructor-fallback.jpg')}
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Lead Educator</h3>
                                        <p className="text-gray-600 mb-4 text-center">
                                            Created curriculum for 50,000+ students across 30+ countries
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs hover:bg-green-200 transition-colors duration-300">Pedagogy</span>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs hover:bg-green-200 transition-colors duration-300">Mentoring</span>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs hover:bg-green-200 transition-colors duration-300">Full Stack</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card-3 */}
                            <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 group">
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full mb-6 overflow-hidden border-2 border-gray-200 group-hover:border-indigo-600 transition-all duration-300 mx-auto">
                                        <img
                                            src={aman}
                                            alt="Dr. Sarvepalli Radhakrishnan, Full Stack Expert Instructor"
                                            className="w-full h-full object-cover"
                                            onError={(e) => (e.target.src = '/Students/images/instructor-fallback.jpg')}
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Full Stack Expert</h3>
                                        <p className="text-gray-600 mb-4 text-center">
                                            Built 100+ production apps using modern frameworks
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs hover:bg-purple-200 transition-colors duration-300">React</span>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs hover:bg-purple-200 transition-colors duration-300">Node.js</span>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs hover:bg-purple-200 transition-colors duration-300">Next.js</span>
                                    </div>
                                </div>
                            </div>

                            {/* Teaching Assistants */}
                            {showAssistants && (
                                <>
                                    {/* Assist-1 */}
                                    <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 group">
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="w-24 h-24 bg-gray-100 rounded-full mb-6 overflow-hidden border-2 border-gray-200 group-hover:border-indigo-600 transition-all duration-300 mx-auto">
                                                <img
                                                    src={assist1}
                                                    alt="Teaching Assistant 1"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => (e.target.src = '/Students/images/instructor-fallback.jpg')}
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Teaching Assistant 1</h3>
                                                <p className="text-gray-600 mb-4 text-center">
                                                    Expert in front-end development with 5+ years of experience
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs hover:bg-blue-200 transition-colors duration-300">HTML</span>
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs hover:bg-blue-200 transition-colors duration-300">CSS</span>
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs hover:bg-blue-200 transition-colors duration-300">JavaScript</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Assist-2 */}
                                    <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 group">
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="w-24 h-24 bg-gray-100 rounded-full mb-6 overflow-hidden border-2 border-gray-200 group-hover:border-indigo-600 transition-all duration-300 mx-auto">
                                                <img
                                                    src={assist2}
                                                    alt="Teaching Assistant 2"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => (e.target.src = '/Students/images/instructor-fallback.jpg')}
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Teaching Assistant 2</h3>
                                                <p className="text-gray-600 mb-4 text-center">
                                                    Back-end specialist with a focus on APIs and databases
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs hover:bg-green-200 transition-colors duration-300">Node.js</span>
                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs hover:bg-green-200 transition-colors duration-300">Express</span>
                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs hover:bg-green-200 transition-colors duration-300">MongoDB</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Assist-3 */}
                                    <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 group">
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="w-24 h-24 bg-gray-100 rounded-full mb-6 overflow-hidden border-2 border-gray-200 group-hover:border-indigo-600 transition-all duration-300 mx-auto">
                                                <img
                                                    src={assist1}
                                                    alt="Teaching Assistant 3"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => (e.target.src = '/Students/images/instructor-fallback.jpg')}
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Teaching Assistant 3</h3>
                                                <p className="text-gray-600 mb-4 text-center">
                                                    DevOps enthusiast with expertise in cloud deployment
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs hover:bg-purple-200 transition-colors duration-300">Docker</span>
                                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs hover:bg-purple-200 transition-colors duration-300">AWS</span>
                                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs hover:bg-purple-200 transition-colors duration-300">CI/CD</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Assist-4 */}
                                    <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 group">
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="w-24 h-24 bg-gray-100 rounded-full mb-6 overflow-hidden border-2 border-gray-200 group-hover:border-indigo-600 transition-all duration-300 mx-auto">
                                                <img
                                                    src={assist1}
                                                    alt="Teaching Assistant 4"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => (e.target.src = '/Students/images/instructor-fallback.jpg')}
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Teaching Assistant 4</h3>
                                                <p className="text-gray-600 mb-4 text-center">
                                                    Front-end developer with a passion for UI/UX design
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs hover:bg-teal-200 transition-colors duration-300">React</span>
                                                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs hover:bg-teal-200 transition-colors duration-300">Tailwind</span>
                                                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs hover:bg-teal-200 transition-colors duration-300">Figma</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Assist-5 */}
                                    <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 group">
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="w-24 h-24 bg-gray-100 rounded-full mb-6 overflow-hidden border-2 border-gray-200 group-hover:border-indigo-600 transition-all duration-300 mx-auto">
                                                <img
                                                    src={assist2}
                                                    alt="Teaching Assistant 5"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => (e.target.src = '/Students/images/instructor-fallback.jpg')}
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Teaching Assistant 5</h3>
                                                <p className="text-gray-600 mb-4 text-center">
                                                    Database expert specializing in SQL and NoSQL
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs hover:bg-orange-200 transition-colors duration-300">MySQL</span>
                                                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs hover:bg-orange-200 transition-colors duration-300">MongoDB</span>
                                                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs hover:bg-orange-200 transition-colors duration-300">Redis</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Assist-6 */}
                                    <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 group">
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="w-24 h-24 bg-gray-100 rounded-full mb-6 overflow-hidden border-2 border-gray-200 group-hover:border-indigo-600 transition-all duration-300 mx-auto">
                                                <img
                                                    src={assist1}
                                                    alt="Teaching Assistant 6"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => (e.target.src = '/Students/images/instructor-fallback.jpg')}
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Teaching Assistant 6</h3>
                                                <p className="text-gray-600 mb-4 text-center">
                                                    Security specialist focusing on web app protection
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs hover:bg-red-200 transition-colors duration-300">Security</span>
                                                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs hover:bg-red-200 transition-colors duration-300">OAuth</span>
                                                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs hover:bg-red-200 transition-colors duration-300">JWT</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Assist-7 */}
                                    <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 group">
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="w-24 h-24 bg-gray-100 rounded-full mb-6 overflow-hidden border-2 border-gray-200 group-hover:border-indigo-600 transition-all duration-300 mx-auto">
                                                <img
                                                    src={assist1}
                                                    alt="Teaching Assistant 7"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => (e.target.src = '/Students/images/instructor-fallback.jpg')}
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Teaching Assistant 7</h3>
                                                <p className="text-gray-600 mb-4 text-center">
                                                    Testing expert with a focus on automation
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs hover:bg-yellow-200 transition-colors duration-300">Jest</span>
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs hover:bg-yellow-200 transition-colors duration-300">Cypress</span>
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs hover:bg-yellow-200 transition-colors duration-300">Mocha</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Assist-8 */}
                                    <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 group">
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="w-24 h-24 bg-gray-100 rounded-full mb-6 overflow-hidden border-2 border-gray-200 group-hover:border-indigo-600 transition-all duration-300 mx-auto">
                                                <img
                                                    src={assist2}
                                                    alt="Teaching Assistant 8"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => (e.target.src = '/Students/images/instructor-fallback.jpg')}
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Teaching Assistant 8</h3>
                                                <p className="text-gray-600 mb-4 text-center">
                                                    Project mentor guiding capstone development
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs hover:bg-indigo-200 transition-colors duration-300">Mentoring</span>
                                                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs hover:bg-indigo-200 transition-colors duration-300">Projects</span>
                                                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs hover:bg-indigo-200 transition-colors duration-300">Git</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Show Less Button */}
                                    <div className="col-span-full text-center mt-6">
                                        <button
                                            className="inline-flex items-center bg-gray-50 rounded-xl px-6 py-3 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 border border-gray-100 text-indigo-600 hover:text-indigo-800 font-medium"
                                            onClick={() => setShowAssistants(false)}
                                            aria-label="Hide teaching assistants"
                                        >
                                            Show Less
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 ml-2 transform rotate-180"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        {!showAssistants && (
                            <div className="mt-12 text-center w-full max-w-[608px] mx-auto bg-gray-50 rounded-[50px] border border-gray-100">
                                <div
                                    className="inline-flex items-center px-6 py-3 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 w-full justify-center flex-nowrap"
                                    onClick={toggleAssistants}
                                    aria-label="Show teaching assistants"
                                >
                                    <div className="flex -space-x-2 mr-4">
                                        <img
                                            src={assist1}
                                            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                                            alt="Teaching Assistant 1"
                                        />
                                        <img
                                            src={assist2}
                                            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                                            alt="Teaching Assistant 2"
                                        />
                                        <img
                                            src={assist1}
                                            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                                            alt="Teaching Assistant 3"
                                        />
                                    </div>
                                    <p className="text-gray-700">
                                        <span className="font-semibold">3 Lead Instructors</span> + <span className="font-semibold">8 Teaching Assistants</span> supporting your journey
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>
                </section>

                {/* Detailed Syllabus Section */}
                <section id="syllabus" className="py-12 px-6 bg-gradient-to-r from-blue-400 to-green-800 text-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center border-b pb-2">Detailed Syllabus</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card-1 */}
                            <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm">
                                <h3
                                    className="text-xl font-semibold mb-4 cursor-pointer flex justify-between items-center"
                                    onClick={() => toggleWeek('week1-4')}
                                    aria-label="Toggle Front-End Fundamentals"
                                >
                                    Front-End Fundamentals
                                    <span className="text-yellow-400">{openWeeks['week1-4'] ? '▲' : '▼'}</span>
                                </h3>
                                {openWeeks['week1-4'] && (
                                    <ul className="list-disc list-inside space-y-2 text-gray-200">
                                        <li>HTML5: Semantic markup, forms, accessibility</li>
                                        <li>CSS3: Flexbox, Grid, animations, Tailwind CSS</li>
                                        <li>JavaScript: ES6+, async/await, DOM manipulation</li>
                                        <li>React: Components, props, state, hooks</li>
                                        <li>Project: Build a responsive portfolio website</li>
                                        <li>
                                            <a
                                                href="https://medium.com/@pantamilan2021/the-essential-guide-to-frontend-technical-documentation-232ea187919a"
                                                className="text-indigo-300 hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                See Detail
                                            </a>
                                        </li>
                                    </ul>
                                )}
                            </div>
                            {/* Card-2 */}
                            <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm">
                                <h3
                                    className="text-xl font-semibold mb-4 cursor-pointer flex justify-between items-center"
                                    onClick={() => toggleWeek('week5-8')}
                                    aria-label="Toggle Back-End Foundations"
                                >
                                    Back-End Foundations
                                    <span className="text-yellow-400">{openWeeks['week5-8'] ? '▲' : '▼'}</span>
                                </h3>
                                {openWeeks['week5-8'] && (
                                    <ul className="list-disc list-inside space-y-2 text-gray-200">
                                        <li>Node.js: Event loop, modules, npm</li>
                                        <li>Express.js: REST APIs, middleware</li>
                                        <li>Databases: MongoDB (CRUD), MySQL (joins, transactions)</li>
                                        <li>Authentication: JWT, OAuth, session management</li>
                                        <li>Project: Build a CRUD API for a todo app</li>
                                        <li>
                                            <a
                                                href="https://www.upwork.com/resources/beginners-guide-back-end-development"
                                                className="text-indigo-300 hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                See Detail
                                            </a>
                                        </li>
                                    </ul>
                                )}
                            </div>
                            {/* Card-3 */}
                            <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm">
                                <h3
                                    className="text-xl font-semibold mb-4 cursor-pointer flex justify-between items-center"
                                    onClick={() => toggleWeek('week9-12')}
                                    aria-label="Toggle Advanced Full Stack Development"
                                >
                                    Advanced Full Stack Development
                                    <span className="text-yellow-400">{openWeeks['week9-12'] ? '▲' : '▼'}</span>
                                </h3>
                                {openWeeks['week9-12'] && (
                                    <ul className="list-disc list-inside space-y-2 text-gray-200">
                                        <li>State Management: Redux, Context API</li>
                                        <li>Next.js: SSR, SSG, API routes</li>
                                        <li>GraphQL: Schema design, resolvers, Apollo Client</li>
                                        <li>Testing: Unit testing with Jest, integration testing</li>
                                        <li>Project: Build an e-commerce platform frontend</li>
                                        <li>
                                            <a
                                                href="https://www.atlassian.com/devops"
                                                className="text-indigo-300 hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                See Detail
                                            </a>
                                        </li>
                                    </ul>
                                )}
                            </div>
                            {/* Card-4 */}
                            <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm">
                                <h3
                                    className="text-xl font-semibold mb-4 cursor-pointer flex justify-between items-center"
                                    onClick={() => toggleWeek('week13-16')}
                                    aria-label="Toggle DevOps & Real-World Projects"
                                >
                                    DevOps & Real-World Projects
                                    <span className="text-yellow-400">{openWeeks['week13-16'] ? '▲' : '▼'}</span>
                                </h3>
                                {openWeeks['week13-16'] && (
                                    <ul className="list-disc list-inside space-y-2 text-gray-200">
                                        <li>Git: Branching, merging, GitHub workflows</li>
                                        <li>DevOps: Docker, CI/CD pipelines, AWS deployment</li>
                                        <li>Security: XSS, CSRF, SQL injection prevention</li>
                                        <li>Capstone Project: Full stack social media app</li>
                                        <li>Mock Interviews: Technical and behavioral</li>
                                        <li>
                                            <a
                                                href="https://www.google.com/search?q=full+stack"
                                                className="text-indigo-300 hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                See Detail
                                            </a>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 px-4 bg-gradient-to-r from-green-700 to-purple-800 text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="md:w-1/2 space-y-6">
                                <h2 className="text-4xl font-bold leading-tight">
                                    Master Full Stack Development in 2025
                                </h2>
                                <p className="text-lg text-blue-100">
                                    Build complete web applications from frontend to backend with our comprehensive program.
                                    Learn the most in-demand technologies used by top tech companies.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <button className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
                                        React.js
                                    </button>
                                    <button className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
                                        Node.js
                                    </button>
                                    <button className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
                                        MongoDB
                                    </button>
                                    <button className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
                                        Express
                                    </button>
                                    <button className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
                                        Next.js
                                    </button>
                                    <button className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
                                        TypeScript
                                    </button>
                                </div>
                                <button className="px-8 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                                    Enroll Now
                                </button>
                            </div>
                            <div className="md:w-1/2">
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                                        alt="Full Stack Development"
                                        className="w-full h-auto rounded-lg shadow-xl"
                                    />
                                    <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-bold shadow-lg">
                                        <span className="text-sm">Most Popular</span>
                                        <span className="block text-xl">Course</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                                <p className="text-3xl font-bold">12+</p>
                                <p className="text-sm text-blue-100">Weeks Program</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                                <p className="text-3xl font-bold">100+</p>
                                <p className="text-sm text-blue-100">Hands-on Projects</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                                <p className="text-3xl font-bold">24/7</p>
                                <p className="text-sm text-blue-100">Mentor Support</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                                <p className="text-3xl font-bold">1000+</p>
                                <p className="text-sm text-blue-100">Students Enrolled</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Learning Strategy Section */}
                <section id="strategy" className="py-12 px-6 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b pb-2">Learning Strategies for Success</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: 'Project-Based Learning',
                                    description: 'Build real-world projects like a blog, e-commerce site, or chat app to apply concepts and create a portfolio.',
                                    icon: (
                                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    )
                                },
                                {
                                    title: 'Code Daily',
                                    description: 'Practice coding daily on platforms like FreeCodeCamp or Codecademy to reinforce skills and build muscle memory.',
                                    icon: (
                                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                        </svg>
                                    )
                                },
                                {
                                    title: 'Collaborate & Network',
                                    description: 'Join coding communities (e.g., Discord, Reddit) and contribute to open-source projects to learn from peers.',
                                    icon: (
                                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                        </svg>
                                    )
                                },
                                {
                                    title: 'Stay Updated',
                                    description: 'Follow tech blogs (e.g., Smashing Magazine, DEV.to) and attend webinars to keep up with industry trends.',
                                    icon: (
                                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    )
                                }
                            ].map((strategy, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
                                >
                                    <div className="flex items-center mb-4">
                                        {strategy.icon}
                                        <h3 className="ml-3 text-lg font-medium text-gray-800">{strategy.title}</h3>
                                    </div>
                                    <p className="text-gray-600">{strategy.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Prerequisites Section */}
                <section className="py-12 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b pb-2">Prerequisites</h2>
                        <p className="text-gray-600 mb-4 text-center">To get the most out of this course, you should have:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-8 max-w-3xl mx-auto">
                            <li>Basic programming knowledge (variables, loops, functions)</li>
                            <li>Familiarity with HTML, CSS, or JavaScript (optional but helpful)</li>
                            <li>A computer with a stable internet connection</li>
                            <li>10-15 hours per week for learning and practice</li>
                        </ul>
                        <div className="text-center">
                            <button
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg mx-auto"
                                onClick={() => setShowDetails(!showDetails)}
                                aria-label={showDetails ? 'Hide prerequisites details' : 'Show prerequisites details'}
                            >
                                {showDetails ? 'Show Less' : 'See Details'}
                            </button>
                        </div>
                        {showDetails && (
                            <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-sm space-y-8 animate-fadeIn border border-gray-100">
                                {/* Basic Programming Knowledge */}
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    <div className="md:w-1/3">
                                        <img
                                            src="../images/FSD.png"
                                            alt="Programming basics illustration"
                                            className="rounded-xl shadow-sm w-full h-auto max-w-full"
                                        />
                                    </div>
                                    <div className="md:w-2/3">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Basic Programming Knowledge</h3>
                                        <p className="text-gray-600 mb-3">
                                            Understanding fundamental programming concepts is crucial for full-stack development. You should be comfortable with:
                                        </p>
                                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                                            <li><span className="font-medium">Variables:</span> Storing and manipulating data</li>
                                            <li><span className="font-medium">Control structures:</span> If-else statements, loops (for/while)</li>
                                            <li><span className="font-medium">Functions:</span> Creating reusable code blocks</li>
                                            <li><span className="font-medium">Data types:</span> Strings, numbers, arrays, objects</li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Web Development Basics */}
                                <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
                                    <div className="md:w-1/3">
                                        <img
                                            src="/images/web-dev-basics.jpg"
                                            alt="Web development illustration"
                                            className="rounded-xl shadow-sm w-full h-auto max-w-full"
                                        />
                                    </div>
                                    <div className="md:w-2/3">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Web Development Basics</h3>
                                        <p className="text-gray-600 mb-3">
                                            While not mandatory, familiarity with these web technologies will help you hit the ground running:
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-blue-100 p-3 rounded-xl">
                                                <h4 className="font-medium text-blue-800 mb-1">HTML</h4>
                                                <p className="text-sm text-gray-600">Page structure and content</p>
                                            </div>
                                            <div className="bg-green-100 p-3 rounded-xl">
                                                <h4 className="font-medium text-green-800 mb-1">CSS</h4>
                                                <p className="text-sm text-gray-600">Styling and layout</p>
                                            </div>
                                            <div className="bg-yellow-100 p-3 rounded-xl">
                                                <h4 className="font-medium text-yellow-800 mb-1">JavaScript</h4>
                                                <p className="text-sm text-gray-600">Interactivity and logic</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* System Requirements */}
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">System Requirements</h3>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="md:w-1/2">
                                            <img
                                                src="/images/dev-setup.jpg"
                                                alt="Development setup illustration"
                                                className="rounded-xl shadow-sm w-full h-auto max-w-full mb-4"
                                            />
                                            <p className="text-gray-600">
                                                A proper development environment will make your learning experience smoother and more enjoyable.
                                            </p>
                                        </div>
                                        <div className="md:w-1/2">
                                            <ul className="space-y-3">
                                                <li className="flex items-start gap-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-indigo-600 mt-0.5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <div>
                                                        <h4 className="font-medium text-gray-800">Computer Specifications</h4>
                                                        <p className="text-gray-600 text-sm">
                                                            Minimum 4GB RAM (8GB recommended), modern processor, 100GB+ storage
                                                        </p>
                                                    </div>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-indigo-600 mt-0.5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <div>
                                                        <h4 className="font-medium text-gray-800">Internet Connection</h4>
                                                        <p className="text-gray-600 text-sm">
                                                            Stable connection (5Mbps+) for video lessons and software downloads
                                                        </p>
                                                    </div>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-indigo-600 mt-0.5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <div>
                                                        <h4 className="font-medium text-gray-800">Software</h4>
                                                        <p className="text-gray-600 text-sm">
                                                            Code editor (VS Code recommended), modern web browser, Git for version control
                                                        </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* Time Commitment Section */}
                                <div className="border-l-4 border-indigo-600 bg-indigo-50 p-5 rounded-r-xl">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Time Commitment</h3>
                                    <p className="text-gray-600 mb-4">
                                        Full-stack development requires consistent practice. Here's a typical weekly breakdown:
                                    </p>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-1 bg-white p-4 rounded-xl shadow-sm">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="bg-indigo-100 p-2 rounded-full">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 text-indigo-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                        />
                                                    </svg>
                                                </div>
                                                <h4 className="font-medium text-gray-800">Learning Materials</h4>
                                            </div>
                                            <p className="text-gray-600 text-sm">4-6 hours for video lessons, reading, and research</p>
                                        </div>
                                        <div className="flex-1 bg-white p-4 rounded-xl shadow-sm">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="bg-green-100 p-2 rounded-full">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 text-green-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                        />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <h4 className="font-medium text-gray-800">Hands-on Practice</h4>
                                            </div>
                                            <p className="text-gray-600 text-sm">4-6 hours for coding exercises and experimentation</p>
                                        </div>
                                        <div className="flex-1 bg-white p-4 rounded-xl shadow-sm">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="bg-indigo-100 p-2 rounded-full">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 text-indigo-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                        />
                                                    </svg>
                                                </div>
                                                <h4 className="font-medium text-gray-800">Projects</h4>
                                            </div>
                                            <p className="text-gray-600 text-sm">2-3 hours for building portfolio projects</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Learning Resources Section */}
                <section id="resources" className="py-12 px-6 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b pb-2">Recommended Learning Resources</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                                <h3 className="text-xl font-semibold mb-3 text-indigo-700">Books</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                                    <li>"Eloquent JavaScript" by Marijn Haverbeke</li>
                                    <li>"You Don't Know JS" by Kyle Simpson</li>
                                    <li>"Node.js Design Patterns" by Mario Casciaro</li>
                                </ul>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                                <h3 className="text-xl font-semibold mb-3 text-green-700">Platforms</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                                    <li>FreeCodeCamp</li>
                                    <li>Codecademy</li>
                                    <li>LeetCode</li>
                                </ul>
                                <button
                                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center transition-colors duration-300"
                                    onClick={() => setShowPlatforms(!showPlatforms)}
                                    aria-label={showPlatforms ? 'Hide platforms details' : 'Show platforms details'}
                                >
                                    {showPlatforms ? 'Show Less' : 'View More'}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-4 w-4 ml-1 transition-transform duration-200 ${showPlatforms ? 'rotate-180' : ''}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {showPlatforms && (
                                    <div className="mt-4 space-y-3 animate-fadeIn">
                                        <div>
                                            <p className="font-medium text-gray-800">FreeCodeCamp</p>
                                            <p className="text-sm text-gray-600">
                                                Free courses and projects for full-stack development.
                                                <a
                                                    href="https://www.freecodecamp.org/"
                                                    className="text-indigo-600 hover:underline ml-1"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Explore
                                                </a>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Codecademy</p>
                                            <p className="text-sm text-gray-600">
                                                Interactive lessons on HTML, CSS, JavaScript, and more.
                                                <a
                                                    href="https://www.codecademy.com/"
                                                    className="text-indigo-600 hover:underline ml-1"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Explore
                                                </a>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">LeetCode</p>
                                            <p className="text-sm text-gray-600">
                                                Practice coding problems to prepare for technical interviews.
                                                <a
                                                    href="https://leetcode.com/"
                                                    className="text-indigo-600 hover:underline ml-1"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Explore
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                                <h3 className="text-xl font-semibold mb-3 text-purple-700">Videos</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                                    <li>Traversy Media (YouTube)</li>
                                    <li>The Net Ninja (YouTube)</li>
                                    <li>Academind (YouTube)</li>
                                </ul>
                                <button
                                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center transition-colors duration-300"
                                    onClick={() => setShowVideos(!showVideos)}
                                    aria-label={showVideos ? 'Hide videos details' : 'Show videos details'}
                                >
                                    {showVideos ? 'Show Less' : 'View More'}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-4 w-4 ml-1 transition-transform duration-200 ${showVideos ? 'rotate-180' : ''}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {showVideos && (
                                    <div className="mt-4 space-y-3 animate-fadeIn">
                                        <div>
                                            <p className="font-medium text-gray-800">Traversy Media</p>
                                            <p className="text-sm text-gray-600">
                                                In-depth tutorials on full-stack technologies and frameworks.
                                                <a
                                                    href="https://www.youtube.com/c/TraversyMedia"
                                                    className="text-indigo-600 hover:underline ml-1"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Watch Now
                                                </a>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">The Net Ninja</p>
                                            <p className="text-sm text-gray-600">
                                                Beginner-friendly series on React, Node.js, and more.
                                                <a
                                                    href="https://www.youtube.com/c/TheNetNinja"
                                                    className="text-indigo-600 hover:underline ml-1"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Watch Now
                                                </a>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Academind</p>
                                            <p className="text-sm text-gray-600">
                                                Advanced courses on Next.js, TypeScript, and DevOps.
                                                <a
                                                    href="https://www.youtube.com/c/Academind"
                                                    className="text-indigo-600 hover:underline ml-1"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Watch Now
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="py-12 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b pb-2">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    question: "What is the duration of the course?",
                                    answer: "The course spans 4 months, with 10-15 hours of weekly commitment for lessons, practice, and projects."
                                },
                                {
                                    question: "Do I need prior coding experience?",
                                    answer: "Basic programming knowledge (variables, loops, functions) is recommended but not mandatory. Familiarity with HTML/CSS is a plus."
                                },
                                {
                                    question: "Will I get a certificate upon completion?",
                                    answer: "Yes, you'll receive a certificate of completion after finishing the course and submitting the capstone project."
                                },
                                {
                                    question: "Is there mentor support available?",
                                    answer: "Absolutely! You'll have access to 24/7 mentor support via chat, forums, and weekly live Q&A sessions."
                                },
                                {
                                    question: "Can I learn at my own pace?",
                                    answer: "The course is structured but flexible, allowing you to learn at your own pace with recorded lessons and lifetime access to materials."
                                }
                            ].map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg border border-gray-100"
                                >
                                    <h3
                                        className="text-lg font-semibold text-gray-800 cursor-pointer flex justify-between items-center"
                                        onClick={() => toggleWeek(`faq-${index}`)}
                                        aria-label={`Toggle ${faq.question}`}
                                    >
                                        {faq.question}
                                        <span className="text-indigo-600">{openWeeks[`faq-${index}`] ? '▲' : '▼'}</span>
                                    </h3>
                                    {openWeeks[`faq-${index}`] && (
                                        <p className="mt-3 text-gray-600 animate-fadeIn">{faq.answer}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call-to-Action Section */}
                <section className="py-16 px-6 bg-gradient-to-r from-blue-400 to-green-800 text-white">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="relative">
                            {/* Glow effect */}
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                                Ready to Become a Full Stack Developer?
                            </h2>
                            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                                Join thousands of learners and start building real-world projects today. Enroll now to unlock your potential!
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
        </>
    );
};

export default DSAPage;