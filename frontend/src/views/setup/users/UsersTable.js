import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react'

const UsersTable = ({ users, loading, currentUserId, onSelect, onDelete }) => {
  if (loading) return <p>Loading...</p>

  return (
    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Name</CTableHeaderCell>
          <CTableHeaderCell>Email</CTableHeaderCell>
          <CTableHeaderCell>Role</CTableHeaderCell>
          <CTableHeaderCell width={120}>Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      <CTableBody>
        {users.map((u) => {
          const isSelf = Number(u.id) === Number(currentUserId)

          console.log('isSelf', isSelf, u.id, currentUserId)

          return (
            <CTableRow key={u.id}>
              <CTableDataCell
                onClick={() => onSelect(u)}
                style={{ cursor: 'pointer' }}
              >
                {u.name}
              </CTableDataCell>

              <CTableDataCell>{u.email}</CTableDataCell>
              <CTableDataCell>{u.role?.role_name || '-'}</CTableDataCell>

              <CTableDataCell>
                <CButton
                  size="sm"
                  color="danger"
                  disabled={isSelf}
                  onClick={() => onDelete(u.id)}
                  title={isSelf ? 'You cannot delete your own account' : ''}
                >
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          )
        })}
      </CTableBody>
    </CTable>
  )
}

export default UsersTable
