import React, { useEffect, useState } from 'react'
import { CFormSwitch, CButton } from '@coreui/react'
import api from '../../../services/api'

const RolepermissionsForm = ({ role }) => {
  const [menus, setMenus] = useState([])
  const [permissions, setPermissions] = useState({})
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    setLoading(true)

    const [resMenus, resPerms] = await Promise.all([
      api.get('/menus'),
      api.get(`/role-menus/${role.id}`),
    ])

    setMenus(resMenus.data.data)

    const active = {}
    resPerms.data.data.forEach(m => {
      active[m.id] = true
    })

    setPermissions(active)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [role])

  const toggle = (id) => {
    setPermissions(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleSave = async () => {
    const menuIds = Object.keys(permissions)
      .filter(id => permissions[id])
      .map(Number)

    await api.post(`/role-menus/${role.id}`, {
      menu_ids: menuIds,
    })

    alert('Permissions saved')
  }

  if (loading) return <p>Loading...</p>

  return (
    <>
      {menus.map(menu => (
        <div
          key={menu.id}
          className="d-flex justify-content-between align-items-center mb-3"
        >
          <strong>{menu.menu_name}</strong>
          <CFormSwitch
            checked={!!permissions[menu.id]}
            onChange={() => toggle(menu.id)}
          />
        </div>
      ))}

      <CButton color="primary" onClick={handleSave}>
        Save Permissions
      </CButton>
    </>
  )
}

export default RolepermissionsForm
