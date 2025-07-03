import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../api'

const InstructorAccess = () => {
    const navigate = useNavigate()
    const [instructors, setInstructors] = useState([])
    const [loading, setLoading] = useState(false)

    const verifyAdmin = () => {
        const token = localStorage.getItem('ACCESS_TOKEN')
        if (!token) {
            navigate('/login')
            return
        }
        
        try {
            const decoded = jwtDecode(token)
            if (decoded.role != '3') {
                navigate('/login')
                toast.error('Admin access required')
            }
        } catch (error) {
            navigate('/login')
            toast.error('Invalid token')
        }
    }

    const fetchInstructors = async () => {
        setLoading(true)
        try {
            const res = await api.get('/api/v1/accounts/admin/instructors/')
            if (res.status === 200) {
                setInstructors(res.data?.instructors || [])
                toast.success(`Total ${res.data?.count} instructors available.`)
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to fetch instructors.')
        } finally {
            setLoading(false)
        }
    }

    const toggleAccess = async (instructorId, currentAccess) => {
        try {
            const res = await api.patch(
                `/api/v1/accounts/admin/instructor/${instructorId}/access/`,
                { has_access: !currentAccess }
            )
            
            if (res.status === 200) {
                setInstructors(prev => prev.map(instructor => 
                    instructor.id === instructorId 
                        ? { ...instructor, has_access: !currentAccess } 
                        : instructor
                ))
                toast.success(`Access ${!currentAccess ? 'granted' : 'revoked'} successfully`)
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to update access')
        }
    }

    useEffect(() => {
        verifyAdmin()
        fetchInstructors()
    }, [])

    return (
        <div className="min-h-screen mt-10 bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white overflow-hidden shadow-lg rounded-lg mb-8">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
                        <h1 className="text-3xl font-bold text-white">Instructors Management</h1>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Verified
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Joined Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Access
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {instructors.map((instructor) => (
                                    <tr key={instructor.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {instructor.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {instructor.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {instructor.is_verified ? (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Verified
                                                </span>
                                            ) : (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                    Not Verified
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(instructor.date_joined).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {instructor.has_access ? (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Granted
                                                </span>
                                            ) : (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                    Revoked
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => toggleAccess(instructor.id, instructor.has_access)}
                                                className={`mr-2 ${instructor.has_access 
                                                    ? 'bg-red-600 hover:bg-red-700' 
                                                    : 'bg-indigo-600 hover:bg-indigo-700'} 
                                                    text-white py-1 px-3 rounded-md text-sm`}
                                            >
                                                {instructor.has_access ? 'Revoke Access' : 'Grant Access'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InstructorAccess