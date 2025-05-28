import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeepLearning = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("what-is-deep-learning");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const faqs = [
        {
            question: "What is the difference between deep learning and machine learning?",
            answer: "Deep learning is a subset of machine learning that uses neural networks with multiple layers to learn hierarchical feature representations from data, while machine learning encompasses a broader range of algorithms, including simpler models like linear regression.",
        },
        {
            question: "Why is TensorFlow popular for deep learning?",
            answer: "TensorFlow is popular due to its flexibility, scalability, support for both research and production, and a large community, making it ideal for building and deploying deep learning models.",
        },
        {
            question: "What types of problems can deep learning solve?",
            answer: "Deep learning excels in tasks like image and speech recognition, natural language processing, game playing, and autonomous systems, where large amounts of data and complex patterns are involved.",
        },
        {
            question: "What is PyTorch best suited for?",
            answer: "PyTorch is best suited for research and prototyping due to its dynamic computation graph, ease of debugging, and flexibility in building custom neural networks.",
        },
        {
            question: "What is transfer learning in deep learning?",
            answer: "Transfer learning involves using a pre-trained model on a new, related task, fine-tuning it with a smaller dataset to leverage learned features, which saves training time and data requirements.",
        },
    ];
    const [openFaqIndexes, setOpenFaqIndexes] = useState(Array(faqs.length).fill(false));

    const sections = [
        { id: "what-is-deep-learning", title: "What is Deep Learning?" },
        { id: "neural-networks", title: "Introduction to Neural Networks" },
        { id: "deep-learning-libraries", title: "Deep Learning Libraries in Python" },
        { id: "tensorflow", title: "Deep Learning with TensorFlow" },
        { id: "pytorch", title: "Deep Learning with PyTorch" },
        { id: "building-cnn", title: "Building a Convolutional Neural Network (CNN)" },
        { id: "transfer-learning", title: "Transfer Learning in Deep Learning" },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsSidebarOpen(false);

        const hiddenSections = ["building-cnn", "transfer-learning"];
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
                    <h2 className="text-xl font-bold text-gray-800">Deep Learning Tutorial</h2>
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
                                Deep Learning with Python
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Learn deep learning concepts, libraries, and techniques to build powerful neural networks for solving complex problems.
                        </p>
                    </div>

                    {/* Deep Learning Hero Banner */}
                    <div className="mb-16 bg-gradient-to-r from-blue-400 to-green-800 rounded-2xl shadow-xl overflow-hidden border border-white/10">
                        <div className="relative p-4 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                            {/* Content */}
                            <div className="relative z-10 mb-6 md:mb-0 md:mr-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                        Master Deep Learning
                                    </span>{" "}
                                    in 2025
                                </h2>
                                <p className="text-base sm:text-lg text-white/90 max-w-lg">
                                    Build advanced neural networks using Python's top deep learning frameworks.
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
                                        {`# Deep Learning Example\n`}
                                        {`import tensorflow as tf\n`}
                                        {`model = tf.keras.Sequential([\n`}
                                        {`    tf.keras.layers.Dense(10, activation='relu'),\n`}
                                        {`    tf.keras.layers.Dense(1)\n`}
                                        {`])\n`}
                                        {`model.compile(optimizer='adam', loss='mse')\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* What is Deep Learning Section */}
                    <section id="what-is-deep-learning" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            What is Deep Learning?
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Deep learning is a subset of machine learning that uses neural networks with multiple layers (deep neural networks) to analyze various factors of data. It excels at learning hierarchical feature representations directly from raw data, eliminating the need for manual feature engineering.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Characteristics:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Utilizes neural networks with many layers to model complex patterns.</li>
                                <li>Requires large amounts of data and computational power (e.g., GPUs).</li>
                                <li>Effective for unstructured data like images, audio, and text.</li>
                                <li>Applications include image recognition, natural language processing (NLP), and autonomous systems.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Introduction to Neural Networks Section */}
                    <section id="neural-networks" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Introduction to Neural Networks
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Neural networks are the foundation of deep learning, inspired by the human brain's structure. They consist of interconnected nodes (neurons) organized in layers: an input layer, one or more hidden layers, and an output layer.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Components:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>Neurons:</strong> Basic units that receive inputs, apply weights, and pass the result through an activation function.</li>
                                <li><strong>Layers:</strong> Input layer (receives data), hidden layers (process data), and output layer (produces predictions).</li>
                                <li><strong>Weights and Biases:</strong> Parameters adjusted during training to minimize error.</li>
                                <li><strong>Activation Functions:</strong> Functions like ReLU, sigmoid, or tanh that introduce non-linearity.</li>
                            </ul>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# Simple Neural Network Example\n`}
                                        {`import tensorflow as tf\n`}
                                        {`model = tf.keras.Sequential([\n`}
                                        {`    tf.keras.layers.Dense(16, activation='relu', input_shape=(2,)),\n`}
                                        {`    tf.keras.layers.Dense(1, activation='sigmoid')\n`}
                                        {`])\n`}
                                        {`model.summary()\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Deep Learning Libraries Section */}
                    <section id="deep-learning-libraries" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Deep Learning Libraries in Python
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Python offers several libraries for deep learning, each with unique strengths for building and training neural networks.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# Importing Deep Learning Libraries\n`}
                                        {`import tensorflow as tf\n`}
                                        {`import torch\n`}
                                        {`import keras\n`}
                                    </code>
                                </pre>
                            </div>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>TensorFlow:</strong> A versatile framework for building and deploying deep learning models.</li>
                                <li><strong>PyTorch:</strong> Preferred for research due to its dynamic computation graph and flexibility.</li>
                                <li><strong>Keras:</strong> A high-level API (now part of TensorFlow) for easy model building.</li>
                            </ul>
                        </div>
                    </section>

                    {/* TensorFlow Section */}
                    <section id="tensorflow" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Deep Learning with TensorFlow
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                TensorFlow, developed by Google, is a powerful open-source library for deep learning, suitable for both research and production environments.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Features:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Supports both CPU and GPU computation for faster training.</li>
                                <li>Includes Keras as a high-level API for easy model building.</li>
                                <li>Scalable for deployment on various platforms (e.g., mobile, cloud).</li>
                                <li>Extensive community support and pre-trained models via TensorFlow Hub.</li>
                            </ul>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# TensorFlow Example\n`}
                                        {`import tensorflow as tf\n`}
                                        {`model = tf.keras.Sequential([\n`}
                                        {`    tf.keras.layers.Dense(64, activation='relu', input_shape=(784,)),\n`}
                                        {`    tf.keras.layers.Dense(10, activation='softmax')\n`}
                                        {`])\n`}
                                        {`model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])\n`}
                                        {`# model.fit(X_train, y_train, epochs=5)\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* PyTorch Section */}
                    <section id="pytorch" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Deep Learning with PyTorch
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                PyTorch, developed by Facebook, is a flexible deep learning framework favored for research and prototyping due to its dynamic computation graph.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Features:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Dynamic computation graph (eager execution) for easier debugging.</li>
                                <li>Strong support for GPU acceleration via CUDA.</li>
                                <li>Intuitive API for building and training neural networks.</li>
                                <li>Popular in academia for its flexibility in research.</li>
                            </ul>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# PyTorch Example\n`}
                                        {`import torch\n`}
                                        {`import torch.nn as nn\n`}
                                        {`class Net(nn.Module):\n`}
                                        {`    def __init__(self):\n`}
                                        {`        super(Net, self).__init__()\n`}
                                        {`        self.fc1 = nn.Linear(784, 64)\n`}
                                        {`        self.fc2 = nn.Linear(64, 10)\n`}
                                        {`    def forward(self, x):\n`}
                                        {`        x = torch.relu(self.fc1(x))\n`}
                                        {`        x = self.fc2(x)\n`}
                                        {`        return x\n`}
                                        {`model = Net()\n`}
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
                                aria-label="Explore more Deep Learning topics"
                            >
                                Explore More
                            </button>
                        </div>
                    )}

                    {/* Sections Hidden Behind Explore More Button */}
                    {showMore && (
                        <>
                            {/* Building a CNN Section */}
                            <section id="building-cnn" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Building a Convolutional Neural Network (CNN)
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Convolutional Neural Networks (CNNs) are a type of deep neural network designed for processing structured grid-like data, such as images. They are widely used in computer vision tasks like image classification and object detection.
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        <strong>Key Components:</strong>
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li><strong>Convolutional Layers:</strong> Apply filters to extract features like edges or textures.</li>
                                        <li><strong>Pooling Layers:</strong> Reduce spatial dimensions while preserving important features.</li>
                                        <li><strong>Fully Connected Layers:</strong> Combine features for final predictions.</li>
                                        <li><strong>Activation Functions:</strong> ReLU is commonly used to introduce non-linearity.</li>
                                    </ul>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>
                                                {`# CNN Example with TensorFlow\n`}
                                                {`import tensorflow as tf\n`}
                                                {`model = tf.keras.Sequential([\n`}
                                                {`    tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),\n`}
                                                {`    tf.keras.layers.MaxPooling2D((2, 2)),\n`}
                                                {`    tf.keras.layers.Flatten(),\n`}
                                                {`    tf.keras.layers.Dense(64, activation='relu'),\n`}
                                                {`    tf.keras.layers.Dense(10, activation='softmax')\n`}
                                                {`])\n`}
                                                {`model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])\n`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </section>

                            {/* Transfer Learning Section */}
                            <section id="transfer-learning" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Transfer Learning in Deep Learning
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Transfer learning leverages pre-trained models (trained on large datasets like ImageNet) to solve new tasks with smaller datasets. It’s especially useful when the target dataset is limited.
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        <strong>Key Steps:</strong>
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li><strong>Load a Pre-trained Model:</strong> Use models like VGG, ResNet, or Inception.</li>
                                        <li><strong>Freeze Layers:</strong> Prevent the pre-trained layers from being updated during training.</li>
                                        <li><strong>Add Custom Layers:</strong> Add layers for the new task (e.g., classification).</li>
                                        <li><strong>Fine-Tune:</strong> Train the model on the new dataset, optionally unfreezing some layers.</li>
                                    </ul>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>
                                                {`# Transfer Learning Example with TensorFlow\n`}
                                                {`import tensorflow as tf\n`}
                                                {`base_model = tf.keras.applications.VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))\n`}
                                                {`base_model.trainable = False\n`}
                                                {`model = tf.keras.Sequential([\n`}
                                                {`    base_model,\n`}
                                                {`    tf.keras.layers.Flatten(),\n`}
                                                {`    tf.keras.layers.Dense(128, activation='relu'),\n`}
                                                {`    tf.keras.layers.Dense(2, activation='softmax')\n`}
                                                {`])\n`}
                                                {`model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])\n`}
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
                                    href="https://www.coursera.org/learn/deep-learning-ai"
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
                                    Deep Learning on Coursera
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
                                    href="https://pytorch.org/tutorials/"
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
                                    PyTorch Official Tutorials
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
                                    Ready to Master Deep Learning?
                                </h2>
                                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                                    Join thousands of learners and start building advanced neural networks today. Enroll now to unlock your potential!
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

export default DeepLearning;