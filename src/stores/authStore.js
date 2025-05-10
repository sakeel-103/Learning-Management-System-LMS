import { create } from 'zustand'

// Mock user roles for now (will integrate with backend later)
const userRoles = {
    student: 'Student',
    instructor: 'Instructor',
    admin: 'Admin',
}

const useAuthStore = create((set) => ({
    user: null,
    role: null,
    isAuthenticated: false,
    login: (userData) => set({
        user: userData,
        role: userData.role || userRoles.student, // Default to Student for now
        isAuthenticated: true,
    }),
    logout: () => set({
        user: null,
        role: null,
        isAuthenticated: false,
    }),
}))

export default useAuthStore