import { useEffect, useState } from "react";
import api from "../api";
import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        try {
            auth()
        } catch (error) {
            console.log(error)
        }
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('REFRESH_TOKEN');
        try {
            const res = await api.post('/api/v1/accounts/token/refresh/', { refresh: refreshToken });
            if (res.status === 200) {
                localStorage.setItem('ACCESS_TOKEN', res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExperation = decoded.exp

        if (tokenExperation < Date.now()) {
            await refreshToken()
        } else {
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to={'/login'} />
}

export default ProtectedRoute