import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const MachineLearning = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("introduction");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const faqs = [
        {
            question: "What is machine learning?",
            answer: "Machine learning is a branch of artificial intelligence that enables systems to learn from data and make predictions or decisions without explicit programming.",
        },
        {
            question: "What are the main types of machine learning?",
            answer: "The main types are supervised learning, unsupervised learning, reinforcement learning, and semi-supervised learning.",
        },
        {
            question: "What is the difference between supervised and unsupervised learning?",
            answer: "Supervised learning uses labeled data to train models, while unsupervised learning finds patterns in unlabeled data.",
        },
        {
            question: "What is reinforcement learning used for?",
            answer: "Reinforcement learning is used for decision-making tasks, such as robotics, gaming, and autonomous systems, where an agent learns through trial and error.",
        },
        {
            question: "What is semi-supervised learning?",
            answer: "Semi-supervised learning uses a mix of labeled and unlabeled data, making it useful when labeled data is scarce or expensive.",
        },
        {
            question: "What are some common supervised learning algorithms?",
            answer: "Common algorithms include linear regression, logistic regression, decision trees, support vector machines, and random forests.",
        },
        {
            question: "How do you deploy a machine learning model?",
            answer: "Deployment involves integrating the model into an application using tools like Flask, FastAPI, or Streamlit, and hosting it on platforms like Heroku.",
        },
        {
            question: "What is the role of data preprocessing in machine learning?",
            answer: "Data preprocessing cleans, scales, and transforms data to improve model performance and accuracy.",
        },
        {
            question: "What are some challenges in machine learning?",
            answer: "Challenges include data quality issues, overfitting, computational costs, and interpretability of complex models.",
        },
        {
            question: "Where can I find machine learning datasets?",
            answer: "Popular sources include Kaggle, UCI Machine Learning Repository, and Google Dataset Search.",
        },
    ];
    const [openFaqIndexes, setOpenFaqIndexes] = useState(Array(faqs.length).fill(false));

    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "types", title: "Types of Machine Learning" },
        { id: "pipeline", title: "Machine Learning Pipeline" },
        { id: "supervised", title: "Supervised Learning" },
        { id: "unsupervised", title: "Unsupervised Learning" },
        { id: "reinforcement", title: "Reinforcement Learning" },
        { id: "semi-supervised", title: "Semi-Supervised Learning" },
        { id: "deployment", title: "Deployment" },
        { id: "FAQ", title: "FAQ" },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsSidebarOpen(false);

        // If the clicked section is after "reinforcement" and sections are hidden, show them
        const hiddenSections = ["semi-supervised", "deployment", "FAQ"];
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
                    <h2 className="text-xl font-bold text-gray-800">Machine Learning Tutorial</h2>
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
                                Basics & Advanced of Machine Learning
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Learn machine learning with this comprehensive tutorial covering algorithms, models, deployment, and more. Master the skills to build intelligent systems.
                        </p>
                    </div>

                    {/* Machine Learning Hero Banner */}
                    <div className="mb-16 bg-gradient-to-r from-blue-400 to-green-800 rounded-2xl shadow-xl overflow-hidden border border-white/10">
                        <div className="relative p-4 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                            {/* Content */}
                            <div className="relative z-10 mb-6 md:mb-0 md:mr-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                        Master Machine Learning
                                    </span>{" "}
                                    in 2025
                                </h2>
                                <p className="text-base sm:text-lg text-white/90 max-w-lg">
                                    Build intelligent systems with modern machine learning techniques
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
                                        {`# Machine Learning Example\n`}
                                        {`from sklearn.linear_model import LinearRegression\n`}
                                        {`model = LinearRegression()\n`}
                                        {`model.fit(X_train, y_train)\n`}
                                        {`predictions = model.predict(X_test)`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Introduction Section */}
                    <section id="introduction" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Introduction to Machine Learning
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Machine learning (ML) is a branch of Artificial Intelligence that focuses on developing models and algorithms that allow computers to learn from data without being explicitly programmed for every task. In simple words, ML teaches systems to think and understand like humans by learning from data.
                                <br />
                                This tutorial will guide you through the core concepts of machine learning, including types of ML, algorithms, pipelines, and deployment.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`# Simple Linear Regression Example\nfrom sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit([[1], [2], [3]], [2, 4, 6])\nprint(model.predict([[4]]))`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Areas:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Supervised, unsupervised, reinforcement, and semi-supervised learning</li>
                                <li>Data preprocessing and model evaluation</li>
                                <li>Deployment and MLOps</li>
                                <li>Applications in NLP, computer vision, and more</li>
                            </ul>
                        </div>
                    </section>

                    {/* Types of Machine Learning Section */}
                    <section id="types" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Types of Machine Learning
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Machine learning can be broadly categorized into four types:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>Supervised Learning:</strong> Trains models on labeled data to predict or classify new, unseen data.</li>
                                <li><strong>Unsupervised Learning:</strong> Finds patterns or groups in unlabeled data, like clustering or dimensionality reduction.</li>
                                <li><strong>Reinforcement Learning:</strong> Learns through trial and error to maximize rewards, ideal for decision-making tasks.</li>
                                <li><strong>Semi-Supervised Learning:</strong> Uses a mix of labeled and unlabeled data, helpful when labeled data is limited.</li>
                            </ul>
                            <p className="text-gray-700 text-sm sm:text-base">
                                Note: Self-supervised learning is a significant category in deep learning, often used in NLP and computer vision.
                            </p>
                        </div>
                    </section>

                    {/* Machine Learning Pipeline Section */}
                    <section id="pipeline" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Machine Learning Pipeline
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                A machine learning pipeline involves several steps to process data and build a model that can make predictions.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`# Data Preprocessing Example\nimport pandas as pd\nfrom sklearn.preprocessing import StandardScaler\n\ndf = pd.read_csv('data.csv')\nscaler = StandardScaler()\nscaled_data = scaler.fit_transform(df[['feature1', 'feature2']])`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Steps:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>Data Cleaning:</strong> Remove missing values and outliers.</li>
                                <li><strong>Feature Scaling:</strong> Normalize or standardize data for better model performance.</li>
                                <li><strong>Data Preprocessing:</strong> Transform data into a suitable format for training.</li>
                            </ul>
                            <p className="text-gray-700 text-sm sm:text-base">
                                Learn more: <a href="https://towardsdatascience.com/data-preprocessing-for-machine-learning-1b09e6f6d8a5" className="text-blue-600 hover:underline">Data Preprocessing Guide on Towards Data Science</a>
                            </p>
                        </div>
                    </section>

                    {/* Supervised Learning Section */}
                    <section id="supervised" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Supervised Learning
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Supervised learning involves training models on labeled data and is categorized into classification (predicting discrete labels) and regression (predicting continuous values).
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`# Logistic Regression Example\nfrom sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Common Algorithms:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>Linear Regression:</strong> Predicts numerical values using a straight line. <a href="https://scikit-learn.org/stable/modules/linear_model.html#linear-regression" className="text-blue-600 hover:underline">Learn More on Scikit-Learn</a></li>
                                <li><strong>Logistic Regression:</strong> Predicts categories like yes/no. <a href="https://www.datacamp.com/tutorial/understanding-logistic-regression-python" className="text-blue-600 hover:underline">Learn More on DataCamp</a></li>
                                <li><strong>Decision Trees:</strong> Makes decisions using a flowchart-like structure. <a href="https://www.analyticsvidhya.com/blog/2021/08/decision-tree-algorithm-for-classification/" className="text-blue-600 hover:underline">Learn More on Analytics Vidhya</a></li>
                                <li><strong>Support Vector Machines (SVM):</strong> Separates data with a boundary. <a href="https://medium.com/@zxr.ninth/support-vector-machine-svm-a-complete-guide-for-beginners-134c7a4d9f5c" className="text-blue-600 hover:underline">Learn More on Medium</a></li>
                                <li><strong>Random Forest:</strong> Combines multiple decision trees for better accuracy. <a href="https://www.ibm.com/topics/random-forest" className="text-blue-600 hover:underline">Learn More on IBM</a></li>
                            </ul>
                        </div>
                    </section>

                    {/* Unsupervised Learning Section */}
                    <section id="unsupervised" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Unsupervised Learning
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Unsupervised learning finds patterns in unlabeled data and is divided into clustering, association rule mining, and dimensionality reduction.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`# K-Means Clustering Example\nfrom sklearn.cluster import KMeans\nkmeans = KMeans(n_clusters=3)\nkmeans.fit(data)\nlabels = kmeans.labels_`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Techniques:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>Clustering:</strong> Groups data points (e.g., K-Means). <a href="https://www.coursera.org/articles/k-means-clustering" className="text-blue-600 hover:underline">Learn More on Coursera</a></li>
                                <li><strong>Dimensionality Reduction:</strong> Simplifies data (e.g., PCA). <a href="https://towardsdatascience.com/understanding-pca-for-dimensionality-reduction-293e3455c16e" className="text-blue-600 hover:underline">Learn More on Towards Data Science</a></li>
                                <li><strong>Association Rules:</strong> Finds patterns (e.g., Apriori). <a href="https://www.kdnuggets.com/2019/11/market-basket-analysis.html" className="text-blue-600 hover:underline">Learn More on KDnuggets</a></li>
                            </ul>
                        </div>
                    </section>

                    {/* Reinforcement Learning Section */}
                    <section id="reinforcement" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Reinforcement Learning
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Reinforcement learning involves an agent learning through interaction with an environment, maximizing rewards through trial and error.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>{`# Q-Learning Pseudo-code\nQ = initialize_Q_table()\nfor episode in episodes:\n    state = env.reset()\n    while not done:\n        action = choose_action(state, Q)\n        reward, next_state = env.step(action)\n        Q[state, action] = update_Q(Q, state, action, reward, next_state)`}</code>
                                </pre>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Methods:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>Model-Based:</strong> Uses a model of the environment (e.g., MDPs). <a href="https://www.analyticsvidhya.com/blog/2021/04/basics-of-reinforcement-learning-the-modern-way-to-train-intelligent-machines/" className="text-blue-600 hover:underline">Learn More on Analytics Vidhya</a></li>
                                <li><strong>Model-Free:</strong> Learns from experience (e.g., Q-Learning). <a href="https://www.datacamp.com/tutorial/reinforcement-learning-python-introduction" className="text-blue-600 hover:underline">Learn More on DataCamp</a></li>
                            </ul>
                        </div>
                    </section>

                    {/* Explore More Button */}
                    {!showMore && (
                        <div className="text-center mb-16">
                            <button
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => setShowMore(true)}
                                aria-label="Explore more Machine Learning topics"
                            >
                                Explore More
                            </button>
                        </div>
                    )}

                    {/* Sections Hidden Behind Explore More Button */}
                    {showMore && (
                        <>
                            {/* Semi-Supervised Learning Section */}
                            <section id="semi-supervised" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Semi-Supervised Learning
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Semi-supervised learning uses a mix of labeled and unlabeled data, making it helpful when labeling data is costly or limited.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`# Self-Training Example\nfrom sklearn.semi_supervised import SelfTrainingClassifier\nfrom sklearn.svm import SVC\n\nbase_model = SVC(probability=True)\nself_training_model = SelfTrainingClassifier(base_model)\nself_training_model.fit(X, y)`}</code>
                                        </pre>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Techniques:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li><strong>Self-Training:</strong> Model generates its own labels. <a href="https://www.kdnuggets.com/2020/03/semi-supervised-learning-explained.html" className="text-blue-600 hover:underline">Learn More on KDnuggets</a></li>
                                        <li><strong>Few-Shot Learning:</strong> Learns from a small amount of labeled data. <a href="https://towardsdatascience.com/few-shot-learning-what-it-is-and-how-it-works-61482890e6c0" className="text-blue-600 hover:underline">Learn More on Towards Data Science</a></li>
                                    </ul>
                                </div>
                            </section>

                            {/* Deployment Section */}
                            <section id="deployment" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Deployment of Machine Learning Models
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Deploying a machine learning model involves integrating it into an application or service to make predictions accessible.
                                    </p>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>{`# Flask Deployment Example\nfrom flask import Flask, request\napp = Flask(__name__)\n\n@app.route('/predict', methods=['POST'])\ndef predict():\n    data = request.json\n    prediction = model.predict(data['input'])\n    return {'prediction': prediction.tolist()}\n\napp.run()`}</code>
                                        </pre>import Login from './../../pages/Login';

                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Key Methods:</h3>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li><strong>Streamlit:</strong> Build web apps for ML models. <a href="https://www.analyticsvidhya.com/blog/2021/06/how-to-deploy-your-machine-learning-model-using-streamlit/" className="text-blue-600 hover:underline">Learn More on Analytics Vidhya</a></li>
                                        <li><strong>Flask/FastAPI:</strong> Deploy as an API. <a href="https://medium.com/@towardsdatascience/how-to-deploy-a-machine-learning-model-with-fastapi-and-docker-7e9b09d492d4" className="text-blue-600 hover:underline">Learn More on Medium</a></li>
                                        <li><strong>MLOps:</strong> Manage deployment and monitoring. <a href="https://www.databricks.com/glossary/mlops" className="text-blue-600 hover:underline">Learn More on Databricks</a></li>
                                    </ul>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        For project ideas: <a href="https://www.kaggle.com/projects" className="text-blue-600 hover:underline">Machine Learning Projects on Kaggle</a>
                                    </p>
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
                                    href="https://www.coursera.org/learn/machine-learning"
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
                                    Machine Learning Course on Coursera
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://scikit-learn.org/stable/"
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
                                    Scikit-Learn Official Documentation
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
                            <li>
                                <a
                                    href="https://www.datacamp.com/courses/introduction-to-machine-learning-with-python"
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
                                    Introduction to Machine Learning on DataCamp
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://machinelearningmastery.com/start-here/"
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
                                    Machine Learning Mastery Tutorials
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
                                    Ready to Learn Machine Learning?
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

export default MachineLearning;