import React from 'react'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'

const dummyRoles = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'user' },
]

const RolesTable = ({ onSelect }) => {
  return (
    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Role Name</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {dummyRoles.map(r => (
          <CTableRow
            key={r.id}
            onClick={() => onSelect(r)}
            style={{ cursor: 'pointer' }}
          >
            <CTableDataCell>{r.name}</CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default RolesTable
