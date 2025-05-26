import React, { useState } from "react";

const DjangoPage = () => {
    const [activeSection, setActiveSection] = useState("introduction");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showMore, setShowMore] = useState(false); // State to toggle visibility of sections after Views

    const faqs = [
        {
            question: "What is Django?",
            answer: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.",
        },
        {
            question: "Is Django suitable for large-scale applications?",
            answer: "Yes, Django is highly scalable and used by large companies like Instagram and Pinterest for building robust applications.",
        },
        {
            question: "What are Django models?",
            answer: "Models in Django define the structure of your database tables as Python classes, using Django's ORM to interact with the database.",
        },
        {
            question: "What are Django views?",
            answer: "Views in Django are Python functions or classes that handle HTTP requests and return HTTP responses, typically rendering templates or JSON data.",
        },
        {
            question: "What are Django templates?",
            answer: "Django templates are HTML files with special syntax that allow dynamic content rendering using data passed from views.",
        },
        {
            question: "What is the Django Admin Interface?",
            answer: "The Django Admin Interface is a built-in app that provides a web-based interface for managing your application's data.",
        },
        {
            question: "What are Django forms?",
            answer: "Django forms simplify the creation and validation of HTML forms, handling user input and data processing.",
        },
        {
            question: "How does URL routing work in Django?",
            answer: "Django uses URL patterns to map URLs to views, defined in urls.py, allowing clean and modular routing.",
        },
        {
            question: "What are database migrations in Django?",
            answer: "Database migrations in Django are a way to propagate changes in your models (like adding a field) to your database schema.",
        },
        {
            question: "Can Django work with multiple databases?",
            answer: "Yes, Django supports multiple databases, allowing you to define different database connections in settings.py.",
        },
    ];
    const [openFaqIndexes, setOpenFaqIndexes] = useState(Array(faqs.length).fill(false));

    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "models", title: "Models" },
        { id: "views", title: "Views" },
        { id: "templates", title: "Templates" },
        { id: "admin-interface", title: "Admin Interface" },
        { id: "forms", title: "Forms" },
        { id: "url-routing", title: "URL Routing" },
        { id: "database-migrations", title: "Database Migrations" },
        { id: "FAQ", title: "FAQ" },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsSidebarOpen(false);

        // If the clicked section is after "views" and sections are hidden, show them
        const hiddenSections = ["templates", "admin-interface", "forms", "url-routing", "database-migrations", "FAQ"];
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
                    <h2 className="text-xl font-bold text-gray-800">Django Tutorial</h2>
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
                                Basics & Advanced of Django
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Learn Django with this comprehensive tutorial covering all fundamental concepts and advanced features. Master the framework that powers scalable web applications.
                        </p>
                    </div>

                    {/* Django Hero Banner */}
                    <div className="mb-16 bg-gradient-to-r from-blue-400 to-green-800 rounded-2xl shadow-xl overflow-hidden border border-white/10">
                        <div className="relative p-4 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                            {/* Content */}
                            <div className="relative z-10 mb-6 md:mb-0 md:mr-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                        Master Django
                                    </span>{" "}
                                    in 2025
                                </h2>
                                <p className="text-base sm:text-lg text-white/90 max-w-lg">
                                    Unlock the full potential of web development with Python's most powerful framework
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
                                        {`# Django View Example\n`}
                                        {`from django.http import HttpResponse\n`}
                                        {`def hello(request):\n`}
                                        {`    return HttpResponse("Hello, Django!")\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Introduction Section */}
                    <section id="introduction" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Introduction to Django
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel.
                                <br />
                                This tutorial will guide you through the basics and advanced concepts of Django, including models, views, templates, the admin interface, forms, URL routing, and database migrations.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`# A simple Django project\n# urls.py\nfrom django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path('', views.hello),\n]`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Features:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Built-in ORM for database interactions</li>
                                <li>Automatic admin interface</li>
                                <li>Secure by default with built-in protections</li>
                                <li>Scalable for small to large applications</li>
                                <li>Extensive documentation and community support</li>
                            </ul>
                        </div>
                    </section>

                    {/* Models Section */}
                    <section id="models" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Models in Django
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Django models define the structure of your database tables as Python classes. Django's ORM (Object-Relational Mapping) allows you to interact with the database using Python code instead of SQL.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`# models.py\nfrom django.db import models\n\nclass Article(models.Model):\n    title = models.CharField(max_length=100)\n    content = models.TextField()\n    created_at = models.DateTimeField(auto_now_add=True)\n\n    def __str__(self):\n        return self.title`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Each model maps to a database table</li>
                                <li>Fields define columns (e.g., CharField, IntegerField)</li>
                                <li>Run migrations to apply model changes to the database</li>
                            </ul>
                        </div>
                    </section>

                    {/* Views Section */}
                    <section id="views" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Views in Django
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Views in Django handle the logic for processing HTTP requests and returning responses. They can render templates, return JSON, or redirect users.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`# views.py\nfrom django.http import HttpResponse\n\ndef hello(request):\n    return HttpResponse("Hello, Django!")\n\ndef article_list(request):\n    articles = Article.objects.all()\n    return render(request, 'articles/list.html', {'articles': articles})`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Views can be function-based or class-based</li>
                                <li>Typically paired with templates for rendering</li>
                                <li>Handles request logic and response generation</li>
                            </ul>
                        </div>
                    </section>

                    {/* Explore More Button */}
                    {!showMore && (
                        <div className="text-center mb-16">
                            <button
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => setShowMore(true)}
                                aria-label="Explore more Django topics"
                            >
                                Explore More
                            </button>
                        </div>
                    )}

                    {/* Sections Hidden Behind Explore More Button */}
                    {showMore && (
                        <>
                            {/* Templates Section */}
                            <section id="templates" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Templates in Django
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Django templates are HTML files with special syntax for dynamic content. They allow you to render data passed from views.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`<!-- articles/list.html -->\n<h1>Articles</h1>\n<ul>\n{% for article in articles %}\n    <li>{{ article.title }} - {{ article.created_at }}</li>\n{% endfor %}\n</ul>`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Uses Django Template Language (DTL)</li>
                                        <li>Supports template inheritance and filters</li>
                                        <li>Secure by default with auto-escaping</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Admin Interface Section */}
                            <section id="admin-interface" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Django Admin Interface
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Django provides a built-in admin interface for managing your application's data, which can be customized to fit your needs.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`# admin.py\nfrom django.contrib import admin\nfrom .models import Article\n\nadmin.site.register(Article)`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Accessible at /admin/ by default</li>
                                        <li>Requires a superuser account to access</li>
                                        <li>Highly customizable with ModelAdmin classes</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Forms Section */}
                            <section id="forms" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Forms in Django
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Django forms simplify the creation, validation, and processing of HTML forms, handling user input efficiently.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`# forms.py\nfrom django import forms\n\nclass ArticleForm(forms.Form):\n    title = forms.CharField(max_length=100)\n    content = forms.CharField(widget=forms.Textarea)`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Supports form validation out of the box</li>
                                        <li>Can be tied to models with ModelForm</li>
                                        <li>Renders HTML with built-in widgets</li>
                                    </ul>
                                </div>
                            </section>

                            {/* URL Routing Section */}
                            <section id="url-routing" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    URL Routing in Django
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Django uses URL patterns to map URLs to views, defined in <code>urls.py</code>, allowing clean and modular routing.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`# urls.py\nfrom django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path('articles/', views.article_list, name='article_list'),\n    path('articles/<int:id>/', views.article_detail, name='article_detail'),\n]`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Supports dynamic URLs with parameters</li>
                                        <li>Namespaced URLs for better organization</li>
                                        <li>Can include other URL configurations</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Database Migrations Section */}
                            <section id="database-migrations" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Database Migrations in Django
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Django migrations allow you to apply changes to your database schema based on modifications to your models.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`# After changing a model\n# Generate migration\npython manage.py makemigrations\n\n# Apply migration\npython manage.py migrate`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Points:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Tracks model changes automatically</li>
                                        <li>Supports rolling back migrations</li>
                                        <li>Works with multiple databases</li>
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
                                    href="https://docs.djangoproject.com/en/stable/"
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
                                    Django Official Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.djangoproject.com/start/"
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
                                    Getting Started with Django
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
                                    Ready to Learn Django?
                                </h2>
                                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                                    Join thousands of learners and start building scalable web applications today. Enroll now to unlock your potential!
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

export default DjangoPage;