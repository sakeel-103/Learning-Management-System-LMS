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
        <div className="min-h-screen bg-blue-50 text-blue-800 block w-full overflow-x-hidden p-4 sm:p-5 md:p-6 lg:p-8 pt-20 sm:pt-16 md:pt-20 lg:pt-24">
            <div className="max-w-full sm:max-w-md md:max-w-3xl lg:max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 px-4 sm:px-0 mb-12">

                <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-3 md:mb-4">
                        Contact Us
                    </h1>

                    {/* Contact Details */}
                    <div className="space-y-4 sm:space-y-5 md:space-y-6 max-w-md">
                        <div className="flex flex-col mb-2 md:mb-3">
                            <span className="text-sm md:text-base font-medium text-blue-600 mb-1 md:mb-2">Email</span>
                            <span className="text-sm sm:text-base md:text-lg text-blue-700">trackademy@gmail.com</span>
                        </div>
                        <div className="flex flex-col mb-2 md:mb-3">
                            <span className="text-sm md:text-base font-medium text-blue-600 mb-1 md:mb-2">Phone</span>
                            <span className="text-sm sm:text-base md:text-lg text-blue-700">+91 1234567890</span>
                        </div>
                        <div className="flex flex-col mb-3 md:mb-4">
                            <span className="text-sm md:text-base font-medium text-blue-600 mb-1 md:mb-2">Office Location</span>
                            <span className="text-sm sm:text-base md:text-lg text-blue-700">
                                2nd Floor, Sri Rama Bldg, 15/6, G 6th St, Halasuru, Cambridge Layout, Bengaluru, Karnataka 560008
                            </span>
                        </div>
                    </div>

                    {/* Map functionality*/}
                    <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg shadow-sm overflow-hidden mt-4 md:mt-6">
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
                <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 border-b border-blue-200 pb-3 mb-3 md:mb-4">Leave a Message</h2>

                    {submitStatus && (
                        <div className={`p-3 md:p-4 rounded-md text-sm sm:text-base ${submitStatus.type === 'success' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                            {submitStatus.message}
                        </div>
                    )}

                    <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                            <div className="space-y-1">
                                <label htmlFor="firstName" className="block text-xs font-medium text-blue-600">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter your first name"
                                    className="w-full p-2 border border-blue-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-blue-700 placeholder-blue-300 transition-all duration-200 text-sm"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="lastName" className="block text-xs font-medium text-blue-600">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter your last name"
                                    className="w-full p-2 border border-blue-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-blue-700 placeholder-blue-300 transition-all duration-200 text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="email" className="block text-xs font-medium text-blue-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                className="w-full p-2 border border-blue-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-blue-700 placeholder-blue-300 transition-all duration-200 text-sm"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="phone" className="block text-xs font-medium text-blue-600">
                                Phone
                            </label>
                            <div className="flex space-x-2">
                                <select
                                    id="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    className="w-1/3 p-2 border border-blue-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-blue-700 transition-all duration-200 text-sm"
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
                                    className="flex-1 p-2 border border-blue-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-blue-700 placeholder-blue-300 transition-all duration-200 text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="country" className="block text-xs font-medium text-blue-600">
                                Country
                            </label>
                            <select
                                id="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full p-2 border border-blue-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-blue-700 transition-all duration-200 text-sm"
                            >
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                                <option value="UAE">UAE</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="message" className="block text-xs font-medium text-blue-600">
                                Message
                            </label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Enter your issues you face"
                                className="w-full p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-blue-700 placeholder-blue-300 h-40 md:h-48 resize-none transition-all duration-200 text-sm"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base mt-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
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