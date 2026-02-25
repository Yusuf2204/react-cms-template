import { CNavItem, CNavGroup } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icons from '@coreui/icons'
import api from './api'

const resolveIcon = (iconName) => {
  if (!iconName) return null
  const icon = icons[iconName]
  if (!icon) return null
  return <CIcon icon={icon} className="nav-icon" />
}

/* ===============================
   FILTER PERMISSION TREE
================================ */
const filterTree = (menus) =>
  menus
    .filter(menu => menu.checked)
    .map(menu => ({
      ...menu,
      children: filterTree(menu.children || []),
    }))

/* ===============================
   BUILD COREUI NAV
================================ */
const buildNav = (menus) =>
  menus.map(menu =>
    menu.children.length
      ? {
          component: CNavGroup,
          name: menu.menu_name,
          icon: resolveIcon(menu.menu_icon),
          items: buildNav(menu.children),
        }
      : {
          component: CNavItem,
          name: menu.menu_name,
          to: menu.menu_path,
          icon: resolveIcon(menu.menu_icon),
        }
  )

export const loadSidebarNavigation = async () => {
  const me = await api.get('/me')
  const roleId = me.data?.data?.user?.role_id

  if (!roleId) return []

  const res = await api.get(`/role-menus/${roleId}`)

  const allowedTree = filterTree(res.data.data)

  return buildNav(allowedTree)
}
