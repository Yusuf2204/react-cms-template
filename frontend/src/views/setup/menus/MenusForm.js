import React, { useEffect, useState } from 'react'
import { CForm, CFormInput, CButton } from '@coreui/react'
import Select from 'react-select'
import api from '../../../services/api'

const MenusForm = ({ menu, menus, onReset, onSaved }) => {
  const [form, setForm] = useState({
    menu_name: '',
    menu_path: '',
    menu_icon: '',
    menu_parent_id: null,
    menu_order: 0,
  })

  const parentOptions = menus
    .filter(m => !menu || m.id !== menu.id)
    .map(m => ({
      value: m.id,
      label: m.menu_name,
    }))

  useEffect(() => {
    if (menu) {
      setForm({
        menu_name: menu.menu_name,
        menu_path: menu.menu_path,
        menu_icon: menu.menu_icon || '',
        menu_parent_id: menu.menu_parent_id || null,
        menu_order: menu.menu_order || 0,
      })
    } else {
      setForm({
        menu_name: '',
        menu_path: '',
        menu_icon: '',
        menu_parent_id: null,
        menu_order: 0,
      })
    }
  }, [menu])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleParentChange = (selected) => {
    setForm({ ...form, menu_parent_id: selected ? selected.value : null })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (menu) {
      await api.put(`/menus/${menu.id}`, form)
    } else {
      await api.post('/menus', form)
    }

    onSaved()
    onReset()
  }

  return (
    <CForm onSubmit={handleSubmit}>
      <CFormInput
        label="Menu Name"
        name="menu_name"
        value={form.menu_name}
        onChange={handleChange}
        className="mb-3"
      />

      <CFormInput
        label="Path"
        name="menu_path"
        value={form.menu_path}
        onChange={handleChange}
        className="mb-3"
      />

      <CFormInput
        label="Icon"
        name="menu_icon"
        value={form.menu_icon}
        onChange={handleChange}
        className="mb-3"
      />

      <div className="mb-3">
        <label className="form-label">Parent Menu</label>
        <Select
          classNamePrefix="react-select"
          className="react-select-container"
          options={parentOptions}
          value={
            form.menu_parent_id
              ? parentOptions.find(o => o.value === form.menu_parent_id)
              : null
          }
          onChange={handleParentChange}
          isClearable
        />
      </div>

      <CFormInput
        label="Order"
        name="menu_order"
        type="number"
        value={form.menu_order}
        onChange={handleChange}
        className="mb-3"
      />

      <CButton color="primary" className="me-2" type="submit">
        {menu ? 'Update Menu' : 'Create Menu'}
      </CButton>

      <CButton color="secondary" type="button" onClick={onReset}>
        Reset
      </CButton>
    </CForm>
  )
}

export default MenusForm
