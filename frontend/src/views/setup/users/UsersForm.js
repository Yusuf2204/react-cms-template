import React, { useEffect, useState } from 'react'
import { CForm, CFormInput, CButton } from '@coreui/react'
import Select from 'react-select'
import api from '../../../services/api'

const UsersForm = ({ user, onReset, onSaved }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role_id: null,
  })

  const [roles, setRoles] = useState([])

  const fetchRoles = async () => {
    const res = await api.get('/roles')

    const options = res.data.data.map(r => ({
      value: r.id,
      label: r.role_name,
    }))

    setRoles(options)
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        password: '',
        role_id: user.role_id || null,
      })
    } else {
      setForm({
        name: '',
        email: '',
        password: '',
        role_id: null,
      })
    }
  }, [user])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRoleChange = (selected) => {
    setForm({ ...form, role_id: selected ? selected.value : null })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = { ...form }
    if (user && !payload.password) delete payload.password

    if (user) {
      await api.put(`/users/${user.id}`, payload)
    } else {
      await api.post('/users', payload)
    }

    setForm({
      name: '',
      email: '',
      password: '',
      role_id: null,
    })

    onSaved()
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
          options={roles}
          placeholder="Select role..."
          value={
            form.role_id
              ? roles.find(r => r.value === form.role_id)
              : null
          }
          onChange={handleRoleChange}
          isClearable
        />
      </div>

      <CButton type="submit" color="primary">
        {user ? 'Update User' : 'Create User'}
      </CButton>

      <CButton type="button" color="secondary" onClick={onReset} className="ms-2">
        Reset
      </CButton>
    </CForm>
  )
}

export default UsersForm
