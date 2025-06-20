import { Link } from 'react-router-dom'
import { FaBook, FaChartLine, FaCertificate, FaVideo, FaStar, FaQuestionCircle, FaEnvelope, FaChalkboardTeacher, FaChevronDown, FaTwitter, FaLinkedin } from 'react-icons/fa'
import UserFooter from '../../components/UserFooter'
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
    return (
        <>
            {/* Add the CSS fix here */}
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

            {/* Header Section */}
            <section className="container mx-auto pt-36 pb-16 py-16 bg-gradient-to-r from-blue-400 to-green-800 animate-fade-in relative">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>
                <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4">
                    <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-start -ml-6 md:-ml-14 mt-6 md:mt-14">
                        <img
                            src={HomeImage}
                            alt="Group of students learning"
                            className="w-full h-auto rounded-xl shadow-md object-cover max-h-[400px] transition-transform duration-300 hover:-translate-y-1"
                        />
                    </div>

                    <div className="w-full md:w-1/2 text-center md:text-left md:ml-14">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 tracking-tight">
                            <span className="inline-block animate-text-reveal[animation-delay:0ms] bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">Welcom</span>{' '}
                            <span className="inline-block animate-text-reveal [animation-delay:200ms] bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">to</span>{' '}
                            <span className="inline-block animate-text-reveal [animation-delay:400ms] bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">Your</span>{' '}
                            <span className="inline-block animate-text-reveal [animation-delay:600ms] bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">Learning</span>{' '}
                            <span className="inline-block animate-text-reveal[animation-delay:800ms] bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">Journey</span>
                        </h2>
                        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-lg">
                            Access a wide range of courses, track your progress, and earn certifications.
                        </p>
                        <div className="flex justify-centerBUT md:justify-start gap-4">
                            <Link
                                to="/register"
                                className="bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:from-blue-700 hover:to-green-700 transition duration-300 transform hover:-translate-y-1"
                            >
                                Get Started
                            </Link>
                            <Link
                                to="/courses"
                                className="bg-white text-indigo-700 font-semibold py-3 px-8 rounded-lg shadow-md border border-gray-100 hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1"
                            >
                                Explore Courses
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto py-16 bg-gray-50">
                <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Why Choose Us?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
                    {[
                        {
                            icon: <FaBook className="text-4xl text-indigo-600 mx-auto mb-4" />,
                            title: 'Online & Offline Learning',
                            desc: 'Learn anytime, anywhere with flexible access to courses.',
                            redirectLink: '/courses',
                        },
                        {
                            icon: <FaVideo className="text-4xl text-indigo-600 mx-auto mb-4" />,
                            title: 'Live & Recorded Classes',
                            desc: 'Join live sessions or watch recorded lectures at your convenience.',
                            redirectLink: '/classes',
                        },
                        {
                            icon: <FaChartLine className="text-4xl text-indigo-600 mx-auto mb-4" />,
                            title: 'Progress Tracking',
                            desc: 'Monitor your learning progress with detailed dashboards.',
                            redirectLink: '/progress-tracking',
                        },
                        {
                            icon: <FaCertificate className="text-4xl text-indigo-600 mx-auto mb-4" />,
                            title: 'Earn Certifications',
                            desc: 'Get certified upon course completion with verifiable certificates.',
                            redirectLink: '/Components/certication-page',
                        },
                    ].map((feature, index) => (
                        <Link
                            key={index}
                            to={feature.redirectLink}
                            aria-label={`Learn more about ${feature.title}`}
                            className="block focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
                        >
                            <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-300 text-center transform transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                                {feature.icon}
                                <h4 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h4>
                                <p className="text-gray-600 text-sm md:text-base">{feature.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="container mx-auto py-16 bg-gray-50">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Explore Popular Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                            className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100"
                        >
                            <div className="relative">
                                <img
                                    src={course.img}
                                    alt={course.title}
                                    className="w-full h-48 object-cover transform hover:-translate-y-1 transition duration-300"
                                />
                                <span className="absolute top-4 left-4 bg-indigo-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                                    {course.category}
                                </span>
                            </div>
                            <div className="p-6">
                                <h4 className="text-xl font-medium mb-2 text-gray-700">{course.title}</h4>
                                <p className="text-gray-600 mb-4">{course.desc}</p>
                                <Link
                                    to="/courses"
                                    className="text-indigo-600 font-semibold hover:underline"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12 Dixie">
                    <Link
                        to="/courses"
                        className="bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:from-blue-700 hover:to-green-700 transition duration-300 transform hover:-translate-y-1"
                    >
                        View All Courses
                    </Link>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="container mx-auto py-16 text-center bg-gray-50">
                <h2 className="text-3xl font-bold mb-12 text-gray-800">Our Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: <Monitor className="text-indigo-600 w-10 h-10" />,
                            value: 1000,
                            suffix: "K",
                            label: "Online Courses",
                            bg: "bg-green-100",
                        },
                        {
                            icon: <User className="text-indigo-600 w-10 h-10" />,
                            value: 200,
                            suffix: "+",
                            label: "Expert Tutors",
                            bg: "bg-blue-100",
                        },
                        {
                            icon: <GraduationCap className="text-indigo-600 w-10 h-10" />,
                            value: 5000,
                            suffix: "K+",
                            label: "Online Students",
                            bg: "bg-purple-100",
                        },
                        {
                            icon: <BadgeCheck className="text-indigo-600 w-10 h-10" />,
                            value: 1000,
                            suffix: "K+",
                            label: "Certified Courses",
                            bg: "bg-teal-100",
                        },
                    ].map((stat, index) => {
                        const [startCount, setStartCount] = useState(false);
                        return (
                            <div
                                key={index}
                                onMouseEnter={() => setStartCount(true)}
                                onMouseLeave={() => setStartCount(false)}
                                className={`${stat.bg} flex items-center gap-4 p-6 rounded-lg shadow-sm transform transition-all duration-300 hover:-translate-y-1`}
                            >
                                {stat.icon}
                                <div className="text-left">
                                    <h4 className="text-2xl font-bold text-gray-800">
                                        {startCount ? (
                                            <CountUp end={stat.value} duration={2} separator="," suffix={stat.suffix} />
                                        ) : (
                                            `${stat.value}${stat.suffix}`
                                        )}
                                    </h4>
                                    <p className="text-gray-600 text-sm">{stat.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="container mx-auto py-16 bg-gradient-to-br from-gray-50 to-white mt-24">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Learners Say</h3>
                <div className="relative overflow-hidden">
                    <div className="flex space-x-6 animate-slide">
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
                                className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100 w-80 flex-shrink-0 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                            >
                                <img
                                    src={testimonial.img}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                                />
                                <div className="flex justify-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400 text-lg" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                                <h4 className="text-lg font-medium text-gray-700">{testimonial.name}</h4>
                                <p className="text-gray-600">{testimonial.role}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-6 gap-2">
                        {[...Array(4)].map((_, i) => (
                            <span
                                key={i}
                                className="w-3 h-3 bg-indigo-600 rounded-full opacity-50 hover:opacity-100 cursor-pointer transition"
                            ></span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Instructors Section */}
            <section className="container mx-auto py-16 bg-gray-50">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Expert Instructors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                            className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100"
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

            {/* FAQ Section (Collapsible) */}
            <section className="container mx-auto py-16 bg-gray-50 mb-12">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h3>
                <div className="max-w-3xl mx-auto space-y-4">
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
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
                        >
                            <details className="group">
                                <summary className="flex items-center justify-between cursor-pointer">
                                    <h4 className="text-lg font-medium text-gray-700 flex items-center">
                                        <FaQuestionCircle className="text-indigo-600 mr-2" />
                                        {faq.question}
                                    </h4>
                                    <FaChevronDown className="text-gray-600 group-open:rotate-180 transition-transform" />
                                </summary>
                                <p className="text-gray-600 mt-4">{faq.answer}</p>
                            </details>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto py-8 sm:py-12 md:py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white text-center relative overflow-hidden animate-fade-in transition-all duration-300 hover:shadow-md border-4 border-gray-100 box-border mb-8 sm:mb-10 md:mb-12">
                <div className="absolute inset-0 bg-opacity-20 bg-[url('https://via.placeholder.com/1200x400?text=Newsletter+Pattern')] opacity-30"></div>
                <div className="relative z-10 px-4 sm:px-6">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 tracking-tight">Stay Updated with Our Newsletter</h3>
                    <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-sm md:max-w-xl mx-auto">Subscribe to receive the latest course updates, tips, and exclusive offers.</p>
                    <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                        <div className="flex flex-col sm:flex-row items-center bg-white rounded-3xl sm:rounded-full shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg">
                            <div className="p-2 sm:p-3 flex justify-center sm:justify-start">
                                <FaEnvelope className="text-indigo-600 text-lg sm:text-xl" />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 p-2 sm:p-3 text-gray-700 focus:outline-none placeholder-gray-400 placeholder-opacity-75 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
                            />
                            <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 hover:from-blue-700 hover:to-green-700 transition duration-300 transform hover:-translate-y-1 w-full sm:w-auto mt-2 sm:mt-0 rounded-3xl sm:rounded-r-full">
                                Subscribe
                            </button>
                        </div>
                        <p className="text-xs sm:text-sm mt-3 sm:mt-4 opacity-80">We respect your privacy and won’t share your information.</p>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="container mx-auto py-16 bg-gray-50 relative overflow-hidden animate-fade-in w-full">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-10 bg-repeat"></div>
                <h3 className="text-4xl font-extrabold text-center mb-12 text-gray-800 tracking-tight text-shadow-sm">Get in Touch</h3>
                <div className="max-w-2xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm p-10 rounded-2xl shadow-md border border-gray-100 transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-center justify-center mb-8">
                        <FaEnvelope className="text-indigo-600 text-4xl mr-3 transform hover:-translate-y-1 transition duration-300" />
                        <h4 className="text-3xl font-semibold text-gray-800">We’d Love to Hear from You</h4>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-lg">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your name"
                                className="w-full p-4 border border-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400/50 bg-white/80 text-gray-700 placeholder-gray-400 placeholder-opacity-75 transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50/20"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-lg">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email"
                                className="w-full p-4 border border-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400/50 bg-white/80 text-gray-700 placeholder-gray-400 placeholder-opacity-75 transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50/20"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2 text-lg">
                                Message
                            </label>
                            <textarea
                                id="message"
                                placeholder="Your message"
                                rows="5"
                                className="w-full p-4 border border-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400/50 bg-white/80 text-gray-700 placeholder-gray-400 placeholder-opacity-75 transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50/20"
                            ></textarea>
                        </div>
                        <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-4 rounded-lg shadow-md hover:from-blue-700 hover:to-green-700 transition duration-300 transform hover:-translate-y-1 flex items-center justify-center relative overflow-hidden">
                            <span className="relative z-10">Send Message</span>
                            <FaEnvelope className="ml-2 relative z-10" />
                            <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                        </button>
                        <p className="text-sm text-gray-600 text-center mt-4 opacity-80">We’ll get back to you within 24 hours.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-12 px-6 bg-gradient-to-r from-blue-600 to-green-600 text-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Start Learning Journey Today!</h2>
                    <p className="text-lg mb-6">Enroll now and become a top-tier developer with expert-led courses.</p>
                    <button
                        className="bg-white text-indigo-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 shadow-md transform transition-all duration-300 hover:-translate-y-1"
                        onClick={() => navigate('/course_front_page')}
                    >
                        Start Learning Now
                    </button>
                </div>
            </section>

        </>
    )
}

export default HomePage