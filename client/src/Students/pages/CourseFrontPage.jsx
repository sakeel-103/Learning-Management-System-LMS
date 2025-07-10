import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const courses = [
    {
        id: '1',
        title: 'Full Stack Development: A Complete Guide',
        rating: '4.4',
        level: 'Beginner to Advanced',
        duration: '3 Months',
        category: 'Web Development',
        instructor: 'Shradha Khapra',
        price: '₹999',
        originalPrice: '₹2999',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Master full stack development with hands-on projects and real-world applications.'
    },
    {
        id: '2',
        title: 'JAVA Backend Development',
        rating: '4.7',
        level: 'Intermediate to Advanced',
        duration: '4 Months',
        category: 'Web Development',
        instructor: 'Aman Dhatarwal',
        price: '₹1499',
        originalPrice: '₹3999',
        thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Build scalable backend systems with Java and Spring framework.'
    },
    {
        id: '3',
        title: 'Machine Learning & Data Science',
        rating: '4.7',
        level: 'Beginner to Advanced',
        duration: '6 Months',
        category: 'Data Science',
        instructor: 'Love Babbar',
        price: '₹1999',
        originalPrice: '₹4999',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Learn machine learning algorithms and data analysis techniques.'
    },
    {
        id: '4',
        title: 'Data Structures and Algorithms',
        rating: '4.7',
        level: 'Beginner to Advanced',
        duration: '2 Months',
        category: 'Programming',
        instructor: 'Code With Harry',
        price: '₹799',
        originalPrice: '₹1999',
        thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Master DSA concepts to ace your coding interviews.'
    },
];

const paymentMethods = [
    { id: 'credit-card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'upi', name: 'UPI', icon: '📱' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
    { id: 'wallet', name: 'Wallet', icon: '💰' },
];

const BuyCourse = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    // 1: Select method, 2: Payment details, 3: Confirmation
    const [paymentStep, setPaymentStep] = useState(1);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        upiId: '',
        saveCard: false,
    });
    const navigate = useNavigate();

    const categories = ['All', 'Web Development', 'Data Science', 'Programming', 'Mobile Development'];

    const filteredCourses = selectedCategory === 'All'
        ? courses
        : courses.filter((course) => course.category === selectedCategory);

    const handlePurchase = (course) => {
        setSelectedCourse(course);
        setPaymentStep(1);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
        setPaymentStep(1);
        setSelectedPaymentMethod(null);
        setFormData({
            name: '',
            email: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            upiId: '',
            saveCard: false,
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
        setPaymentStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form based on payment method
        if (selectedPaymentMethod === 'credit-card' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
            alert('Please fill all card details');
            return;
        }
        if (selectedPaymentMethod === 'upi' && !formData.upiId) {
            alert('Please enter UPI ID');
            return;
        }
        setPaymentStep(3);
    };

    // Here need to send the payment data to the backend that's why giving error
    const confirmPurchase = () => {
        setIsModalOpen(false);
        navigate('/dashboard');

    };

    return (
        <div className="min-h-screen bg-gray-50 text-blue-800 pt-16 w-full overflow-x-hidden">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 w-full">

                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">
                        Explore Our Courses
                    </h1>
                    <p className="text-lg text-blue-600 mt-2 max-w-2xl mx-auto">
                        Learn from industry experts and advance your career
                    </p>
                </div>

                {/* Category Filters */}
                <div className="mb-6">
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Course List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                        >
                            <div className="h-40 overflow-hidden">
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                        {course.level}
                                    </span>
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="ml-1 text-sm text-blue-600">
                                            {course.rating} ({course.stats})
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-blue-700 mb-2">{course.title}</h3>
                                <p className="text-sm text-blue-600 mb-4">{course.description}</p>
                                <div className="flex items-center text-sm text-blue-600 mb-4">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>{course.instructor}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-lg font-bold text-blue-700">{course.price}</span>
                                        <span className="ml-2 text-sm text-blue-500 line-through">{course.originalPrice}</span>
                                    </div>
                                    <button
                                        onClick={() => handlePurchase(course)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Modal */}
            {isModalOpen && selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-blue-700">
                                {paymentStep === 1 && 'Select Payment Method'}
                                {paymentStep === 2 && 'Payment Details'}
                                {paymentStep === 3 && 'Payment Successful'}
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Progress Steps - here used 3 steps to make payment successfull */}
                        <div className="flex justify-between items-center mb-6">
                            {[1, 2, 3].map((step) => (
                                <div key={step} className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= step ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-600'}`}>
                                        {step}
                                    </div>
                                    <span className="text-xs mt-1 text-blue-600">
                                        {step === 1 && 'Method'}
                                        {step === 2 && 'Details'}
                                        {step === 3 && 'Confirm'}
                                    </span>
                                </div>
                            ))}
                            <div className={`absolute top-20 h-1 bg-gray-200 z-0 ${paymentStep >= 2 ? 'w-1/3' : 'w-0'} left-1/4`}></div>
                            <div className={`absolute top-20 h-1 bg-gray-200 z-0 ${paymentStep >= 3 ? 'w-1/3' : 'w-0'} left-2/4`}></div>
                        </div>

                        {/* Step 1 */}
                        {paymentStep === 1 && (
                            <div className="space-y-4">
                                <div className="p-4 border border-blue-200 rounded-lg">
                                    <h4 className="font-medium mb-3 text-blue-700">Course: {selectedCourse.title}</h4>
                                    <div className="flex justify-between items-center">
                                        <span className="text-blue-600">Amount to pay:</span>
                                        <span className="text-xl font-bold text-blue-700">{selectedCourse.price}</span>
                                    </div>
                                </div>

                                <h4 className="font-medium">Choose Payment Method</h4>
                                <div className="space-y-2">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => handlePaymentMethodSelect(method.id)}
                                            className="w-full p-3 border border-gray-200 rounded-lg flex items-center hover:border-blue-500 transition-colors"
                                        >
                                            <span className="text-xl mr-3">{method.icon}</span>
                                            <span className="font-medium">{method.name}</span>
                                            <span className="ml-auto">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2 */}
                        {paymentStep === 2 && (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">You're paying</label>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <p className="font-bold text-lg">{selectedCourse.price}</p>
                                        <p className="text-sm text-gray-600">for {selectedCourse.title}</p>
                                    </div>
                                </div>

                                {selectedPaymentMethod === 'credit-card' && (
                                    <>
                                        <div className="mb-4">
                                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                            <input
                                                type="text"
                                                id="cardNumber"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                placeholder="1234 5678 9012 3456"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    id="expiryDate"
                                                    name="expiryDate"
                                                    value={formData.expiryDate}
                                                    onChange={handleInputChange}
                                                    placeholder="MM/YY"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                                <input
                                                    type="text"
                                                    id="cvv"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    placeholder="123"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {selectedPaymentMethod === 'upi' && (
                                    <div className="mb-4">
                                        <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                                        <input
                                            type="text"
                                            id="upiId"
                                            name="upiId"
                                            value={formData.upiId}
                                            onChange={handleInputChange}
                                            placeholder="yourname@upi"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">You'll be redirected to your UPI app for payment</p>
                                    </div>
                                )}

                                {selectedPaymentMethod === 'netbanking' && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="">Select your bank</option>
                                            <option value="sbi">State Bank of India</option>
                                            <option value="hdfc">HDFC Bank</option>
                                            <option value="icici">ICICI Bank</option>
                                            <option value="axis">Axis Bank</option>
                                        </select>
                                    </div>
                                )}

                                {selectedPaymentMethod === 'wallet' && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Wallet</label>
                                        <div className="space-y-2">
                                            <label className="flex items-center p-2 border border-gray-200 rounded">
                                                <input type="radio" name="wallet" className="mr-2" />
                                                Paytm
                                            </label>
                                            <label className="flex items-center p-2 border border-gray-200 rounded">
                                                <input type="radio" name="wallet" className="mr-2" />
                                                PhonePe
                                            </label>
                                            <label className="flex items-center p-2 border border-gray-200 rounded">
                                                <input type="radio" name="wallet" className="mr-2" />
                                                Amazon Pay
                                            </label>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-6 flex items-center">
                                    <input
                                        type="checkbox"
                                        id="saveCard"
                                        name="saveCard"
                                        checked={formData.saveCard}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
                                        Save payment details for future purchases
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Pay {selectedCourse.price}
                                </button>
                            </form>
                        )}

                        {/* Step 3 */}
                        {paymentStep === 3 && (
                            <div>
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">Payment Successful!</h4>
                                    <p className="text-gray-600 mb-6">
                                        You've successfully enrolled in <span className="font-semibold">{selectedCourse.title}</span>
                                    </p>
                                </div>

                                <div className="border-t border-gray-200 pt-4 mb-6">
                                    <h5 className="font-medium text-gray-800 mb-3">Order Details</h5>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Course:</span>
                                            <span>{selectedCourse.title}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Instructor:</span>
                                            <span>{selectedCourse.instructor}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Amount Paid:</span>
                                            <span className="font-semibold">{selectedCourse.price}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Payment Method:</span>
                                            <span className="capitalize">{selectedPaymentMethod}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-3">
                                    <button
                                        onClick={() => navigate('/instructor/dashboard')}
                                        className="w-full bg-white border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                                    >
                                        Go to Dashboard
                                    </button>
                                    <button
                                        onClick={() => navigate(`/courses/${selectedCourse.id}`)}
                                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Start Learning
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyCourse;
