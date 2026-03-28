import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

import PrivateRoute from './components/PrivateRoute'

// routes config
import api from './services/api'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const dispatch = useDispatch()
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const navigate = useNavigate()
  const company = useSelector((state) => state.company)

  const initAuth = async () => {
    try {
      const res = await api.get('/me')

      const user = res.data.data.user

      dispatch({
        type: 'set',
        user,
      })

    } catch {
      localStorage.removeItem('token')
      navigate('/login', { replace: true })
    }
  }

  const initCompany = async () => {
    const res = await api.get('/company')

    dispatch({
      type: 'set',
      company: res.data.data,
    })
  }

  useEffect(() => {
    const init = async () => {
      const urlParams = new URLSearchParams(window.location.href.split('?')[1])
      const theme =
        urlParams.get('theme') &&
        urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]

      if (theme) {
        setColorMode(theme)
      } else if (!isColorModeSet()) {
        setColorMode(storedTheme)
      }

      if (localStorage.getItem('token')) {
        await initAuth()
        await initCompany()
      }
    }

    init()
  }, [])

  useEffect(() => {
    if (!company) return

    // title
    document.title = company.app_title || company.comp_name

    // favicon
    if (company.fav_icon) {
      let link = document.querySelector("link[rel='icon']")

      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }

      link.href = company.fav_icon
    }
  }, [company])

  return (
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <DefaultLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
  )
}

export default App
