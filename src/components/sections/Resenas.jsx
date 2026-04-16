import { useState } from 'react'
import StarRating from '../ui/StarRating'
import ResenaCard from '../ui/ResenaCard'

const demo = [
  {
    id: 1, nombre: 'Daniela M.', estrellas: 5,
    comentario: 'La Burger Parrillera es incre\u00edble, el chimichurri est\u00e1 de muerte. Ambiente s\u00faper acogedor.',
    fecha: '2024-03-10'
  },
  {
    id: 2, nombre: 'Sebasti\u00e1n R.', estrellas: 5,
    comentario: 'La Punta de Anca al carb\u00f3n es lo mejor que he probado en Cali. Regreso cada semana.',
    fecha: '2024-03-15'
  },
  {
    id: 3, nombre: 'Valentina C.', estrellas: 4,
    comentario: 'Las Papas Monta\u00f1eras con carne desmechada son una locura. Todo fresco y casero.',
    fecha: '2024-03-20'
  },
]

export default function Resenas() {
  const [resenas] = useState(demo)
  const [form, setForm] = useState({ nombre: '', estrellas: 0, comentario: '' })
  const [enviado, setEnviado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const ok = form.nombre && form.estrellas && form.comentario

  const submit = async () => {
    if (!ok) return
    setCargando(true)
    await new Promise((r) => setTimeout(r, 800))
    setEnviado(true)
    setCargando(false)
  }

  return (
    <section id="resenas" className="section" style={{ background: 'var(--cbc-negro)' }}>
      <div className="wrap">
        <div className="sh">
          <span className="overline">Lo que dicen nuestros clientes</span>
          <h2>Reseñas</h2>
          <span className="divider" />
          <p style={{ marginTop: '1.1rem' }}>
            La opinión de quienes ya vivieron la experiencia CBC.
          </p>
        </div>

        <div className="resenas-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {resenas.map((r) => <ResenaCard key={r.id} resena={r} />)}
            <a
              href="https://www.google.com/maps/search/Cocina+Buen+Canto+Cali"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cbc-crema-dim)', textAlign: 'center', marginTop: '0.5rem', transition: 'color 0.2s' }}
              onMouseEnter={(e) => { e.target.style.color = 'var(--cbc-naranja)' }}
              onMouseLeave={(e) => { e.target.style.color = 'var(--cbc-crema-dim)' }}
            >
              Ver reseñas en Google Maps
            </a>
          </div>

          <div className="rform">
            {enviado ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>🙌</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--cbc-crema)', marginBottom: '0.75rem' }}>
                  \u00a1Gracias!
                </h3>
                <div style={{ width: '2rem', height: '2px', background: 'var(--cbc-naranja)', margin: '0 auto 1rem' }} />
                <p style={{ fontSize: '0.95rem' }}>Tu opinión es muy importante para nosotros.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--cbc-crema)', marginBottom: '0.5rem' }}>
                    ¿Cómo fue tu experiencia?
                  </h3>
                  <div style={{ width: '2rem', height: '2px', background: 'var(--cbc-naranja)' }} />
                </div>
                <div>
                  <label className="flabel">Tu nombre</label>
                  <input
                    type="text"
                    className="finput"
                    placeholder="Ej: Valentina"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  />
                </div>
                <div>
                  <label className="flabel">Calificación</label>
                  <StarRating value={form.estrellas} onChange={(v) => setForm({ ...form, estrellas: v })} />
                </div>
                <div>
                  <label className="flabel">Tu comentario</label>
                  <textarea
                    rows={4}
                    className="finput"
                    placeholder="Cuéntanos qué te pareció..."
                    value={form.comentario}
                    onChange={(e) => setForm({ ...form, comentario: e.target.value })}
                  />
                </div>
                <button
                  onClick={submit}
                  disabled={cargando}
                  className="btn btn-fill btn-full"
                  style={{ opacity: ok ? 1 : 0.4, cursor: ok ? 'pointer' : 'not-allowed' }}
                >
                  {cargando ? 'Enviando...' : 'Enviar rese\u00f1a'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}