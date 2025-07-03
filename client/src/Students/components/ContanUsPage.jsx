import React, { useState } from 'react';

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+91',
        phone: '',
        country: 'India',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    country_code: formData.countryCode,
                    phone: formData.phone,
                    country: formData.country,
                    message: formData.message
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({ type: 'success', message: 'Your message has been submitted successfully!' });
                // Reset form after successful submission
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    countryCode: '+91',
                    phone: '',
                    country: 'India',
                    message: ''
                });
            } else {
                setSubmitStatus({ type: 'error', message: data.message || 'Submission failed. Please try again.' });
            }
        } catch (error) {
            console.error(error);
            setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 block w-full overflow-x-hidden p-4 sm:p-6 md:p-8 lg:p-10 pt-24 sm:pt-16 md:pt-20">
            <div className="max-w-full sm:max-w-md md:max-w-3xl lg:max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 px-4 sm:px-0">

                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-600">
                        Contact Us
                    </h1>

                    {/* Contact Details */}
                    <div className="space-y-4 max-w-md">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-600">Email</span>
                            <span className="text-base sm:text-lg text-gray-800">trackademy@gmail.com</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-600">Phone</span>
                            <span className="text-base sm:text-lg text-gray-800">+91 1234567890</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-600">Office Location</span>
                            <span className="text-base sm:text-lg text-gray-800">
                                Design Esthetics, 1st Floor, FF1, Business Point Building, Brigade Rd, near Brigade Towers, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025
                            </span>
                        </div>
                    </div>

                    {/* Map functionality*/}
                    <div className="w-full h-48 sm:h-56 md:h-64 rounded-lg shadow-sm overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.086228673622!2d77.60352119999999!3d12.967451700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15024f6ed90b%3A0xf7212a5ecc8218e7!2sDesign%20Esthetics!5e0!3m2!1sen!2sin!4v1695832741234!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Design Esthetics Location Map"
                        ></iframe>
                    </div>
                </div>

                {/* Right Section - Message Form */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 border-b pb-4">Leave a Message</h2>

                    {submitStatus && (
                        <div className={`p-4 rounded-md ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {submitStatus.message}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter your first name"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-200"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter your last name"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-200"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                                Phone
                            </label>
                            <div className="flex space-x-3">
                                <select
                                    id="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 transition-all duration-200"
                                >
                                    <option value="+91">+91 (India)</option>
                                    <option value="+1">+1 (USA)</option>
                                    <option value="+44">+44 (UK)</option>
                                    <option value="+971">+971 (UAE)</option>
                                </select>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+919888888888"
                                    className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-600">
                                Country
                            </label>
                            <select
                                id="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 transition-all duration-200"
                            >
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                                <option value="UAE">UAE</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                                Message
                            </label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Enter your issues you face"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 h-40 resize-none transition-all duration-200"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-all duration-200 font-bold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            aria-label="Send your message"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;