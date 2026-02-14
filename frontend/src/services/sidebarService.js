import { CNavItem, CNavGroup } from '@coreui/react'
import api from './api'

const buildNav = (menus) =>
  menus.map(menu =>
    menu.children.length
      ? {
          component: CNavGroup,
          name: menu.menu_name,
          items: buildNav(menu.children),
        }
      : {
          component: CNavItem,
          name: menu.menu_name,
          to: menu.menu_path,
        }
  )

export const loadSidebarNavigation = async () => {
  const me = await api.get('/me')
  const roleId = me.data.data.role_id

  const res = await api.get(`/role-menus/${roleId}`)

  return buildNav(res.data.data)
}
