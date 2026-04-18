import { hitos } from '../../data/historia'

export default function Historia() {
  return (
    <section id="historia" className="section tl-bg">
      <div className="wrap">
        <div className="sh">
          <span className="overline">De dónde venimos</span>
          <h2>Antes &amp; Después</h2>
          <span className="sh-divider" />
          <p style={{ marginTop: '1.1rem' }}>
            De una carpa en casa a un restaurante en Cali.
            Esta es la historia de <strong style={{ color: 'var(--cascara)' }}>Cocina Buen Canto</strong>.
          </p>
        </div>
        <div className="timeline">
          {hitos.map((h) => (
            <div key={h.id} className={`titem${h.lado === 'derecha' ? ' titem--r' : ''}`}>
              <div className="titem__media">
                <div style={{ padding: '2.5rem', textAlign: 'center', opacity: 0.3 }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>&#128247;</div>
                  <span style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--brasas)' }}>
                    {h.año}  –  próximamente
                  </span>
                </div>
              </div>
              <div className="titem__dot" />
              <div className="titem__text">
                <div className="titem__year">{h.año}</div>
                <h3 className="titem__title">{h.titulo}</h3>
                <div className="titem__sub">{h.subtitulo}</div>
                <div className="titem__line" />
                <p className="titem__desc">{h.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}