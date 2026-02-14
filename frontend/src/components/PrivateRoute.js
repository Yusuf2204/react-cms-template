import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../services/api'

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null)

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setIsValid(false)
        return
      }

      try {
        await api.get('/me')
        setIsValid(true)
      } catch {
        localStorage.removeItem('token')
        setIsValid(false)
      }
    }

    validateToken()
  }, [])

  if (isValid === null) return null // atau spinner

  if (!isValid) return <Navigate to="/login" replace />

  return children
}

export default PrivateRoute
