import React, { useEffect, useState } from 'react'
import { CForm, CFormInput, CButton } from '@coreui/react'
import api from '../../../services/api'

const RolesForm = ({ role, onReset, onSaved }) => {
  const [roleName, setRoleName] = useState('')

  useEffect(() => {
    if (role) {
      setRoleName(role.role_name)
    } else {
      setRoleName('')
    }
  }, [role])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (role) {
      await api.put(`/roles/${role.id}`, {
        role_name: roleName,
      })
    } else {
      await api.post('/roles', {
        role_name: roleName,
      })
    }

    setRoleName('')
    onSaved()
    onReset()
  }

  return (
    <CForm onSubmit={handleSubmit}>
      <CFormInput
        label="Role Name"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        className="mb-3"
      />

      <CButton type="submit" color="primary">
        {role ? 'Update Role' : 'Create Role'}
      </CButton>

      <CButton type="button" color="secondary" onClick={onReset} className="ms-2">
        Reset
      </CButton>
    </CForm>
  )
}

export default RolesForm
