import React, { useState } from 'react'
import { CRow, CCol, CCard, CCardBody, CCardHeader } from '@coreui/react'
import RolesTable from './RolesTable'
import RolesForm from './RolesForm'

const Roles = () => {
  const [selectedRole, setSelectedRole] = useState(null)

  return (
    <CRow>
      <CCol md={7}>
        <CCard>
          <CCardHeader>Roles</CCardHeader>
          <CCardBody>
            <RolesTable onSelect={setSelectedRole} />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md={5}>
        <CCard>
          <CCardHeader>
            {selectedRole ? 'Edit Role' : 'Add Role'}
          </CCardHeader>
          <CCardBody>
            <RolesForm role={selectedRole} onReset={() => setSelectedRole(null)} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Roles
