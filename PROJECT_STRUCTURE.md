# Learning Management System (LMS) - Project Structure

## Overview
This Learning Management System is a full-stack application with a **React.js frontend** (client) and **Django REST API backend** (server). The system supports three user roles: **Admin**, **Instructor**, and **Student**, each with distinct functionalities and access levels.

## Technology Stack

### Frontend (Client)
- **Framework**: React.js 19.1.0 with Vite
- **Styling**: Tailwind CSS, Material-UI (MUI)
- **State Management**: Zustand
- **HTTP Client**: Axios, TanStack React Query
- **Routing**: React Router DOM
- **Icons**: Lucide React, React Icons, MUI Icons
- **Additional Libraries**: 
  - JWT Decode for authentication
  - React Toastify for notifications
  - jsPDF & html2canvas for PDF generation
  - QRCode libraries for QR generation
  - EmailJS for email functionality

### Backend (Server)
- **Framework**: Django with Django REST Framework
- **Database**: PostgreSQL (configured with psycopg2-binary)
- **Authentication**: Django REST Framework Simple JWT
- **Image Processing**: Pillow
- **Environment**: python-dotenv
- **CORS**: django-cors-headers

## Project Structure

```
Learning-Management-System-LMS/
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── .vscode/                      # VS Code configuration
├── README.md                     # Project documentation
├── package.json                  # Root dependencies
├── package-lock.json            # Root dependency lock
│
├── client/                       # Frontend Application (React.js)
│   ├── .env.example             # Environment variables template
│   ├── .gitignore               # Client-specific git ignore
│   ├── README.md                # Client documentation
│   ├── package.json             # Frontend dependencies
│   ├── package-lock.json        # Frontend dependency lock
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── postcss.config.js        # PostCSS configuration
│   ├── eslint.config.js         # ESLint configuration
│   ├── index.html               # Main HTML template
│   ├── public/                  # Static assets
│   └── src/                     # Source code
│       ├── main.jsx             # Application entry point
│       ├── App.jsx              # Main App component
│       ├── App.css              # Global styles
│       ├── index.css            # Base styles
│       ├── api.js               # API configuration
│       │
│       ├── Admin/               # Admin role components
│       │   └── components/      # Admin-specific components
│       │
│       ├── Instructors/         # Instructor role components
│       │   └── components/      # Instructor-specific components
│       │
│       ├── Students/            # Student role components
│       │   ├── AI&ML/           # AI & ML course materials
│       │   ├── AssessmentCourses/ # Assessment course materials
│       │   ├── CorseDetails/    # Course detail components
│       │   ├── DevelopmentAndDS/ # Development & Data Science materials
│       │   ├── assets/          # Student-specific assets
│       │   ├── components/      # Student-specific components
│       │   ├── images/          # Student-specific images
│       │   └── pages/           # Student-specific pages
│       │
│       ├── components/          # Shared components
│       │   ├── NotificationBell.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── ScrollToTop.jsx
│       │   ├── UserFooter.jsx
│       │   └── UserNavbar.jsx
│       │
│       ├── pages/               # Shared pages
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── ForgotPassword.jsx
│       │   ├── ResetPassword.jsx
│       │   ├── VerifyEmail.jsx
│       │   ├── PrivacyPolicy.jsx
│       │   └── TermsOfService.jsx
│       │
│       ├── services/            # API services
│       │   ├── authService.js
│       │   └── notificationService.js
│       │
│       ├── stores/              # State management (Zustand stores)
│       └── assets/              # Global assets (images, icons, etc.)
│
└── server/                      # Backend Application (Django)
    ├── manage.py                # Django management script
    ├── requirements.txt         # Python dependencies
    ├── .gitignore              # Server-specific git ignore
    ├── vercel.json             # Vercel deployment configuration
    ├── vercel_wsgi.py          # Vercel WSGI configuration
    ├── media/                  # User uploaded files
    ├── assignment_files/       # Assignment file storage
    │
    ├── server/                 # Django project configuration
    │   ├── __init__.py
    │   ├── settings.py         # Django settings
    │   ├── urls.py             # Main URL configuration
    │   ├── wsgi.py             # WSGI configuration
    │   ├── asgi.py             # ASGI configuration
    │   └── test_email.py       # Email testing utility
    │
    └── Django Apps/            # Individual Django applications
        ├── accounts/           # User authentication & profiles
        ├── assessment/         # Assessments & quizzes
        ├── assignments/        # Assignment management
        ├── certification/      # Certificate generation & management
        ├── contact_form/       # Contact form handling
        ├── course_class/       # Course & class management
        ├── course_materials/   # Course content & materials
        ├── dashboard/          # Dashboard functionality
        ├── notifications/      # Notification system
        ├── progress/           # User progress tracking
        └── subscription/       # Subscription & payment management
```

## Architecture Overview

### Frontend Architecture
The frontend follows a **role-based component architecture**:

1. **Role-Specific Directories**: Separate directories for Admin, Instructors, and Students
2. **Shared Components**: Common UI elements used across roles
3. **Shared Pages**: Authentication and general pages
4. **Services Layer**: API communication and business logic
5. **State Management**: Zustand stores for global state

### Backend Architecture
The backend follows **Django's app-based architecture**:

1. **Modular Apps**: Each functionality is separated into individual Django apps
2. **RESTful APIs**: Django REST Framework for API endpoints
3. **JWT Authentication**: Token-based authentication system
4. **Media Handling**: File upload and storage management
5. **Database Integration**: PostgreSQL with Django ORM

## Key Features by Role

### Admin
- User management (Students, Instructors)
- Course management and approval
- System monitoring and analytics
- Certification management

### Instructor
- Course creation and management
- Student progress monitoring
- Assessment creation
- Assignment grading

### Student
- Course enrollment and learning
- Assignment submission
- Progress tracking
- Certificate earning
- Multiple learning tracks (AI/ML, Development & Data Science)

## Development Setup

### Prerequisites
- Node.js (for frontend)
- Python 3.x (for backend)
- PostgreSQL database

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

### Backend Setup
```bash
cd server
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Deployment
- **Frontend**: Configured for Vite build
- **Backend**: Vercel-ready with vercel.json configuration
- **Database**: PostgreSQL production setup

## Environment Configuration
- Root `.env` for global settings
- `client/.env.example` for frontend environment template
- Server uses Django's environment variable system

This structure provides a scalable, maintainable, and role-based learning management system with clear separation of concerns between frontend and backend components.