import React from 'react';

const DataStructuresAlgorithm = () => {
    return (
        <>


            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-900 to-teal-800 text-white py-16 px-6 pt-36">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Data Structure And Algorithms</h1>
                    <p className="text-lg md:text-xl mb-6">Master Data Structures and Algorithms to excel in coding interviews and development in 3 months!</p>
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
        </>
    );
};

export default DataStructuresAlgorithm;