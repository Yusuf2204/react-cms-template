import React, { useState } from 'react'
import { CRow, CCol, CCard, CCardBody, CCardHeader } from '@coreui/react'
import UsersTable from './UsersTable'
import UsersForm from './UsersForm'

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <CRow>
      <CCol md={7}>
        <CCard>
          <CCardHeader>User List</CCardHeader>
          <CCardBody>
            <UsersTable onSelect={setSelectedUser} />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md={5}>
        <CCard>
          <CCardHeader>
            {selectedUser ? 'Edit User' : 'Add User'}
          </CCardHeader>
          <CCardBody>
            <UsersForm user={selectedUser} onReset={() => setSelectedUser(null)} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
