# Learning Management System (LMS)

## Overview
This project is a comprehensive Learning Management System (LMS) designed to provide a centralized platform for delivering courses, assessments, certifications, and progress tracking. The system supports three distinct user roles—**Admin**, **Instructor**, and **Student**—each with specific responsibilities to manage educational content, classes, evaluations, and certifications.

## 🏗️ Project Architecture
The project follows a **full-stack architecture** with clear separation between:
- **Frontend**: React.js application with Vite build tool
- **Backend**: Django REST API with modular app structure
- **Database**: PostgreSQL with comprehensive data modeling
- **Deployment**: Vercel-ready configuration

## 📁 Project Structure Documentation

For detailed project structure information, please refer to:

- **📋 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Comprehensive documentation with tech stack, architecture overview, and detailed explanations
- **🌲 [DIRECTORY_TREE.md](./DIRECTORY_TREE.md)** - Visual directory tree with file organization and quick summary

## 🚀 Key Features

### Admin Role
- User management (Students, Instructors)
- Course management and approval
- System monitoring and analytics
- Certification management

### Instructor Role
- Course creation and management
- Student progress monitoring
- Assessment creation and grading
- Assignment management

### Student Role
- Course enrollment and learning
- Assignment submission
- Progress tracking and certificates
- Multiple learning tracks:
  - 🤖 AI & Machine Learning
  - 💻 Development & Data Science
  - 📊 Data Analysis & Visualization

## 🛠️ Technology Stack

### Frontend
- **React.js 19.1.0** with Vite
- **Tailwind CSS** + Material-UI
- **Zustand** for state management
- **React Router** for navigation
- **Axios** + TanStack Query for API calls

### Backend
- **Django** + Django REST Framework
- **PostgreSQL** database
- **JWT Authentication**
- **Django CORS Headers**

## 🏃‍♂️ Quick Start

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

## 📦 Project Structure Overview

```
Learning-Management-System-LMS/
├── client/                 # React.js Frontend
│   ├── src/
│   │   ├── Admin/         # Admin role components
│   │   ├── Instructors/   # Instructor role components  
│   │   ├── Students/      # Student role components & courses
│   │   ├── components/    # Shared components
│   │   ├── pages/         # Authentication & shared pages
│   │   ├── services/      # API services
│   │   └── stores/        # State management
│   └── ...
│
└── server/                # Django REST API Backend
    ├── accounts/          # User authentication
    ├── assessment/        # Quizzes & assessments
    ├── certification/     # Certificate management
    ├── course_class/      # Course management
    ├── notifications/     # Notification system
    ├── progress/          # Progress tracking
    ├── subscription/      # Payment & subscriptions
    └── ...
```

## 📚 Learning Tracks Available

### AI & Machine Learning Track
- Artificial Intelligence
- Machine Learning
- Deep Learning
- Computer Vision
- Natural Language Processing
- Data Science & Analysis

### Development Track
- Frontend Development (HTML, CSS, JavaScript, React)
- Backend Development (Node.js, Django, Java)
- Full-Stack Development
- Data Structures & Algorithms

## 🎓 Assessment & Certification
- Interactive quizzes and assessments
- Assignment submission and grading
- Progress tracking and analytics
- Digital certificate generation
- QR code verification for certificates

## 🚀 Deployment
The application is configured for **Vercel deployment** with:
- Frontend: Vite build optimization
- Backend: Django with Vercel WSGI configuration
- Database: PostgreSQL production setup

---

For more detailed information about the project structure, architecture, and implementation details, please refer to the comprehensive documentation files included in this repository.