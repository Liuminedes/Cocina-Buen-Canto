const nav = [
  ['#quienes-somos', 'Qui\u00e9nes somos'],
  ['#historia',      'Historia'],
  ['#menu',          'Men\u00fa'],
  ['#resenas',       'Rese\u00f1as'],
  ['#como-llegar',   'C\u00f3mo llegar'],
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__g">
          <div>
            <div className="footer__brand">
              <div className="footer__badge">C\u00b7B\u00b7C</div>
              <span className="footer__bname">Cocina Buen Canto</span>
            </div>
            <div style={{ width: '2rem', height: '2px', background: 'var(--cascara)', marginBottom: '1.1rem' }} />
            <p className="footer__tag">
              Reinterpretando la cocina colombiana desde el fuego, la tradici\u00f3n
              y el orgullo valluno. Cali, Valle del Cauca.
            </p>
          </div>
          <div>
            <div className="footer__h">Navegaci\u00f3n</div>
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
              <span>Mar \u2013 Dom &nbsp;|&nbsp; 5:00 pm \u2013 11:00 pm</span>
            </div>
          </div>
        </div>
        <div className="footer__bot">
          <p className="footer__copy">&copy; {new Date().getFullYear()} Cocina Buen Canto &middot; Todos los derechos reservados</p>
          <p className="footer__cred">Desarrollado por <span>Vyntra Orbit</span></p>
        </div>
      </div>
    </footer>
  )
}