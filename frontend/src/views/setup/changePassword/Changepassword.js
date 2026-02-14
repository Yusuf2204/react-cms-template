import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CButton,
} from '@coreui/react'
import api from '../../../services/api'

const Changepassword = () => {
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    const loadMe = async () => {
      const res = await api.get('/me')
      setEmail(res.data.data.email)
    }

    loadMe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post('/change-password', {
        old_password: oldPassword,
        new_password: newPassword,
      })

      alert('Password updated')

      setOldPassword('')
      setNewPassword('')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed')
    }
  }

  return (
    <CCard>
      <CCardHeader>Change Password</CCardHeader>
      <CCardBody>
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

          <CButton type="submit" color="primary">
            Save Password
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default Changepassword
