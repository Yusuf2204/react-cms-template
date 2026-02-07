import React from 'react'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'

const dummyUsers = [
  { id: 1, name: 'Admin', email: 'admin@mail.com', role: 'admin' },
  { id: 2, name: 'User', email: 'user@mail.com', role: 'user' },
]

const UsersTable = ({ onSelect }) => {
  return (
    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Name</CTableHeaderCell>
          <CTableHeaderCell>Role</CTableHeaderCell>
          <CTableHeaderCell>Email</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {dummyUsers.map(u => (
          <CTableRow key={u.id} onClick={() => onSelect(u)} style={{ cursor: 'pointer' }}>
            <CTableDataCell>{u.name}</CTableDataCell>
            <CTableDataCell>{u.role}</CTableDataCell>
            <CTableDataCell>{u.email}</CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default UsersTable
