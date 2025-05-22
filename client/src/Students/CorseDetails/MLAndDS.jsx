import React from 'react';
import { FaVideo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const MLAndDS = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-900 to-teal-800 text-white py-16 px-6 pt-36">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Complete Machine Learning & Data Science Program</h1>
                    <p className="text-lg md:text-xl mb-6">Gain hands-on experience in machine learning and data science to build industry-ready skills in just 4 months!</p>
                </div>
            </section>

            {/* Syllabus Section */}
            <section className="py-16 px-6 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-8">Detailed Syllabus</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg hover:scale-105">
                            <h3 className="text-xl font-semibold text-teal-800 mb-4">Core Data Science Concepts</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Introduction to Data Science and Machine Learning</li>
                                <li>Data Preprocessing and Cleaning</li>
                                <li>Exploratory Data Analysis (EDA)</li>
                                <li>Statistical Foundations for Data Science</li>
                                <li>Data Visualization Techniques</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg hover:scale-105">
                            <h3 className="text-xl font-semibold text-teal-800 mb-4">Machine Learning & Algorithms</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Supervised Learning (Regression, Classification)</li>
                                <li>Unsupervised Learning (Clustering, Dimensionality Reduction)</li>
                                <li>Ensemble Methods and Boosting</li>
                                <li>Neural Networks and Deep Learning Basics</li>
                                <li>Model Evaluation and Hyperparameter Tuning</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg hover:scale-105">
                            <h3 className="text-xl font-semibold text-teal-800 mb-4">Advanced Topics</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Natural Language Processing (NLP)</li>
                                <li>Computer Vision with CNNs</li>
                                <li>Time Series Analysis and Forecasting</li>
                                <li>Reinforcement Learning Basics</li>
                                <li>Big Data with Spark and Hadoop</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg hover:scale-105">
                            <h3 className="text-xl font-semibold text-teal-800 mb-4">Projects & Capstone</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Real-world Data Science Projects</li>
                                <li>End-to-End ML Pipeline Development</li>
                                <li>Capstone Project with Industry Mentorship</li>
                                <li>Portfolio Building for Job Applications</li>
                                <li>Interview Preparation and Case Studies</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technologies Section */}
            <section className="py-16 px-6 bg-gray-400">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-8">Technologies You'll Master</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'Python', icon: '🐍', url: 'https://docs.python.org/3/' },
                            { name: 'Pandas & NumPy', icon: '📊', url: 'https://pandas.pydata.org/docs/' },
                            { name: 'Scikit-learn', icon: '🤖', url: 'https://scikit-learn.org/stable/documentation.html' },
                            { name: 'TensorFlow', icon: '🧠', url: 'https://www.tensorflow.org/api_docs' },
                            { name: 'SQL', icon: '🗄️', url: 'https://dev.mysql.com/doc/refman/8.0/en/' },
                            { name: 'Matplotlib & Seaborn', icon: '📈', url: 'https://matplotlib.org/stable/contents.html' },
                            { name: 'PyTorch', icon: '🔥', url: 'https://pytorch.org/docs/stable/' },
                            { name: 'Jupyter', icon: '📓', url: 'https://docs.jupyter.org/en/latest/' },
                        ].map((tech, index) => (
                            <a
                                key={index}
                                href={tech.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div className="bg-teal-50 p-4 rounded-lg shadow-md hover:bg-teal-100 transition hover:scale-105">
                                    <span className="text-4xl">{tech.icon}</span>
                                    <p className="mt-2 text-gray-700 font-semibold">{tech.name}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Details Section */}
            <section className="py-16 px-6 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-8">Understanding Key Technologies</h2>
                    <div className="space-y-8">
                        {[
                            {
                                name: 'Python',
                                definition: 'Python is a high-level, interpreted programming language renowned for its clear syntax, readability, and versatility. Its extensive ecosystem of libraries and frameworks makes it the preferred choice for data science, machine learning, web development, and automation.',
                                types: 'General-purpose language supporting multiple paradigms (e.g., object-oriented, functional). Key applications include scientific computing, web development (Django, Flask), automation (scripting), and data analysis.',
                                howItWorks: 'In this program, Python serves as the backbone for data manipulation, statistical analysis, and machine learning model development. You’ll leverage libraries like Pandas for data handling, NumPy for numerical computations, and Scikit-learn for ML algorithms. Python’s simplicity allows rapid prototyping, while its community-driven libraries support advanced tasks like deep learning and visualization.',
                                SeeMore: 'https://docs.python.org/3/',
                            },
                            {
                                name: 'Pandas & NumPy',
                                definition: 'Pandas is a powerful Python library for data manipulation and analysis, offering DataFrame structures for handling tabular data. NumPy provides efficient support for large, multi-dimensional arrays and mathematical operations, forming the foundation for numerical computing in Python.',
                                types: 'Pandas: DataFrames and Series for structured data manipulation; NumPy: N-dimensional arrays for numerical computations. Applications include data cleaning, transformation, statistical analysis, and matrix operations.',
                                howItWorks: 'Pandas simplifies data preprocessing tasks like handling missing values, merging datasets, and grouping data, making it ideal for exploratory data analysis (EDA). NumPy enables fast array operations, such as matrix multiplication and linear algebra, critical for machine learning algorithms. In the program, you’ll use Pandas to clean and explore datasets and NumPy for efficient computations in ML pipelines.',
                                SeeMore: 'https://pandas.pydata.org/docs/',
                            },
                            {
                                name: 'Scikit-learn',
                                definition: 'Scikit-learn is a robust Python library for machine learning, providing a unified interface for a wide range of algorithms, including classification, regression, clustering, and dimensionality reduction, along with tools for model evaluation and selection.',
                                types: 'Supports supervised learning (e.g., Linear Regression, SVMs), unsupervised learning (e.g., K-Means, PCA), and preprocessing utilities. Applications include predictive modeling, customer segmentation, and anomaly detection.',
                                howItWorks: 'In the program, Scikit-learn is used to build, train, and evaluate machine learning models with its intuitive API. You’ll implement algorithms like Decision Trees for classification or K-Means for clustering, and use tools like cross-validation and grid search to optimize model performance. Its integration with Pandas and NumPy ensures seamless data handling.',
                                SeeMore: 'https://scikit-learn.org/stable/documentation.html',
                            },
                            {
                                name: 'TensorFlow',
                                definition: 'TensorFlow is an open-source machine learning framework developed by Google, designed for building and deploying complex models, particularly deep learning neural networks, with support for scalable computation across CPUs, GPUs, and TPUs.',
                                types: 'Supports deep learning (e.g., Convolutional Neural Networks, Recurrent Neural Networks) and traditional ML. Applications include image recognition, natural language processing, and time series forecasting.',
                                howItWorks: 'You’ll use TensorFlow to construct neural networks for tasks like image classification (e.g., CNNs for computer vision) and text processing (e.g., RNNs for NLP). Its Keras API simplifies model building, while tools like TensorBoard aid in visualization and debugging. In the program, TensorFlow enables scalable training and deployment of deep learning models.',
                                SeeMore: 'https://www.tensorflow.org/api_docs',
                            },
                            {
                                name: 'SQL',
                                definition: 'SQL (Structured Query Language) is a standardized language for managing and querying relational databases, enabling users to retrieve, manipulate, and organize structured data efficiently.',
                                types: 'Includes commands like SELECT (querying), INSERT/UPDATE/DELETE (data manipulation), and CREATE/ALTER (schema management). Used in databases like MySQL, PostgreSQL, and SQLite.',
                                howItWorks: 'In the program, you’ll write SQL queries to extract and preprocess data from relational databases, such as filtering customer records or aggregating sales data. SQL is critical for integrating structured data into ML pipelines, enabling efficient data retrieval for analysis and model training.',
                                SeeMore: 'https://dev.mysql.com/doc/refman/8.0/en/',
                            },
                            {
                                name: 'Matplotlib & Seaborn',
                                definition: 'Matplotlib is a versatile Python library for creating a wide range of visualizations, from static plots to interactive graphs. Seaborn, built on Matplotlib, specializes in statistical visualizations with enhanced aesthetics and simplified syntax.',
                                types: 'Matplotlib: Line plots, scatter plots, histograms, 3D visualizations; Seaborn: Heatmaps, pair plots, violin plots. Applications include EDA, reporting, and presentation of insights.',
                                howItWorks: 'You’ll use Matplotlib to create customizable plots like histograms and scatter plots for data exploration, while Seaborn simplifies complex statistical visualizations like correlation matrices. In the program, these tools help visualize data trends and model results, making insights accessible to stakeholders.',
                                SeeMore: 'https://matplotlib.org/stable/contents.html',
                            },
                            {
                                name: 'PyTorch',
                                definition: 'PyTorch is an open-source machine learning framework, favored for its dynamic computation graphs and flexibility, making it ideal for deep learning research and rapid prototyping.',
                                types: 'Primarily used for neural networks (e.g., CNNs, transformers) in applications like computer vision, NLP, and reinforcement learning.',
                                howItWorks: 'In the program, PyTorch is used to build and train deep learning models for tasks like image recognition and text generation. Its dynamic graphs allow easy experimentation, and integration with libraries like torchvision supports advanced applications. You’ll leverage PyTorch for cutting-edge ML projects.',
                                SeeMore: 'https://pytorch.org/docs/stable/',
                            },
                            {
                                name: 'Jupyter',
                                definition: 'Jupyter Notebook is an open-source, web-based environment for creating interactive documents that combine live code, visualizations, and narrative text, widely used for data analysis and ML prototyping.',
                                types: 'Supports Python and other languages via kernels (e.g., R, Julia). Applications include data exploration, model development, and educational tutorials.',
                                howItWorks: 'You’ll use Jupyter Notebooks to write, test, and visualize code interactively, combining Python scripts with Matplotlib plots and markdown explanations. In the program, Jupyter streamlines prototyping ML models and documenting workflows for collaboration and presentation.',
                                SeeMore: 'https://docs.jupyter.org/en/latest/',
                            },
                        ].map((tech, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg hover:scale-105">
                                <h3 className="text-xl font-semibold text-teal-800 mb-2">{tech.name}</h3>
                                <p className="text-gray-700 mb-2"><strong>What is it?</strong> {tech.definition}</p>
                                <p className="text-gray-700 mb-2"><strong>Types/Applications:</strong> {tech.types}</p>
                                <p className="text-gray-700 mb-4"><strong>How it Works:</strong> {tech.howItWorks}</p>
                                <a
                                    href={tech.SeeMore}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                                >
                                    See More
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Schedule Section */}
            <section className="py-16 px-6 bg-gray-200">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-8">Program Schedule</h2>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-teal-800 mb-4">3-Month Intensive Program</h3>
                            <p className="text-gray-700 mb-4">Duration: 12 weeks, starting every quarter</p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Week 1-4: Foundations of Data Science and Python</li>
                                <li>Week 5-8: Machine Learning and Deep Learning</li>
                                <li>Week 9-10: Advanced Topics and Specializations</li>
                                <li>Week 11-12: Capstone Project and Career Prep</li>
                            </ul>
                            <p className="mt-4 text-gray-700">Live Classes: 3 sessions/week (2 hours each)</p>
                            <p className="text-gray-700">Office Hours: Weekly with instructors and TAs</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section - Banner Style */}
            <section className="py-16 px-6 bg-gradient-to-r from-green-400 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2 space-y-8">
                            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                                Featured Program
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Master Machine Learning with <span className="text-green-600">Industry Experts</span>
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">Hands-on Projects</h3>
                                        <p className="text-gray-600">Work with real datasets and build portfolio-worthy projects</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">Career Support</h3>
                                        <p className="text-gray-600">Resume reviews, interview prep, and job placement assistance</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">Flexible Learning</h3>
                                        <p className="text-gray-600">Learn at your own pace with 24/7 access to materials</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-300"
                                    onClick={() => navigate('/register')}
                                >
                                    Enroll Now
                                </button>
                            </div>
                        </div>

                        {/* Right side - Video */}
                        <div className="lg:w-1/2 w-full">
                            <div className="relative rounded-xl overflow-hidden shadow-xl border-4 border-white transform hover:scale-[1.02] transition duration-300">
                                <div
                                    className="relative cursor-pointer bg-gray-900 aspect-w-16 aspect-h-9"
                                    onClick={() => {
                                        const iframe = document.getElementById('course-video');
                                        iframe.src = "https://www.youtube.com/embed/qYNweeDHiyU?autoplay=1";
                                        iframe.style.display = 'block';
                                        document.querySelector('.video-thumbnail').style.display = 'none';
                                        document.querySelector('.play-button').style.display = 'none';
                                    }}
                                >
                                    <img
                                        src="https://img.youtube.com/vi/qYNweeDHiyU/maxresdefault.jpg"
                                        alt="Course thumbnail"
                                        className="w-full h-80 lg:h-96 object-cover opacity-70 video-thumbnail"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center play-button">
                                        <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition">
                                            <svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Hidden iframe that appears on click */}
                                <iframe
                                    id="course-video"
                                    className="w-full h-80 lg:h-96 hidden"
                                    src=""
                                    title="Machine Learning & Data Science Program Overview"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <p className="mt-4 text-center text-gray-500 italic">
                                "This program transformed my career in just 6 months" - Abhishek Thakur, Data Scientist
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Details Section */}
            <section className="py-16 px-6 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-8">Why Choose Our Program?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg hover:scale-105">
                            <h3 className="text-xl font-semibold text-teal-800 mb-4">Industry-Relevant Curriculum</h3>
                            <p className="text-gray-700">Designed by industry experts to align with current job market demands.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg hover:scale-105">
                            <h3 className="text-xl font-semibold text-teal-800 mb-4">Hands-On Projects</h3>
                            <p className="text-gray-700">Build a portfolio with real-world projects to showcase your skills.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg hover:scale-105">
                            <h3 className="text-xl font-semibold text-teal-800 mb-4">Career Support</h3>
                            <p className="text-gray-700">Resume reviews, mock interviews, and job placement assistance.</p>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <button
                            className="bg-yellow-500 text-green-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
                            onClick={() => navigate('/login')}
                        >
                            Enroll Now
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ Section - Professional */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our program</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "Who is this program designed for?",
                                a: "This program is ideal for both beginners looking to start a career in data science and professionals seeking to transition into machine learning roles. It's also valuable for software engineers wanting to add ML skills to their toolkit."
                            },
                            {
                                q: "What technical prerequisites are required?",
                                a: "You should have basic programming knowledge (Python preferred), familiarity with high school mathematics (especially linear algebra and statistics), and comfort working with data. No prior machine learning experience is required."
                            },
                            {
                                q: "What is the program format and schedule?",
                                a: "The program combines live online sessions (2-3 evenings per week) with self-paced learning. Live sessions are recorded for later viewing. Expect 10-15 hours of commitment per week including lectures, labs, and projects."
                            },
                            {
                                q: "What certification will I receive?",
                                a: "Upon successful completion, you'll receive a verifiable digital certificate that can be shared on LinkedIn. The certificate includes details of the curriculum and skills acquired."
                            },
                            {
                                q: "What kind of projects will I work on?",
                                a: "You'll complete 5-6 real-world projects including predictive modeling, natural language processing, and computer vision applications. Projects are designed to build a strong portfolio for job applications."
                            },
                            {
                                q: "Is there career support after completion?",
                                a: "Yes, we offer comprehensive career services including resume reviews, interview preparation, portfolio guidance, and access to our employer network. Our career coaches provide 1:1 support for 6 months post-graduation."
                            },
                            {
                                q: "What if I fall behind during the program?",
                                a: "We provide extended access to materials, office hours with instructors, and a supportive community to help you stay on track. You can also defer to a future cohort if needed."
                            },
                            {
                                q: "What payment options are available?",
                                a: "We offer flexible payment plans including monthly installments. Some candidates may qualify for income share agreements or employer sponsorship - contact our admissions team for details."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105">
                                <button
                                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                                    onClick={(e) => {
                                        const content = e.currentTarget.nextElementSibling;
                                        const icon = e.currentTarget.querySelector('svg');
                                        content.classList.toggle('hidden');
                                        icon.classList.toggle('rotate-180');
                                    }}
                                >
                                    <h3 className="text-lg md:text-xl font-semibold text-gray-800">{faq.q}</h3>
                                    <svg
                                        className="w-6 h-6 text-green-600 transition-transform duration-200"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="hidden px-6 pb-6">
                                    <div className="prose prose-green text-gray-600">
                                        <p>{faq.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-600 mb-6">Still have questions?</p>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg shadow-sm transition-colors duration-200">
                            Contact Our Admissions Team
                        </button>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            < section className="py-12 px-6 bg-green-900 text-white" >
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Start Your AI & ML Journey Today!</h2>
                    <p className="text-lg mb-6">Enroll now to master Ai & ML and become a top-tier developer.</p>
                    <button
                        className="bg-white text-green-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-200"
                        onClick={() => navigate('/login')}
                    >
                        Enroll Now
                    </button>
                </div>
            </section>
        </>
    );
};

export default MLAndDS;