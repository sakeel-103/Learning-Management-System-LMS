import React from "react";

const HTMLPage = () => {
    return (
        <>
            {/* Demo Code to check page working */}
            <section className="text-gray-600 pt-20">
                <div className="text-center mb-16 py-12 px-4 bg-gradient-to-r from-green-50 to-indigo-50 rounded-xl shadow-sm">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-indigo-600">
                            Basics & Advaced of HTML5
                        </span>
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Learn JavaScript programming with this comprehensive tutorial covering all fundamental concepts and advanced features. Master the language that powers the modern web.
                    </p>
                </div>
            </section>
        </>
    );
}

export default HTMLPage;