import { Link } from 'react-router-dom'
import { FaBook, FaChartLine, FaCertificate, FaVideo, FaStar, FaQuestionCircle, FaEnvelope, FaChalkboardTeacher, FaChevronDown, FaTwitter, FaLinkedin } from 'react-icons/fa'
import UserFooter from '../../components/UserFooter'
import App from './../../App';
import img1 from '../../assets/img1.jpeg';
import img2 from '../../assets/img2.jpeg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import homeImage from '../assets/homeImage.jpeg';
import HomeImage from '../assets/homeImage.png'
import user2 from '../assets/user2.jpeg';
import user3 from '../assets/user3.webp';
import user1 from '../assets/user1.jpeg';
import { Monitor, User, GraduationCap, BadgeCheck } from "lucide-react";
import CountUp from "react-countup";
import { useState } from "react";

function HomePage() {
    return (
        <>

            {/* Header Section */}
            <section className="container mx-auto pt-36 pb-16 py-16 bg-gradient-to-b from-blue-500 to-gray-50 animate-fade-in">
                <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4">

                    <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-start -ml-6 md:-ml-14 mt-6 md:mt-14">
                        <img
                            src={HomeImage}
                            alt="Group of students learning"
                            className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[400px] transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    <div className="w-full md:w-1/2 text-center md:text-left md:ml-14">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 tracking-tight">
                            <span className="inline-block animate-text-reveal[animation-delay:0ms]">Welcom</span>{' '}
                            <span className="inline-block animate-text-reveal [animation-delay:200ms]">to</span>{' '}
                            <span className="inline-block animate-text-reveal [animation-delay:400ms]">Your</span>{' '}
                            <span className="inline-block animate-text-reveal [animation-delay:600ms]">Learning</span>{' '}
                            <span className="inline-block animate-text-reveal[animation-delay:800ms]">Journey</span>
                        </h2>
                        <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-lg">
                            Access a wide range of courses, track your progress, and earn certifications.
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <Link
                                to="/register"
                                className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                            >
                                Get Started
                            </Link>
                            <Link
                                to="/courses"
                                className="bg-white text-blue-500 font-semibold py-3 px-8 rounded-lg shadow-lg border border-blue-500 hover:bg-blue-50 transition duration-300 transform hover:scale-105"
                            >
                                Explore Courses
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto py-16">
                <h3 className="text-3xl font-semibold text-center mb-12 text-gray-800">Why Choose Us?</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        {
                            icon: <FaBook className="text-4xl text-gray-800 mx-auto mb-4" />,
                            title: "Online & Offline Learning",
                            desc: "Learn anytime, anywhere with flexible access to courses.",
                        },
                        {
                            icon: <FaVideo className="text-4xl text-gray-800 mx-auto mb-4" />,
                            title: "Live & Recorded Classes",
                            desc: "Join live sessions or watch recorded lectures at your convenience.",
                        },
                        {
                            icon: <FaChartLine className="text-4xl text-gray-800 mx-auto mb-4" />,
                            title: "Progress Tracking",
                            desc: "Monitor your learning progress with detailed dashboards.",
                        },
                        {
                            icon: <FaCertificate className="text-4xl text-gray-800 mx-auto mb-4" />,
                            title: "Earn Certifications",
                            desc: "Get certified upon course completion with verifiable certificates.",
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-200 text-center transform transition-all duration-300 hover:scale-105"
                        >
                            {feature.icon}
                            <h4 className="text-xl font-medium mb-2 text-gray-700">{feature.title}</h4>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto py-16 bg-white">
                <h3 className="text-3xl font-semibold text-center mb-12 text-gray-800">Explore Popular Courses</h3>
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
                            className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                        >
                            <div className="relative">
                                <img
                                    src={course.img}
                                    alt={course.title}
                                    className="w-full h-48 object-cover transform hover:scale-105 transition duration-300"
                                />
                                <span className="absolute top-4 left-4 bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                                    {course.category}
                                </span>
                            </div>
                            <div className="p-6">
                                <h4 className="text-xl font-medium mb-2 text-gray-700">{course.title}</h4>
                                <p className="text-gray-600 mb-4">{course.desc}</p>
                                <Link
                                    to="/courses"
                                    className="text-blue-500 font-semibold hover:underline"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link
                        to="/courses"
                        className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                    >
                        View All Courses
                    </Link>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="container mx-auto py-16 text-center">
                <h2 className="text-3xl font-bold mb-12 text-gray-800">Our Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: <Monitor className="text-yellow-500 w-10 h-10" />,
                            value: 1000,
                            suffix: "K",
                            label: "Online Courses",
                            bg: "bg-yellow-100",
                        },
                        {
                            icon: <User className="text-blue-900 w-10 h-10" />,
                            value: 200,
                            suffix: "+",
                            label: "Expert Tutors",
                            bg: "bg-gray-200",
                        },
                        {
                            icon: <GraduationCap className="text-purple-600 w-10 h-10" />,
                            value: 5000,
                            suffix: "K+",
                            label: "Online Students",
                            bg: "bg-purple-100",
                        },
                        {
                            icon: <BadgeCheck className="text-cyan-600 w-10 h-10" />,
                            value: 1000,
                            suffix: "K+",
                            label: "Certified Courses",
                            bg: "bg-cyan-100",
                        },
                    ].map((stat, index) => {
                        const [startCount, setStartCount] = useState(false);
                        return (
                            <div
                                key={index}
                                onMouseEnter={() => setStartCount(true)}
                                onMouseLeave={() => setStartCount(false)}
                                className={`${stat.bg} flex items-center gap-4 p-6 rounded-lg shadow-sm`}
                            >
                                {stat.icon}
                                <div className="text-left">
                                    <h4 className="text-2xl font-bold text-black">
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


            {/* Enhanced Testimonials Section */}
            <section className="container mx-auto py-16 bg-gradient-to-r from-blue-50 to-gray-100 mt-24">
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
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-80 flex-shrink-0 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
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
                                <p className="text-gray-500">{testimonial.role}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-6 gap-2">
                        {[...Array(4)].map((_, i) => (
                            <span
                                key={i}
                                className="w-3 h-3 bg-blue-500 rounded-full opacity-50 hover:opacity-100 cursor-pointer transition"
                            ></span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Instructors Section */}
            <section className="container mx-auto py-16">
                <h3 className="text-3xl font-semibold text-center mb-12 text-gray-800">Meet Our Expert Instructors</h3>
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
                            className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
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
                                <p className="text-gray-500">{instructor.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section (Collapsible) */}
            <section className="container mx-auto py-16 bg-blue-200 mb-12">
                <h3 className="text-3xl font-semibold text-center mb-12 text-gray-800">Frequently Asked Questions</h3>
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
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md"
                        >
                            <details className="group">
                                <summary className="flex items-center justify-between cursor-pointer">
                                    <h4 className="text-lg font-medium text-gray-700 flex items-center">
                                        <FaQuestionCircle className="text-gray-800 mr-2" />
                                        {faq.question}
                                    </h4>
                                    <FaChevronDown className="text-gray-600 group-open:rotate-180 transition-transform" />
                                </summary>
                                <p className="text-gray-800 mt-4">{faq.answer}</p>
                            </details>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter Subscription Section */}
            <section className="container mx-auto py-16 bg-gradient-to-r from-blue-200 to-purple-100 text-white text-center relative overflow-hidden animate-fade-in transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] border-4 border-gradient-to-r from-blue-400 to-purple-500 box-border mb-12">
                <div className="absolute inset-0 bg-opacity-20 bg-[url('https://via.placeholder.com/1200x400?text=Newsletter+Pattern')] opacity-30"></div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-semibold mb-4 tracking-tight">Stay Updated with Our Newsletter</h3>
                    <p className="text-lg mb-8 max-w-xl mx-auto">Subscribe to receive the latest course updates, tips, and exclusive offers.</p>
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
                            <div className="p-3">
                                <FaEnvelope className="text-blue-600 text-xl" />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 p-3 text-gray-700 focus:outline-none placeholder-gray-400 placeholder-opacity-75 transition-all duration-300"
                            />
                            <button className="bg-blue-500 text-white font-semibold py-3 px-6 hover:bg-blue-600 transition duration-300 transform hover:scale-105">
                                Subscribe
                            </button>
                        </div>
                        <p className="text-sm mt-4 opacity-80">We respect your privacy and won’t share your information.</p>
                    </div>
                </div>
            </section>

            {/* Mini Contact Form Section */}
            <section className="container mx-auto py-16 bg-gray-300 relative overflow-hidden animate-fade-in w-full">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-10 bg-repeat"></div>
                <h3 className="text-4xl font-extrabold text-center mb-12 text-gray-800 tracking-tight text-shadow-sm">Get in Touch</h3>
                <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-xl border-2 border-gradient-to-r from-blue-300 to-indigo-400 bg-gradient-to-br from-blue-50 to-gray-100 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
                    <div className="flex items-center justify-center mb-8">
                        <FaEnvelope className="text-blue-600 text-4xl mr-3 transform hover:scale-110 transition duration-300" />
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
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400/50 bg-white/80 text-gray-700 placeholder-gray-400 placeholder-opacity-75 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/20"
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
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400/50 bg-white/80 text-gray-700 placeholder-gray-400 placeholder-opacity-75 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/20"
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
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400/50 bg-white/80 text-gray-700 placeholder-gray-400 placeholder-opacity-75 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/20"
                            ></textarea>
                        </div>
                        <button className="w-full bg-gradient-to-r from-gray-500 to-indigo-600 text-white font-semibold py-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 transform hover:scale-105 flex items-center justify-center relative overflow-hidden">
                            <span className="relative z-10">Send Message</span>
                            <FaEnvelope className="ml-2 relative z-10" />
                            <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                        </button>
                        <p className="text-sm text-gray-500 text-center mt-4 opacity-80">We’ll get back to you within 24 hours.</p>
                    </div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="container mx-auto py-16 bg-white text-center">
                <h3 className="text-3xl font-semibold mb-12 text-gray-800">Quick Links</h3>
                <p className='text-lg mb-6 max-w-xl mx-auto'>Access key resources and pages to enhance your learning experience.</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { title: "Browse Courses", path: "/courses" },
                        { title: "About Us", path: "/about" },
                        { title: "Support", path: "/support" },
                        { title: "Blog", path: "/blog" },
                    ].map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            className="bg-gradient-to-r from-gray-500 to-blue-700 text-white p-6 rounded-xl shadow-sm hover:shadow-md font-semibold transition-all duration-300 transform hover:scale-105"
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="bg-gray-600 text-white py-16 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://via.placeholder.com/1200x400?text=CTA+Pattern')] opacity-20 parallax"></div>
                <div className="container mx-auto relative z-10">
                    <h3 className="text-3xl font-semibold mb-4 tracking-tight">Ready to Start Learning?</h3>
                    <p className="text-lg mb-8 max-w-xl mx-auto">Join thousands of learners and explore courses tailored for you.</p>
                    <Link
                        to="/register"
                        className="bg-white text-blue-500 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300 transform hover:scale-105"
                    >
                        Sign Up Now
                    </Link>
                </div>
            </section>
        </>
    )
}

export default HomePage