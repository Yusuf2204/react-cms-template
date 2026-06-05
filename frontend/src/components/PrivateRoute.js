import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import api from '../services/api'

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setIsValid(false)
        return
      }

      try {
        const res = await api.get('/me')
        dispatch({
          type: 'set',
          user: res.data.data.user,
        })
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
