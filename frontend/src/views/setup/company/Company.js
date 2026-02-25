import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import api from '../../../services/api'
import CompanyForm from './CompanyForm'

const Company = () => {
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(false)

  const loadCompany = async () => {
    setLoading(true)
    const res = await api.get('/company')
    setCompany(res.data.data)
    setLoading(false)
  }

  useEffect(() => {
    loadCompany()
  }, [])

  if (loading || !company) return <p>Loading...</p>

  return (
    <CCard>
      <CCardHeader>Company Settings</CCardHeader>
      <CCardBody>
        <CompanyForm company={company} onSaved={loadCompany} />
      </CCardBody>
    </CCard>
  )
}

export default Company
