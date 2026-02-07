import React, { useState } from 'react'
import { CRow, CCol, CCard, CCardBody, CCardHeader } from '@coreui/react'
import RolesTable from './RolepermissionsTable'
import PermissionsForm from './RolepermissionsForm'

const RolePermissions = () => {
  const [selectedRole, setSelectedRole] = useState(null)

  return (
    <CRow>
      <CCol md={5}>
        <CCard>
          <CCardHeader>Roles</CCardHeader>
          <CCardBody>
            <RolesTable onSelect={setSelectedRole} />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md={7}>
        <CCard>
          <CCardHeader>
            {selectedRole
              ? `Permissions - ${selectedRole.name}`
              : 'Select Role'}
          </CCardHeader>
          <CCardBody>
            {selectedRole && <PermissionsForm role={selectedRole} />}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RolePermissions
