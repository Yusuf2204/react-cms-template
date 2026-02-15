import React, { useEffect, useState } from 'react'
import { CFormSwitch, CButton, CAlert } from '@coreui/react'
import api from '../../../services/api'

const RolepermissionsForm = ({ role }) => {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    show: false,
    color: 'success',
    message: '',
  })

  const loadData = async () => {
    setLoading(true)
    const res = await api.get(`/role-menus/${role.id}`)
    setMenus(res.data.data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [role])

  // recursive toggle
  const toggleMenu = (list, id) =>
    list.map(menu => {
      if (menu.id === id) {
        return { ...menu, checked: !menu.checked }
      }

      if (menu.children?.length) {
        return {
          ...menu,
          children: toggleMenu(menu.children, id),
        }
      }

      return menu
    })

  const toggle = (id) => {
    setMenus(prev => toggleMenu(prev, id))
  }

  // flatten checked ids
  const collectChecked = (list, result = []) => {
    list.forEach(menu => {
      if (menu.checked) result.push(menu.id)
      if (menu.children?.length) collectChecked(menu.children, result)
    })
    return result
  }

  const handleSave = async () => {
    try {
      const menuIds = collectChecked(menus)

      await api.post(`/role-menus/${role.id}`, {
        menu_ids: menuIds,
      })

      setAlert({
        show: true,
        color: 'success',
        message: 'Permissions updated successfully',
      })

      setTimeout(() => {
        window.location.reload()
      }, 800)

    } catch (err) {
      setAlert({
        show: true,
        color: 'danger',
        message: 'Failed to save permissions',
      })
    }
  }

  const renderMenu = (menu, depth = 0) => (
    <div key={menu.id} style={{ paddingLeft: depth * 20 }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>{menu.menu_name}</strong>
        <CFormSwitch
          checked={menu.checked}
          onChange={() => toggle(menu.id)}
        />
      </div>

      {menu.children?.map(child =>
        renderMenu(child, depth + 1)
      )}
    </div>
  )

  if (loading) return <p>Loading...</p>

  return (
    <>
      {alert.show && (
        <CAlert color={alert.color} dismissible>
          {alert.message}
        </CAlert>
      )}

      {menus.map(menu => renderMenu(menu))}

      <CButton color="primary" className="mt-3" onClick={handleSave}>
        Save Permissions
      </CButton>
    </>
  )
}

export default RolepermissionsForm
