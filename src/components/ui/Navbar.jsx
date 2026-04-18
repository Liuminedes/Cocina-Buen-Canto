import { useState, useEffect } from 'react'

const links = [
  { href: '#quienes-somos', label: 'Nosotros' },
  { href: '#historia',      label: 'Historia' },
  { href: '#menu',          label: 'Men\u00fa' },
  { href: '#resenas',       label: 'Rese\u00f1as' },
  { href: '#como-llegar',   label: 'C\u00f3mo llegar' },
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
          <a href="#" className="nav__brand" onClick={close}>
            <div className="nav__badge">C\u00b7B\u00b7C</div>
            <span className="nav__name">Cocina Buen Canto</span>
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
            <button className={`nav__burger${open ? ' open' : ''}`} onClick={() => setOpen(!open)} aria-label="Men\u00fa">
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
            Martes a Domingo &mdash; 5:00 pm a 11:00 pm
          </div>
          <div className="nav__drawer-info">
            <strong>Ubicaci\u00f3n</strong>
            Cali, Valle del Cauca, Colombia
          </div>
          <a href="https://wa.me/573157443542" target="_blank" rel="noopener noreferrer" className="btn btn-fill btn-full" onClick={close}>
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}