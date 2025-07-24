# Learning Management System - Quick Structure Reference

## 📊 Project Statistics
- **Total Files**: ~243 files
- **Frontend Framework**: React.js 19.1.0 + Vite
- **Backend Framework**: Django + Django REST Framework  
- **Database**: PostgreSQL
- **Deployment**: Vercel-ready

## 🎯 User Roles
1. **Admin** - System management, user oversight, course approval
2. **Instructor** - Course creation, student monitoring, grading
3. **Student** - Learning, assignments, progress tracking

## 📚 Learning Tracks
- **AI & ML**: 8 specialized courses (AI, ML, Deep Learning, Computer Vision, etc.)
- **Development**: Full-stack development (Frontend, Backend, Frameworks)
- **Data Science**: Data analysis, visualization, and processing

## 🗂️ Main Directories

### Frontend (`/client/`)
```
src/
├── Admin/           # Admin dashboard & controls
├── Instructors/     # Instructor management interface
├── Students/        # Student learning interface
│   ├── AI&ML/       # AI & ML course components
│   ├── AssessmentCourses/  # Quiz & assessment pages  
│   ├── CorseDetails/       # Course detail views
│   └── DevelopmentAndDS/   # Development course components
├── components/      # Shared UI components
├── pages/          # Authentication & shared pages
├── services/       # API communication layer
└── stores/         # State management (Zustand)
```

### Backend (`/server/`)
```
Django Apps:
├── accounts/        # User authentication & profiles
├── assessment/      # Quizzes & assessments
├── certification/   # Digital certificates
├── course_class/    # Course management
├── notifications/   # System notifications
├── progress/        # User progress tracking
└── subscription/    # Payment & subscriptions
```

## 🔧 Quick Commands

### Start Development
```bash
# Frontend
cd client && npm install && npm run dev

# Backend  
cd server && pip install -r requirements.txt && python manage.py runserver
```

### Build Production
```bash
# Frontend
cd client && npm run build

# Backend
cd server && python manage.py collectstatic
```

## 📖 Full Documentation
- **[README.md](./README.md)** - Main project documentation
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Detailed architecture & tech stack
- **[DIRECTORY_TREE.md](./DIRECTORY_TREE.md)** - Complete directory tree structure