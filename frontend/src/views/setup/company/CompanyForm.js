import React, { useState } from 'react'
import {
  CForm,
  CFormInput,
  CButton,
  CRow,
  CCol,
  CAlert,
} from '@coreui/react'
import api from '../../../services/api'
import { loadCompanyBranding } from '../../../services/companyService'

const CompanyForm = ({ company, onSaved }) => {
  const [form, setForm] = useState({
    comp_name: company.comp_name || '',
    app_title: company.app_title || '',
    comp_logo: company.comp_logo || '',
    fav_icon: company.fav_icon || '',
  })

  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await api.put('/company', form)

    await loadCompanyBranding() // update title + favicon instantly

    setSuccess(true)
    onSaved()
  }

  const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

  return (
    <CForm onSubmit={handleSubmit}>

      {success && (
        <CAlert color="success" dismissible>
          Company updated successfully
        </CAlert>
      )}

      <CFormInput
        label="Company Name"
        name="comp_name"
        value={form.comp_name}
        onChange={handleChange}
        className="mb-3"
      />

      <CFormInput
        label="App Title (Browser Tab)"
        name="app_title"
        value={form.app_title}
        onChange={handleChange}
        className="mb-3"
      />

      <CFormInput
        type="file"
        label="Company Logo"
        accept="image/*"
        className="mb-2"
        onChange={async (e) => {
          const file = e.target.files[0]
          if (!file) return

          const base64 = await fileToBase64(file)
          setForm(prev => ({ ...prev, comp_logo: base64 }))
        }}
      />

      {form.comp_logo && (
        <img
          src={form.comp_logo}
          style={{ height: 60, marginBottom: 20 }}
        />
      )}

      <CFormInput
        type="file"
        label="Favicon"
        accept="image/*"
        className="mb-2"
        onChange={async (e) => {
          const file = e.target.files[0]
          if (!file) return

          const base64 = await fileToBase64(file)
          setForm(prev => ({ ...prev, fav_icon: base64 }))
        }}
      />

      {form.fav_icon && (
        <img
          src={form.fav_icon}
          style={{ height: 32, marginBottom: 20 }}
        />
      )}

      <div className="mt-3">
        <CButton type="submit" color="primary">
          Save Company Settings
        </CButton>
      </div>
    </CForm>
  )
}

export default CompanyForm
