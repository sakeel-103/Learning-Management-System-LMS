import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { course } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: '',
        email: '',
        agreeTerms: false
    });
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    if (!course) {
        navigate('/courses');
        return null;
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        return parts.length ? parts.join(' ') : value;
    };

    const formatExpiry = (value) => {
        const v = value.replace(/[^0-9]/g, '');
        if (v.length >= 3) {
            return `${v.slice(0, 2)}/${v.slice(2)}`;
        }
        return value;
    };

    const validateForm = () => {
        const newErrors = {};

        if (paymentMethod === 'credit') {
            if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
                newErrors.cardNumber = 'Please enter a valid 16-digit card number';
            }

            if (!formData.cardName) {
                newErrors.cardName = 'Cardholder name is required';
            }

            if (!formData.expiry || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiry)) {
                newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
            }

            if (!formData.cvv || !/^[0-9]{3,4}$/.test(formData.cvv)) {
                newErrors.cvv = 'Please enter a valid CVV';
            }
        }

        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsProcessing(true);

            // Simulate payment processing
            setTimeout(() => {
                setIsProcessing(false);
                navigate('/payment/success', {
                    state: {
                        course,
                        paymentDetails: {
                            method: paymentMethod,
                            amount: course.price,
                            transactionId: `TXN${Math.floor(Math.random() * 1000000)}`
                        }
                    }
                });
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                        Complete Your Purchase
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Secure payment processed through our encrypted gateway
                    </p>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-6 sm:p-8 lg:grid lg:grid-cols-2 lg:gap-8">
                        {/* Course Summary */}
                        <div className="lg:border-r lg:border-gray-200 lg:pr-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

                            <div className="flex items-start mb-6">
                                <div className="flex-shrink-0 h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                                    {course.title.charAt(0)}
                                </div>
                                <div className="ml-4 flex-1">
                                    <h3 className="text-base font-medium text-gray-900">{course.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {course.duration}
                                    </div>
                                </div>
                                <div className="ml-4 text-right">
                                    <p className="text-base font-medium text-gray-900">${course.price}</p>
                                    {course.originalPrice && (
                                        <p className="text-sm text-gray-500 line-through">${course.originalPrice}</p>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                                    <p>Subtotal</p>
                                    <p>${course.price}</p>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <p>Tax</p>
                                    <p>$0.00</p>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <p>Discount</p>
                                    <p>$0.00</p>
                                </div>
                                <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between text-lg font-bold text-gray-900">
                                    <p>Total</p>
                                    <p>${course.price}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <div className="mt-8 lg:mt-0 lg:pl-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Payment Method Selector */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('credit')}
                                            className={`py-2 px-3 border rounded-md text-sm font-medium ${paymentMethod === 'credit' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-blue-50'}`}
                                        >
                                            Credit Card
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('paypal')}
                                            className={`py-2 px-3 border rounded-md text-sm font-medium ${paymentMethod === 'paypal' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-blue-50'}`}
                                        >
                                            PayPal
                                        </button>
                                    </div>
                                </div>

                                {paymentMethod === 'credit' ? (
                                    <>
                                        {/* Card Number */}
                                        <div>
                                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                                Card number
                                            </label>
                                            <input
                                                type="text"
                                                id="cardNumber"
                                                name="cardNumber"
                                                value={formatCardNumber(formData.cardNumber)}
                                                onChange={(e) => {
                                                    const formattedValue = formatCardNumber(e.target.value);
                                                    setFormData({ ...formData, cardNumber: formattedValue });
                                                }}
                                                maxLength={19}
                                                placeholder="0000 0000 0000 0000"
                                                className={`block w-full px-3 py-2 border ${errors.cardNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                            />
                                            {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                                        </div>

                                        {/* Cardholder Name */}
                                        <div>
                                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                                                Name on card
                                            </label>
                                            <input
                                                type="text"
                                                id="cardName"
                                                name="cardName"
                                                value={formData.cardName}
                                                onChange={handleInputChange}
                                                placeholder="John Smith"
                                                className={`block w-full px-3 py-2 border ${errors.cardName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                            />
                                            {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                                        </div>

                                        {/* Expiry and CVV */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Expiration date
                                                </label>
                                                <input
                                                    type="text"
                                                    id="expiry"
                                                    name="expiry"
                                                    value={formatExpiry(formData.expiry)}
                                                    onChange={(e) => {
                                                        const formattedValue = formatExpiry(e.target.value);
                                                        setFormData({ ...formData, expiry: formattedValue });
                                                    }}
                                                    maxLength={5}
                                                    placeholder="MM/YY"
                                                    className={`block w-full px-3 py-2 border ${errors.expiry ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                />
                                                {errors.expiry && <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                                                    CVV
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cvv"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    maxLength={4}
                                                    placeholder="123"
                                                    className={`block w-full px-3 py-2 border ${errors.cvv ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                />
                                                {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <div className="flex items-center">
                                            <svg className="h-8 w-8 text-blue-500 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20.5 4.5c-.9-.9-2.2-1.4-3.5-1.4h-10c-1.4 0-2.6.5-3.5 1.4-.9.9-1.4 2.2-1.4 3.5v8c0 1.4.5 2.6 1.4 3.5.9.9 2.2 1.4 3.5 1.4h10c1.4 0 2.6-.5 3.5-1.4.9-.9 1.4-2.2 1.4-3.5V8c0-1.4-.5-2.6-1.4-3.5zm-1.7 8.7c0 .2-.1.4-.2.5-.1.1-.3.2-.5.2h-7c-.2 0-.4-.1-.5-.2-.1-.1-.2-.3-.2-.5v-2c0-.2.1-.4.2-.5.1-.1.3-.2.5-.2h7c.2 0 .4.1.5.2.1.1.2.3.2.5v2z" />
                                            </svg>
                                            <p className="text-sm text-gray-600">
                                                You will be redirected to PayPal to complete your purchase securely.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email receipt to
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="your@email.com"
                                        className={`block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                {/* Terms Checkbox */}
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="agreeTerms"
                                            name="agreeTerms"
                                            type="checkbox"
                                            checked={formData.agreeTerms}
                                            onChange={handleInputChange}
                                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                                            I agree to the{' '}
                                            <a href="/terms" className="text-blue-600 hover:text-blue-500">
                                                Terms and Conditions
                                            </a>{' '}
                                            and{' '}
                                            <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                                                Privacy Policy
                                            </a>
                                        </label>
                                        {errors.agreeTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            `Pay $${course.price}`
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        Secure payment. All transactions are encrypted and processed securely.
                    </p>
                    <div className="mt-4 flex justify-center space-x-6">
                        <svg className="h-8 w-auto" fill="currentColor" viewBox="0 0 38 24">
                            <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#142688"></path>
                            <path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF"></path>
                            <path d="M8.9 6.2c0-.3.2-.5.5-.5h2.8c.8 0 1.5.2 2 .7.4.4.6 1 .5 1.6 0 .6-.3 1.1-.7 1.4-.5.4-1.1.6-1.8.6h-1.4v2.2c0 .3-.2.5-.5.5H8.4c-.3 0-.5-.2-.5-.5V6.2zm1.5 3.3h1c.4 0 .7-.1.9-.3.2-.2.3-.5.3-.7 0-.3-.1-.5-.3-.6-.2-.2-.5-.2-.9-.2h-1v1.8zm7.4-3.3h3.3c.3 0 .5.2.5.5v.3c0 .3-.2.5-.5.5h-2.8v1.5h2.3c.3 0 .5.2.5.5v.3c0 .3-.2.5-.5.5h-2.3v1.5h2.8c.3 0 .5.2.5.5v.3c0 .3-.2.5-.5.5h-3.3c-.3 0-.5-.2-.5-.5V6.2c0-.3.2-.5.5-.5zm6.6 0c0-.3.2-.5.5-.5h3.3c.3 0 .5.2.5.5v.3c0 .3-.2.5-.5.5h-2.8v1.5h2.3c.3 0 .5.2.5.5v.3c0 .3-.2.5-.5.5h-2.3v1.5h2.8c.3 0 .5.2.5.5v.3c0 .3-.2.5-.5.5h-3.3c-.3 0-.5-.2-.5-.5V6.2z" fill="#142688"></path>
                            <path d="M30.1 6.2c0-.3.2-.5.5-.5h1.6c.3 0 .5.2.5.5v7.1c0 .3-.2.5-.5.5h-1.6c-.3 0-.5-.2-.5-.5V6.2z" fill="#142688"></path>
                        </svg>
                        <svg className="h-8 w-auto" fill="currentColor" viewBox="0 0 38 24">
                            <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#012169"></path>
                            <path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF"></path>
                            <path d="M10.3 12.2c0-1.3.7-2.2 2.1-2.6 1.4-.4 3.1-.8 4.4-.8 1.3 0 2.4.4 2.4 1.3 0 .8-.7 1.3-1.8 1.3-1.1 0-2.1-.4-3.2-.8-1.1-.4-2.1-.8-3.2-.8-1.1 0-1.7.6-1.7 1.6v3.9c0 1 .6 1.6 1.7 1.6 1.1 0 2.1-.4 3.2-.8 1.1-.4 2.1-.8 3.2-.8 1.1 0 1.8.4 1.8 1.3 0 .9-1.1 1.3-2.4 1.3-1.3 0-3-.4-4.4-.8-1.4-.4-2.1-1.3-2.1-2.6v-3.7zm8.5-1.8c0-.9.6-1.5 1.5-1.5s1.5.6 1.5 1.5-.6 1.5-1.5 1.5-1.5-.6-1.5-1.5zm0 7.5c0-.9.6-1.5 1.5-1.5s1.5.6 1.5 1.5-.6 1.5-1.5 1.5-1.5-.6-1.5-1.5z" fill="#012169"></path>
                        </svg>
                        <svg className="h-8 w-auto" fill="currentColor" viewBox="0 0 38 24">
                            <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#ED0006"></path>
                            <path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF"></path>
                            <path d="M23.5 12.5c0-2.5-2-4.5-4.5-4.5s-4.5 2-4.5 4.5 2 4.5 4.5 4.5 4.5-2 4.5-4.5z" fill="#ED0006"></path>
                            <path d="M19 16c-2 0-3.6-1.6-3.6-3.6S17 8.9 19 8.9s3.6 1.6 3.6 3.6S21 16 19 16z" fill="#F9A000"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

PaymentPage.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.shape({
            course: PropTypes.object.isRequired
        })
    })
};

export default PaymentPage;
