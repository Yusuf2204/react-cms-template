import React, { useState, useEffect } from 'react'
import api from '../../../services/api'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { loadCompanyBranding } from '../../../services/companyService'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadCompanyBranding()

    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        await api.get('/me')
        navigate('/dashboard')
      } catch {
        localStorage.removeItem('token')
      }
    }

    checkAuth()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await api.post('/login', { email, password })

      localStorage.setItem('token', res.data.data.token)

      await loadCompanyBranding()

      navigate('/dashboard')

    } catch (err) {
      setError(err.response?.data?.message || 'Email atau password salah')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>

                    {error && (
                      <CAlert color="danger" dismissible>
                        {error}
                      </CAlert>
                    )}

                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <h2>Sign up</h2>
                  <p>Create new account</p>
                  <Link to="/register">
                    <CButton color="light" className="mt-3">
                      Register Now!
                    </CButton>
                  </Link>
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
