import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CButton,
} from '@coreui/react'

const Changepassword = () => {
  const [form, setForm] = useState({
    email: 'user@mail.com',
    oldPassword: '',
    newPassword: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(form) // nanti API
    setForm({ ...form, oldPassword: '', newPassword: '' })
  }

  return (
    <CCard>
      <CCardHeader>Change Password</CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CFormInput
            label="Email"
            value={form.email}
            readOnly
            className="mb-3"
          />

          <CFormInput
            type="password"
            label="Old Password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            className="mb-3"
          />

          <CFormInput
            type="password"
            label="New Password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
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
