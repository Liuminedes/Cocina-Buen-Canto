import { useState, useEffect } from 'react'
import { loadCategorias, onMenuUpdate, formatPrecio } from '../../data/menu'

function Modal({ item, catNombre, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  if (!item) return null

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <div className="modal__img">
          {item.imagen
            ? <img src={item.imagen} alt={item.nombre} />
            : (
              <div className="modal__img-ph">
                <span style={{ fontSize: '3rem', opacity: 0.2 }}>🍽️</span>
                <span>Foto próximamente</span>
              </div>
            )
          }
          <button className="modal__close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        <div className="modal__body">
          <div className="modal__cat">{catNombre}</div>
          <h3 className="modal__name">{item.nombre}</h3>
          <div className="modal__line" />
          <p className="modal__desc">{item.descripcion}</p>
          <span className="modal__price">{formatPrecio(item.precio)}</span>
          <a
            href={`https://wa.me/573157443542?text=${encodeURIComponent('¡Hola! Me interesa el ' + item.nombre + ' del menú de Cocina Buen Canto.')}`}
            target="_blank" rel="noopener noreferrer"
            className="modal__wa"
          >
            Preguntar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

function MenuItem({ item, onClick }) {
  return (
    <div className="mitem" onClick={() => onClick(item)}>
      <div className="mitem__thumb">
        {item.imagen
          ? <img src={item.imagen} alt={item.nombre} />
          : <div className="mitem__thumb-ph">🍽️</div>
        }
      </div>
      <div className="mitem__info">
        <div className="mitem__name">{item.nombre}</div>
        <div className="mitem__desc">{item.descripcion}</div>
        <div className="mitem__foot">
          <span className="mitem__price">{formatPrecio(item.precio)}</span>
          {item.destacado && <span className="mitem__badge">Destacado</span>}
        </div>
      </div>
    </div>
  )
}

export default function Menu() {
  const [categorias, setCategorias] = useState([])
  const [activa, setActiva] = useState(null)
  const [modal, setModal] = useState(null)
  const [loading, setLoading] = useState(true)

  const reload = async () => {
    try {
      const cats = await loadCategorias()
      setCategorias(cats)
      setActiva(prev => cats.find(c => c.id === prev) ? prev : cats[0]?.id)
    } catch (e) {
      console.error('[Menu]', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { reload() }, [])
  useEffect(() => onMenuUpdate(reload), [])

  const visibles = categorias
    .map(c => ({ ...c, items: c.items.filter(i => i.disponible !== false) }))

  const cat = visibles.find((c) => c.id === activa) || visibles[0]

  if (loading) {
    return (
      <section id="menu" className="menu-page">
        <div className="menu-content" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <p style={{ color: 'var(--cana)', opacity: 0.6 }}>Cargando menú…</p>
        </div>
      </section>
    )
  }

  if (visibles.length === 0) {
    return (
      <section id="menu" className="menu-page">
        <div className="menu-content" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <p style={{ color: 'var(--cana)', opacity: 0.6 }}>Menú próximamente.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="menu" className="menu-page">
      <div className="menu-page-inner">
        <aside className="menu-sidebar">
  <div className="menu-sidebar__inner">
    <div className="menu-sidebar-logo">
      <div className="menu-sidebar-title">Nuestro Menú</div>
      <div className="menu-sidebar-sub">Cocina Buen Canto</div>
    </div>
    {visibles.map((c) => (
      <button
        key={c.id}
        className={`menu-cat-btn${activa === c.id ? ' active' : ''}`}
        onClick={() => setActiva(c.id)}
      >
        <span className="menu-cat-ico">{c.emoji}</span>
        <span className="menu-cat-name">{c.nombre}</span>
        <span className="menu-cat-count">{c.items.length}</span>
      </button>
    ))}
  </div>
</aside>

        <div>
          <div className="menu-tabs-mobile">
            {visibles.map((c) => (
              <button
                key={c.id}
                className={`menu-tab-m${activa === c.id ? ' active' : ''}`}
                onClick={() => setActiva(c.id)}
              >
                {c.emoji} {c.nombre}
              </button>
            ))}
          </div>

          <div className="menu-content">
            {cat && (
              <div className="menu-content-header">
                <div className="menu-content-cat">Menú CBC</div>
                <h2 className="menu-content-title">{cat.nombre}</h2>
                <p className="menu-content-desc">{cat.descripcion}</p>
              </div>
            )}
            <div className="menu-items-grid">
              {cat && cat.items.map((item) => (
                <MenuItem key={item.id} item={item} onClick={setModal} />
              ))}
            </div>
            {cat && cat.items.length === 0 && (
              <p style={{ color: 'var(--cana)', opacity: 0.5, textAlign: 'center', padding: '2rem' }}>
                Sin productos en esta categoría aún.
              </p>
            )}
          </div>
        </div>
      </div>

      {modal && <Modal item={modal} catNombre={cat?.nombre ?? ''} onClose={() => setModal(null)} />}
    </section>
  )
}