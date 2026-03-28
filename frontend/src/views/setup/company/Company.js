import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { useSelector } from 'react-redux'
import CompanyForm from './CompanyForm'

const Company = () => {
  const company = useSelector((state) => state.company)

  if (!company) return <p>Loading...</p>

  return (
    <CCard>
      <CCardHeader>Company Settings</CCardHeader>
      <CCardBody>
        <CompanyForm company={company} />
      </CCardBody>
    </CCard>
  )
}

export default Company
