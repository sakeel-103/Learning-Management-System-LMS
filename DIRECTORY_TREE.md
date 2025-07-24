# Learning Management System - Directory Tree

```
Learning-Management-System-LMS/
├── .env                              # Environment variables
├── .gitignore                        # Git ignore rules
├── .vscode/                          # VS Code configuration
├── PROJECT_STRUCTURE.md              # This detailed structure documentation  
├── README.md                         # Project documentation
├── package.json                      # Root dependencies
├── package-lock.json                # Root dependency lock
│
├── client/                           # Frontend Application (React.js + Vite)
│   ├── .env.example                 # Environment template
│   ├── .gitignore                   # Client git ignore
│   ├── README.md                    # Client docs
│   ├── package.json                 # Frontend dependencies
│   ├── package-lock.json            # Frontend dependency lock
│   ├── vite.config.js               # Vite build configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   ├── eslint.config.js             # ESLint linting rules
│   ├── index.html                   # Main HTML template
│   ├── public/                      # Static assets
│   │   └── vite.svg
│   └── src/                         # Source code
│       ├── main.jsx                 # Application entry point
│       ├── App.jsx                  # Main App component
│       ├── App.css                  # Global styles
│       ├── index.css                # Base styles
│       ├── api.js                   # API configuration
│       │
│       ├── Admin/                   # Admin role components
│       │   └── components/
│       │       ├── AdminDashboard.jsx
│       │       └── InstructorAccess.jsx
│       │
│       ├── Instructors/             # Instructor role components
│       │   └── components/
│       │       └── InstructorDashboard.jsx
│       │
│       ├── Students/                # Student role components & content
│       │   ├── AI&ML/               # AI & Machine Learning courses
│       │   │   ├── ArtificialIntelligence.jsx
│       │   │   ├── ComputerVission.jsx
│       │   │   ├── DataAnalysis.jsx
│       │   │   ├── DataScience.jsx
│       │   │   ├── DataVisualization.jsx
│       │   │   ├── DeepLearning.jsx
│       │   │   ├── MachineLearning.jsx
│       │   │   └── NaturalLanguage.jsx
│       │   │
│       │   ├── AssessmentCourses/   # Assessment & Quiz components
│       │   │   ├── ArtificialMachineQuestions.jsx
│       │   │   ├── AssignmentView.jsx
│       │   │   ├── DSAQuestionsPage.jsx
│       │   │   ├── DynamicQuizPage.jsx
│       │   │   ├── HTMLQuationsPage.jsx
│       │   │   ├── HandleCertificate.jsx
│       │   │   ├── JavaQuestionsPage.jsx
│       │   │   ├── PythonQuestionsPage.jsx
│       │   │   └── WebQuestionsPage.jsx
│       │   │
│       │   ├── CorseDetails/        # Course detail pages
│       │   │   ├── AssesmentPage.jsx
│       │   │   ├── BackendWithJava.jsx
│       │   │   ├── CertificateTemplate.jsx
│       │   │   ├── DataStructureAlgorithm.jsx
│       │   │   ├── MLAndDS.jsx
│       │   │   ├── QuizResultPage.jsx
│       │   │   └── dsaPage.jsx
│       │   │
│       │   ├── DevelopmentAndDS/    # Development & Data Science courses
│       │   │   ├── BackendPage.jsx
│       │   │   ├── CSSPage.jsx
│       │   │   ├── DjangoPage.jsx
│       │   │   ├── FrontendPage.jsx
│       │   │   ├── HTMLPage.jsx
│       │   │   ├── JavaScriptPage.jsx
│       │   │   ├── NodeJsPage.jsx
│       │   │   └── ReactPage.jsx
│       │   │
│       │   ├── assets/              # Student-specific assets
│       │   ├── components/          # Student-specific components
│       │   │   ├── CertificationPage.jsx
│       │   │   ├── ContanUsPage.jsx
│       │   │   ├── HomePage.jsx
│       │   │   ├── StudentDashboard.jsx
│       │   │   ├── StudentNavbar.jsx
│       │   │   └── VideoCarousel.jsx
│       │   │
│       │   ├── images/              # Student-specific images
│       │   └── pages/               # Student main pages
│       │       ├── CourseDetails.jsx
│       │       ├── CourseFrontPage.jsx
│       │       ├── CoursePage.jsx
│       │       ├── InstructorViewPage.jsx
│       │       ├── PaymentPage.jsx
│       │       └── StudentDashboad.jsx
│       │
│       ├── components/              # Shared components (cross-role)
│       │   ├── NotificationBell.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── ScrollToTop.jsx
│       │   ├── UserFooter.jsx
│       │   └── UserNavbar.jsx
│       │
│       ├── pages/                   # Shared pages (authentication, etc.)
│       │   ├── ForgotPassword.jsx
│       │   ├── Login.jsx
│       │   ├── PrivacyPolicy.jsx
│       │   ├── Register.jsx
│       │   ├── ResetPassword.jsx
│       │   ├── TermsOfService.jsx
│       │   └── VerifyEmail.jsx
│       │
│       ├── services/                # API services & business logic
│       │   ├── authService.js
│       │   └── notificationService.js
│       │
│       ├── stores/                  # State management (Zustand)
│       │   └── authStore.js
│       │
│       └── assets/                  # Global assets (images, icons)
│           ├── img1.jpeg
│           ├── img2.jpeg
│           ├── img3.jpg
│           └── img4.jpg
│
└── server/                          # Backend Application (Django REST API)
    ├── manage.py                    # Django management script
    ├── requirements.txt             # Python dependencies
    ├── .gitignore                   # Server git ignore
    ├── vercel.json                  # Vercel deployment config
    ├── vercel_wsgi.py              # Vercel WSGI setup
    ├── assignments/                 # Assignment file storage
    ├── course_materials/            # Course content storage
    │   └── videos/                  # Video content
    │
    ├── server/                      # Django project configuration
    │   ├── __init__.py
    │   ├── settings.py              # Django settings
    │   ├── urls.py                  # Main URL configuration
    │   ├── wsgi.py                  # WSGI configuration
    │   ├── asgi.py                  # ASGI configuration
    │   └── test_email.py            # Email testing utility
    │
    └── Django Apps/                 # Individual Django applications
        ├── accounts/                # User authentication & profiles
        │   ├── models.py            # User models
        │   ├── views.py             # Authentication views
        │   ├── serializers.py      # API serializers
        │   ├── urls.py              # URL patterns
        │   └── migrations/          # Database migrations
        │
        ├── assessment/              # Assessments & quizzes
        │   ├── models.py            # Quiz/Assessment models
        │   ├── views.py             # Assessment views
        │   ├── serializers.py      # API serializers
        │   └── migrations/
        │
        ├── certification/           # Certificate generation & management
        │   ├── models.py            # Certificate models
        │   ├── views.py             # Certificate views
        │   └── migrations/
        │
        ├── contact_form/            # Contact form handling
        │   ├── models.py            # Contact form models
        │   ├── views.py             # Contact form views
        │   └── migrations/
        │
        ├── course_class/            # Course & class management
        │   ├── models.py            # Course models
        │   ├── views.py             # Course management views
        │   ├── serializers.py      # Course API serializers
        │   └── migrations/
        │
        ├── dashboard/               # Dashboard functionality
        │   ├── models.py            # Dashboard models
        │   ├── views.py             # Dashboard views
        │   └── migrations/
        │
        ├── notifications/           # Notification system
        │   ├── models.py            # Notification models
        │   ├── views.py             # Notification views
        │   ├── signals.py           # Django signals
        │   ├── tasks.py             # Background tasks
        │   └── migrations/
        │
        ├── progress/                # User progress tracking
        │   ├── models.py            # Progress models
        │   ├── views.py             # Progress tracking views
        │   └── migrations/
        │
        └── subscription/            # Subscription & payment management
            ├── models.py            # Subscription models
            ├── views.py             # Payment/subscription views
            └── migrations/
```

## Quick Summary

- **Total Files**: ~243 files
- **Frontend**: React.js with role-based architecture (Admin, Instructors, Students)
- **Backend**: Django REST API with 8 specialized apps
- **Deployment**: Vercel-ready configuration
- **Database**: PostgreSQL with comprehensive migrations
- **Authentication**: JWT-based with role management
- **File Storage**: Organized assignment and course material storage