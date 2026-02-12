import React, { useEffect, useState } from 'react'
import { CRow, CCol, CCard, CCardBody, CCardHeader, CButton  } from '@coreui/react'
import { CIcon } from '@coreui/icons-react';
import { cilReload } from '@coreui/icons';
import UsersTable from './UsersTable'
import UsersForm from './UsersForm'
import api from '../../../services/api'

const Users = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await api.get('/users')
      setUsers(res.data.data)
    } finally {
      setLoading(false)
    }
  }

  const fetchCurrentUser = async () => {
    const res = await api.get('/me')
    setCurrentUser(res.data.data)
  }

  useEffect(() => {
    fetchUsers()
    fetchCurrentUser()
  }, [])

  const handleSaved = () => {
    setSelectedUser(null)
    fetchUsers()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return
    await api.delete(`/users/${id}`)
    fetchUsers()
  }

  return (
    <CRow>
      <CCol md={7}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            User List
            <CButton size="sm" color="secondary" onClick={fetchUsers}>
             <CIcon icon={cilReload} />
            </CButton>
          </CCardHeader>
          <CCardBody>
            <UsersTable
              users={users}
              loading={loading}
              currentUserId={currentUser?.id}
              onSelect={setSelectedUser}
              onDelete={handleDelete}
            />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md={5}>
        <CCard>
          <CCardHeader>
            {selectedUser ? 'Edit User' : 'Add User'}
          </CCardHeader>
          <CCardBody>
            <UsersForm
              user={selectedUser}
              onReset={() => setSelectedUser(null)}
              onSaved={handleSaved}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
