import React, { useState } from 'react'
import { CRow, CCol, CCard, CCardBody, CCardHeader } from '@coreui/react'
import MenusTable from './MenusTable'
import MenusForm from './MenusForm'

const Menus = () => {
  const [selectedMenu, setSelectedMenu] = useState(null)

  return (
    <CRow>
      <CCol md={7}>
        <CCard>
          <CCardHeader>Menus</CCardHeader>
          <CCardBody>
            <MenusTable onSelect={setSelectedMenu} />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md={5}>
        <CCard>
          <CCardHeader>
            {selectedMenu ? 'Edit Menu' : 'Add Menu'}
          </CCardHeader>
          <CCardBody>
            <MenusForm menu={selectedMenu} onReset={() => setSelectedMenu(null)} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Menus
