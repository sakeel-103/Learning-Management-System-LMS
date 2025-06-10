import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DataVisualization = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("what-is-data-visualization");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const faqs = [
        {
            question: "What is the difference between Matplotlib and Seaborn?",
            answer: "Matplotlib is a foundational plotting library offering extensive customization, while Seaborn builds on Matplotlib to provide a higher-level interface with more aesthetically pleasing and statistical plots.",
        },
        {
            question: "Can I use Plotly for interactive visualizations?",
            answer: "Yes, Plotly is excellent for creating interactive visualizations, allowing users to hover, zoom, and interact with plots, which is ideal for web-based applications.",
        },
        {
            question: "What is Altair best suited for?",
            answer: "Altair is best suited for creating declarative visualizations in Python, especially for users who prefer a simple syntax and integration with Pandas for quick, interactive charts.",
        },
        {
            question: "How does ggplot2 compare to Python libraries?",
            answer: "ggplot2, originally from R, follows a grammar of graphics approach, offering a structured way to build plots. Its Python port (via plotnine) provides similar functionality but integrates with Python's ecosystem.",
        },
        {
            question: "Why is data visualization important in data analysis?",
            answer: "Data visualization is crucial in data analysis as it helps uncover patterns, trends, and insights, making complex data more understandable and actionable for decision-making.",
        },
    ];
    const [openFaqIndexes, setOpenFaqIndexes] = useState(Array(faqs.length).fill(false));

    const sections = [
        { id: "what-is-data-visualization", title: "What is Data Visualization and Why is it Important?" },
        { id: "matplotlib", title: "Data Visualization using Matplotlib in Python" },
        { id: "seaborn", title: "Data Visualization with Seaborn - Python" },
        { id: "pandas", title: "Data Visualization with Pandas" },
        { id: "plotly", title: "Plotly for Data Visualization in Python" },
        { id: "plotnine-ggplot2", title: "Data Visualization using Plotnine and ggplot2 in Python" },
        { id: "altair", title: "Introduction to Altair in Python" },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsSidebarOpen(false);

        const hiddenSections = ["plotly", "plotnine-ggplot2", "altair"];
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
                    <h2 className="text-xl font-bold text-gray-800">Data Visualization Tutorial</h2>
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
                                Data Visualization in Python
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Learn data visualization with this comprehensive tutorial covering key Python libraries and techniques for creating impactful visualizations.
                        </p>
                    </div>

                    {/* Data Visualization Hero Banner */}
                    <div className="mb-16 bg-gradient-to-r from-blue-400 to-green-800 rounded-2xl shadow-xl overflow-hidden border border-white/10">
                        <div className="relative p-4 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                            {/* Content */}
                            <div className="relative z-10 mb-6 md:mb-0 md:mr-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                        Visualize Data
                                    </span>{" "}
                                    Like a Pro in 2025
                                </h2>
                                <p className="text-base sm:text-lg text-white/90 max-w-lg">
                                    Create stunning visualizations using Python's top libraries and techniques.
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
                                        {`# Data Visualization Example\n`}
                                        {`import matplotlib.pyplot as plt\n`}
                                        {`plt.plot([1, 2, 3], [4, 5, 6])\n`}
                                        {`plt.show()\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* What is Data Visualization Section */}
                    <section id="what-is-data-visualization" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            What is Data Visualization and Why is it Important?
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Data visualization is the graphical representation of data and information using visual elements like charts, graphs, maps, and plots. It transforms complex datasets into intuitive, visual formats that make patterns, trends, and insights easier to understand. The primary goal is to communicate information clearly and efficiently to users, enabling better decision-making.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Why is it Important?</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>Simplifies Complex Data:</strong> Visualization makes large datasets more digestible by presenting them visually.</li>
                                <li><strong>Identifies Patterns and Trends:</strong> It helps spot trends, correlations, and outliers in data.</li>
                                <li><strong>Facilitates Decision-Making:</strong> Visual data enables faster and more informed decisions.</li>
                                <li><strong>Improves Communication:</strong> Visuals are more engaging and easier to understand than raw data.</li>
                                <li><strong>Enhances Data Exploration:</strong> Interactive visualizations allow dynamic exploration of data.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Matplotlib Section */}
                    <section id="matplotlib" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Data Visualization using Matplotlib in Python
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Matplotlib is a foundational plotting library in Python, widely used for creating static, animated, and interactive visualizations. It provides extensive customization options, making it suitable for a variety of plotting needs.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Features:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Supports a wide range of plot types (line, scatter, bar, histogram, etc.).</li>
                                <li>Highly customizable, allowing control over every aspect of a plot (colors, labels, axes, etc.).</li>
                                <li>Integrates well with NumPy and Pandas for data handling.</li>
                                <li>Can be used for both simple and complex visualizations.</li>
                            </ul>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# Matplotlib Example\n`}
                                        {`import matplotlib.pyplot as plt\n`}
                                        {`import numpy as np\n`}
                                        {`x = np.array([1, 2, 3, 4])\n`}
                                        {`y = np.array([10, 20, 25, 30])\n`}
                                        {`plt.plot(x, y, marker='o')\n`}
                                        {`plt.title("Simple Line Plot")\n`}
                                        {`plt.xlabel("X-axis")\n`}
                                        {`plt.ylabel("Y-axis")\n`}
                                        {`plt.show()\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Seaborn Section */}
                    <section id="seaborn" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Data Visualization with Seaborn - Python
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Seaborn is a Python visualization library built on top of Matplotlib. It provides a high-level interface for drawing attractive and informative statistical graphics, making it easier to create complex plots with less code.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Features:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Built-in themes for aesthetically pleasing plots.</li>
                                <li>Specialized functions for statistical visualizations (e.g., heatmaps, pair plots).</li>
                                <li>Seamless integration with Pandas DataFrames.</li>
                                <li>Simplifies complex visualizations like categorical data plots and regression plots.</li>
                            </ul>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# Seaborn Example\n`}
                                        {`import seaborn as sns\n`}
                                        {`import matplotlib.pyplot as plt\n`}
                                        {`df = sns.load_dataset("iris")\n`}
                                        {`sns.scatterplot(x="sepal_length", y="sepal_width", hue="species", data=df)\n`}
                                        {`plt.title("Scatter Plot with Seaborn")\n`}
                                        {`plt.show()\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Pandas Section */}
                    <section id="pandas" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Data Visualization with Pandas
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Pandas, primarily a data manipulation library, also offers built-in plotting capabilities through its integration with Matplotlib. It provides a convenient way to create quick visualizations directly from DataFrames and Series.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Features:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Simple plotting methods like <code>.plot()</code> for DataFrames and Series.</li>
                                <li>Supports common plot types (line, bar, histogram, etc.).</li>
                                <li>Ideal for quick exploratory visualizations during data analysis.</li>
                                <li>Customizable using Matplotlib parameters.</li>
                            </ul>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text smack">
                                    <code>
                                        {`# Pandas Visualization Example\n`}
                                        {`import pandas as pd\n`}
                                        {`import matplotlib.pyplot as plt\n`}
                                        {`df = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})\n`}
                                        {`df.plot(kind="bar")\n`}
                                        {`plt.title("Bar Plot with Pandas")\n`}
                                        {`plt.show()\n`}
                                    </code>
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
                                aria-label="Explore more Data Visualization topics"
                            >
                                Explore More
                            </button>
                        </div>
                    )}

                    {/* Sections Hidden Behind Explore More Button */}
                    {showMore && (
                        <>
                            {/* Plotly Section */}
                            <section id="plotly" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Plotly for Data Visualization in Python
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Plotly is a powerful library for creating interactive, web-based visualizations. It supports a wide range of chart types and is particularly useful for building dashboards and sharing visualizations online.
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        <strong>Key Features:</strong>
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Interactive plots with hover, zoom, and click features.</li>
                                        <li>Supports advanced chart types like 3D plots, maps, and animations.</li>
                                        <li>Can be integrated with web frameworks like Dash for building applications.</li>
                                        <li>Exportable to HTML for web sharing.</li>
                                    </ul>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>
                                                {`# Plotly Example\n`}
                                                {`import plotly.express as px\n`}
                                                {`df = px.data.iris()\n`}
                                                {`fig = px.scatter(df, x="sepal_width", y="sepal_length", color="species")\n`}
                                                {`fig.show()\n`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </section>

                            {/* Plotnine and ggplot2 Section */}
                            <section id="plotnine-ggplot2" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Data Visualization using Plotnine and ggplot2 in Python
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Plotnine is a Python implementation of R's ggplot2, following the grammar of graphics principles. It allows users to build complex visualizations by layering components like data, aesthetics, and geometries.
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        <strong>Key Features:</strong>
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Declarative syntax for building plots layer by layer.</li>
                                        <li>Supports a wide range of plot types and customizations.</li>
                                        <li>Ideal for users familiar with R's ggplot2 who want similar functionality in Python.</li>
                                        <li>Integrates well with Pandas for data handling.</li>
                                    </ul>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>
                                                {`# Plotnine Example\n`}
                                                {`from plotnine import *\n`}
                                                {`import pandas as pd\n`}
                                                {`df = pd.DataFrame({"x": [1, 2, 3], "y": [4, 5, 6]})\n`}
                                                {`p = (ggplot(df, aes(x="x", y="y")) + geom_point() + ggtitle("Scatter Plot with Plotnine"))\n`}
                                                {`p.draw()\n`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </section>

                            {/* Altair Section */}
                            <section id="altair" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Introduction to Altair in Python
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Altair is a declarative statistical visualization library in Python, built on top of Vega and Vega-Lite. It allows users to create interactive visualizations with a concise, declarative syntax.
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        <strong>Key Features:</strong>
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Declarative syntax for quick and intuitive chart creation.</li>
                                        <li>Supports interactivity (e.g., tooltips, zooming) out of the box.</li>
                                        <li>Works seamlessly with Pandas DataFrames.</li>
                                        <li>Generates visualizations as JSON, renderable in web browsers.</li>
                                    </ul>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>
                                                {`# Altair Example\n`}
                                                {`import altair as alt\n`}
                                                {`import pandas as pd\n`}
                                                {`df = pd.DataFrame({"x": [1, 2, 3], "y": [4, 5, 6]})\n`}
                                                {`chart = alt.Chart(df).mark_point().encode(x="x", y="y").properties(title="Scatter Plot with Altair")\n`}
                                                {`chart.display()\n`}
                                            </code>
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
                                    href="https://www.coursera.org/learn/data-visualization-python"
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
                                    Data Visualization on Coursera
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://matplotlib.org/stable/contents.html"
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
                                    Matplotlib Official Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://seaborn.pydata.org/"
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
                                    Seaborn Official Documentation
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
                                    Ready to Master Data Visualization?
                                </h2>
                                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                                    Join thousands of learners and start creating impactful visualizations today. Enroll now to unlock your potential!
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
                                        onClick={() => navigate("/Components/contact-us-page")}
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
                                        <li>
                                            <a
                                                href="https://www.coursera.org/learn/data-visualization-python"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Data Visualization with Python
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.datacamp.com/courses/intro-to-data-visualization"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Intro to Data Visualization
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Related Tutorials</h4>
                                    <ul className="space-y-1">
                                        <li>
                                            <a
                                                href="https://www.geeksforgeeks.org/data-visualization-with-python/"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Data Visualization Tutorial
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.geeksforgeeks.org/python-seaborn-tutorial/"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Seaborn Tutorial
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Visualization Topics</h4>
                                    <ul className="space-y-1">
                                        <li>
                                            <a
                                                href="https://www.geeksforgeeks.org/matplotlib-tutorial/"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Matplotlib Tutorial
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.geeksforgeeks.org/plotly-tutorial/"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Plotly Tutorial
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DataVisualization;