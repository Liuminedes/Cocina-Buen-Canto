import { useState, useEffect } from 'react'
import { categorias, formatPrecio } from '../../data/menu'

function Modal({ item, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  if (!item) return null

  const catNombre = categorias.find(c => c.items.some(i => i.id === item.id))?.nombre || ''

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <div className="modal__img">
          {item.imagen
            ? <img src={item.imagen} alt={item.nombre} />
            : (
              <div className="modal__img-ph">
                <span style={{ fontSize: '3rem', opacity: 0.2 }}>&#127859;</span>
                <span>Foto pr&#243;ximamente</span>
              </div>
            )
          }
          <button className="modal__close" onClick={onClose}>&#x2715;</button>
        </div>
        <div className="modal__body">
          <div className="modal__cat">{catNombre}</div>
          <h3 className="modal__name">{item.nombre}</h3>
          <div className="modal__line" />
          <p className="modal__desc">{item.descripcion}</p>
          <span className="modal__price">{formatPrecio(item.precio)}</span>
          <a
            href={`https://wa.me/573157443542?text=${encodeURIComponent('Hola! Me interesa el ' + item.nombre + ' del men\u00fa de Cocina Buen Canto.')}`}
            target="_blank"
            rel="noopener noreferrer"
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
          : <div className="mitem__thumb-ph">&#127859;</div>
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
  const [activa, setActiva] = useState('burgers')
  const [modal, setModal]   = useState(null)
  const cat = categorias.find((c) => c.id === activa)

  return (
    <section id="menu" className="menu-page">
      <div className="menu-page-inner">

        <aside className="menu-sidebar">
          <div className="menu-sidebar-logo">
            <div className="menu-sidebar-title">Nuestro Men&#250;</div>
            <div className="menu-sidebar-sub">Cocina Buen Canto</div>
          </div>
          {categorias.map((c) => (
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
        </aside>

        <div>
          <div className="menu-tabs-mobile">
            {categorias.map((c) => (
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
                <div className="menu-content-cat">Men&#250; CBC</div>
                <h2 className="menu-content-title">{cat.nombre}</h2>
                <p className="menu-content-desc">{cat.descripcion}</p>
              </div>
            )}
            <div className="menu-items-grid">
              {cat && cat.items.map((item) => (
                <MenuItem key={item.id} item={item} onClick={setModal} />
              ))}
            </div>
          </div>
        </div>

      </div>

      {modal && <Modal item={modal} onClose={() => setModal(null)} />}
    </section>
  )
}