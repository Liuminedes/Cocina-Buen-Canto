const info = [
  { ico: '&#128205;', lbl: 'Direcci\u00f3n', val: 'Cali, Valle del Cauca, Colombia' },
  { ico: '&#128336;', lbl: 'Horario',        val: 'Martes a Domingo\n5:00 pm \u2013 11:00 pm' },
  { ico: '&#128241;', lbl: 'WhatsApp',       val: '+57 315 744 3542' },
  { ico: '&#128247;', lbl: 'Instagram',      val: '@cocinabuencanto' },
]

export default function ComoLlegar() {
  return (
    <section id="como-llegar" className="section llegar-bg">
      <div className="wrap">
        <div className="sh">
          <span className="overline">Encu\u00e9ntranos</span>
          <h2>\u00bfC\u00f3mo llegar?</h2>
          <span className="sh-divider" />
          <p style={{ marginTop: '1.1rem' }}>
            Estamos en Cali, Valle del Cauca. La ciudad que nos inspira en cada plato.
          </p>
        </div>

        <div className="llegar">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {info.map((item) => (
              <div key={item.lbl} className="icard">
                <span className="icard__ico" dangerouslySetInnerHTML={{ __html: item.ico }} />
                <div>
                  <div className="icard__lbl">{item.lbl}</div>
                  <div className="icard__val">{item.val}</div>
                </div>
              </div>
            ))}
            <div className="llegar-btns">
              <a
                href="https://www.google.com/maps/place/Cra.+90+%2342-72,+Cali,+Valle+del+Cauca/@3.3386,-76.5541,17z"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-fill"
              >
                Google Maps
              </a>
              <a
                href="https://waze.com/ul?ll=3.3386,-76.5541&navigate=yes"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-outline" style={{ borderColor: 'var(--cana)', color: 'var(--cana)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--cana)'; e.currentTarget.style.color = 'var(--totumo)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--cana)' }}
              >
                Waze
              </a>
            </div>
          </div>

          <div className="mapa">
            <iframe
              title="Ubicaci\u00f3n Cocina Buen Canto"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.6361!2d-76.5566!3d3.3386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6f0b8b8b8b7%3A0x0!2sCra.+90+%2342-72%2C+Cali%2C+Valle+del+Cauca!5e0!3m2!1ses!2sco!4v1"
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}