import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ArtificialIntelligence = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("what-is-ai");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const faqs = [
        {
            question: "What is the difference between AI, machine learning, and deep learning?",
            answer: "AI is the broad field of creating intelligent systems, machine learning is a subset of AI that uses algorithms to learn from data, and deep learning is a subset of machine learning that uses neural networks with many layers to analyze complex patterns.",
        },
        {
            question: "What are some real-world applications of AI?",
            answer: "AI is used in various applications like virtual assistants (e.g., Siri, Alexa), recommendation systems (e.g., Netflix, Spotify), autonomous vehicles, medical diagnosis, and fraud detection.",
        },
        {
            question: "What is reinforcement learning in AI?",
            answer: "Reinforcement learning is a type of machine learning where an agent learns to make decisions by interacting with an environment, receiving rewards or penalties based on its actions, aiming to maximize cumulative rewards.",
        },
        {
            question: "How does AI ethics impact development?",
            answer: "AI ethics addresses concerns like bias, fairness, transparency, and privacy in AI systems, ensuring that AI is developed responsibly to avoid harm and promote trust.",
        },
        {
            question: "What is the role of Python in AI development?",
            answer: "Python is widely used in AI development due to its simplicity, extensive libraries (e.g., TensorFlow, scikit-learn), and strong community support, making it ideal for prototyping and production.",
        },
    ];
    const [openFaqIndexes, setOpenFaqIndexes] = useState(Array(faqs.length).fill(false));

    const sections = [
        { id: "what-is-ai", title: "What is Artificial Intelligence (AI)?" },
        { id: "ai-subfields", title: "Subfields of AI" },
        { id: "machine-learning", title: "Machine Learning in AI" },
        { id: "deep-learning", title: "Deep Learning in AI" },
        { id: "nlp", title: "Natural Language Processing in AI" },
        { id: "computer-vision", title: "Computer Vision in AI" },
        { id: "reinforcement-learning", title: "Reinforcement Learning in AI" },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsSidebarOpen(false);

        const hiddenSections = ["computer-vision", "reinforcement-learning"];
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
                    <h2 className="text-xl font-bold text-gray-800">AI Tutorial</h2>
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
                                Artificial Intelligence with Python
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Explore Artificial Intelligence concepts, subfields, and techniques to build intelligent systems using Python.
                        </p>
                    </div>

                    {/* AI Hero Banner */}
                    <div className="mb-16 bg-gradient-to-r from-blue-400 to-green-800 rounded-2xl shadow-xl overflow-hidden border border-white/10">
                        <div className="relative p-4 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                            {/* Content */}
                            <div className="relative z-10 mb-6 md:mb-0 md:mr-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                        Master AI
                                    </span>{" "}
                                    in 2025
                                </h2>
                                <p className="text-base sm:text-lg text-white/90 max-w-lg">
                                    Discover the power of AI with Python and build intelligent systems for the future.
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
                                        {`# Simple AI Example\n`}
                                        {`from sklearn.linear_model import LogisticRegression\n`}
                                        {`model = LogisticRegression()\n`}
                                        {`# Sample data\n`}
                                        {`X = [[0, 0], [1, 1]]\n`}
                                        {`y = [0, 1]\n`}
                                        {`model.fit(X, y)\n`}
                                        {`print(model.predict([[2, 2]]))\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* What is AI Section */}
                    <section id="what-is-ai" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            What is Artificial Intelligence (AI)?
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Artificial Intelligence (AI) refers to the development of computer systems that can perform tasks that typically require human intelligence, such as reasoning, problem-solving, decision-making, and perception.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Characteristics:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Mimics human cognitive functions like learning and reasoning.</li>
                                <li>Can adapt to new data and improve over time.</li>
                                <li>Enables automation of complex tasks across industries.</li>
                                <li>Includes subfields like machine learning, NLP, and computer vision.</li>
                            </ul>
                        </div>
                    </section>

                    {/* AI Subfields Section */}
                    <section id="ai-subfields" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Subfields of AI
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                AI encompasses a wide range of subfields, each focusing on different aspects of intelligence and problem-solving.
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>Machine Learning:</strong> Algorithms that learn from data to make predictions or decisions.</li>
                                <li><strong>Deep Learning:</strong> A subset of machine learning using neural networks with many layers.</li>
                                <li><strong>Natural Language Processing (NLP):</strong> Enables computers to understand and generate human language.</li>
                                <li><strong>Computer Vision:</strong> Allows machines to interpret and understand visual data.</li>
                                <li><strong>Reinforcement Learning:</strong> Learning through trial and error by interacting with an environment.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Machine Learning Section */}
                    <section id="machine-learning" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Machine Learning in AI
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Machine Learning (ML) is a core subfield of AI that focuses on developing algorithms that enable systems to learn from and make predictions based on data.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Types:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>Supervised Learning:</strong> Learning from labeled data (e.g., classification, regression).</li>
                                <li><strong>Unsupervised Learning:</strong> Finding patterns in unlabeled data (e.g., clustering).</li>
                                <li><strong>Reinforcement Learning:</strong> Learning through rewards and penalties in an environment.</li>
                            </ul>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# Machine Learning Example with scikit-learn\n`}
                                        {`from sklearn.linear_model import LogisticRegression\n`}
                                        {`from sklearn.datasets import make_classification\n`}
                                        {`X, y = make_classification(n_samples=100, n_features=2, random_state=42)\n`}
                                        {`model = LogisticRegression()\n`}
                                        {`model.fit(X, y)\n`}
                                        {`predictions = model.predict(X)\n`}
                                        {`print(predictions[:5])\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Deep Learning Section */}
                    <section id="deep-learning" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Deep Learning in AI
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Deep Learning is a subset of machine learning that uses neural networks with multiple layers to analyze complex patterns in data, excelling in tasks like image and speech recognition.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Features:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Utilizes neural networks with many layers (deep neural networks).</li>
                                <li>Effective for unstructured data like images, audio, and text.</li>
                                <li>Requires large datasets and computational power (e.g., GPUs).</li>
                                <li>Popular frameworks include TensorFlow and PyTorch.</li>
                            </ul>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# Deep Learning Example with TensorFlow\n`}
                                        {`import tensorflow as tf\n`}
                                        {`model = tf.keras.Sequential([\n`}
                                        {`    tf.keras.layers.Dense(16, activation='relu', input_shape=(2,)),\n`}
                                        {`    tf.keras.layers.Dense(1, activation='sigmoid')\n`}
                                        {`])\n`}
                                        {`model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* NLP Section */}
                    <section id="nlp" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Natural Language Processing in AI
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Natural Language Processing (NLP) enables computers to understand, interpret, and generate human language, making it a crucial subfield of AI.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Applications:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Chatbots and virtual assistants (e.g., Siri, Alexa).</li>
                                <li>Sentiment analysis for social media monitoring.</li>
                                <li>Machine translation (e.g., Google Translate).</li>
                                <li>Text summarization and generation.</li>
                            </ul>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# NLP Example with NLTK\n`}
                                        {`import nltk\n`}
                                        {`from nltk.tokenize import word_tokenize\n`}
                                        {`nltk.download('punkt')\n`}
                                        {`text = "AI is transforming the world!"\n`}
                                        {`tokens = word_tokenize(text)\n`}
                                        {`print(tokens)\n`}
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
                                aria-label="Explore more AI topics"
                            >
                                Explore More
                            </button>
                        </div>
                    )}

                    {/* Sections Hidden Behind Explore More Button */}
                    {showMore && (
                        <>
                            {/* Computer Vision Section */}
                            <section id="computer-vision" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Computer Vision in AI
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Computer Vision enables machines to interpret and understand visual data, such as images and videos, and is a vital part of AI applications.
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        <strong>Key Applications:</strong>
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Object detection and recognition (e.g., self-driving cars).</li>
                                        <li>Facial recognition (e.g., security systems).</li>
                                        <li>Medical imaging analysis (e.g., detecting tumors).</li>
                                        <li>Augmented reality (e.g., Snapchat filters).</li>
                                    </ul>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>
                                                {`# Computer Vision Example with OpenCV\n`}
                                                {`import cv2\n`}
                                                {`image = cv2.imread("sample.jpg")\n`}
                                                {`gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)\n`}
                                                {`cv2.imshow("Grayscale Image", gray)\n`}
                                                {`cv2.waitKey(0)\n`}
                                                {`cv2.destroyAllWindows()\n`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </section>

                            {/* Reinforcement Learning Section */}
                            <section id="reinforcement-learning" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Reinforcement Learning in AI
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Reinforcement Learning (RL) is a type of machine learning where an agent learns to make decisions by interacting with an environment, optimizing for a cumulative reward.
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        <strong>Key Concepts:</strong>
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li><strong>Agent:</strong> The decision-maker interacting with the environment.</li>
                                        <li><strong>Environment:</strong> The world in which the agent operates.</li>
                                        <li><strong>Reward:</strong> Feedback signal indicating the success of an action.</li>
                                        <li><strong>Policy:</strong> Strategy that the agent uses to decide actions.</li>
                                    </ul>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>
                                                {`# Reinforcement Learning Example (Pseudo-code)\n`}
                                                {`import gym\n`}
                                                {`env = gym.make("CartPole-v1")\n`}
                                                {`state = env.reset()\n`}
                                                {`for _ in range(1000):\n`}
                                                {`    action = env.action_space.sample()\n`}
                                                {`    state, reward, done, info = env.step(action)\n`}
                                                {`    if done:\n`}
                                                {`        state = env.reset()\n`}
                                                {`env.close()\n`}
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
                                    href="https://www.coursera.org/learn/ai-for-everyone"
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
                                    AI for Everyone on Coursera
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.tensorflow.org/tutorials"
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
                                    TensorFlow Official Tutorials
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://gym.openai.com/docs/"
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
                                    OpenAI Gym Documentation
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
                                    Ready to Master AI?
                                </h2>
                                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                                    Join thousands of learners and start building intelligent systems today. Enroll now to unlock your potential!
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
                </div>
            </div>
        </div>
    );
};

export default ArtificialIntelligence;