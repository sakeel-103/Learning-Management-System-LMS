import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CertificationPage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({ fullName: '', email: '' });
    const [showCertificate, setShowCertificate] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState('');

    useEffect(() => {
        const fetchEligibility = async () => {
            try {
                const response = await axios.get('/api/certification/check-eligibility/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                if (response.data.eligible) {
                    setDownloadUrl(response.data.download_url);
                }
            } catch (error) {
                console.error('Eligibility check failed:', error);
            }
        };
        fetchEligibility();
    }, []);

    const handleDownloadClick = () => {
        setShowPopup(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/certification/check-eligibility/', { email: formData.email }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.data.success) {
                setFormData({ ...formData, fullName: response.data.user_name });
                setDownloadUrl(response.data.download_url);
                setShowPopup(false);
                setShowCertificate(true);
            } else {
                console.error('Verification failed:', response.data.message);
            }
        } catch (error) {
            console.error('Verification failed:', error.response ? error.response.data : error.message);
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
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-600 text-center">
                        Certification
                    </h1>
                    <p className="text-sm sm:text-base text-gray-800 text-center">
                        Congratulations on completing your course! You can download your certificate below.
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={handleDownloadClick}
                            className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Download Certificate
                        </button>
                    </div>

                    {showCertificate && (
                        <div className="mt-5 sm:mt-6 p-4 sm:p-5 md:p-6 lg:p-8 bg-blue-50 rounded-lg shadow-sm border-2 border-blue-600 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto min-h-[180px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[300px]">
                            <div className="text-center">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Certificate of Completion</h2>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-2">
                                    This certifies that
                                </p>
                                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-blue-600 mb-4">
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
                                    href={downloadUrl || '#'}
                                    className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    download
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-2 sm:mx-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Enter Your Details</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
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
                                    className="px-3 sm:px-4 py-1 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
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
