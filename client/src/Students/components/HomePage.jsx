import { Link } from 'react-router-dom';
import { FaBook, FaChartLine, FaCertificate, FaVideo, FaStar, FaQuestionCircle, FaEnvelope, FaChalkboardTeacher, FaChevronDown, FaTwitter, FaLinkedin } from 'react-icons/fa';
import UserFooter from '../../components/UserFooter';
import App from './../../App';
import img1 from '../../assets/img1.jpeg';
import img2 from '../../assets/img2.jpeg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import HomeImage from '../assets/HomeImage.jpg';
import user2 from '../assets/user2.jpeg';
import user3 from '../assets/user3.webp';
import user1 from '../assets/user1.jpeg';
import { Monitor, User, GraduationCap, BadgeCheck } from "lucide-react";
import CountUp from "react-countup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        setIsLoading(true);

        try {
            const emailToSend = email.trim().toLowerCase();
            const response = await fetch('http://127.0.0.1:8000/api/subscribe/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailToSend }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Subscription failed');
            }

            setSuccessMessage(data.message);
            setEmail('');
        } catch (error) {
            setErrorMessage(
                error.message === 'This email is already subscribed.'
                    ? error.message
                    : 'Please enter a valid email address'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <style>
                {`
                    section.container {
                        max-width: 100%;
                        overflow-x: hidden;
                    }
                    @media (max-width: 768px) {
                        section.container .flex {
                            flex-direction: column;
                            align-items: center;
                        }
                        section.container img {
                            max-width: 100%;
                            height: auto;
                        }
                    }
                `}
            </style>
            <div className="min-h-screen bg-gray-50 text-gray-800 pt-16 w-full overflow-x-hidden">
                <div className="px-2 sm:px-6 py-8 max-w-7xl mx-auto w-full no-horizontal-scroll">
                    {/* Header Section */}
                    <section className="container mx-auto py-12 bg-blue-600 relative rounded-xl">
                        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4">
                            <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center md:justify-start">
                                <div className="w-full md:w-4/5 p-2">
                                    <img
                                        src={HomeImage}
                                        alt="Group of students learning"
                                        className="w-full h-auto rounded-xl shadow-md object-cover max-h-[300px] transition-transform duration-300 hover:-translate-y-1"
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 text-center md:text-left md:ml-6 p-4">
                                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white tracking-tight">
                                    <span className="inline-block">Welcome</span>{' '}
                                    <span className="inline-block">to</span>{' '}
                                    <span className="inline-block">Your</span>{' '}
                                    <span className="inline-block">Learning</span>{' '}
                                    <span className="inline-block">Journey</span>
                                </h2>
                                <p className="text-base md:text-lg mb-6 text-blue-100 max-w-lg">
                                    Access a wide range of courses, track your progress, and earn certifications.
                                </p>
                                <div className="flex justify-center md:justify-start gap-4">
                                    <Link
                                        to="/register"
                                        className="bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-800 transition duration-300 transform hover:-translate-y-1"
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        to="/courses"
                                        className="bg-white text-blue-700 font-semibold py-2 px-6 rounded-lg shadow-md border border-gray-100 hover:bg-blue-50 transition duration-300 transform hover:-translate-y-1"
                                    >
                                        Explore Courses
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="container mx-auto py-12 bg-gray-50">
                        <h3 className="text-3xl font-bold text-center mb-6 text-blue-600">Why Choose Us?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
                            {[
                                {
                                    icon: <FaBook className="text-5xl text-blue-600 mx-auto mb-6" />,
                                    title: 'Online & Offline Learning',
                                    desc: 'Learn anytime, anywhere with flexible access to courses.',
                                    redirectLink: '/courses',
                                },
                                {
                                    icon: <FaVideo className="text-5xl text-blue-600 mx-auto mb-6" />,
                                    title: 'Live & Recorded Classes',
                                    desc: 'Join live sessions or watch recorded lectures at your convenience.',
                                    redirectLink: '/classes',
                                },
                                {
                                    icon: <FaChartLine className="text-5xl text-blue-600 mx-auto mb-6" />,
                                    title: 'Progress Tracking',
                                    desc: 'Monitor your learning progress with detailed dashboards.',
                                    redirectLink: '/progress-tracking',
                                },
                                {
                                    icon: <FaCertificate className="text-5xl text-blue-600 mx-auto mb-6" />,
                                    title: 'Earn Certifications',
                                    desc: 'Get certified upon course completion with verifiable certificates.',
                                    redirectLink: '/Components/certication-page',
                                },
                            ].map((feature, index) => (
                                <Link
                                    key={index}
                                    to={feature.redirectLink}
                                    aria-label={`Learn more about ${feature.title}`}
                                    className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl h-full"
                                >
                                    <div className="bg-white p-8 h-80 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-300 text-center transform transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between">
                                        <div className="flex-grow flex flex-col justify-center">
                                            {feature.icon}
                                            <h4 className="text-xl font-semibold mb-4 text-blue-700 leading-tight">{feature.title}</h4>
                                            <p className="text-gray-600 text-base leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                    {/* Explore Popular Courses Section */}
                    <section className="container mx-auto py-6 bg-gray-50">
                        <h3 className="text-2xl font-bold text-center mb-4 text-blue-600">Explore Popular Courses</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto px-4">
                            {[
                                {
                                    title: "Python for Data Science",
                                    desc: "Master Python programming and data analysis with hands-on projects.",
                                    img: img1,
                                    category: "Data Science",
                                },
                                {
                                    title: "Web Development Bootcamp",
                                    desc: "Learn full-stack web development with React, Node.js, and more.",
                                    img: img2,
                                    category: "Web Development",
                                },
                                {
                                    title: "Digital Marketing Essentials",
                                    desc: "Boost your career with SEO, social media, and advertising skills.",
                                    img: img3,
                                    category: "Marketing",
                                },
                            ].map((course, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-blue-200"
                                >
                                    <div className="relative">
                                        <img
                                            src={course.img}
                                            alt={course.title}
                                            className="w-full h-36 object-cover transform hover:-translate-y-1 transition duration-300"
                                        />
                                        <span className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                                            {course.category}
                                        </span>
                                    </div>
                                    <div className="p-3">
                                        <h4 className="text-lg font-medium mb-1 text-blue-700">{course.title}</h4>
                                        <p className="text-blue-800 text-sm mb-2">{course.desc}</p>
                                        <Link
                                            to="/courses"
                                            className="text-blue-600 font-semibold hover:underline"
                                        >
                                            Learn More
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-3 max-w-7xl mx-auto px-4">
                            <Link
                                to="/courses"
                                className="bg-blue-600 text-white font-semibold py-1.5 px-5 rounded-md shadow-sm hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1"
                            >
                                View All Courses
                            </Link>
                        </div>
                    </section>
                    {/* Statistics Section - Our Impact */}
                    <section className="container mx-auto py-10 text-center bg-white">
                        <h2 className="text-3xl font-bold text-center mb-5 text-blue-600">Our Impact</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
                            {[
                                {
                                    icon: <Monitor className="text-blue-600 w-10 h-10" />,
                                    value: 1000,
                                    suffix: "K",
                                    label: "Online Courses",
                                    bg: "bg-blue-100",
                                },
                                {
                                    icon: <User className="text-blue-600 w-10 h-10" />,
                                    value: 200,
                                    suffix: "+",
                                    label: "Expert Tutors",
                                    bg: "bg-blue-100",
                                },
                                {
                                    icon: <GraduationCap className="text-blue-600 w-10 h-10" />,
                                    value: 5000,
                                    suffix: "K+",
                                    label: "Online Students",
                                    bg: "bg-blue-100",
                                },
                                {
                                    icon: <BadgeCheck className="text-blue-600 w-10 h-10" />,
                                    value: 1000,
                                    suffix: "K+",
                                    label: "Certified Courses",
                                    bg: "bg-blue-100",
                                },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className={`${stat.bg} flex items-center gap-4 p-6 rounded-lg shadow-sm transform transition-all duration-300 hover:-translate-y-1`}
                                >
                                    {stat.icon}
                                    <div className="text-left">
                                        <h4 className="text-2xl font-bold text-blue-700">
                                            <CountUp end={stat.value} duration={2} separator="," suffix={stat.suffix} />
                                        </h4>
                                        <p className="text-blue-600 text-sm">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Testimonials Section - What Our Learners Say */}
                    <section className="container mx-auto py-10 bg-gray-50">
                        <h3 className="text-3xl font-bold text-center mb-5 text-blue-600">What Our Learners Say</h3>
                        <div className="relative overflow-hidden max-w-7xl mx-auto px-4">
                            <div className="flex space-x-10">
                                {[
                                    {
                                        name: "Siddhartha Paul",
                                        role: "Data Analyst",
                                        quote: "The courses are well-structured, and the progress tracking helped me stay motivated!",
                                        rating: 4,
                                        img: img1,
                                    },
                                    {
                                        name: "Nishant Kumar",
                                        role: "Web Developer",
                                        quote: "Live classes and recorded lectures made learning flexible and engaging.",
                                        rating: 5,
                                        img: img2,
                                    },
                                    {
                                        name: "Alay Kania",
                                        role: "Web Developer",
                                        quote: "Earning a certificate boosted my career and added credibility to my skills.",
                                        rating: 3,
                                        img: img3,
                                    },
                                    {
                                        name: "Rahul Sharma",
                                        role: "Software Engineer",
                                        quote: "The instructors are top-notch, and the platform is easy to use.",
                                        rating: 3,
                                        img: img4,
                                    },
                                ].map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-6 rounded-xl shadow-sm border border-blue-200 w-96 flex-shrink-0 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                                    >
                                        <img
                                            src={testimonial.img}
                                            alt={testimonial.name}
                                            className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-blue-200"
                                        />
                                        <div className="flex justify-center mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <FaStar key={i} className="text-blue-500 text-lg" />
                                            ))}
                                        </div>
                                        <p className="text-blue-800 mb-4 italic">"{testimonial.quote}"</p>
                                        <h4 className="text-lg font-medium text-blue-700">{testimonial.name}</h4>
                                        <p className="text-blue-600">{testimonial.role}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center mt-6 gap-2">
                                {[...Array(4)].map((_, i) => (
                                    <span
                                        key={i}
                                        className="w-3 h-3 bg-blue-600 rounded-full opacity-50 hover:opacity-100 cursor-pointer transition"
                                    ></span>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Featured Instructors Section - Meet Our Expert Instructors */}
                    <section className="container mx-auto py-12 bg-white">
                        <h3 className="text-3xl font-bold text-center mb-5 text-blue-600">Meet Our Expert Instructors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                            {[
                                {
                                    name: "Rishav Paul",
                                    role: "React Native Developer",
                                    desc: "MCA in Computer Science with years of teaching experience.",
                                    img: user2,
                                },
                                {
                                    name: "Subhajit Karmakr",
                                    role: "Senior Software Engineer",
                                    desc: "Built web applications and mentors aspiring developers.",
                                    img: user3,
                                },
                                {
                                    name: "Aditya Jamwai",
                                    role: "Python Developer",
                                    desc: "BTech in Computer Science with a passion for developing innovative solutions.",
                                    img: user1,
                                },
                            ].map((instructor, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100"
                                >
                                    <div className="relative">
                                        <img src={instructor.img} alt={instructor.name} className="w-full h-48 object-cover" />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                                            <div className="flex gap-4">
                                                <a href="https://www.twitter.com/example" target="_blank" rel="noopener noreferrer"><FaTwitter className="text-white text-2xl hover:text-blue-400 cursor-pointer" /></a>
                                                <a href="https://www.linkedin.com/in/example" target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-white text-2xl hover:text-blue-600 cursor-pointer" /></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 text-center">
                                        <h4 className="text-xl font-medium mb-2 text-gray-700">{instructor.name}</h4>
                                        <p className="text-gray-600 mb-2">{instructor.role}</p>
                                        <p className="text-gray-600">{instructor.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ Section - Ready to Test Your Knowledge? */}
                    <section className="container mx-auto py-8 bg-gray-50 mb-4">
                        <h3 className="text-2xl font-bold text-center mb-4 text-blue-600">Ready to Test Your Knowledge?</h3>
                        <div className="max-w-3xl mx-auto space-y-3">
                            {[
                                {
                                    question: "How do I enroll in a course?",
                                    answer: "Simply sign up, browse the course catalog, and click 'Enroll' on your desired course.",
                                },
                                {
                                    question: "Are the certificates verifiable?",
                                    answer: "Yes, all certificates include a QR code for authenticity verification.",
                                },
                                {
                                    question: "Can I access courses offline?",
                                    answer: "Yes, download course materials for offline learning where available.",
                                },
                                {
                                    question: "What if I need help during a course?",
                                    answer: "Reach out to instructors via the platform or contact support for assistance.",
                                },
                            ].map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 transition-all duration-300 hover:shadow-md hover:border-blue-200"
                                >
                                    <details className="group">
                                        <summary className="flex items-center justify-between cursor-pointer">
                                            <h4 className="text-base font-medium text-blue-700 flex items-center">
                                                <FaQuestionCircle className="text-blue-600 mr-2" />
                                                {faq.question}
                                            </h4>
                                            <FaChevronDown className="text-blue-600 group-open:rotate-180 transition-transform" />
                                        </summary>
                                        <p className="text-blue-800 mt-3 text-sm bg-blue-50 p-2 rounded">{faq.answer}</p>
                                    </details>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Newsletter Subscription Section */}
                    <section className="container mx-auto py-8 bg-blue-600 text-white text-center relative overflow-hidden transition-all duration-300 hover:shadow-md box-border mb-6">
                        <div className="relative px-4 sm:px-6 max-w-7xl mx-auto">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 tracking-tight">Stay Updated with Our Newsletter</h3>
                            <p className="text-sm sm:text-base md:text-lg mb-5 max-w-xs sm:max-w-sm md:max-w-xl mx-auto">
                                Subscribe to receive the latest course updates, tips, and exclusive offers.
                            </p>
                            <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center bg-white rounded-3xl sm:rounded-full shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg">
                                    <div className="p-2 sm:p-3 flex justify-center sm:justify-start">
                                        <FaEnvelope className="text-blue-600 text-lg sm:text-xl" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="flex-1 p-2 sm:p-3 text-gray-700 focus:outline-none placeholder-gray-400 placeholder-opacity-75 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="submit"
                                        className={`bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 hover:bg-blue-800 transition duration-300 transform hover:-translate-y-1 w-full sm:w-auto mt-2 sm:mt-0 rounded-3xl sm:rounded-r-full ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Subscribing...' : 'Subscribe'}
                                    </button>
                                </form>
                                {successMessage && (
                                    <p className="text-sm sm:text-base mt-3 sm:mt-4 text-blue-100 animate-fade-in">{successMessage}</p>
                                )}
                                {errorMessage && (
                                    <p className="text-sm sm:text-base mt-3 sm:mt-4 text-blue-100 animate-fade-in">{errorMessage}</p>
                                )}
                                <p className="text-xs sm:text-sm mt-3 sm:mt-4 opacity-80">We respect your privacy and won't share your information.</p>
                            </div>
                        </div>
                    </section>

                    {/* Contact Form Section - Get in Touch */}
                    <section className="container mx-auto py-10 bg-gray-50 relative overflow-hidden w-full">
                        <h3 className="text-2xl font-bold text-center mb-5 text-blue-600">Get in Touch</h3>
                        <div className="max-w-2xl mx-auto bg-white p-5 rounded-xl shadow-md border border-gray-100 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                            <div className="flex items-center justify-center mb-4">
                                <FaEnvelope className="text-blue-600 text-4xl mr-3 transform hover:-translate-y-1 transition duration-300" />
                                <h4 className="text-3xl font-semibold text-blue-700">We'd Love to Hear from You</h4>
                            </div>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 font-medium mb-1 text-lg">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Your name"
                                        className="w-full p-3 border border-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400/50 bg-white text-gray-700 placeholder-gray-400 placeholder-opacity-75 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/20"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1 text-lg">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Your email"
                                        className="w-full p-3 border border-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400/50 bg-white text-gray-700 placeholder-gray-400 placeholder-opacity-75 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/20"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-gray-700 font-medium mb-1 text-lg">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        placeholder="Your message"
                                        rows="4"
                                        className="w-full p-3 border border-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400/50 bg-white text-gray-700 placeholder-gray-400 placeholder-opacity-75 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/20"
                                    ></textarea>
                                </div>
                                <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 flex items-center justify-center relative overflow-hidden">
                                    <span className="relative z-10">Send Message</span>
                                    <FaEnvelope className="ml-2 relative z-10" />
                                    <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                                </button>
                                <p className="text-sm text-gray-600 text-center mt-4 opacity-80">We'll get back to you within 24 hours.</p>
                            </div>
                        </div>
                    </section>

                    {/* Call to Action Section */}
                    <section className="py-8 px-6 bg-blue-600 text-white relative overflow-hidden rounded-xl mt-6">
                        <div className="max-w-6xl mx-auto text-center p-4">
                            <h2 className="text-3xl font-bold mb-2">Start Learning Journey Today!</h2>
                            <p className="text-lg mb-3">Enroll now and become a top-tier developer with expert-led courses.</p>
                            <button
                                className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 shadow-md transform transition-all duration-300 hover:-translate-y-1"
                                onClick={() => navigate('/course_front_page')}
                            >
                                Start Learning Now
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default HomePage;
