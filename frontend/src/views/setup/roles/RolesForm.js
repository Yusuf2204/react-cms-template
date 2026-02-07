import React, { useEffect, useState } from 'react'
import { CForm, CFormInput, CButton } from '@coreui/react'

const RolesForm = ({ role, onReset }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    if (role) setName(role.name)
  }, [role])

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log({ name }) // nanti API
    setName('')
    onReset()
  }

  return (
    <CForm onSubmit={handleSubmit}>
      <CFormInput
        label="Role Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-3"
      />

      <CButton type="submit" color="primary">
        {role ? 'Update Role' : 'Create Role'}
      </CButton>
    </CForm>
  )
}

export default RolesForm
