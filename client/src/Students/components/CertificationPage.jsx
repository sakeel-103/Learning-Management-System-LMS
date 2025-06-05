import React, { useState } from 'react';

const CertificationPage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({ fullName: '', email: '' });
    const [showCertificate, setShowCertificate] = useState(false);

    const handleDownloadClick = () => {
        setShowPopup(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formData.fullName && formData.email) {
            setShowPopup(false);
            setShowCertificate(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
    });

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center w-full overflow-x-hidden p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10">
            <div className="max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl w-full mx-auto grid grid-cols-1 gap-6 sm:gap-8 px-2 sm:px-0">
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 text-center">
                        Certification
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-800 text-center">
                        Congratulations on completing your course! You can download your certificate below.
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={handleDownloadClick}
                            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Download Certificate
                        </button>
                    </div>

                    {/* Certificate Display */}
                    {showCertificate && (
                        <div className="mt-6 sm:mt-8 p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-b from-blue-50 to-green-50 rounded-xl shadow-md border-4 border-blue-600 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px]">
                            <div className="text-center">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Certificate of Completion</h2>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-2">
                                    This certifies that
                                </p>
                                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-4">
                                    {formData.fullName}
                                </p>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-2">
                                    is a Trackademy-certified student, having successfully completed the course on
                                </p>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800">
                                    {currentDate}
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-6 flex justify-center">
                                <a
                                    href="/path/to/certificate.pdf"
                                    className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    download
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Popup Form */}
            {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-2 sm:mx-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Enter Your Details</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-200"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-200"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowPopup(false)}
                                    className="px-3 sm:px-4 py-1 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CertificationPage;