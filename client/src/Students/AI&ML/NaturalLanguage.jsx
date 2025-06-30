import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NaturalLanguage = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("what-is-nlp");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const faqs = [
        {
            question: "What is the difference between NLP and NLU?",
            answer: "NLP (Natural Language Processing) is a broad field focused on enabling computers to understand and generate human language, while NLU (Natural Language Understanding) is a subset of NLP that specifically deals with comprehending the meaning and intent behind text or speech.",
        },
        {
            question: "Why is NLTK widely used for NLP?",
            answer: "NLTK is widely used because it provides a comprehensive suite of tools and resources for text processing, including tokenization, stemming, and access to corpora, making it ideal for beginners and researchers.",
        },
        {
            question: "What are transformers in NLP?",
            answer: "Transformers are a type of neural network architecture that use self-attention mechanisms to process sequential data, such as text, enabling models like BERT to understand context and relationships in language effectively.",
        },
        {
            question: "What is spaCy best suited for?",
            answer: "spaCy is best suited for production-level NLP tasks due to its speed, efficiency, and pre-trained models for tasks like named entity recognition, part-of-speech tagging, and dependency parsing.",
        },
        {
            question: "How does BERT improve NLP tasks?",
            answer: "BERT (Bidirectional Encoder Representations from Transformers) improves NLP tasks by understanding the context of words in a sentence bidirectionally, leading to better performance in tasks like sentiment analysis and question answering.",
        },
    ];
    const [openFaqIndexes, setOpenFaqIndexes] = useState(Array(faqs.length).fill(false));

    const sections = [
        { id: "what-is-nlp", title: "What is Natural Language Processing (NLP)?" },
        { id: "nlp-libraries", title: "NLP Libraries in Python" },
        { id: "nltk", title: "NLP with NLTK" },
        { id: "spacy", title: "NLP with spaCy" },
        { id: "text-preprocessing", title: "Text Preprocessing in NLP" },
        { id: "transformers", title: "Using Transformers for NLP" },
        { id: "sentiment-analysis", title: "Sentiment Analysis with NLP" },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsSidebarOpen(false);

        const hiddenSections = ["transformers", "sentiment-analysis"];
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
                    <h2 className="text-xl font-bold text-gray-800">NLP Tutorial</h2>
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
                                Natural Language Processing with Python
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Learn Natural Language Processing (NLP) concepts, libraries, and techniques to process and analyze text data effectively.
                        </p>
                    </div>

                    {/* NLP Hero Banner */}
                    <div className="mb-16 bg-gradient-to-r from-blue-400 to-green-800 rounded-2xl shadow-xl overflow-hidden border border-white/10">
                        <div className="relative p-4 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                            {/* Content */}
                            <div className="relative z-10 mb-6 md:mb-0 md:mr-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                        Master NLP
                                    </span>{" "}
                                    in 2025
                                </h2>
                                <p className="text-base sm:text-lg text-white/90 max-w-lg">
                                    Unlock the power of text analysis with Python's top NLP libraries and techniques.
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
                                        {`# NLP Example\n`}
                                        {`import nltk\n`}
                                        {`from nltk.tokenize import word_tokenize\n`}
                                        {`nltk.download('punkt')\n`}
                                        {`text = "Hello, world!"\n`}
                                        {`tokens = word_tokenize(text)\n`}
                                        {`print(tokens)\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* What is NLP Section */}
                    <section id="what-is-nlp" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            What is Natural Language Processing (NLP)?
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Natural Language Processing (NLP) is a field of artificial intelligence that focuses on the interaction between computers and human language. It enables machines to understand, interpret, and generate human language in a meaningful way.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Applications:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Text analysis (e.g., sentiment analysis, topic modeling).</li>
                                <li>Machine translation (e.g., Google Translate).</li>
                                <li>Chatbots and virtual assistants (e.g., Siri, Alexa).</li>
                                <li>Information extraction (e.g., named entity recognition).</li>
                            </ul>
                        </div>
                    </section>

                    {/* NLP Libraries Section */}
                    <section id="nlp-libraries" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            NLP Libraries in Python
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Python offers a variety of libraries for NLP, each designed for different use cases, from research to production.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# Importing NLP Libraries\n`}
                                        {`import nltk\n`}
                                        {`import spacy\n`}
                                        {`from transformers import pipeline\n`}
                                    </code>
                                </pre>
                            </div>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>NLTK:</strong> A comprehensive library for text processing and research.</li>
                                <li><strong>spaCy:</strong> A fast, production-ready library for advanced NLP tasks.</li>
                                <li><strong>Transformers (Hugging Face):</strong> A library for state-of-the-art NLP models like BERT.</li>
                            </ul>
                        </div>
                    </section>

                    {/* NLTK Section */}
                    <section id="nltk" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            NLP with NLTK
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                NLTK (Natural Language Toolkit) is a popular Python library for NLP, widely used for educational purposes and research. It provides tools for text processing and linguistic analysis.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Features:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Tokenization, stemming, and lemmatization for text preprocessing.</li>
                                <li>Access to corpora and lexical resources like WordNet.</li>
                                <li>Tools for part-of-speech tagging and parsing.</li>
                                <li>Support for building custom NLP pipelines.</li>
                            </ul>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# NLTK Example\n`}
                                        {`import nltk\n`}
                                        {`from nltk.tokenize import word_tokenize\n`}
                                        {`nltk.download('punkt')\n`}
                                        {`text = "Natural Language Processing is amazing!"\n`}
                                        {`tokens = word_tokenize(text)\n`}
                                        {`print(tokens)\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* spaCy Section */}
                    <section id="spacy" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            NLP with spaCy
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                spaCy is a fast and efficient NLP library designed for production use. It provides pre-trained models for various languages and tasks, making it ideal for building real-world NLP applications.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Features:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Fast and accurate tokenization, lemmatization, and dependency parsing.</li>
                                <li>Pre-trained models for named entity recognition (NER) and part-of-speech (POS) tagging.</li>
                                <li>Support for multiple languages with downloadable models.</li>
                                <li>Efficient for large-scale text processing.</li>
                            </ul>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# spaCy Example\n`}
                                        {`import spacy\n`}
                                        {`nlp = spacy.load("en_core_web_sm")\n`}
                                        {`text = "Apple is looking at buying U.K. startup for $1 billion"\n`}
                                        {`doc = nlp(text)\n`}
                                        {`for ent in doc.ents:\n`}
                                        {`    print(ent.text, ent.label_)\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Text Preprocessing Section */}
                    <section id="text-preprocessing" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Text Preprocessing in NLP
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Text preprocessing is a critical step in NLP to clean and prepare raw text data for analysis or modeling. It ensures the data is in a suitable format for NLP algorithms.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Steps:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>Tokenization:</strong> Splitting text into words or sentences.</li>
                                <li><strong>Lowercasing:</strong> Converting all text to lowercase for consistency.</li>
                                <li><strong>Removing Stop Words:</strong> Eliminating common words (e.g., "the", "is") that add little meaning.</li>
                                <li><strong>Stemming/Lemmatization:</strong> Reducing words to their root form (e.g., "running" to "run").</li>
                            </ul>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# Text Preprocessing Example with NLTK\n`}
                                        {`import nltk\n`}
                                        {`from nltk.tokenize import word_tokenize\n`}
                                        {`from nltk.corpus import stopwords\n`}
                                        {`nltk.download('punkt')\n`}
                                        {`nltk.download('stopwords')\n`}
                                        {`text = "This is a sample sentence for preprocessing."\n`}
                                        {`tokens = word_tokenize(text.lower())\n`}
                                        {`stop_words = set(stopwords.words('english'))\n`}
                                        {`filtered_tokens = [word for word in tokens if word not in stop_words]\n`}
                                        {`print(filtered_tokens)\n`}
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
                                aria-label="Explore more NLP topics"
                            >
                                Explore More
                            </button>
                        </div>
                    )}

                    {/* Sections Hidden Behind Explore More Button */}
                    {showMore && (
                        <>
                            {/* Transformers Section */}
                            <section id="transformers" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Using Transformers for NLP
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Transformers, introduced by the Hugging Face library, have revolutionized NLP by enabling models like BERT, GPT, and T5 to achieve state-of-the-art results in various tasks.
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        <strong>Key Features:</strong>
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Self-attention mechanism to capture contextual relationships in text.</li>
                                        <li>Pre-trained models for tasks like text classification, translation, and question answering.</li>
                                        <li>Easy-to-use pipelines for quick implementation.</li>
                                        <li>Support for fine-tuning on custom datasets.</li>
                                    </ul>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>
                                                {`# Transformers Example\n`}
                                                {`from transformers import pipeline\n`}
                                                {`classifier = pipeline("sentiment-analysis")\n`}
                                                {`text = "I love using transformers for NLP!"\n`}
                                                {`result = classifier(text)\n`}
                                                {`print(result)\n`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </section>

                            {/* Sentiment Analysis Section */}
                            <section id="sentiment-analysis" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Sentiment Analysis with NLP
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Sentiment analysis is an NLP task that determines the emotional tone behind a piece of text, such as positive, negative, or neutral. It’s widely used in social media monitoring and customer feedback analysis.
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        <strong>Key Approaches:</strong>
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li><strong>Rule-Based:</strong> Using predefined rules and lexicons (e.g., VADER).</li>
                                        <li><strong>Machine Learning:</strong> Training models on labeled datasets.</li>
                                        <li><strong>Deep Learning:</strong> Using transformers like BERT for better accuracy.</li>
                                        <li><strong>Hybrid:</strong> Combining rule-based and machine learning approaches.</li>
                                    </ul>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>
                                                {`# Sentiment Analysis Example with Transformers\n`}
                                                {`from transformers import pipeline\n`}
                                                {`sentiment_pipeline = pipeline("sentiment-analysis")\n`}
                                                {`text = "This tutorial is fantastic!"\n`}
                                                {`result = sentiment_pipeline(text)\n`}
                                                {`print(result)\n`}
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
                                    href="https://www.coursera.org/learn/natural-language-processing"
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
                                    NLP on Coursera
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.nltk.org/"
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
                                    NLTK Official Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://spacy.io/usage"
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
                                    spaCy Official Documentation
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
                                    Ready to Master NLP?
                                </h2>
                                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                                    Join thousands of learners and start processing text data like a pro today. Enroll now to unlock your potential!
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
                            <h3 className="text-lg font-bold mb-4 text-gray-800">Explore More from Other Platforms</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <h4 className="font-semibold mb-2">Courses</h4>
                                    <ul className="space-y-1">
                                        <li>
                                            <a
                                                href="https://www.coursera.org/learn/natural-language-processing"
                                                className="text-blue-600 hover:underline"
                                            >
                                                NLP Specialization
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.datacamp.com/courses/intro-to-nlp"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Intro to NLP
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Related Tutorials</h4>
                                    <ul className="space-y-1">
                                        <li>
                                            <a
                                                href="https://www.geeksforgeeks.org/natural-language-processing-nlp-tutorial/"
                                                className="text-blue-600 hover:underline"
                                            >
                                                NLP Tutorial
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.geeksforgeeks.org/sentiment-analysis/"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Sentiment Analysis Tutorial
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">NLP Topics</h4>
                                    <ul className="space-y-1">
                                        <li>
                                            <a
                                                href="https://www.geeksforgeeks.org/transformers-in-nlp/"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Transformers in NLP
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.geeksforgeeks.org/text-preprocessing-in-nlp/"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Text Preprocessing
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

export default NaturalLanguage;