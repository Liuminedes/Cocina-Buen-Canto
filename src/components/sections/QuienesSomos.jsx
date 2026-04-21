const vals = [
  { ico: '🔥', t: 'Al carbón', d: 'Cada corte pasa por nuestra parrilla de carbón. La misma técnica de los fogones ancestrales del Valle, sin atajos.' },
  { ico: '🌿', t: 'Origen colombiano', d: 'Hogao valluno, suero costeño, plátano del Pacífico, yuca del campo y especias de nuestra tierra.' },
  { ico: '🤝', t: 'Hecho con amor', d: 'Nacimos en casa con el espíritu de la cocina familiar colombiana. Ese calor sigue vivo en cada plato.' },
  { ico: '🎉', t: 'Orgullo caleño', d: 'Somos de Cali, Valle del Cauca. Nuestra sazón, nuestra identidad, nuestra tierra.' },
]

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="section qs-bg">
      <div className="wrap">
        <div className="sh">
          <span className="overline">Nuestra historia</span>
          <h2>¿Quiénes somos?</h2>
          <span className="sh-divider" />
          <p style={{ marginTop: '1.1rem' }}>
            Cocina Buen Canto nació del amor por la parrilla, la buena mesa y la sazón valluna.
            Lo que comenzó como un sueño en casa hoy es un restaurante que reinterpreta
            la cocina colombiana con orgullo, fuego y creatividad.
          </p>
        </div>

        {/* Composición de marca en vez de "foto del local próximamente" */}
        <div className="qs-brand-showcase">
          <span className="logo-mask logo-mask--vertical qs-brand-showcase__logo" role="img" aria-label="Cocina Buen Canto" />
          <p className="qs-brand-showcase__tagline">
            “El que es, anda con los que son.”
          </p>
          <span className="qs-brand-showcase__motto">Tradición a la mesa</span>
        </div>

        <div className="valores">
          {vals.map((v, i) => (
            <div key={i} className="vcard">
              <div className="vcard__ico">{v.ico}</div>
              <div className="vcard__title">{v.t}</div>
              <div className="vcard__desc">{v.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}