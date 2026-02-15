import api from './api'

export const loadCompanyBranding = async () => {
  try {
    const res = await api.get('/company')
    const company = res.data.data

    if (company?.comp_name) {
      document.title = company.comp_name
    }

    if (company?.fav_icon) {
      let link = document.querySelector("link[rel='icon']")

      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }

      const base64 = company.fav_icon.startsWith('data:')
        ? company.fav_icon
        : `data:image/png;base64,${company.fav_icon}`

      link.href = `${base64}#${Date.now()}`
    }
  } catch {
    console.warn('Company branding not loaded')
  }
}
