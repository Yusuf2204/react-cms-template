import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

const dummyMenus = [
  { id: 1, name: 'Dashboard', path: '/dashboard', parent: null },
  { id: 2, name: 'Setup', path: '/setup', parent: null },
  { id: 3, name: 'Users', path: '/setup/users', parent: 2 },
  { id: 4, name: 'Roles', path: '/setup/roles', parent: 2 },
]

const MenusTable = ({ onSelect }) => {
  return (
    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Name</CTableHeaderCell>
          <CTableHeaderCell>Path</CTableHeaderCell>
          <CTableHeaderCell>Parent</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {dummyMenus.map(m => (
          <CTableRow
            key={m.id}
            onClick={() => onSelect(m)}
            style={{ cursor: 'pointer' }}
          >
            <CTableDataCell>{m.name}</CTableDataCell>
            <CTableDataCell>{m.path}</CTableDataCell>
            <CTableDataCell>{m.parent ?? '-'}</CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default MenusTable
