import React, { useEffect, useState } from 'react'
import { CFormSwitch, CButton } from '@coreui/react'

const dummyMenus = [
  { id: 1, name: 'Dashboard' },
  { id: 2, name: 'Users' },
  { id: 3, name: 'Roles' },
  { id: 4, name: 'Menus' },
  { id: 5, name: 'Change Password' },
]

const RolepermissionsForm = ({ role }) => {
  const [permissions, setPermissions] = useState({})

  useEffect(() => {
    if (role.name === 'admin') {
      const all = {}
      dummyMenus.forEach(m => (all[m.id] = true))
      setPermissions(all)
    } else {
      setPermissions({
        5: true,
      })
    }
  }, [role])

  const toggle = (id) => {
    setPermissions(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleSave = () => {
    console.log({
      role: role.name,
      permissions,
    })
    // nanti ganti API
  }

  return (
    <>
      {dummyMenus.map(menu => (
        <div
          key={menu.id}
          className="d-flex justify-content-between align-items-center mb-3"
        >
          <strong>{menu.name}</strong>
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
