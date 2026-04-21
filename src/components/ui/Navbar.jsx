import { useState, useEffect } from 'react'

const links = [
  { href: '#quienes-somos', label: 'Nosotros' },
  { href: '#historia',      label: 'Historia' },
  { href: '#menu',          label: 'Menú' },
  { href: '#resenas',       label: 'Reseñas' },
  { href: '#como-llegar',   label: 'Cómo llegar' },
]

export default function Navbar() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen]   = useState(false)

  useEffect(() => {
    const fn = () => setStuck(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className={`nav${stuck ? ' stuck' : ''}`}>
        <div className="nav__row">
          <a href="#" className="nav__brand" onClick={close} aria-label="Cocina Buen Canto - Inicio">

            {/* 🔸 LOGO REDONDO CBC (vertical, sobre círculo naranja) */}
            <div className="nav__badge">
              <span className="logo-mask logo-mask--vertical" role="img" aria-label="CBC" />
            </div>

            {/* 🔸 LOGO WORDMARK "Cocina · Buen · Canto" (horizontal, al lado del círculo) */}
            <span className="logo-mask logo-mask--horizontal nav__wordmark" role="img" aria-label="Cocina Buen Canto" />

          </a>
          <nav>
            <ul className="nav__links">
              {links.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="nav__right">
            <a href="https://wa.me/573157443542" target="_blank" rel="noopener noreferrer" className="btn btn-fill nav__wa">
              WhatsApp
            </a>
            <button className={`nav__burger${open ? ' open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menú">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`nav__drawer${open ? ' open' : ''}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} className="nav__drawer-link" onClick={close}>{l.label}</a>
        ))}
        <div className="nav__drawer-footer">
          <div className="nav__drawer-info">
            <strong>Horario</strong>
            Martes a Domingo — 5:00 pm a 11:00 pm
          </div>
          <div className="nav__drawer-info">
            <strong>Ubicación</strong>
            Cali, Valle del Cauca
          </div>
          <a href="https://wa.me/573157443542" target="_blank" rel="noopener noreferrer" className="btn btn-fill btn-full" onClick={close}>
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}