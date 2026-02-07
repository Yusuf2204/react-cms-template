import React, { useEffect, useState } from 'react'
import { CForm, CFormInput, CButton } from '@coreui/react'
import Select from 'react-select'

const parentOptions = [
  { value: null, label: 'Top Level' },
  { value: 1, label: 'Dashboard' },
  { value: 2, label: 'Setup' },
]

const iconOptions = [
  { value: 'cil-speedometer', label: 'Speedometer' },
  { value: 'cil-user', label: 'User' },
  { value: 'cil-settings', label: 'Settings' },
  { value: 'cil-list', label: 'List' },
  { value: 'cil-folder', label: 'Folder' },
]

const MenusForm = ({ menu, onReset }) => {
  const [form, setForm] = useState({
    name: '',
    path: '',
    parent: null,
    icon: '',
  })

  useEffect(() => {
    if (menu) {
      setForm({
        name: menu.name,
        path: menu.path,
        parent: menu.parent,
        icon: menu.icon || '',
      })
    }
  }, [menu])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleParentChange = (opt) => {
    setForm({ ...form, parent: opt ? opt.value : null })
  }

  const handleIconChange = (opt) => {
    setForm({ ...form, icon: opt ? opt.value : '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
    onReset()
  }

  return (
    <CForm onSubmit={handleSubmit}>
      <CFormInput
        label="Menu Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        className="mb-3"
      />

      <CFormInput
        label="Path URL"
        name="path"
        value={form.path}
        onChange={handleChange}
        className="mb-3"
      />

      <div className="mb-3">
        <label className="form-label">Parent Menu</label>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={parentOptions}
          value={parentOptions.find(p => p.value === form.parent)}
          onChange={handleParentChange}
          isClearable
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Icon</label>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={iconOptions}
          value={iconOptions.find(i => i.value === form.icon)}
          onChange={handleIconChange}
          isClearable
        />
      </div>

      <CButton type="submit" color="primary">
        {menu ? 'Update Menu' : 'Create Menu'}
      </CButton>
    </CForm>
  )
}

export default MenusForm
