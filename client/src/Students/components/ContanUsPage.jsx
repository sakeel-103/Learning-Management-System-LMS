import React from 'react';

const ContactUsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 block w-full overflow-x-hidden p-4 sm:p-6 md:p-8 lg:p-10 pt-24 sm:pt-16 md:pt-20">
            <div className="max-w-full sm:max-w-md md:max-w-3xl lg:max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 px-4 sm:px-0">

                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
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
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 border-b pb-2">Leave a Message</h2>
                    <form className="space-y-3 sm:space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder="Enter your first name"
                                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-200"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder="Enter your last name"
                                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="name@example.com"
                                className="w-full p-2 sm:p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-200"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                                Phone
                            </label>
                            <div className="flex space-x-2">
                                <select
                                    id="countryCode"
                                    className="p-2 sm:p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 transition-all duration-200"
                                    defaultValue="+91"
                                >
                                    <option value="+91">+91 (India)</option>
                                    <option value="+1">+1 (USA)</option>
                                    <option value="+44">+44 (UK)</option>
                                    <option value="+971">+971 (UAE)</option>
                                </select>
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="+919888888888"
                                    className="flex-1 p-2 sm:p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-600">
                                Country
                            </label>
                            <select
                                id="country"
                                className="w-full p-2 sm:p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 transition-all duration-200"
                                defaultValue="India"
                            >
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                                <option value="UAE">UAE</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                                Message
                            </label>
                            <textarea
                                id="message"
                                placeholder="Enter your issues you face"
                                className="w-full p-2 sm:p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 h-32 resize-none transition-all duration-200"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Send your message"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;