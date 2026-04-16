import { useState } from 'react'
import { categorias, formatPrecio } from '../../data/menu'

function Modal({ item, onClose }) {
  if (!item) return null
  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <div className="modal__img">
          {item.imagen
            ? <img src={item.imagen} alt={item.nombre} />
            : (
              <div className="modal__img-ph">
                <span style={{ fontSize: '2.5rem', opacity: 0.25 }}>🍽</span>
                <span>Foto pr&#243;ximamente</span>
              </div>
            )
          }
          <button className="modal__close" onClick={onClose}>&#x2715;</button>
        </div>

        <div className="modal__body">
          {item.destacado && (
            <span className="modal__badge">Destacado</span>
          )}
          <h3 className="modal__name">{item.nombre}</h3>
          <div className="modal__line" />
          <p className="modal__desc">{item.descripcion}</p>
          <span className="modal__price">{formatPrecio(item.precio)}</span>
          <a
            href={`https://wa.me/573157443542?text=Hola%21%20Me%20interesa%20${encodeURIComponent(item.nombre)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="modal__wa"
          >
            <span>&#9742;</span>
            Preguntar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

function MenuCard({ item, onClick }) {
  return (
    <div className="mcard" onClick={() => onClick(item)}>
      <div className="mcard__thumb">
        {item.imagen
          ? <img src={item.imagen} alt={item.nombre} />
          : (
            <div className="mcard__ph">
              <span style={{ fontSize: '1.75rem' }}>🍽</span>
              <span>Foto pr&#243;ximamente</span>
            </div>
          )
        }
        {item.destacado && <span className="mcard__badge">Destacado</span>}
        <div className="mcard__expand">&#x2B24;</div>
      </div>
      <div className="mcard__body">
        <div className="mcard__name">{item.nombre}</div>
        <div className="mcard__desc">{item.descripcion}</div>
        <div className="mcard__foot">
          <span className="mcard__price">{formatPrecio(item.precio)}</span>
          <span className="mcard__cta">Ver m&#225;s &#8594;</span>
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
    <section id="menu" className="section" style={{ background: 'var(--cbc-carbon)' }}>
      <div className="wrap">
        <div className="sh">
          <span className="overline">Lo que ofrecemos</span>
          <h2>Nuestro Men&#250;</h2>
          <span className="divider" />
          <p style={{ marginTop: '1.1rem' }}>
            Ingredientes frescos, fuego de carb&#243;n, sabor valluno.
          </p>
        </div>

        <div className="menu-tabs">
          {categorias.map((c) => (
            <button
              key={c.id}
              className={`menu-tab${activa === c.id ? ' active' : ''}`}
              onClick={() => setActiva(c.id)}
            >
              {c.emoji} {c.nombre}
            </button>
          ))}
        </div>

        {cat && (
          <p style={{ textAlign: 'center', fontSize: '0.78rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--cbc-crema-dim)', marginBottom: '2.5rem' }}>
            {cat.descripcion}
          </p>
        )}

        <div className="menu-grid">
          {cat && cat.items.map((item) => (
            <MenuCard key={item.id} item={item} onClick={setModal} />
          ))}
        </div>
      </div>

      {modal && <Modal item={modal} onClose={() => setModal(null)} />}
    </section>
  )
}