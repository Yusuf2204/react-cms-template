import React, { useEffect, useState } from 'react'
import { CRow, CCol, CCard, CCardBody, CCardHeader, CButton } from '@coreui/react'
import { CIcon } from '@coreui/icons-react';
import { cilReload } from '@coreui/icons';
import MenusTable from './MenusTable'
import MenusForm from './MenusForm'
import api from '../../../services/api'

const Menus = () => {
  const [menus, setMenus] = useState([])
  const [selectedMenu, setSelectedMenu] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchMenus = async () => {
    setLoading(true)
    try {
      const res = await api.get('/menus')
      setMenus(res.data.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenus()
  }, [])

  const handleSaved = () => {
    setSelectedMenu(null)
    fetchMenus()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this menu?')) return
    await api.delete(`/menus/${id}`)
    fetchMenus()
  }

  return (
    <CRow>
      <CCol md={7}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between">
            Menu List
            <CButton size="sm" color="secondary" onClick={fetchMenus}>
              <CIcon icon={cilReload} />
            </CButton>
          </CCardHeader>
          <CCardBody>
            <MenusTable
              menus={menus}
              loading={loading}
              onSelect={setSelectedMenu}
              onDelete={handleDelete}
            />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md={5}>
        <CCard>
          <CCardHeader>
            {selectedMenu ? 'Edit Menu' : 'Add Menu'}
          </CCardHeader>
          <CCardBody>
            <MenusForm
              menu={selectedMenu}
              onReset={() => setSelectedMenu(null)}
              onSaved={handleSaved}
              menus={menus}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Menus
