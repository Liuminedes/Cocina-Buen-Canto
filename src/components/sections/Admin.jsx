import { useState, useEffect } from 'react'
import Login from '../admin/Login'
import ProductosPanel from '../admin/ProductosPanel'
import CategoriasPanel from '../admin/CategoriasPanel'
import { loadCategorias, onMenuUpdate } from '../../data/menu'
import { getSession, onAuthChange, signOut } from '../../lib/supabase'

const SECTIONS = [
  { id: 'productos',  label: 'Productos',  icon: '🍔' },
  { id: 'categorias', label: 'Categorías', icon: '🗂️' },
]

export default function Admin() {
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [section, setSection] = useState('productos')
  const [mobileNav, setMobileNav] = useState(false)
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    getSession().then(s => { setSession(s); setAuthLoading(false) })
    return onAuthChange(s => setSession(s))
  }, [])

  const reload = async () => {
    try { setCategorias(await loadCategorias()) }
    catch (e) { console.error(e) }
  }

  useEffect(() => { if (session) reload() }, [session])
  useEffect(() => onMenuUpdate(reload), [])

  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--avena-lt)', color: 'var(--brasas)', fontFamily: 'var(--font-ui)',
      }}>Cargando…</div>
    )
  }

  if (!session) return <Login />

  const totalProductos = categorias.reduce((acc, c) => acc + c.items.length, 0)
  const destacados = categorias.reduce((acc, c) => acc + c.items.filter(i => i.destacado).length, 0)

  return (
    <div className="admin">
      <aside className={`admin__sidebar${mobileNav ? ' open' : ''}`}>
        <div className="admin__sidebar-brand">
          <div className="admin__sidebar-badge">
            <span className="logo-mask logo-mask--abreviado" role="img" aria-label="CBC" />
          </div>
          <div>
            <div className="admin__sidebar-eyebrow">Admin</div>
            <div className="admin__sidebar-name">Cocina Buen Canto</div>
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
          <button onClick={signOut} className="admin__side-link admin__side-link--danger">
            Cerrar sesión
          </button>
        </div>
      </aside>

      {mobileNav && <div className="admin__overlay" onClick={() => setMobileNav(false)} />}

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
            {session.user?.email}
          </div>
        </header>

        <div className="admin__content">
          {section === 'productos'  && <ProductosPanel categorias={categorias} onChange={reload} />}
          {section === 'categorias' && <CategoriasPanel categorias={categorias} onChange={reload} />}
        </div>
      </div>
    </div>
  )
}