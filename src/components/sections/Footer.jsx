const nav = [
  ['#quienes-somos', 'Quiénes somos'],
  ['#historia',      'Historia'],
  ['#menu',          'Menú'],
  ['#resenas',       'Reseñas'],
  ['#como-llegar',   'Cómo llegar'],
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__g">
          <div>
            <div className="footer__brand">

              {/* 🔸 LOGO REDONDO CBC (vertical, sobre círculo naranja) */}
              <div className="footer__badge">
                <span className="logo-mask logo-mask--vertical" role="img" aria-label="CBC" />
              </div>

              {/* 🔸 LOGO WORDMARK "Cocina · Buen · Canto" (horizontal, al lado) */}
              <span className="logo-mask logo-mask--horizontal footer__wordmark" role="img" aria-label="Cocina Buen Canto" />

            </div>
            <div style={{ width: '2rem', height: '2px', background: 'var(--cascara)', marginBottom: '1rem' }} />
            <p className="footer__tag">
              Reinterpretando la cocina colombiana desde el fuego,
              la tradición y el orgullo valluno. Cali, Valle del Cauca.
            </p>
          </div>
          <div>
            <div className="footer__h">Navegación</div>
            <div className="footer__l">
              {nav.map((item) => <a key={item[0]} href={item[0]}>{item[1]}</a>)}
            </div>
          </div>
          <div>
            <div className="footer__h">Contacto</div>
            <div className="footer__l">
              <a href="https://wa.me/573157443542" target="_blank" rel="noopener noreferrer">+57 315 744 3542</a>
              <a href="https://www.instagram.com/cocinabuencanto/" target="_blank" rel="noopener noreferrer">@cocinabuencanto</a>
              <span>Cali, Valle del Cauca, Colombia</span>
              <span>Mar – Dom &nbsp;|&nbsp; 5:00 pm – 11:00 pm</span>
            </div>
          </div>
        </div>
        <div className="footer__bot">
          <p className="footer__copy">© {new Date().getFullYear()} Cocina Buen Canto · Todos los derechos reservados</p>
          <p className="footer__cred">Desarrollado por <span>Vyntra Orbit</span></p>
        </div>
      </div>
    </footer>
  )
}