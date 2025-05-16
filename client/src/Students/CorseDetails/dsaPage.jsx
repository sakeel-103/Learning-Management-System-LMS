import React from 'react';

const DSAPage = () => {

    return (
        <>


            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-900 to-teal-800 text-white py-16 px-6 pt-36">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">DSA to Development: A Complete Guide</h1>
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

            {/* DSA Roadmap Section */}
            <section id="roadmap" className="py-12 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">DSA Learning Roadmap</h2>
                    <p className="text-gray-600 mb-8">Follow this step-by-step roadmap to master DSA and become job-ready.</p>
                    <div className="relative">
                        <div className="absolute left-4 top-0 h-full w-1 bg-green-900"></div>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-green-900 text-white rounded-full flex items-center justify-center mr-4">1</div>
                                <div>
                                    <h3 className="text-xl font-semibold">Learn Programming Basics</h3>
                                    <p className="text-gray-600">Choose a language (Python, Java, C++). Master variables, loops, functions, and basic problem-solving.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-green-900 text-white rounded-full flex items-center justify-center mr-4">2</div>
                                <div>
                                    <h3 className="text-xl font-semibold">Core Data Structures</h3>
                                    <p className="text-gray-600">Understand Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, and Hash Tables with practical coding.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-green-900 text-white rounded-full flex items-center justify-center mr-4">3</div>
                                <div>
                                    <h3 className="text-xl font-semibold">Algorithms Mastery</h3>
                                    <p className="text-gray-600">Learn Sorting, Searching, Recursion, Dynamic Programming, Greedy Algorithms, and Graph Algorithms.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-green-900 text-white rounded-full flex items-center justify-center mr-4">4</div>
                                <div>
                                    <h3 className="text-xl font-semibold">Practice & Build</h3>
                                    <p className="text-gray-600">Solve 300+ problems on LeetCode, HackerRank. Build projects like task managers or e-commerce platforms using DSA.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-green-900 text-white rounded-full flex items-center justify-center mr-4">5</div>
                                <div>
                                    <h3 className="text-xl font-semibold">Prepare for Interviews</h3>
                                    <p className="text-gray-600">Practice mock interviews, optimize code, and learn to explain your thought process clearly.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prerequisites Section */}
            <section className="py-12 px-6 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Prerequisites</h2>
                    <p className="text-gray-600 mb-4">To get the most out of this course, you should have:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Basic programming knowledge (variables, loops, functions).</li>
                        <li>Familiarity with C++, Java, or Python (optional but helpful).</li>
                        <li>A computer with a stable internet connection.</li>
                        <li>10-15 hours per week for learning and practice.</li>
                    </ul>
                </div>
            </section>

            {/* Learning Resources Section */}
            <section id="resources" className="py-12 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Recommended Learning Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Books</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>"Introduction to Algorithms" by Cormen</li>
                                <li>"Data Structures and Algorithms in Python" by Goodrich</li>
                                <li>"Algorithms" by Sedgewick and Wayne</li>
                            </ul>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Online Platforms</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>LeetCode (Coding Problems)</li>
                                <li>HackerRank (Challenges)</li>
                                <li>GeeksforGeeks (Tutorials)</li>
                            </ul>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Video Tutorials</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>FreeCodeCamp DSA Course</li>
                                <li>Abdul Bari’s YouTube Channel</li>
                                <li>Tech With Tim (Python DSA)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-12 px-6 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Students Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-600 italic">"This course gave me the confidence to crack coding interviews at top companies!"</p>
                            <p className="mt-4 font-semibold">Rahul Sharma</p>
                            <p className="text-sm text-gray-500">Software Engineer, Google</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-600 italic">"The projects and real-world applications made learning DSA so practical."</p>
                            <p className="mt-4 font-semibold">Priya Singh</p>
                            <p className="text-sm text-gray-500">Full-Stack Developer, Amazon</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs Section */}
            <section id="faqs" className="py-12 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold">Is this course suitable for absolute beginners?</h3>
                            <p className="text-gray-600">Yes, we start with the basics and progress to advanced topics, making it ideal for beginners and intermediates.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">What is the refund policy?</h3>
                            <p className="text-gray-600">We offer a 7-day money-back guarantee if you’re not satisfied with the course.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Will I get a certificate?</h3>
                            <p className="text-gray-600">Yes, you’ll receive a certificate upon completing the course and all assignments.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Can I access the course materials after completion?</h3>
                            <p className="text-gray-600">Yes, you’ll have lifetime access to all course materials and updates.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-12 px-6 bg-green-900 text-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Start Your DSA Journey Today!</h2>
                    <p className="text-lg mb-6">Enroll now to master DSA and become a top-tier developer.</p>
                    <button
                        className="bg-white text-green-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-200"
                    // onClick={() => navigate('/enroll')}
                    >
                        Enroll Now
                    </button>
                </div>
            </section>
        </>
    );
};

export default DSAPage;