import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BackendWithJava = () => {
    const navigate = useNavigate();
    const [openSections, setOpenSections] = useState({
        week1: false,
        week2: false,
        week3: false,
        week4: false,
    });

    const toggleSection = (week) => {
        setOpenSections((prev) => ({
            ...prev,
            [week]: !prev[week],
        }));
    };

    return (
        <div className="min-h-screen overflow-x-hidden g-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-400 to-green-800 text-white py-16 px-4 sm:px-8 pt-36">
                <div className="relative text-center">
                    {/* Glow effect */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                            Java Backend Development
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
                        Master Java Backend Development to excel in professional software development!
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
                            onClick={() => navigate('/register')}
                        >
                            Start Learning Now
                        </button>
                        <button
                            className="px-6 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
                            onClick={() => navigate('/projects')}
                        >
                            Explore Projects
                        </button>
                    </div>
                </div>
            </section>

            {/* Course Header Section */}
            <section className="py-12 px-4 sm:px-8 bg-white">
                <div className="w-full">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-2/3">
                            <div className="text-center">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Learn From Our Experts</h2>
                                <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
                                    Watch this introductory video to understand the program structure and what you’ll achieve.
                                </p>
                                <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto">
                                    <iframe
                                        className="w-full h-64 md:h-96 rounded-lg shadow-md"
                                        src="https://www.youtube.com/embed/UmnCZ7-9yDY"
                                        title="Java Backend Development Course"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>

                            {/* Video part */}
                            <div className="mt-6">
                                <h1 className="text-3xl font-bold text-gray-900">Java Backend Development</h1>
                                <div className="flex items-center mt-2 space-x-4">
                                    <div className="flex items-center text-yellow-400">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                        <span className="ml-1 text-gray-800">4.7/5</span>
                                        <span className="mx-1">•</span>
                                        <span className="text-gray-600">Live Course</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Course Sidebar */}
                        <div className="lg:w-1/3 self-center pt-6">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Course Details</h3>
                                        <div className="mt-2 space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Level</span>
                                                <span className="font-medium">Intermediate to Advanced</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Duration</span>
                                                <span className="font-medium">12 Weeks</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <p className="text-gray-700">
                                            Gain expertise in Java Backend Development with hands-on projects and industry-standard frameworks like Spring Boot, Hibernate, and Microservices. Build scalable applications while preparing for coding interviews and professional growth.
                                        </p>
                                    </div>

                                    <div className="space-y-3 pt-4 border-t border-gray-200">
                                        <button
                                            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 px-4 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                                            onClick={() => navigate('/register')}
                                        >
                                            Sign Up Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Features Section */}
            <section className="py-12 px-4 sm:px-8 bg-gray-50">
                <div className="w-full">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">What You'll Get</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                ),
                                title: "Live Sessions",
                                description: "Interactive classes with industry experts"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                    </svg>
                                ),
                                title: "Comprehensive Curriculum",
                                description: "Covers from basics to advanced backend concepts"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                    </svg>
                                ),
                                title: "Hands-on Projects",
                                description: "Build real-world applications like e-wallets"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                ),
                                title: "Doubt Resolution",
                                description: "Regular doubt clearing sessions"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                    </svg>
                                ),
                                title: "Certificate",
                                description: "Industry-recognized completion certificate"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                ),
                                title: "Community Access",
                                description: "Join 300k+ learners community"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100">
                                <div className="flex items-center mb-4">
                                    {feature.icon}
                                    <h3 className="ml-3 text-lg font-medium text-gray-900">{feature.title}</h3>
                                </div>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-16 px-4 sm:px-8 bg-white">
                <div className="w-full">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 border-b pb-2">Why Choose Java for Backend Development?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                            <h3 className="text-xl font-semibold mb-3 text-indigo-700">Performance</h3>
                            <p className="text-gray-600">Java's Just-In-Time (JIT) compilation and optimized bytecode execution deliver high performance for backend systems.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                            <h3 className="text-xl font-semibold mb-3 text-indigo-700">Scalability</h3>
                            <p className="text-gray-600">Java's multithreading capabilities and robust memory management make it ideal for scalable applications.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                            <h3 className="text-xl font-semibold mb-3 text-indigo-700">Ecosystem</h3>
                            <p className="text-gray-600">Rich ecosystem with frameworks like Spring Boot, Hibernate, and extensive libraries for all backend needs.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Technologies Section */}
            <section className="py-16 px-4 sm:px-8 bg-gray-50">
                <div className="w-full">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 border-b pb-2">Key Java Backend Technologies</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: "Spring Boot",
                                desc: "Framework for creating stand-alone Spring applications",
                                link: "https://spring.io/projects/spring-boot",
                                color: "bg-green-100 text-green-800 hover:bg-green-50"
                            },
                            {
                                name: "Hibernate",
                                desc: "Object-relational mapping tool for database operations",
                                link: "https://hibernate.org",
                                color: "bg-blue-100 text-blue-800 hover:bg-blue-50"
                            },
                            {
                                name: "JPA",
                                desc: "Java Persistence API for managing relational data",
                                link: "https://jakarta.ee/specifications/persistence/3.0/",
                                color: "bg-purple-100 text-purple-800 hover:bg-purple-50"
                            },
                            {
                                name: "Maven/Gradle",
                                desc: "Build automation and dependency management",
                                links: {
                                    maven: "https://maven.apache.org",
                                    gradle: "https://gradle.org"
                                },
                                color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-50"
                            },
                            {
                                name: "JUnit/Mockito",
                                desc: "Testing frameworks for unit and integration tests",
                                links: {
                                    junit: "https://junit.org/junit5/",
                                    mockito: "https://site.mockito.org"
                                },
                                color: "bg-red-100 text-red-800 hover:bg-red-50"
                            },
                            {
                                name: "Microservices",
                                desc: "Spring Cloud for building distributed systems",
                                link: "https://spring.io/projects/spring-cloud",
                                color: "bg-indigo-100 text-indigo-800 hover:bg-indigo-50"
                            },
                            {
                                name: "REST APIs",
                                desc: "Building robust web services with Spring MVC",
                                link: "https://spring.io/guides/gs/rest-service/",
                                color: "bg-teal-100 text-teal-800 hover:bg-teal-50"
                            },
                            {
                                name: "Security",
                                desc: "Spring Security for authentication and authorization",
                                link: "https://spring.io/projects/spring-security",
                                color: "bg-orange-100 text-orange-800 hover:bg-orange-50"
                            },
                        ].map((tech, index) => (
                            <a
                                key={index}
                                href={tech.link || (tech.links ? Object.values(tech.links)[0] : '#')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative block p-5 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 ${tech.color}`}
                                onClick={(e) => {
                                    if (tech.links) {
                                        e.preventDefault();
                                        window.open(Object.values(tech.links)[0], '_blank');
                                    }
                                }}
                            >
                                <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition-colors">{tech.name}</h3>
                                <p className="text-sm text-gray-600">{tech.desc}</p>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Syllabus Section */}
            <section className="bg-gradient-to-r from-blue-400 to-green-800 text-white py-16 px-4 sm:px-8 pt-36">
                <div className="w-full text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                            Java Backend Development
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
                        Master Java Backend Development to excel in professional software development!
                    </p>

                    {/* Detailed Syllabus */}
                    <div className="text-left mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Detailed Concepts of Java Backend Development</h2>

                        <h3 className="text-xl font-medium mt-6 mb-2">Week 1: Java Fundamentals for Backend Development</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-200">
                            <li>
                                <span className="font-medium">Setting Up the Environment:</span> Installing JDK, configuring IDE (e.g., IntelliJ IDEA), and understanding the Java ecosystem. This ensures you have a robust setup to write, compile, and debug Java code efficiently.
                            </li>
                            <li>
                                <span className="font-medium">Core Java Concepts:</span> Variables, data types, operators, control structures (if-else, loops), and methods. These are the building blocks for writing logical and functional backend code.
                            </li>
                            <li>
                                <span className="font-medium">Object-Oriented Programming (OOP):</span> Classes, objects, inheritance, polymorphism, encapsulation, and abstraction in Java. OOP principles help in creating modular, reusable, and maintainable code.
                            </li>
                            {!openSections.week1 && (
                                <li>
                                    <span
                                        onClick={() => toggleSection('week1')}
                                        className="text-indigo-300 underline font-medium flex items-center gap-1 cursor-pointer hover:text-indigo-200"
                                    >
                                        Read more
                                        <span className="text-sm">{openSections.week1 ? '▲' : '▼'}</span>
                                    </span>
                                </li>
                            )}
                            {openSections.week1 && (
                                <>
                                    <li>
                                        <span className="font-medium">Collections Framework:</span> Working with ArrayList, HashMap, HashSet, and iterating through collections. Learn how to store, retrieve, and manipulate data efficiently using Java’s built-in data structures.
                                    </li>
                                    <li>
                                        <span className="font-medium">Exception Handling:</span> Try-catch blocks, custom exceptions, and best practices for error handling. Understand how to manage runtime errors gracefully to ensure your application remains robust.
                                    </li>
                                    <li>
                                        <span className="font-medium">Java I/O Basics:</span> Introduction to reading and writing files using classes like FileReader, FileWriter, and BufferedReader. This is essential for handling data persistence in backend applications.
                                    </li>
                                    <li>
                                        <span className="font-medium">Java 8 Features:</span> Lambda expressions, streams, and Optional class to write more concise and functional code. These modern features improve code readability and performance.
                                    </li>
                                    <li>
                                        <span
                                            onClick={() => toggleSection('week1')}
                                            className="text-indigo-300 underline font-medium flex items-center gap-1 cursor-pointer hover:text-indigo-200"
                                        >
                                            Show less
                                            <span className="text-sm">▲</span>
                                        </span>
                                    </li>
                                </>
                            )}
                        </ul>

                        <h3 className="text-xl font-medium mt-6 mb-2">Week 2: Java for Backend - Servlets and JSP</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-200">
                            <li>
                                <span className="font-medium">Introduction to Java Web Development:</span> Understanding the role of Java in backend development and the client-server model. Learn how Java powers dynamic web applications through server-side logic.
                            </li>
                            <li>
                                <span className="font-medium">Servlets:</span> Creating and deploying servlets, handling HTTP requests (GET, POST), and managing sessions. Servlets act as the backbone for processing user requests in a web application.
                            </li>
                            <li>
                                <span className="font-medium">JavaServer Pages (JSP):</span> Building dynamic web pages, embedding Java code in HTML, and using JSP tags. JSP allows seamless integration of Java logic with web presentation.
                            </li>
                            {!openSections.week2 && (
                                <li>
                                    <span
                                        onClick={() => toggleSection('week2')}
                                        className="text-indigo-300 underline font-medium flex items-center gap-1 cursor-pointer hover:text-indigo-200"
                                    >
                                        Read more
                                        <span className="text-sm">{openSections.week2 ? '▲' : '▼'}</span>
                                    </span>
                                </li>
                            )}
                            {openSections.week2 && (
                                <>
                                    <li>
                                        <span className="font-medium">Working with Forms:</span> Processing form data, validating user input, and passing data between servlets and JSP. This ensures secure and efficient handling of user-submitted data.
                                    </li>
                                    <li>
                                        <span className="font-medium">MVC Architecture Basics:</span> Introduction to Model-View-Controller pattern for organizing backend code. MVC separates concerns, making your application scalable and maintainable.
                                    </li>
                                    <li>
                                        <span className="font-medium">Session Management:</span> Using HttpSession to track user sessions across multiple requests. Learn techniques to maintain user state, such as shopping cart data, in a web app.
                                    </li>
                                    <li>
                                        <span className="font-medium">Filters in Servlets:</span> Implementing filters to intercept requests and responses for tasks like logging, authentication, or data transformation. Filters add modularity to your web application.
                                    </li>
                                    <li>
                                        <span
                                            onClick={() => toggleSection('week2')}
                                            className="text-indigo-300 underline font-medium flex items-center gap-1 cursor-pointer hover:text-indigo-200"
                                        >
                                            Show less
                                            <span className="text-sm">▲</span>
                                        </span>
                                    </li>
                                </>
                            )}
                        </ul>

                        <h3 className="text-xl font-medium mt-6 mb-2">Week 3: Spring Framework Essentials</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-200">
                            <li>
                                <span className="font-medium">Introduction to Spring:</span> Overview of Spring Framework, dependency injection, and Inversion of Control (IoC). Spring simplifies enterprise Java development by managing object creation and dependencies.
                            </li>
                            <li>
                                <span className="font-medium">Spring Boot Basics:</span> Setting up a Spring Boot project, creating RESTful APIs, and using Spring Initializr. Spring Boot reduces boilerplate code, enabling faster development of production-ready applications.
                            </li>
                            <li>
                                <span className="font-medium">Data Access with Spring:</span> Connecting to databases using JDBC and Spring Data JPA, performing CRUD operations. This allows seamless interaction with databases for persistent storage.
                            </li>
                            {!openSections.week3 && (
                                <li>
                                    <span
                                        onClick={() => toggleSection('week3')}
                                        className="text-indigo-300 underline font-medium flex items-center gap-1 cursor-pointer hover:text-indigo-200"
                                    >
                                        Read more
                                        <span className="text-sm">{openSections.week3 ? '▲' : '▼'}</span>
                                    </span>
                                </li>
                            )}
                            {openSections.week3 && (
                                <>
                                    <li>
                                        <span className="font-medium">REST API Development:</span> Building and testing REST endpoints with Spring Boot, handling JSON responses. Learn how to create APIs that communicate effectively with frontend applications.
                                    </li>
                                    <li>
                                        <span className="font-medium">Basic Security:</span> Implementing basic authentication and authorization using Spring Security. Secure your APIs by restricting access to authorized users only.
                                    </li>
                                    <li>
                                        <span className="font-medium">Spring Boot Actuator:</span> Using Actuator endpoints to monitor and manage your application’s health, metrics, and environment. This is crucial for maintaining application reliability in production.
                                    </li>
                                    <li>
                                        <span className="font-medium">Error Handling in APIs:</span> Creating custom error responses and global exception handling in Spring Boot. Ensure your APIs provide meaningful feedback when things go wrong.
                                    </li>
                                    <li>
                                        <span
                                            onClick={() => toggleSection('week3')}
                                            className="text-indigo-300 underline font-medium flex items-center gap-1 cursor-pointer hover:text-indigo-200"
                                        >
                                            Show less
                                            <span className="text-sm">▲</span>
                                        </span>
                                    </li>
                                </>
                            )}
                        </ul>

                        <h3 className="text-xl font-medium mt-6 mb-2">Week 4: Advanced Backend Concepts and Deployment</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-200">
                            <li>
                                <span className="font-medium">Database Integration:</span> Working with relational databases (e.g., MySQL), writing complex queries, and using Hibernate ORM. Hibernate simplifies database interactions by mapping Java objects to database tables.
                            </li>
                            <li>
                                <span className="font-medium">Spring Boot Advanced:</span> Configuring properties, profiles for different environments, and handling cross-origin requests (CORS). This ensures your application can adapt to various deployment scenarios.
                            </li>
                            <li>
                                <span className="font-medium">API Documentation:</span> Documenting APIs using Swagger/OpenAPI in Spring Boot. Proper documentation makes your APIs easier to understand and use by other developers.
                            </li>
                            {!openSections.week4 && (
                                <li>
                                    <span
                                        onClick={() => toggleSection('week4')}
                                        className="text-indigo-300 underline font-medium flex items-center gap-1 cursor-pointer hover:text-indigo-200"
                                    >
                                        Read more
                                        <span className="text-sm">{openSections.week4 ? '▲' : '▼'}</span>
                                    </span>
                                </li>
                            )}
                            {openSections.week4 && (
                                <>
                                    <li>
                                        <span className="font-medium">Testing Backend Code:</span> Writing unit tests for APIs using JUnit and Mockito, and integration testing with Spring Test. Testing ensures your backend logic is reliable and bug-free.
                                    </li>
                                    <li>
                                        <span className="font-medium">Deployment Basics:</span> Packaging a Spring Boot application, deploying to a cloud platform (e.g., Heroku), and monitoring basics. Learn how to take your application from development to production.
                                    </li>
                                    <li>
                                        <span className="font-medium">Performance Optimization:</span> Techniques like caching with Spring Cache, lazy loading in Hibernate, and optimizing database queries. Improve your application’s speed and scalability.
                                    </li>
                                    <li>
                                        <span className="font-medium">Logging and Monitoring:</span> Implementing logging with SLF4J and Logback, and monitoring with tools like Spring Boot Admin. These practices help you debug issues and track application behavior in production.
                                    </li>
                                    <li>
                                        <span
                                            onClick={() => toggleSection('week4')}
                                            className="text-indigo-300 underline font-medium flex items-center gap-1 cursor-pointer hover:text-indigo-200"
                                        >
                                            Show less
                                            <span className="text-sm">▲</span>
                                        </span>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Learning Path Section - Modern Design */}
            <section className="py-16 px-4 sm:px-8 bg-gradient-to-br from-gray-50 to-white">
                <div className="w-full">
                    <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
                        Java Backend Learning Journey
                        <span className="block mt-2 text-lg font-normal text-indigo-600">A structured path to mastery</span>
                    </h2>

                    <div className="relative">
                        <div className="absolute left-8 top-0 h-full w-1 bg-indigo-200 transform -translate-x-1/2 md:left-1/2"></div>

                        {[
                            {
                                title: "Core Java Fundamentals",
                                topics: ["OOP concepts", "Collections Framework", "Exception Handling", "Multithreading"],
                                icon: "👨‍💻",
                                color: "bg-blue-100 text-blue-800"
                            },
                            {
                                title: "Database Integration",
                                topics: ["JDBC", "Hibernate ORM", "JPA Specifications", "Transaction Management"],
                                icon: "💾",
                                color: "bg-green-100 text-green-800"
                            },
                            {
                                title: "Spring Framework",
                                topics: ["Spring Core", "Dependency Injection", "Spring MVC", "Spring Boot Auto-configuration"],
                                icon: "🌱",
                                color: "bg-teal-100 text-teal-800"
                            },
                            {
                                title: "API Development",
                                topics: ["REST Principles", "Spring REST Controllers", "DTO Pattern", "API Documentation (Swagger)"],
                                icon: "🔗",
                                color: "bg-purple-100 text-purple-800"
                            },
                            {
                                title: "Advanced Topics",
                                topics: ["Spring Security", "Microservices Architecture", "Caching Strategies", "Message Queues (Kafka/RabbitMQ)"],
                                icon: "🚀",
                                color: "bg-orange-100 text-orange-800"
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className={`relative mb-12 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                            >
                                {/* Timeline dot */}
                                <div className={`absolute left-8 w-6 h-6 rounded-full ${step.color.replace('bg-', 'bg-').replace('100', '500')} border-4 border-white z-10 transform -translate-x-1/2 md:left-1/2`}></div>

                                {/* Content card */}
                                <div className={`w-full md:w-5/12 p-6 rounded-xl shadow-md ${step.color} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                                    <div className="flex items-start mb-4">
                                        <span className="text-2xl mr-3">{step.icon}</span>
                                        <h3 className="text-xl font-bold">{step.title}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {step.topics.map((topic, i) => (
                                            <span
                                                key={i}
                                                className={`px-3 py-1 rounded-full text-sm ${step.color.replace('100', '200')} ${step.color.replace('text-', 'text-')}`}
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-1/12 hidden md:block"></div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-16">
                        <a
                            href="https://cdn.boardinfinity.com/bi-website-v3/syllabus-pdf/java-backend-bootcamp-ppt.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            Download Full Curriculum
                        </a>
                    </div>
                </div>
            </section>

            {/* Career Opportunities Section */}
            <section className="py-16 px-4 sm:px-8 bg-gradient-to-r from-blue-400 to-green-800 text-white">
                <div className="w-full">
                    <h2 className="text-3xl font-bold text-center mb-12 border-b pb-2">Career Opportunities</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <h3 className="text-xl font-semibold mb-3">Backend Developer</h3>
                            <p className="mb-4">Build and maintain server-side logic, databases, and APIs for web applications.</p>
                            <p className="font-medium">Avg. Salary: $90,000 - $120,000</p>
                        </div>
                        <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <h3 className="text-xl font-semibold mb-3">Java Full Stack Developer</h3>
                            <p className="mb-4">Work on both frontend and backend components using Java-based technologies.</p>
                            <p className="font-medium">Avg. Salary: $95,000 - $130,000</p>
                        </div>
                        <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <h3 className="text-xl font-semibold mb-3">Cloud Solutions Architect</h3>
                            <p className="mb-4">Design and implement cloud-native Java applications on AWS, Azure, or GCP.</p>
                            <p className="font-medium">Avg. Salary: $120,000 - $160,000</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section className="py-16 px-4 sm:px-8 bg-gray-50">
                <div className="w-full">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 border-b pb-2">Recommended Resources</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Spring Initializr", desc: "Bootstrap your Spring projects quickly", link: "https://start.spring.io" },
                            { title: "Spring Documentation", desc: "Official Spring Framework guides", link: "https://spring.io/guides" },
                            { title: "Java Documentation", desc: "Official Java language documentation", link: "https://docs.oracle.com/javase/" },
                            { title: "Baeldung", desc: "Excellent tutorials on Java and Spring", link: "https://www.baeldung.com" },
                            { title: "Java Code Geeks", desc: "Community-driven Java resources", link: "https://www.javacodegeeks.com" },
                            { title: "DZone Java", desc: "Articles and guides on Java technologies", link: "https://dzone.com/java" },
                        ].map((resource, index) => (
                            <a
                                key={index}
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100 group"
                            >
                                <h3 className="text-lg font-semibold mb-2 text-indigo-700 group-hover:text-indigo-800">{resource.title}</h3>
                                <p className="text-gray-600 mb-3">{resource.desc}</p>
                                <span className="text-indigo-600 text-sm font-medium group-hover:text-indigo-700">Visit Resource →</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-12 px-4 sm:px-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg text-center text-white">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                    Start Your Java Backend Development Journey Today!
                </h2>
                <p className="text-base sm:text-lg mb-6 max-w-2xl mx-auto">
                    Enroll now to master Java Backend Development and become a top-tier developer in 2025!
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                        className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
                        onClick={() => navigate('/register')}
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
    );
};

export default BackendWithJava;