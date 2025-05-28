import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DataAnalysis = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("prerequisites");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const faqs = [
        {
            question: "What is data analysis?",
            answer: "Data analysis is the process of inspecting, cleaning, transforming, and modeling data to discover useful information, inform conclusions, and support decision-making.",
        },
        {
            question: "Why is data cleaning important?",
            answer: "Data cleaning ensures the accuracy and reliability of data by removing errors, inconsistencies, and missing values, which improves the quality of analysis.",
        },
        {
            question: "What are outliers in data?",
            answer: "Outliers are data points that differ significantly from other observations, often indicating errors or unique phenomena in the dataset.",
        },
        {
            question: "What is time series data analysis?",
            answer: "Time series data analysis involves analyzing data points collected or recorded at specific time intervals to identify trends, patterns, or seasonal variations.",
        },
        {
            question: "What libraries are commonly used for data analysis in Python?",
            answer: "Common libraries include Pandas for data manipulation, NumPy for numerical operations, Matplotlib and Seaborn for visualization, and SciPy for statistical analysis.",
        },
    ];
    const [openFaqIndexes, setOpenFaqIndexes] = useState(Array(faqs.length).fill(false));

    const sections = [
        { id: "prerequisites", title: "Prerequisites for Data Analysis" },
        { id: "data-analysis-libraries", title: "Data Analysis Libraries" },
        { id: "understanding-data", title: "Understanding the Data" },
        { id: "loading-data", title: "Loading the Data" },
        { id: "data-cleaning", title: "Data Cleaning" },
        { id: "handling-missing-data", title: "Handling Missing Data" },
        { id: "outliers-detection", title: "Outliers Detection" },
        { id: "exploratory-data-analysis", title: "Exploratory Data Analysis" },
        { id: "time-series-data-analysis", title: "Time Series Data Analysis" },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsSidebarOpen(false);

        const hiddenSections = ["outliers-detection", "exploratory-data-analysis", "time-series-data-analysis"];
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
                    <h2 className="text-xl font-bold text-gray-800">Data Analysis Tutorial</h2>
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
                                Fundamentals of Data Analysis
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Learn data analysis with this comprehensive tutorial covering prerequisites, libraries, data cleaning, and advanced techniques like time series analysis.
                        </p>
                    </div>

                    {/* Data Analysis Hero Banner */}
                    <div className="mb-16 bg-gradient-to-r from-blue-400 to-green-800 rounded-2xl shadow-xl overflow-hidden border border-white/10">
                        <div className="relative p-4 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                            {/* Content */}
                            <div className="relative z-10 mb-6 md:mb-0 md:mr-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                        Master Data Analysis
                                    </span>{" "}
                                    in 2025
                                </h2>
                                <p className="text-base sm:text-lg text-white/90 max-w-lg">
                                    Unlock insights from data with modern data analysis techniques.
                                </p>
                                <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                    <button
                                        className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
                                        onClick={() => navigate("/login")}
                                        aria-label="Start learning now"
                                    >
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
                                        {`# Data Analysis Example\n`}
                                        {`import pandas as pd\n`}
                                        {`df = pd.read_csv('data.csv')\n`}
                                        {`print(df.describe())\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Prerequisites Section */}
                    <section id="prerequisites" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Prerequisites for Data Analysis
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Before starting data analysis, you should be familiar with basic programming (preferably Python), statistics, and data manipulation concepts.
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Basic Python programming skills</li>
                                <li>Understanding of statistics and probability</li>
                                <li>Familiarity with data structures</li>
                            </ul>
                        </div>
                    </section>

                    {/* Data Analysis Libraries Section */}
                    <section id="data-analysis-libraries" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Data Analysis Libraries
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Python offers a variety of libraries for data analysis, each serving a specific purpose.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`# Importing Libraries\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt`}</code>
                                </pre>
                            </div>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>Pandas:</strong> For data manipulation and analysis</li>
                                <li><strong>NumPy:</strong> For numerical computations</li>
                                <li><strong>Matplotlib/Seaborn:</strong> For data visualization</li>
                            </ul>
                        </div>
                    </section>

                    {/* Understanding the Data Section */}
                    <section id="understanding-data" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Understanding the Data
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Understanding your data involves exploring its structure, types, and relationships to inform your analysis strategy.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`# Exploring Data\nimport pandas as pd\ndf = pd.read_csv('data.csv')\nprint(df.info())`}</code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Loading the Data Section */}
                    <section id="loading-data" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Loading the Data
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Loading data is the first step in data analysis, often using libraries like Pandas to read from various file formats.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`# Loading Data Example\nimport pandas as pd\ndf = pd.read_csv('data.csv')\nprint(df.head())`}</code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Data Cleaning Section */}
                    <section id="data-cleaning" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Data Cleaning
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Data cleaning involves removing or correcting erroneous data to ensure the dataset is reliable for analysis.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`# Data Cleaning Example\nimport pandas as pd\ndf = pd.DataFrame({'A': [1, None, 3]})\ndf.dropna(inplace=True)\nprint(df)`}</code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Handling Missing Data Section */}
                    <section id="handling-missing-data" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Handling Missing Data
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Missing data can be handled by imputation, deletion, or using algorithms that support missing values.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`# Handling Missing Data\nimport pandas as pd\ndf = pd.DataFrame({'A': [1, None, 3]})\ndf.fillna(df.mean(), inplace=True)\nprint(df)`}</code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Explore More Button */}
                    {!showMore && (
                        <div className="text-center mb-16">
                            <button
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => setShowMore(true)}
                                aria-label="Explore more Data Analysis topics"
                            >
                                Explore More
                            </button>
                        </div>
                    )}

                    {/* Sections Hidden Behind Explore More Button */}
                    {showMore && (
                        <>
                            {/* Outliers Detection Section */}
                            <section id="outliers-detection" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Outliers Detection
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Outliers can be detected using statistical methods like the IQR (Interquartile Range) or Z-scores.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`# Outliers Detection Example\nimport pandas as pd\ndf = pd.DataFrame({'A': [1, 2, 100]})\nQ1 = df['A'].quantile(0.25)\nQ3 = df['A'].quantile(0.75)\nIQR = Q3 - Q1\noutliers = df[(df['A'] < (Q1 - 1.5 * IQR)) | (df['A'] > (Q3 + 1.5 * IQR))]\nprint(outliers)`}</code>
                                        </pre>
                                    </div>
                                </div>
                            </section>

                            {/* Exploratory Data Analysis Section */}
                            <section id="exploratory-data-analysis" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Exploratory Data Analysis
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Exploratory Data Analysis (EDA) involves summarizing the main characteristics of a dataset, often using visualizations.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`# EDA Example\nimport seaborn as sns\nimport matplotlib.pyplot as plt\ndf = sns.load_dataset('iris')\nsns.pairplot(df)\nplt.show()`}</code>
                                        </pre>
                                    </div>
                                </div>
                            </section>

                            {/* Time Series Data Analysis Section */}
                            <section id="time-series-data-analysis" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Time Series Data Analysis
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Time series analysis examines data points collected over time to identify trends and patterns.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`# Time Series Example\nimport pandas as pd\nimport matplotlib.pyplot as plt\ndf = pd.DataFrame({'date': pd.date_range(start='2023-01-01', periods=100), 'value': range(100)})\ndf.set_index('date').plot()\nplt.show()`}</code>
                                        </pre>
                                    </div>
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

                    {/* Resources Section */}
                    <section className="mb-16 bg-blue-50 rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Additional Resources</h2>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://www.coursera.org/learn/data-analysis"
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
                                    Data Analysis on Coursera
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://pandas.pydata.org/docs/"
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
                                    Pandas Official Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.kaggle.com/datasets"
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
                                    Explore Datasets on Kaggle
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
                                    Ready to Learn Data Analysis?
                                </h2>
                                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                                    Join thousands of learners and start analyzing data today. Enroll now to unlock your potential!
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                    <button
                                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
                                        onClick={() => navigate("/login")}
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

                    {/* Footer Links */}
                    <section className="py-8 px-4 bg-gray-100 text-gray-700 text-sm">
                        <div className="max-w-6xl mx-auto">
                            <h3 className="text-lg font-bold mb-4 text-gray-800">Explore More from Online Platforms</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <h4 className="font-semibold mb-2">Courses</h4>
                                    <ul className="space-y-1">
                                        <li><a href="https://www.coursera.org/learn/data-analysis-python" className="text-blue-600 hover:underline">Data Analysis with Python</a></li>
                                        <li><a href="https://www.datacamp.com/courses/intro-to-data-analysis" className="text-blue-600 hover:underline">Intro to Data Analysis</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Related Tutorials</h4>
                                    <ul className="space-y-1">
                                        <li><a href="https://www.geeksforgeeks.org/data-analysis-tutorial/" className="text-blue-600 hover:underline">Data Analysis Tutorial</a></li>
                                        <li><a href="https://www.geeksforgeeks.org/time-series-analysis/" className="text-blue-600 hover:underline">Time Series Analysis</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Data Analysis Topics</h4>
                                    <ul className="space-y-1">
                                        <li><a href="https://www.geeksforgeeks.org/exploratory-data-analysis/" className="text-blue-600 hover:underline">Exploratory Data Analysis</a></li>
                                        <li><a href="https://www.geeksforgeeks.org/data-cleaning/" className="text-blue-600 hover:underline">Data Cleaning Techniques</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Resources</h4>
                                    <ul className="space-y-1">
                                        <li><a href="https://www.geeksforgeeks.org/about/" className="text-blue-600 hover:underline">About Us</a></li>
                                        <li><a href="https://www.geeksforgeeks.org/careers/" className="text-blue-600 hover:underline">Careers</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <p>Corporate & Communications Address: A-143, 7th Floor, Sovereign Corporate Tower, Sector-136, Noida, Uttar Pradesh (201305)</p>
                                <p>Registered Address: K 061, Tower K, Gulshan Vivante Apartment, Sector 137, Noida, Gautam Buddh Nagar, Uttar Pradesh, 201305</p>
                                <p className="mt-2">© GeeksforGeeks, Sanchhaya Education Private Limited, All rights reserved</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DataAnalysis;