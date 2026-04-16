export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__glow" />
      <div className="hero__glow2" />
      <div className="hero__line" />

      <div className="hero__inner">
        <div>
          <div className="hero__tag">
            <span className="hero__dot" />
            El Caney &middot; Cali, Valle del Cauca
          </div>

          <h1 className="hero__h1">
            Cocina<br />
            <em>Buen</em><br />
            Canto
          </h1>

          <p className="hero__sub">
            Hamburguesas al carb&#243;n y parrilla con saz&#243;n valluna aut&#233;ntica.
            Fuego real, ingredientes frescos y el sabor de Cali en cada plato.
          </p>

          <div className="hero__ctas">
            <a href="#menu" className="btn btn-fill">Ver el men&#250;</a>
            <a href="https://wa.me/573157443542" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              WhatsApp
            </a>
          </div>

          <div className="hero__stats">
            <div>
              <span className="hero__stat-val">5+</span>
              <span className="hero__stat-lbl">A&#241;os de sabor</span>
            </div>
            <div>
              <span className="hero__stat-val">100%</span>
              <span className="hero__stat-lbl">Al carb&#243;n</span>
            </div>
            <div>
              <span className="hero__stat-val">El Caney</span>
              <span className="hero__stat-lbl">Cali, Valle</span>
            </div>
          </div>
        </div>

        <div className="hero__right">
          <div className="hero__frame">
            <div className="hero__frame-ph">
              <span style={{ fontSize: '3rem', opacity: 0.2 }}>🍔</span>
              <span>Foto principal</span>
            </div>
          </div>
          <div className="hero__chip">
            <div className="hero__chip-ico">🔥</div>
            <div>
              <strong>Al carb&#243;n</strong>
              <span>Parrilla artesanal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}