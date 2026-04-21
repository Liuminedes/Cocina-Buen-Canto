export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__pattern" />
      <div className="hero__blob hero__blob1" />
      <div className="hero__blob hero__blob2" />
      <div className="hero__accent" />

      <div className="hero__inner">
        <div>
          <div className="hero__tag">
            <span className="hero__tag-dot" />
            Cali, Valle del Cauca
          </div>

          <h1 className="hero__h1">
            Cocina<br />
            <em>Buen</em><br />
            Canto
          </h1>

          <p className="hero__refran">
            “A la mejor cocinera, se le ahuma la olla.”
          </p>

          <p className="hero__sub">
            Reinterpretamos la cocina colombiana desde el fuego,
            la tradición y el orgullo valluno.
            Parrilla de autor con alma caleña.
          </p>

          <div className="hero__ctas">
            <a href="#menu" className="btn btn-fill">Ver el menú</a>
            <a href="https://wa.me/573157443542" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              WhatsApp
            </a>
          </div>

          <div className="hero__stats">
            <div>
              <span className="hero__stat-val">5+</span>
              <span className="hero__stat-lbl">Años de sabor</span>
            </div>
            <div>
              <span className="hero__stat-val">100%</span>
              <span className="hero__stat-lbl">Al carbón</span>
            </div>
            <div>
              <span className="hero__stat-val">Cali</span>
              <span className="hero__stat-lbl">Valle del Cauca</span>
            </div>
          </div>
        </div>

        <div className="hero__right">
          <div className="hero__frame">

            {/* 🔸 LOGO GRANDE CBC (vertical, como elemento principal del frame) */}
            <span className="logo-mask logo-mask--vertical hero__frame-logo" role="img" aria-label="Cocina Buen Canto" />

          </div>
          <div className="hero__chip">
            <div className="hero__chip-ico">🔥</div>
            <div>
              <strong>Al carbón</strong>
              <span>Parrilla artesanal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}