import React, { useEffect, useState } from 'react'
import { CRow, CCol, CCard, CCardBody, CCardHeader, CButton } from '@coreui/react'
import { CIcon } from '@coreui/icons-react';
import { cilReload } from '@coreui/icons';
import RolesTable from './RolesTable'
import RolesForm from './RolesForm'
import api from '../../../services/api'

const Roles = () => {
  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchRoles = async () => {
    setLoading(true)
    try {
      const res = await api.get('/roles')
      setRoles(res.data.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  const handleSaved = () => {
    setSelectedRole(null)
    fetchRoles()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this role?')) return
    await api.delete(`/roles/${id}`)
    fetchRoles()
  }

  return (
    <CRow>
      <CCol md={7}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            Roles
            <CButton size="sm" color="secondary" onClick={fetchRoles}>
              <CIcon icon={cilReload} />
            </CButton>
          </CCardHeader>
          <CCardBody>
            <RolesTable
              roles={roles}
              loading={loading}
              onSelect={setSelectedRole}
              onDelete={handleDelete}
            />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md={5}>
        <CCard>
          <CCardHeader>
            {selectedRole ? 'Edit Role' : 'Add Role'}
          </CCardHeader>
          <CCardBody>
            <RolesForm
              role={selectedRole}
              onReset={() => setSelectedRole(null)}
              onSaved={handleSaved}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Roles
