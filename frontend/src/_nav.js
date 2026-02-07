import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilHamburgerMenu,
  cilApps,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // Dashboard
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilHamburgerMenu} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },

  // Setup
  {
    component: CNavGroup,
    name: 'Setup',
    to: '/dashboard',
    icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Users',
        to: '/setup/users',
      },
      {
        component: CNavItem,
        name: 'Roles',
        to: '/setup/roles',
      },
      {
        component: CNavItem,
        name: 'Menus',
        to: '/setup/menus',
      },
      {
        component: CNavItem,
        name: 'Role Permissions',
        to: '/setup/role-permissions',
      },
      {
        component: CNavItem,
        name: 'Change Password',
        to: '/setup/change-password',
      },
    ],
  },
]

export default _nav

// for legacy reference only, can be removed later
  // {
  //   component: CNavTitle,
  //   name: 'Components',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //     {
  //       component: CNavItem,
  //       name: (
  //         <React.Fragment>
  //           {'Loading Button'}
  //           <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
  //         </React.Fragment>
  //       ),
  //       href: 'https://coreui.io/react/docs/components/loading-button/',
  //       badge: {
  //         color: 'danger',
  //         text: 'PRO',
  //       },
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
