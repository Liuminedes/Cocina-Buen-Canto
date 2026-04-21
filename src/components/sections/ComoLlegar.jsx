const info = [
  { ico: '📍', lbl: 'Ubicación', val: 'Cali, Valle del Cauca\nColombia' },
  { ico: '🕐', lbl: 'Horario',   val: 'Martes a Domingo\n5:00 pm – 11:00 pm' },
  { ico: '📱', lbl: 'WhatsApp',  val: '+57 315 744 3542' },
  { ico: '📷', lbl: 'Instagram', val: '@cocinabuencanto' },
]

export default function ComoLlegar() {
  return (
    <section id="como-llegar" className="section llegar-bg">
      <div className="wrap">
        <div className="sh">
          <span className="overline">Encuéntranos</span>
          <h2>¿Cómo llegar?</h2>
          <span className="sh-divider" />
          <p style={{ marginTop: '1.1rem' }}>
            Estamos en Cali, Valle del Cauca. La ciudad que nos inspira en cada plato.
          </p>
        </div>

        <div className="llegar">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {info.map((item) => (
              <div key={item.lbl} className="icard">
                <span className="icard__ico">{item.ico}</span>
                <div>
                  <div className="icard__lbl">{item.lbl}</div>
                  <div className="icard__val">{item.val}</div>
                </div>
              </div>
            ))}
            <div className="llegar-btns">
              <a
                href="https://www.google.com/maps/place/Cra.+90+%2342-72,+Cali,+Valle+del+Cauca/@3.3386,-76.5566,17z"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-fill"
              >
                Google Maps
              </a>
              <a
                href="https://waze.com/ul?ll=3.3386,-76.5566&navigate=yes"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ borderColor: 'var(--cana)', color: 'var(--cana)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--cana)'; e.currentTarget.style.color = 'var(--totumo)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--cana)' }}
              >
                Waze
              </a>
            </div>
          </div>

          <div className="mapa">
            <iframe
              title="Ubicación Cocina Buen Canto"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.636!2d-76.5590!3d3.3386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a13f7daad275%3A0x7a2e2e4e4e4e4e4e!2sCra.+90+%2342-72%2C+Cali%2C+Valle+del+Cauca!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}