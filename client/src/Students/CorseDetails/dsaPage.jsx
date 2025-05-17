import React, { useState } from 'react';
import banner1 from '../images/banner1.jpg';
import lov from '../images/lov.jpg';
import harry from '../images/harry.jpg';
import aman from '../images/aman.jpg';
import assist1 from '../images/assist1.jpg';
import assist2 from '../images/assist2.jpg';
// import assist3 from '../images/assist3.jpg';
// import assist2 from '../images/assist2.avif';
// import assist3 from '../images/assist3.avif';

const DSAPage = () => {
    const [showBooks, setShowBooks] = useState(false);
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
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-900 to-teal-800 text-white py-16 px-6 pt-36">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Full Stack Development: A Complete Guide</h1>
                    <p className="text-lg md:text-xl mb-6">Master front-end, back-end, databases, and DevOps to build dynamic, scalable web applications from scratch.</p>
                </div>
            </section>

            {/* Course Section */}
            <section id="overview" className="py-12 px-6 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Course Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Rating & Popularity</h3>
                            <p className="text-yellow-400">★ 4.6 <span className="text-gray-600">(2K+ Interested Users)</span></p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Level & Duration</h3>
                            <p>Beginner to Advanced | 4 Months</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Schedule</h3>
                            <p>Tue, Thu (7PM-9PM IST)</p>
                        </div>
                    </div>
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Why Learn Full Stack Development?</h3>
                        <p className="text-gray-600 mb-4">
                            Full-stack development is important because it enables developers to build entire web applications
                            from front-end to back-end, leading to more efficient development, improved communication,
                            and cost savings for businesses. It also provides developers with a broader skillset, making them
                            more valuable and adaptable in a rapidly evolving technological landscape.
                        </p>

                        <p className="text-gray-600 font-medium mb-2">Here's why full-stack development is important:</p>
                        <button
                            className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                            onClick={() => setShowMoreBenefits(!showMoreBenefits)}
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
                            <div className="mt-4 space-y-3 animate-fadeIn">
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 text-blue-500 mr-2 mt-0.5">1.</div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Efficiency and Speed</h4>
                                            <p className="text-gray-600 text-sm">
                                                Full-stack developers can work on both front-end and back-end, streamlining development
                                                and enabling faster prototyping.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 text-blue-500 mr-2 mt-0.5">2.</div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Cost Savings</h4>
                                            <p className="text-gray-600 text-sm">
                                                Businesses save money by hiring fewer specialized developers, especially beneficial for startups.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-6 w-6 text-blue-500 mr-2 mt-0.5">3.</div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Comprehensive Understanding</h4>
                                        <p className="text-gray-600 text-sm">
                                            Holistic view of development process enables better decision making and optimization
                                            across the entire application.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-6 w-6 text-blue-500 mr-2 mt-0.5">4.</div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Adaptability</h4>
                                        <p className="text-gray-600 text-sm">
                                            Proficiency in multiple technologies makes full-stack developers adaptable to changing
                                            project requirements and new tools.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-6 w-6 text-blue-500 mr-2 mt-0.5">5.</div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Improved Communication</h4>
                                        <p className="text-gray-600 text-sm">
                                            Better collaboration between teams as they understand both front-end and back-end needs.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-6 w-6 text-blue-500 mr-2 mt-0.5">6.</div>
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
            <section id="technologies" className="py-12 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Technologies Covered</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Front-End</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>HTML5: Structure web content</li>
                                <li>CSS3 & Tailwind: Responsive styling</li>
                                <li>JavaScript (ES6+): Interactive UIs</li>
                                <li>React: Component-based UI framework</li>
                                <li>Next.js: Server-side rendering and static site generation</li>
                            </ul>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Back-End</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>Node.js: JavaScript runtime for server-side</li>
                                <li>Express.js: Web framework for Node.js</li>
                                <li>MongoDB: NoSQL database</li>
                                <li>MySQL: Relational database management</li>
                                <li>GraphQL: Query language for APIs</li>
                            </ul>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">DevOps & Tools</h3>
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
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Meet Your Expert Instructors</h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        {/* Card-1 */}
                        <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-8 rounded-xl shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-24 h-24 bg-white/10 rounded-full mb-6 overflow-hidden border-2 border-white/30 group-hover:border-blue-300 transition-all mx-auto">
                                    <img
                                        src={lov}
                                        alt="Dr. APJ Abdul Kalam, Senior Architect Instructor"
                                        className="w-full h-full object-cover"
                                        onError={(e) => e.target.src = '/Students/images/instructor-fallback.jpg'}
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold mb-2 text-center">Senior Architect</h3>
                                    <p className="text-blue-100 mb-4 text-center">
                                        Former Microsoft & Amazon engineer with 12+ years in system design
                                    </p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2">
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Cloud</span>
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Microservices</span>
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">AWS</span>
                                </div>
                            </div>
                        </div>

                        {/* Card-2 */}
                        <div className="bg-gradient-to-br from-purple-900 to-purple-700 text-white p-8 rounded-xl shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-24 h-24 bg-white/10 rounded-full mb-6 overflow-hidden border-2 border-white/30 group-hover:border-purple-300 transition-all mx-auto">
                                    <img
                                        src={harry}
                                        alt="Savitribai Phule, Lead Educator Instructor"
                                        className="w-full h-full object-cover"
                                        onError={(e) => e.target.src = '/Students/images/instructor-fallback.jpg'}
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold mb-2 text-center">Lead Educator</h3>
                                    <p className="text-purple-100 mb-4 text-center">
                                        Created curriculum for 50,000+ students across 30+ countries
                                    </p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2">
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Pedagogy</span>
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Mentoring</span>
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Full Stack</span>
                                </div>
                            </div>
                        </div>

                        {/* Card-3 */}
                        <div className="bg-gradient-to-br from-teal-900 to-teal-700 text-white p-8 rounded-xl shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-24 h-24 bg-white/10 rounded-full mb-6 overflow-hidden border-2 border-white/30 group-hover:border-teal-300 transition-all mx-auto">
                                    <img
                                        src={aman}
                                        alt="Dr. Sarvepalli Radhakrishnan, Full Stack Expert Instructor"
                                        className="w-full h-full object-cover"
                                        onError={(e) => e.target.src = '/Students/images/instructor-fallback.jpg'}
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold mb-2 text-center">Full Stack Expert</h3>
                                    <p className="text-teal-100 mb-4 text-center">
                                        Built 100+ production apps using modern frameworks
                                    </p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2">
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">React</span>
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Node.js</span>
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Next.js</span>
                                </div>
                            </div>
                        </div>

                        {/* Teaching Assistant */}
                        {showAssistants && (
                            <>
                                {/* Assist-1 */}
                                <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-8 rounded-xl shadow-2xl relative overflow-hidden group">
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-24 h-24 bg-white/10 rounded-full mb-6 overflow-hidden border-2 border-white/30 group-hover:border-blue-300 transition-all mx-auto">
                                            <img
                                                src={assist1}
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = '/Students/images/instructor-fallback.jpg'}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold mb-2 text-center">Teaching Assistant 1</h3>
                                            <p className="text-blue-100 mb-4 text-center">
                                                Expert in front-end development with 5+ years of experience
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">HTML</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">CSS</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">JavaScript</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Assist-2 */}
                                <div className="bg-gradient-to-br from-purple-900 to-purple-700 text-white p-8 rounded-xl shadow-2xl relative overflow-hidden group">
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-24 h-24 bg-white/10 rounded-full mb-6 overflow-hidden border-2 border-white/30 group-hover:border-purple-300 transition-all mx-auto">
                                            <img
                                                src={assist2}
                                                alt="Teaching Assistant 2"
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = '/Students/images/instructor-fallback.jpg'}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold mb-2 text-center">Teaching Assistant 2</h3>
                                            <p className="text-purple-100 mb-4 text-center">
                                                Back-end specialist with a focus on APIs and databases
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Node.js</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Express</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">MongoDB</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Assist-3 */}
                                <div className="bg-gradient-to-br from-teal-900 to-teal-700 text-white p-8 rounded-xl shadow-2xl relative overflow-hidden group">
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-24 h-24 bg-white/10 rounded-full mb-6 overflow-hidden border-2 border-white/30 group-hover:border-teal-300 transition-all mx-auto">
                                            <img
                                                src={assist1}
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = '/Students/images/instructor-fallback.jpg'}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold mb-2 text-center">Teaching Assistant 3</h3>
                                            <p className="text-teal-100 mb-4 text-center">
                                                DevOps enthusiast with expertise in cloud deployment
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Docker</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">AWS</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">CI/CD</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Assist-4 */}
                                <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-8 rounded-xl shadow-2xl relative overflow-hidden group">
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-24 h-24 bg-white/10 rounded-full mb-6 overflow-hidden border-2 border-white/30 group-hover:border-blue-300 transition-all mx-auto">
                                            <img
                                                src={assist1}
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = '/Students/images/instructor-fallback.jpg'}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold mb-2 text-center">Teaching Assistant 4</h3>
                                            <p className="text-blue-100 mb-4 text-center">
                                                Front-end developer with a passion for UI/UX design
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">React</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Tailwind</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Figma</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Assist-5 */}
                                <div className="bg-gradient-to-br from-purple-900 to-purple-700 text-white p-8 rounded-xl shadow-2xl relative overflow-hidden group">
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-24 h-24 bg-white/10 rounded-full mb-6 overflow-hidden border-2 border-white/30 group-hover:border-purple-300 transition-all mx-auto">
                                            <img
                                                src={assist2}
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = '/Students/images/instructor-fallback.jpg'}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold mb-2 text-center">Teaching Assistant 5</h3>
                                            <p className="text-purple-100 mb-4 text-center">
                                                Database expert specializing in SQL and NoSQL
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">MySQL</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">MongoDB</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Redis</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Assist-6 */}
                                <div className="bg-gradient-to-br from-teal-900 to-teal-700 text-white p-8 rounded-xl shadow-2xl relative overflow-hidden group">
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-24 h-24 bg-white/10 rounded-full mb-6 overflow-hidden border-2 border-white/30 group-hover:border-teal-300 transition-all mx-auto">
                                            <img
                                                src={assist1}
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = '/Students/images/instructor-fallback.jpg'}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold mb-2 text-center">Teaching Assistant 6</h3>
                                            <p className="text-teal-100 mb-4 text-center">
                                                Security specialist focusing on web app protection
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Security</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">OAuth</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">JWT</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Assist-7 */}
                                <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-8 rounded-xl shadow-2xl relative overflow-hidden group">
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-24 h-24 bg-white/10 rounded-full mb-6 overflow-hidden border-2 border-white/30 group-hover:border-blue-300 transition-all mx-auto">
                                            <img
                                                src={assist1}
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = '/Students/images/instructor-fallback.jpg'}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold mb-2 text-center">Teaching Assistant 7</h3>
                                            <p className="text-blue-100 mb-4 text-center">
                                                Testing expert with a focus on automation
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Jest</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Cypress</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Mocha</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Assist-8 */}
                                <div className="bg-gradient-to-br from-purple-900 to-purple-700 text-white p-8 rounded-xl shadow-2xl relative overflow-hidden group">
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-24 h-24 bg-white/10 rounded-full mb-6 overflow-hidden border-2 border-white/30 group-hover:border-purple-300 transition-all mx-auto">
                                            <img
                                                src={assist2}
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = '/Students/images/instructor-fallback.jpg'}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold mb-2 text-center">Teaching Assistant 8</h3>
                                            <p className="text-purple-100 mb-4 text-center">
                                                Project mentor guiding capstone development
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Mentoring</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Projects</span>
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition">Git</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center bg-gray-100 rounded-full px-6 py-3 shadow-sm cursor-pointer" onClick={toggleAssistants}>
                            <div className="flex -space-x-2 mr-4">
                                <img
                                    src={assist1}
                                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                                    alt="Indian Teaching Assistant 1"
                                />
                                <img
                                    src={assist2}
                                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                                    alt="Indian Teaching Assistant 2"
                                />
                                <img
                                    src={assist1}
                                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                                    alt="Indian Teaching Assistant 3"
                                />
                            </div>
                            <p className="text-gray-700">
                                <span className="font-semibold">3 Lead Instructors</span> + <span className="font-semibold">8 Teaching Assistants</span> supporting your journey
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Syllabus Section */}
            <section id="syllabus" className="py-12 px-6 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Detailed Syllabus</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Card-1 */}
                        <div className="bg-white p-6 rounded-lg shadow-2xl transition-transform duration-300 transform hover:scale-103 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.8)]">
                            <h3
                                className="text-xl font-semibold mb-4 cursor-pointer flex justify-between items-center"
                                onClick={() => toggleWeek('week1-4')}
                            >
                                Front-End Fundamentals
                                <span>{openWeeks['week1-4'] ? '▲' : '▼'}</span>
                            </h3>
                            {openWeeks['week1-4'] && (
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    <li>HTML5: Semantic markup, forms, accessibility</li>
                                    <li>CSS3: Flexbox, Grid, animations, Tailwind CSS</li>
                                    <li>JavaScript: ES6+, async/await, DOM manipulation</li>
                                    <li>React: Components, props, state, hooks</li>
                                    <li>Project: Build a responsive portfolio website</li>
                                </ul>
                            )}
                        </div>

                        {/* Card-2 */}
                        <div className="bg-white p-6 rounded-lg shadow-2xl transition-transform duration-300 transform hover:scale-103 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.8)]">
                            <h3
                                className="text-xl font-semibold mb-4 cursor-pointer flex justify-between items-center"
                                onClick={() => toggleWeek('week5-8')}
                            >
                                Back-End Foundations
                                <span>{openWeeks['week5-8'] ? '▲' : '▼'}</span>
                            </h3>
                            {openWeeks['week5-8'] && (
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    <li>Node.js: Event loop, modules, npm</li>
                                    <li>Express.js: REST APIs, middleware</li>
                                    <li>Databases: MongoDB (CRUD), MySQL (joins, transactions)</li>
                                    <li>Authentication: JWT, OAuth, session management</li>
                                    <li>Project: Build a CRUD API for a todo app</li>
                                </ul>
                            )}
                        </div>

                        {/* Card-3 */}
                        <div className="bg-white p-6 rounded-lg shadow-2xl transition-transform duration-300 transform hover:scale-103 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.8)]">
                            <h3
                                className="text-xl font-semibold mb-4 cursor-pointer flex justify-between items-center"
                                onClick={() => toggleWeek('week9-12')}
                            >
                                Advanced Full Stack Development
                                <span>{openWeeks['week9-12'] ? '▲' : '▼'}</span>
                            </h3>
                            {openWeeks['week9-12'] && (
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    <li>State Management: Redux, Context API</li>
                                    <li>Next.js: SSR, SSG, API routes</li>
                                    <li>GraphQL: Schema design, resolvers, Apollo Client</li>
                                    <li>Testing: Unit testing with Jest, integration testing</li>
                                    <li>Project: Build an e-commerce platform frontend</li>
                                </ul>
                            )}
                        </div>

                        {/* Card-4 */}
                        <div className="bg-white p-6 rounded-lg shadow-2xl transition-transform duration-300 transform hover:scale-103 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.8)]">
                            <h3
                                className="text-xl font-semibold mb-4 cursor-pointer flex justify-between items-center"
                                onClick={() => toggleWeek('week13-16')}
                            >
                                DevOps & Real-World Projects
                                <span>{openWeeks['week13-16'] ? '▲' : '▼'}</span>
                            </h3>
                            {openWeeks['week13-16'] && (
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    <li>Git: Branching, merging, GitHub workflows</li>
                                    <li>DevOps: Docker, CI/CD pipelines, AWS deployment</li>
                                    <li>Security: XSS, CSRF, SQL injection prevention</li>
                                    <li>Capstone Project: Full stack social media app</li>
                                    <li>Mock Interviews: Technical and behavioral</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Full Stack Roadmap Section */}
            < section id="roadmap" className="py-12 px-6 bg-white" >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Full Stack Development Roadmap</h2>
                    <p className="text-gray-600 mb-8">Follow this step-by-step roadmap to master Full Stack Development and become job-ready.</p>
                    <div className="relative">
                        <div className="absolute left-4 top-0 h-full w-1 bg-green-900"></div>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-green-900 text-white rounded-full flex items-center justify-center mr-4">1</div>
                                <div>
                                    <h3 className="text-xl font-semibold">Master Front-End Basics</h3>
                                    <p className="text-gray-600">Learn HTML, CSS, JavaScript, and React. Build responsive UIs and understand component-based architecture.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-green-900 text-white rounded-full flex items-center justify-center mr-4">2</div>
                                <div>
                                    <h3 className="text-xl font-semibold">Build Back-End Skills</h3>
                                    <p className="text-gray-600">Master Node.js, Express, and databases (MongoDB, MySQL). Create REST APIs and implement authentication.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-green-900 text-white rounded-full flex items-center justify-center mr-4">3</div>
                                <div>
                                    <h3 className="text-xl font-semibold">Advance with Modern Tools</h3>
                                    <p className="text-gray-600">Learn Next.js, GraphQL, and state management. Write tests and optimize application performance.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-green-900 text-white rounded-full flex items-center justify-center mr-4">4</div>
                                <div>
                                    <h3 className="text-xl font-semibold">Embrace DevOps</h3>
                                    <p className="text-gray-600">Use Git, Docker, and AWS for version control, containerization, and cloud deployment.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-green-900 text-white rounded-full flex items-center justify-center mr-4">5</div>
                                <div>
                                    <h3 className="text-xl font-semibold">Build Projects & Prepare</h3>
                                    <p className="text-gray-600">Develop portfolio projects (e.g., e-commerce, social apps). Practice mock interviews and refine your resume.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Banner Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-green-700 to-purple-800 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                        {/* Left Content */}
                        <div className="md:w-1/2 space-y-6">
                            <h2 className="text-4xl font-bold leading-tight">
                                Master Full Stack Development in 2024
                            </h2>
                            <p className="text-lg text-blue-100">
                                Build complete web applications from frontend to backend with our comprehensive program.
                                Learn the most in-demand technologies used by top tech companies.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                                    onClick={() => { }}
                                >
                                    React.js
                                </button>
                                <button
                                    className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                                    onClick={() => { }}
                                >
                                    Node.js
                                </button>
                                <button
                                    className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                                    onClick={() => { }}
                                >
                                    MongoDB
                                </button>
                                <button
                                    className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                                    onClick={() => { }}
                                >
                                    Express
                                </button>
                                <button
                                    className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                                    onClick={() => { }}
                                >
                                    Next.js
                                </button>
                                <button
                                    className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                                    onClick={() => { }}
                                >
                                    TypeScript
                                </button>
                            </div>
                            <button className="px-8 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                                Enroll Now
                            </button>
                        </div>

                        {/* Right Image */}
                        <div className="md:w-1/2">
                            <div className="relative">
                                <img
                                    src={banner1}
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

                    {/* Stats Bar */}
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
            < section id="strategy" className="py-12 px-6 bg-gray-100" >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Learning Strategies for Success</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-103 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.5)]">
                            <h3 className="text-xl font-semibold mb-2">Project-Based Learning</h3>
                            <p className="text-gray-600">Build real-world projects like a blog, e-commerce site, or chat app to apply concepts and create a portfolio.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-103 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.5)]">
                            <h3 className="text-xl font-semibold mb-2">Code Daily</h3>
                            <p className="text-gray-600">Practice coding daily on platforms like FreeCodeCamp or Codecademy to reinforce skills and build muscle memory.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-103 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.5)]">
                            <h3 className="text-xl font-semibold mb-2">Collaborate & Network</h3>
                            <p className="text-gray-600">Join coding communities (e.g., Discord, Reddit) and contribute to open-source projects to learn from peers.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-103 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.5)]">
                            <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
                            <p className="text-gray-600">Follow tech blogs (e.g., Smashing Magazine, DEV.to) and attend webinars to keep up with industry trends.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prerequisites Section */}
            <section className="py-12 px-6 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Prerequisites</h2>
                    <p className="text-gray-600 mb-4">To get the most out of this course, you should have:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 mb-8">
                        <li>Basic programming knowledge (variables, loops, functions)</li>
                        <li>Familiarity with HTML, CSS, or JavaScript (optional but helpful)</li>
                        <li>A computer with a stable internet connection</li>
                        <li>10-15 hours per week for learning and practice</li>
                    </ul>

                    <button
                        className="flex items-center gap-2 px-6 py-3 bg-green-800 text-white font-medium rounded-lg hover:bg-green-800 transition-colors mb-6"
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        {showDetails ? (
                            <div>
                                Show Less
                            </div>
                        ) : (
                            <div>
                                See Details
                            </div>
                        )}
                    </button>

                    {showDetails && (
                        <div className="bg-white p-6 rounded-lg shadow-md space-y-8 animate-fadeIn">
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                <div className="md:w-1/3">
                                    <img
                                        src="../images/FSD.png"
                                        alt="Programming basics illustration"
                                        className="rounded-lg shadow-sm w-full h-auto"
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
                                        className="rounded-lg shadow-sm w-full h-auto"
                                    />
                                </div>
                                <div className="md:w-2/3">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Web Development Basics</h3>
                                    <p className="text-gray-600 mb-3">
                                        While not mandatory, familiarity with these web technologies will help you hit the ground running:
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <h4 className="font-medium text-blue-800 mb-1">HTML</h4>
                                            <p className="text-sm text-gray-600">Page structure and content</p>
                                        </div>
                                        <div className="bg-purple-50 p-3 rounded-lg">
                                            <h4 className="font-medium text-purple-800 mb-1">CSS</h4>
                                            <p className="text-sm text-gray-600">Styling and layout</p>
                                        </div>
                                        <div className="bg-yellow-50 p-3 rounded-lg">
                                            <h4 className="font-medium text-yellow-800 mb-1">JavaScript</h4>
                                            <p className="text-sm text-gray-600">Interactivity and logic</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* System Requirements */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">System Requirements</h3>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="md:w-1/2">
                                        <img
                                            src="/images/dev-setup.jpg"
                                            alt="Development setup"
                                            className="rounded-lg shadow-sm w-full h-auto mb-4"
                                        />
                                        <p className="text-gray-600">
                                            A proper development environment will make your learning experience smoother and more enjoyable.
                                        </p>
                                    </div>
                                    <div className="md:w-1/2">
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <div>
                                                    <h4 className="font-medium text-gray-800">Computer Specifications</h4>
                                                    <p className="text-gray-600 text-sm">Minimum 4GB RAM (8GB recommended), modern processor, 100GB+ storage</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <div>
                                                    <h4 className="font-medium text-gray-800">Internet Connection</h4>
                                                    <p className="text-gray-600 text-sm">Stable connection (5Mbps+) for video lessons and software downloads</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <div>
                                                    <h4 className="font-medium text-gray-800">Software</h4>
                                                    <p className="text-gray-600 text-sm">Code editor (VS Code recommended), modern web browser, Git for version control</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Time Commitment Section*/}
                            <div className="border-l-4 border-blue-500 bg-blue-50 p-5 rounded-r-lg">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Time Commitment</h3>
                                <p className="text-gray-600 mb-4">
                                    Full-stack development requires consistent practice. Here's a typical weekly breakdown:
                                </p>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                            </div>
                                            <h4 className="font-medium text-gray-800">Learning Materials</h4>
                                        </div>
                                        <p className="text-gray-600 text-sm">4-6 hours for video lessons, reading, and research</p>
                                    </div>
                                    <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="bg-green-100 p-2 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <h4 className="font-medium text-gray-800">Hands-on Practice</h4>
                                        </div>
                                        <p className="text-gray-600 text-sm">4-6 hours for coding exercises and experimentation</p>
                                    </div>
                                    <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="bg-purple-100 p-2 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
            <section id="resources" className="py-12 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Recommended Learning Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold mb-3">Books</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                                <li>"Eloquent JavaScript" by Marijn Haverbeke</li>
                                <li>"You Don't Know JS" by Kyle Simpson</li>
                                <li>"Node.js Design Patterns" by Mario Casciaro</li>
                            </ul>
                            <button
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                                onClick={() => setShowBooks(!showBooks)}
                            >
                                {showBooks ? 'Show Less' : 'View More'}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 ml-1 transition-transform ${showBooks ? 'rotate-180' : ''}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {showBooks && (
                                <div className="mt-3 text-sm text-gray-600 space-y-2 animate-fadeIn">
                                    <p><span className="font-medium">Eloquent JavaScript:</span> Comprehensive guide covering fundamentals to advanced concepts.</p>
                                    <p><span className="font-medium">You Don't Know JS:</span> Deep dive into JavaScript's core mechanisms.</p>
                                    <p><span className="font-medium">Node.js Design Patterns:</span> Expert techniques for building Node.js applications.</p>
                                </div>
                            )}
                        </div>

                        {/* Online Platforms Card */}
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold mb-3">Online Platforms</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                                <li>FreeCodeCamp: Interactive full stack tutorials</li>
                                <li>MDN Web Docs: Authoritative web dev reference</li>
                                <li>Codecademy: Hands-on coding exercises</li>
                            </ul>
                            <button
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                                onClick={() => setShowPlatforms(!showPlatforms)}
                            >
                                {showPlatforms ? 'Show Less' : 'View More'}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 ml-1 transition-transform ${showPlatforms ? 'rotate-180' : ''}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {showPlatforms && (
                                <div className="mt-3 text-sm text-gray-600 space-y-2 animate-fadeIn">
                                    <p><span className="font-medium">FreeCodeCamp:</span> Free curriculum with projects and certifications.</p>
                                    <p><span className="font-medium">MDN Web Docs:</span> Mozilla's definitive documentation for web standards.</p>
                                    <p><span className="font-medium">Codecademy:</span> Interactive learning with immediate feedback.</p>
                                </div>
                            )}
                        </div>

                        {/* Video Tutorials Card */}
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold mb-3">Video Tutorials</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                                <li>The Net Ninja: React & Node.js tutorials</li>
                                <li>Traversy Media: Full stack crash courses</li>
                                <li>Academind: MERN stack deep dives</li>
                            </ul>
                            <button
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                                onClick={() => setShowVideos(!showVideos)}
                            >
                                {showVideos ? 'Show Less' : 'View More'}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 ml-1 transition-transform ${showVideos ? 'rotate-180' : ''}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {showVideos && (
                                <div className="mt-3 text-sm text-gray-600 space-y-2 animate-fadeIn">
                                    <p><span className="font-medium">The Net Ninja:</span> Clear, concise tutorials for modern web development.</p>
                                    <p><span className="font-medium">Traversy Media:</span> Practical project-based learning approach.</p>
                                    <p><span className="font-medium">Academind:</span> In-depth explanations of complex concepts.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            < section className="py-12 px-6 bg-gray-100" >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Students Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-600 italic">"This course transformed me from a beginner to building full stack apps for clients!"</p>
                            <p className="mt-4 font-semibold">Rahul Sharma</p>
                            <p className="text-sm text-gray-500">Software Engineer, Google</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-600 italic">"The hands-on projects and clear explanations made complex concepts approachable."</p>
                            <p className="mt-4 font-semibold">Priya Singh</p>
                            <p className="text-sm text-gray-500">Full-Stack Developer, Amazon</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs Section */}
            <section id="faqs" className="py-12 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4 max-w-3xl mx-auto">

                        {/* Item 1 */}
                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                Is this course suitable for absolute beginners?
                            </h3>
                            <div className="text-gray-600 pl-7 space-y-2">
                                <p>Yes, we start with programming fundamentals and gradually progress to advanced topics, making it perfect for beginners and intermediates alike.</p>
                                <p className="text-sm">For additional beginner resources, check out:
                                    <a href="https://www.freecodecamp.org/learn" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                        FreeCodeCamp's interactive curriculum
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                What is the refund policy?
                            </h3>
                            <div className="text-gray-600 pl-7 space-y-2">
                                <p>We offer a 7-day no-questions-asked money-back guarantee if you're not completely satisfied with the course.</p>
                                <p className="text-sm">Learn more about our policies:
                                    <a href="/refund-policy" className="text-blue-600 hover:underline ml-1">
                                        Full refund policy details
                                    </a> or read about
                                    <a href="https://stripe.com/docs/refunds" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                        how refunds work
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                Will I get a certificate?
                            </h3>
                            <div className="text-gray-600 pl-7 space-y-2">
                                <p>Yes, you'll receive a verifiable certificate of completion after finishing all course modules and submitting the final project.</p>
                                <p className="text-sm">See sample certificate:
                                    <a href="/sample-certificate" className="text-blue-600 hover:underline ml-1">
                                        View certificate template
                                    </a> or learn about
                                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                        adding it to LinkedIn
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                Can I access materials after completion?
                            </h3>
                            <div className="text-gray-600 pl-7 space-y-2">
                                <p>Absolutely! You'll have lifetime access to all course materials, including future updates and additional resources we add.</p>
                                <p className="text-sm">Learn about our platform:
                                    <a href="/platform-guide" className="text-blue-600 hover:underline ml-1">
                                        Accessing course materials
                                    </a> or read about
                                    <a href="https://community.articulate.com/series/29/articles/keeping-your-course-content-up-to-date" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                        keeping content updated
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 px-6 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Community</h2>
                    <p className="text-gray-600 mb-4">Connect with fellow learners, share your projects, and get support.</p>
                    <div className="flex items-center gap-4">
                        <button
                            className="bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-500"
                        // onClick={() => navigate('/community')}
                        >
                            Join Discord
                        </button>
                        <button
                            className="bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700"
                        // onClick={() => navigate('/forum')}
                        >
                            Visit Forum
                        </button>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            < section className="py-12 px-6 bg-green-900 text-white" >
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Start Your Full Stack Journey Today!</h2>
                    <p className="text-lg mb-6">Enroll now to master Full Stack Development and become a top-tier developer.</p>
                    <button
                        className="bg-white text-green-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-200"
                    // onClick={() => navigate('/enroll')}
                    >
                        Enroll Now
                    </button>
                </div>
            </section>
        </>
    );
};

export default DSAPage;