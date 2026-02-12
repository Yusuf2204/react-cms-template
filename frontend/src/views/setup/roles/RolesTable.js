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

const RolesTable = ({ roles, loading, onSelect, onDelete }) => {
  if (loading) return <p>Loading...</p>

  return (
    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Role Name</CTableHeaderCell>
          <CTableHeaderCell width={120}>Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      <CTableBody>
        {roles.map((r) => (
          <CTableRow key={r.id}>
            <CTableDataCell
              onClick={() => onSelect(r)}
              style={{ cursor: 'pointer' }}
            >
              {r.role_name}
            </CTableDataCell>

            <CTableDataCell>
              <CButton
                size="sm"
                color="danger"
                onClick={() => onDelete(r.id)}
              >
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default RolesTable
