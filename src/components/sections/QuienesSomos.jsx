const vals = [
  { ico: '🔥', t: 'Al carb&#243;n', d: 'Cada corte pasa por nuestra parrilla de carb&#243;n. Sin atajos, sin excusas.' },
  { ico: '🌿', t: 'Ingredientes frescos', d: 'Hogao, guacamole, suero coste&#241;o. Productos locales de verdad.' },
  { ico: '🤝', t: 'Hecho con amor', d: 'Nacimos en casa. Ese esp&#237;ritu familiar sigue vivo en cada plato.' },
  { ico: '📍', t: 'Orgullo valluno', d: 'Somos de El Caney, Cali. Nuestra saz&#243;n, nuestra identidad.' },
]

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="section" style={{ background: 'var(--cbc-carbon)' }}>
      <div className="wrap">
        <div className="sh">
          <span className="overline">Nuestra historia</span>
          <h2>&#191;Qui&#233;nes somos?</h2>
          <span className="divider" />
          <p style={{ marginTop: '1.1rem' }}>
            Cocina Buen Canto naci&#243; del amor por la parrilla, la buena mesa y la saz&#243;n valluna.
            Lo que comenz&#243; como un sue&#241;o en casa hoy es un restaurante establecido en El Caney
            que representa lo mejor de Cali en cada bocado.
          </p>
        </div>

        <div className="ph-box">
          <span style={{ fontSize: '2.5rem' }}>📸</span>
          <span>Foto del local &#8212; pr&#243;ximamente</span>
        </div>

        <div className="valores">
          {vals.map((v) => (
            <div key={v.t} className="vcard">
              <div className="vcard__ico">{v.ico}</div>
              <div className="vcard__title" dangerouslySetInnerHTML={{ __html: v.t }} />
              <div className="vcard__desc"  dangerouslySetInnerHTML={{ __html: v.d }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}