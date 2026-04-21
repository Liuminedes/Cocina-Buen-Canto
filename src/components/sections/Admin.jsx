import { useState, useEffect } from 'react'
import Login from '../admin/Login'
import ProductosPanel from '../admin/ProductosPanel'
import CategoriasPanel from '../admin/CategoriasPanel'
import { loadCategorias, onMenuUpdate, resetMenu } from '../../data/menu'

const SESSION_KEY = 'cbc:admin:session'
const SECTIONS = [
  { id: 'productos',  label: 'Productos',  icon: '🍔' },
  { id: 'categorias', label: 'Categorías', icon: '🗂️' },
]

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'ok')
  const [section, setSection] = useState('productos')
  const [mobileNav, setMobileNav] = useState(false)
  const [categorias, setCategorias] = useState(() => loadCategorias())

  useEffect(() => {
    return onMenuUpdate(() => setCategorias(loadCategorias()))
  }, [])

  if (!authed) {
    return <Login onSuccess={() => { sessionStorage.setItem(SESSION_KEY, 'ok'); setAuthed(true) }} />
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
  }

  const handleReset = () => {
    if (!confirm('¿Restaurar el menú a los valores originales? Se perderán todos los cambios y fotos.')) return
    resetMenu()
  }

  const totalProductos = categorias.reduce((acc, c) => acc + c.items.length, 0)
  const destacados = categorias.reduce((acc, c) => acc + c.items.filter(i => i.destacado).length, 0)

  return (
    <div className="admin">
      {/* Sidebar */}
      <aside className={`admin__sidebar${mobileNav ? ' open' : ''}`}>
        <div className="admin__sidebar-brand">
          <div className="admin__sidebar-badge">
            <span className="logo-mask logo-mask--abreviado" role="img" aria-label="CBC" />
          </div>
          <div>
              <span className="logo-mask logo-mask--horizontal sidebar__logo" role="img" aria-label="Cocina Buen Canto" />
            <div className="admin__sidebar-eyebrow">Admin</div>
          </div>
        </div>

        <div className="admin__stats">
          <div className="admin__stat">
            <span className="admin__stat-val">{totalProductos}</span>
            <span className="admin__stat-lbl">Productos</span>
          </div>
          <div className="admin__stat">
            <span className="admin__stat-val">{categorias.length}</span>
            <span className="admin__stat-lbl">Categorías</span>
          </div>
          <div className="admin__stat">
            <span className="admin__stat-val">{destacados}</span>
            <span className="admin__stat-lbl">Destacados</span>
          </div>
        </div>

        <nav className="admin__nav">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`admin__nav-btn${section === s.id ? ' active' : ''}`}
              onClick={() => { setSection(s.id); setMobileNav(false) }}
            >
              <span className="admin__nav-ico">{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin__sidebar-foot">
          <a href="/" className="admin__side-link">← Ver sitio público</a>
          <button onClick={handleReset} className="admin__side-link">↺ Restaurar menú</button>
          <button onClick={logout} className="admin__side-link admin__side-link--danger">
            Cerrar sesión
          </button>
        </div>
      </aside>

      {mobileNav && <div className="admin__overlay" onClick={() => setMobileNav(false)} />}

      {/* Main */}
      <div className="admin__main">
        <header className="admin__topbar">
          <button
            className="admin__burger"
            onClick={() => setMobileNav(!mobileNav)}
            aria-label="Menú"
          >
            <span /><span /><span />
          </button>
          <div className="admin__topbar-title">
            {SECTIONS.find(s => s.id === section)?.label}
          </div>
          <div className="admin__topbar-user">
            <span className="admin__user-dot" />
            Sesión activa
          </div>
        </header>

        <div className="admin__content">
          {section === 'productos'  && <ProductosPanel categorias={categorias} />}
          {section === 'categorias' && <CategoriasPanel categorias={categorias} />}
        </div>
      </div>
    </div>
  )
}