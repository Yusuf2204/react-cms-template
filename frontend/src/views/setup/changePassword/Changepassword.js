import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CButton,
  CAlert,
  CSpinner,
} from '@coreui/react'
import api from '../../../services/api'

const Changepassword = () => {
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const loadMe = async () => {
      const res = await api.get('/me')
      setEmail(res.data.data.email)
    }

    loadMe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!oldPassword || !newPassword) {
      setAlert({ type: 'warning', message: 'All fields are required.' })
      return
    }

    if (newPassword.length < 6) {
      setAlert({ type: 'warning', message: 'New password must be at least 6 characters.' })
      return
    }

    setLoading(true)
    setAlert(null)

    try {
      await api.post('/change-password', {
        old_password: oldPassword,
        new_password: newPassword,
      })

      setAlert({ type: 'success', message: 'Password updated. Please login again.' })

      setOldPassword('')
      setNewPassword('')

      // auto logout after 1.5s
      setTimeout(() => {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }, 1500)

    } catch (err) {
      setAlert({
        type: 'danger',
        message: err.response?.data?.message || 'Failed to update password',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <CCard>
      <CCardHeader>Change Password</CCardHeader>
      <CCardBody>
        {alert && (
          <CAlert
            color={alert.type}
            dismissible
            onClose={() => setAlert(null)}
            className="mb-3"
          >
            {alert.message}
          </CAlert>
        )}

        <CForm onSubmit={handleSubmit}>
          <CFormInput
            label="Email"
            value={email}
            readOnly
            className="mb-3"
          />

          <CFormInput
            type="password"
            label="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mb-3"
          />

          <CFormInput
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mb-4"
          />

          <CButton type="submit" color="primary" disabled={loading}>
            {loading ? <CSpinner size="sm" /> : 'Save Password'}
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default Changepassword
