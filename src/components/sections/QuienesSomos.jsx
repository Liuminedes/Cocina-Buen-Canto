const vals = [
  {
    ico: '&#128293;',
    t: 'Al carb\u00f3n',
    d: 'Cada corte pasa por nuestra parrilla de carb\u00f3n. La misma t\u00e9cnica de los fogones ancestrales del Valle, sin atajos.'
  },
  {
    ico: '&#127807;',
    t: 'Origen colombiano',
    d: 'Hogao de Ginebra, suero coste\u00f1o, pl\u00e1tano del Pacifico, yuca del campo valluno. Ingredientes de nuestra tierra.'
  },
  {
    ico: '&#129309;',
    t: 'Hecho con amor',
    d: 'Nacimos en casa. Ese esp\u00edritu de cocina familiar y comunitaria sigue vivo en cada plato que sale de nuestra cocina.'
  },
  {
    ico: '&#127881;',
    t: 'Orgullo cale\u00f1o',
    d: 'Somos de Cali, Valle del Cauca. Nuestra saz\u00f3n, nuestra identidad, nuestro territorio.'
  },
]

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="section qs-bg">
      <div className="wrap">
        <div className="sh">
          <span className="overline">Nuestra historia</span>
          <h2>&iquest;Qui&eacute;nes somos?</h2>
          <span className="sh-divider" />
          <p style={{ marginTop: '1.1rem' }}>
            Cocina Buen Canto naci&oacute; del amor por la parrilla, la buena mesa y la saz&oacute;n valluna.
            Lo que comenz&oacute; como un sue&ntilde;o en casa hoy es un restaurante que reinterpreta
            la cocina colombiana con orgullo, fuego y creatividad.
          </p>
        </div>

        <div className="ph-box">
          <span style={{ fontSize: '2.5rem', opacity: 0.2 }}>&#128247;</span>
          <span>Foto del local &mdash; pr&oacute;ximamente</span>
        </div>

        <div className="valores">
          {vals.map((v, i) => (
            <div key={i} className="vcard">
              <div className="vcard__ico" dangerouslySetInnerHTML={{ __html: v.ico }} />
              <div className="vcard__title">{v.t}</div>
              <div className="vcard__desc">{v.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}