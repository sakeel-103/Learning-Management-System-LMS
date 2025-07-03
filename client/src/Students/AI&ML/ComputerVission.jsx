import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Computer } from "lucide-react";

const ComputerVision = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("what-is-computer-vision");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const faqs = [
        {
            question: "What is the difference between computer vision and image processing?",
            answer: "Computer vision focuses on enabling machines to interpret and understand visual data, often involving AI and machine learning, while image processing involves manipulating images (e.g., filtering, resizing) without necessarily understanding their content.",
        },
        {
            question: "Why is OpenCV widely used for computer vision?",
            answer: "OpenCV is widely used because it provides a comprehensive set of tools for image and video processing, supports multiple languages, and is optimized for real-time applications.",
        },
        {
            question: "What are CNNs in computer vision?",
            answer: "Convolutional Neural Networks (CNNs) are a type of deep learning model designed to process grid-like data, such as images, using convolutional layers to extract features like edges and textures.",
        },
        {
            question: "What is YOLO best suited for?",
            answer: "YOLO (You Only Look Once) is best suited for real-time object detection tasks, as it can detect and classify objects in a single pass, making it fast and efficient.",
        },
        {
            question: "How does transfer learning help in computer vision?",
            answer: "Transfer learning in computer vision uses pre-trained models (e.g., ResNet, VGG) to leverage learned features for new tasks, reducing training time and the need for large datasets.",
        },
    ];
    const [openFaqIndexes, setOpenFaqIndexes] = useState(Array(faqs.length).fill(false));

    const sections = [
        { id: "what-is-computer-vision", title: "What is Computer Vision?" },
        { id: "computer-vision-libraries", title: "Computer Vision Libraries in Python" },
        { id: "opencv", title: "Computer Vision with OpenCV" },
        { id: "image-processing", title: "Basic Image Processing Techniques" },
        { id: "cnns", title: "Convolutional Neural Networks for Computer Vision" },
        { id: "object-detection", title: "Object Detection with YOLO" },
        { id: "transfer-learning", title: "Transfer Learning in Computer Vision" },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsSidebarOpen(false);

        const hiddenSections = ["object-detection", "transfer-learning"];
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
                <div className="p-4 border-b flex items-center">
                    <Computer className="w-6 h-6 mr-2 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-800">Computer Vision Tutorial</h2>
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
                                Computer Vision with Python
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Learn Computer Vision concepts, libraries, and techniques to process and analyze visual data effectively.
                        </p>
                    </div>

                    {/* Computer Vision Hero Banner */}
                    <div className="mb-16 bg-gradient-to-r from-blue-400 to-green-800 rounded-2xl shadow-xl overflow-hidden border border-white/10">
                        <div className="relative p-4 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>

                            {/* Content */}
                            <div className="relative z-10 mb-6 md:mb-0 md:mr-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
                                        Master Computer Vision
                                    </span>{" "}
                                    in 2025
                                </h2>
                                <p className="text-base sm:text-lg text-white/90 max-w-lg">
                                    Unlock the power of visual data analysis with Python's top computer vision libraries and techniques.
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
                                        {`# Computer Vision Example\n`}
                                        {`import cv2\n`}
                                        {`image = cv2.imread("image.jpg")\n`}
                                        {`gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)\n`}
                                        {`cv2.imshow("Grayscale Image", gray)\n`}
                                        {`cv2.waitKey(0)\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Defintion of Computer Vision Section */}
                    <section id="what-is-computer-vision" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            What is Computer Vision?
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Computer Vision is a field of artificial intelligence that enables computers to interpret and understand visual information from the world, such as images and videos. It involves tasks like image classification, object detection, and facial recognition.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Applications:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Image and video analysis (e.g., object detection, segmentation).</li>
                                <li>Autonomous vehicles (e.g., lane detection, obstacle avoidance).</li>
                                <li>Medical imaging (e.g., tumor detection in MRI scans).</li>
                                <li>Facial recognition (e.g., security systems, social media tagging).</li>
                            </ul>
                        </div>
                    </section>

                    {/* Computer Vision Libraries Section */}
                    <section id="computer-vision-libraries" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Computer Vision Libraries in Python
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Python offers several libraries for computer vision, each designed for different use cases, from basic image processing to advanced deep learning models.
                            </p>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# Importing Computer Vision Libraries\n`}
                                        {`import cv2\n`}
                                        {`import tensorflow as tf\n`}
                                        {`import torch\n`}
                                    </code>
                                </pre>
                            </div>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>OpenCV:</strong> A versatile library for image and video processing.</li>
                                <li><strong>TensorFlow/PyTorch:</strong> Frameworks for building deep learning models for computer vision.</li>
                                <li><strong>PIL (Pillow):</strong> A library for basic image manipulation.</li>
                            </ul>
                        </div>
                    </section>

                    {/* OpenCV Section */}
                    <section id="opencv" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Computer Vision with OpenCV
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                OpenCV (Open Source Computer Vision Library) is a popular library for computer vision tasks, offering tools for image processing, video analysis, and machine learning.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Features:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li>Supports image and video I/O operations.</li>
                                <li>Provides functions for image transformations (e.g., resizing, rotation).</li>
                                <li>Includes algorithms for feature detection and object recognition.</li>
                                <li>Optimized for real-time applications with C++ backend.</li>
                            </ul>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# OpenCV Example\n`}
                                        {`import cv2\n`}
                                        {`image = cv2.imread("sample.jpg")\n`}
                                        {`gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)\n`}
                                        {`cv2.imshow("Grayscale Image", gray_image)\n`}
                                        {`cv2.waitKey(0)\n`}
                                        {`cv2.destroyAllWindows()\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Basic Image Processing Section */}
                    <section id="image-processing" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Basic Image Processing Techniques
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Image processing is a fundamental step in computer vision, involving techniques to enhance or transform images for further analysis.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Techniques:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>Grayscale Conversion:</strong> Converting color images to grayscale to simplify processing.</li>
                                <li><strong>Blurring:</strong> Applying filters (e.g., Gaussian blur) to reduce noise.</li>
                                <li><strong>Edge Detection:</strong> Identifying edges using algorithms like Canny.</li>
                                <li><strong>Thresholding:</strong> Segmenting images by converting them to binary based on pixel intensity.</li>
                            </ul>
                            <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                <pre className="text-xs sm:text-sm">
                                    <code>
                                        {`# Image Processing Example with OpenCV\n`}
                                        {`import cv2\n`}
                                        {`image = cv2.imread("sample.jpg")\n`}
                                        {`gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)\n`}
                                        {`blurred = cv2.GaussianBlur(gray, (5, 5), 0)\n`}
                                        {`edges = cv2.Canny(blurred, 100, 200)\n`}
                                        {`cv2.imshow("Edges", edges)\n`}
                                        {`cv2.waitKey(0)\n`}
                                        {`cv2.destroyAllWindows()\n`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* CNNs Section */}
                    <section id="cnns" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Convolutional Neural Networks for Computer Vision
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Convolutional Neural Networks (CNNs) are a cornerstone of modern computer vision, designed to process and analyze visual data using convolutional layers.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong>Key Components:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                <li><strong>Convolutional Layers:</strong> Extract features like edges and textures using filters.</li>
                                <li><strong>Pooling Layers:</strong> Reduce spatial dimensions while preserving important features.</li>
                                <li><strong>Fully Connected Layers:</strong> Combine features for classification or regression.</li>
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

                    {/* Explore More Button */}
                    {!showMore && (
                        <div className="text-center mb-16">
                            <button
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => setShowMore(true)}
                                aria-label="Explore more Computer Vision topics"
                            >
                                Explore More
                            </button>
                        </div>
                    )}

                    {/* Sections Hidden Behind Explore More Button */}
                    {showMore && (
                        <>
                            <section id="object-detection" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Object Detection with YOLO
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        YOLO (You Only Look Once) is a popular object detection algorithm that processes images in a single pass, making it fast and suitable for real-time applications.
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        <strong>Key Features:</strong>
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li>Single-pass detection for speed and efficiency.</li>
                                        <li>Divides the image into a grid and predicts bounding boxes and class probabilities.</li>
                                        <li>Supports multiple object classes in a single image.</li>
                                        <li>Pre-trained models available for quick deployment.</li>
                                    </ul>
                                    <div className="bg-gray-600 text-white p-4 rounded-lg overflow-x-auto">
                                        <pre className="text-xs sm:text-sm">
                                            <code>
                                                {`# YOLO Example (Pseudo-code, requires YOLO weights and config)\n`}
                                                {`import cv2\n`}
                                                {`import numpy as np\n`}
                                                {`net = cv2.dnn.readNet("yolov3.weights", "yolov3.cfg")\n`}
                                                {`image = cv2.imread("image.jpg")\n`}
                                                {`blob = cv2.dnn.blobFromImage(image, 1/255.0, (416, 416), swapRB=True, crop=False)\n`}
                                                {`net.setInput(blob)\n`}
                                                {`outputs = net.forward(net.getUnconnectedOutLayersNames())\n`}
                                                {`# Process outputs for bounding boxes and classes\n`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </section>

                            {/* Transfer Learning in Computer Vision Section */}
                            <section id="transfer-learning" className="mb-16 bg-white rounded-xl shadow-md p-4 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                                    Transfer Learning in Computer Vision
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        Transfer learning leverages pre-trained models (trained on large datasets like ImageNet) to solve new computer vision tasks with smaller datasets, saving time and resources.
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        <strong>Key Steps:</strong>
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                                        <li><strong>Load a Pre-trained Model:</strong> Use models like VGG, ResNet, or Inception.</li>
                                        <li><strong>Freeze Layers:</strong> Prevent pre-trained layers from updating during training.</li>
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
                                    href="https://www.coursera.org/learn/computer-vision-basics"
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
                                    Computer Vision on Coursera
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://opencv.org/get-started/"
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
                                    OpenCV Official Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.tensorflow.org/tutorials/images"
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
                                    TensorFlow Computer Vision Tutorials
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
                                    Ready to Master Computer Vision?
                                </h2>
                                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                                    Join thousands of learners and start analyzing visual data like a pro today. Enroll now to unlock your potential!
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
                </div>
            </div>
        </div>
    );
};

export default ComputerVision;