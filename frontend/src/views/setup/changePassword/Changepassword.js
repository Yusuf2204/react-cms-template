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
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const loadMe = async () => {
      const res = await api.get('/me')
      setEmail(res.data.data.user.email)
    }

    loadMe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!currentPassword || !newPassword || !confirmPassword) {
      setAlert({ type: 'warning', message: 'All fields are required.' })
      return
    }

    if (newPassword.length < 6) {
      setAlert({ type: 'warning', message: 'New password must be at least 6 characters.' })
      return
    }

    if (newPassword !== confirmPassword) {
      setAlert({ type: 'warning', message: 'Password confirmation does not match.' })
      return
    }

    setLoading(true)
    setAlert(null)

    try {
      await api.post('/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      })

      setAlert({ type: 'success', message: 'Password updated. Please login again.' })

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')

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
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mb-3"
          />

          <CFormInput
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mb-3"
          />

          <CFormInput
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
