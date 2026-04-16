const info = [
  { ico: '📍', lbl: 'Direcci\u00f3n', val: 'Cra 90 #42-72, El Caney\nCali, Valle del Cauca' },
  { ico: '🕐', lbl: 'Horario',        val: 'Martes a Domingo\n5:00 pm - 11:00 pm' },
  { ico: '📱', lbl: 'WhatsApp',       val: '+57 315 744 3542' },
  { ico: '📸', lbl: 'Instagram',      val: '@cocinabuencanto' },
]

export default function ComoLlegar() {
  return (
    <section id="como-llegar" className="section" style={{ background: 'var(--cbc-carbon)' }}>
      <div className="wrap">
        <div className="sh">
          <span className="overline">Encuéntranos</span>
          <h2>¿Cómo llegar?</h2>
          <span className="divider" />
          <p style={{ marginTop: '1.1rem' }}>
            Estamos en El Caney, uno de los sectores más vibrantes de Cali.
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
                href="https://www.google.com/maps/place/Cra.+90+%2342-72,+Cali"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-fill"
              >
                Google Maps
              </a>
              <a
                href="https://waze.com/ul?q=Cra+90+42-72+Cali"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Waze
              </a>
            </div>
          </div>
          <div className="mapa">
            <iframe
              title="Ubicaci\u00f3n Cocina Buen Canto"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.5!2d-76.57!3d3.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMjInNDguMCJOIDc2wrAzNCcxMi4wIlc!5e0!3m2!1ses!2sco!4v1"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}