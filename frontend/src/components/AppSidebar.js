import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'
import { loadSidebarNavigation } from '../services/sidebarService'
import api from '../services/api'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const user = useSelector((state) => state.user)
  const company = useSelector((state) => state.company)

  const [navigation, setNavigation] = useState([])

  useEffect(() => {
    const loadNav = async () => {
      if (!user?.role_id) return

      const nav = await loadSidebarNavigation(user.role_id)
      setNavigation(nav)
    }

    loadNav()
  }, [user])

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/" className="fw-bold text-white">
          {company?.comp_logo ? (
            <img
              src={company.comp_logo}
              alt="Company Logo"
              height="32"
              style={{ objectFit: 'contain' }}
            />
          ) : (
            company?.comp_name || 'Loading...'
          )}
        </CSidebarBrand>

        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      <AppSidebarNav items={navigation} />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() =>
            dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })
          }
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
