import React, { useEffect, useState } from 'react'
import { CForm, CFormInput, CButton } from '@coreui/react'
import Select from 'react-select'

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
]

const UsersForm = ({ user, onReset }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  })

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role || '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRoleChange = (selected) => {
    setForm({ ...form, role: selected ? selected.value : '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = { ...form }
    if (user && !form.password) delete payload.password

    console.log(payload)
    onReset()
  }

  return (
    <CForm onSubmit={handleSubmit}>
      <CFormInput
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        className="mb-3"
      />

      <CFormInput
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="mb-3"
      />

      <CFormInput
        type="password"
        label={user ? 'New Password (optional)' : 'Password'}
        name="password"
        value={form.password}
        onChange={handleChange}
        className="mb-3"
      />

      <div className="mb-4">
        <label className="form-label">Role</label>
        <Select
          classNamePrefix="react-select"
          className="react-select-container"
          options={roleOptions}
          placeholder="Select role..."
          value={roleOptions.find(r => r.value === form.role)}
          onChange={handleRoleChange}
          isClearable
        />
      </div>

      <CButton type="submit" color="primary">
        {user ? 'Update User' : 'Create User'}
      </CButton>
    </CForm>
  )
}

export default UsersForm
