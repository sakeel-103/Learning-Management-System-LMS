import React from "react";

const BackendWithJava = () => {
    return (
        <>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-900 to-teal-800 text-white py-16 px-6 pt-36">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">JAVA Backend Development</h1>
                    <p className="text-lg md:text-xl mb-6">Master Data Structures and Algorithms to excel in coding interviews and development in 3 months!</p>
                    <span className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full">LIVE</span>
                </div>
            </section>

            {/* Course Overview Section */}
            <section id="overview" className="py-12 px-6 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Course Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Rating & Popularity</h3>
                            <p className="text-yellow-400">★ 4.4 <span className="text-gray-600">(1K+ Interested Users)</span></p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Level & Duration</h3>
                            <p>Beginner to Advanced | 3 Months</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Schedule</h3>
                            <p>Mon, Wed (7PM-9PM IST)</p>
                        </div>
                    </div>
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">Why Learn DSA?</h3>
                        <p className="text-gray-600">Data Structures and Algorithms are the backbone of efficient coding. Mastering DSA helps you solve complex problems, ace coding interviews, and build scalable applications. This course bridges the gap from beginner to advanced, preparing you for real-world development.</p>
                    </div>
                </div>
            </section>

            {/* Instructor Section */}
            <section className="py-12 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet Your Instructor</h2>
                    <div className="flex items-center bg-green-900 text-white p-6 rounded-lg shadow-lg">
                        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                            <span className="text-gray-600 text-2xl">👤</span>
                        </div>
                        <div>
                            <p className="text-xl font-semibold">Shradha Khapra</p>
                            <p className="text-gray-300">Expert Instructor with 10+ years of experience</p>
                            <p className="text-sm text-gray-400 mt-2">Shradha has mentored over 50,000 students and worked at top tech giants like Microsoft and Amazon, specializing in DSA and Full-Stack Development.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Syllabus Section */}
            <section id="syllabus" className="py-12 px-6 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Detailed Syllabus</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Week 1-4: Fundamentals</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>Introduction to DSA and Problem-Solving Mindset</li>
                                <li>Time and Space Complexity (Big-O Notation)</li>
                                <li>Arrays, Strings, and Two-Pointer Techniques</li>
                                <li>Basic Sorting (Bubble, Selection, Insertion) and Searching (Linear, Binary)</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Week 5-8: Intermediate Concepts</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>Linked Lists (Singly, Doubly, Circular)</li>
                                <li>Stacks and Queues (Implementation and Applications)</li>
                                <li>Trees (Binary Trees, BST, AVL Trees)</li>
                                <li>Hashing (Hash Tables, Collision Resolution)</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Week 9-12: Advanced Topics</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>Graphs (DFS, BFS, Dijkstra’s, Kruskal’s Algorithms)</li>
                                <li>Dynamic Programming (Top-Down, Bottom-Up)</li>
                                <li>Greedy Algorithms (Activity Selection, Huffman Coding)</li>
                                <li>Advanced Sorting (Quick Sort, Merge Sort, Heap Sort)</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Week 13-16: Real-World Applications</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>DSA in Full-Stack Development (e.g., Caching, APIs)</li>
                                <li>System Design Basics with DSA</li>
                                <li>Capstone Project: Build a Scalable Application</li>
                                <li>Mock Interviews and Competitive Programming</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BackendWithJava;