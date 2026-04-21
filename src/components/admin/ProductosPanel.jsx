import { useState, useMemo } from 'react'
import { loadCategorias, saveCategorias, formatPrecio } from '../../data/menu'

// Convertir archivo a base64 redimensionando si es muy grande
function imageToBase64(file, maxWidth = 1200) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = (e) => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        // Redimensionar si excede maxWidth
        let { width, height } = img
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

export default function ProductosPanel({ categorias }) {
  const [filtro, setFiltro] = useState('all')
  const [busqueda, setBusqueda] = useState('')
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)

  const allProductos = useMemo(() => {
    return categorias.flatMap(c => c.items.map(i => ({ ...i, categoria_id: c.id })))
  }, [categorias])

  const filtrados = useMemo(() => {
    return allProductos.filter(p => {
      if (filtro !== 'all' && p.categoria_id !== filtro) return false
      if (busqueda && !p.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false
      return true
    })
  }, [allProductos, filtro, busqueda])

  const catMap = useMemo(
    () => Object.fromEntries(categorias.map(c => [c.id, c])),
    [categorias]
  )

  const handleDelete = (p) => {
    if (!confirm(`¿Eliminar "${p.nombre}"?`)) return
    const all = loadCategorias()
    const updated = all.map(c => ({
      ...c,
      items: c.items.filter(i => i.id !== p.id),
    }))
    saveCategorias(updated)
  }

  const togglePropiedad = (p, prop) => {
    const all = loadCategorias()
    const updated = all.map(c => ({
      ...c,
      items: c.items.map(i => i.id === p.id ? { ...i, [prop]: !i[prop] } : i),
    }))
    saveCategorias(updated)
  }

  return (
    <div className="pp">
      <div className="pp__toolbar">
        <div className="pp__filters">
          <button
            className={`pp__chip${filtro === 'all' ? ' active' : ''}`}
            onClick={() => setFiltro('all')}
          >
            Todas <span className="pp__chip-count">{allProductos.length}</span>
          </button>
          {categorias.map(c => (
            <button
              key={c.id}
              className={`pp__chip${filtro === c.id ? ' active' : ''}`}
              onClick={() => setFiltro(c.id)}
            >
              {c.emoji} {c.nombre}
              <span className="pp__chip-count">{c.items.length}</span>
            </button>
          ))}
        </div>

        <div className="pp__actions">
          <input
            type="text"
            className="finput pp__search"
            placeholder="Buscar producto…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button
            className="btn btn-fill"
            onClick={() => setCreating(true)}
            disabled={categorias.length === 0}
          >
            + Nuevo producto
          </button>
        </div>
      </div>

      {filtrados.length === 0 ? (
        <div className="admin__empty">
          {busqueda || filtro !== 'all'
            ? 'No hay productos que coincidan con los filtros.'
            : 'Aún no hay productos. Crea el primero con el botón arriba.'}
        </div>
      ) : (
        <div className="pp__grid">
          {filtrados.map(p => (
            <article key={p.id} className={`pcard${p.disponible === false ? ' pcard--off' : ''}`}>
              <div className="pcard__thumb">
                {p.imagen
                  ? <img src={p.imagen} alt={p.nombre} />
                  : <div className="pcard__thumb-ph">🍽️</div>
                }
                {p.destacado && <span className="pcard__badge">★ Destacado</span>}
                {p.disponible === false && <span className="pcard__off-tag">Oculto</span>}
              </div>
              <div className="pcard__body">
                <div className="pcard__cat">
                  {catMap[p.categoria_id]?.emoji} {catMap[p.categoria_id]?.nombre}
                </div>
                <h3 className="pcard__name">{p.nombre}</h3>
                <p className="pcard__desc">{p.descripcion || 'Sin descripción'}</p>
                <div className="pcard__price">{formatPrecio(p.precio)}</div>
                <div className="pcard__actions">
                  <button className="pcard__btn" onClick={() => setEditing(p)}>
                    ✏️ Editar
                  </button>
                  <button
                    className={`pcard__btn${p.destacado ? ' pcard__btn--active' : ''}`}
                    onClick={() => togglePropiedad(p, 'destacado')}
                    title="Destacado"
                  >★</button>
                  <button
                    className={`pcard__btn${p.disponible === false ? ' pcard__btn--active' : ''}`}
                    onClick={() => togglePropiedad(p, 'disponible')}
                    title={p.disponible === false ? 'Mostrar' : 'Ocultar'}
                  >{p.disponible === false ? '👁️‍🗨️' : '👁️'}</button>
                  <button
                    className="pcard__btn pcard__btn--danger"
                    onClick={() => handleDelete(p)}
                  >🗑️</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {(editing || creating) && (
        <ProductoModal
          producto={editing}
          categorias={categorias}
          onClose={() => { setEditing(null); setCreating(false) }}
        />
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════
function ProductoModal({ producto, categorias, onClose }) {
  const isNew = !producto
  const [form, setForm] = useState({
    nombre: producto?.nombre ?? '',
    descripcion: producto?.descripcion ?? '',
    precio: producto?.precio ?? '',
    categoria_id: producto?.categoria_id ?? categorias[0]?.id ?? '',
    destacado: producto?.destacado ?? false,
    disponible: producto?.disponible !== false,
    imagen: producto?.imagen ?? null,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const onFile = async (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 5 * 1024 * 1024) {
      setError('La imagen no puede pesar más de 5 MB')
      return
    }
    setError('')
    try {
      const base64 = await imageToBase64(f, 1200)
      setForm(prev => ({ ...prev, imagen: base64 }))
    } catch {
      setError('No se pudo procesar la imagen')
    }
  }

  const quitarImagen = () => {
    setForm(prev => ({ ...prev, imagen: null }))
  }

  const submit = (e) => {
    e.preventDefault()
    setError('')

    if (!form.nombre.trim()) return setError('El nombre es obligatorio')
    if (!form.categoria_id) return setError('Selecciona una categoría')
    if (Number(form.precio) < 0) return setError('Precio inválido')

    setSaving(true)

    const all = loadCategorias()
    const payload = {
      id: producto?.id ?? Date.now(),
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio) || 0,
      imagen: form.imagen,
      destacado: form.destacado,
      disponible: form.disponible,
    }

    let updated
    if (isNew) {
      // Añadir a la categoría seleccionada
      updated = all.map(c =>
        c.id === form.categoria_id
          ? { ...c, items: [...c.items, payload] }
          : c
      )
    } else {
      // Puede haber cambiado de categoría
      const categoriaActual = all.find(c => c.items.some(i => i.id === producto.id))?.id
      if (categoriaActual === form.categoria_id) {
        // Misma categoría: actualizar en el mismo array
        updated = all.map(c => ({
          ...c,
          items: c.items.map(i => i.id === producto.id ? payload : i),
        }))
      } else {
        // Cambió de categoría: sacar de la vieja, meter en la nueva
        updated = all.map(c => {
          if (c.id === categoriaActual) {
            return { ...c, items: c.items.filter(i => i.id !== producto.id) }
          }
          if (c.id === form.categoria_id) {
            return { ...c, items: [...c.items, payload] }
          }
          return c
        })
      }
    }

    const ok = saveCategorias(updated)
    setSaving(false)
    if (ok) onClose()
  }

  return (
    <div className="pm-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="pm">
        <header className="pm__head">
          <div>
            <div className="pm__eyebrow">{isNew ? 'Nuevo producto' : 'Editar producto'}</div>
            <h2 className="pm__title">{form.nombre || 'Sin nombre'}</h2>
          </div>
          <button className="pm__close" onClick={onClose} aria-label="Cerrar">✕</button>
        </header>

        <form onSubmit={submit} className="pm__body">
          {/* Imagen */}
          <div>
            <label className="flabel">Imagen del producto</label>
            <div className="pm__dropzone">
              {form.imagen ? (
                <div className="pm__preview">
                  <img src={form.imagen} alt="Preview" />
                  <button type="button" className="pm__preview-del" onClick={quitarImagen}>
                    🗑️ Quitar
                  </button>
                </div>
              ) : (
                <label className="pm__upload">
                  <input type="file" accept="image/*" onChange={onFile} hidden />
                  <div className="pm__upload-ico">📷</div>
                  <div className="pm__upload-title">Selecciona una imagen</div>
                  <div className="pm__upload-hint">PNG, JPG, WEBP · máx 5 MB</div>
                </label>
              )}
            </div>
            {form.imagen && (
              <label className="pm__replace">
                <input type="file" accept="image/*" onChange={onFile} hidden />
                🔄 Cambiar imagen
              </label>
            )}
          </div>

          {/* Campos */}
          <div className="pm__grid">
            <div className="pm__col pm__col--wide">
              <label className="flabel">Nombre *</label>
              <input
                type="text" className="finput"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Ej: Burger Caramela"
                required
              />
            </div>
            <div className="pm__col">
              <label className="flabel">Precio (COP) *</label>
              <input
                type="number" className="finput" min="0" step="500"
                value={form.precio}
                onChange={(e) => setForm({ ...form, precio: e.target.value })}
                placeholder="32000"
                required
              />
            </div>
            <div className="pm__col">
              <label className="flabel">Categoría *</label>
              <select
                className="finput"
                value={form.categoria_id}
                onChange={(e) => setForm({ ...form, categoria_id: e.target.value })}
                required
              >
                {categorias.map(c => (
                  <option key={c.id} value={c.id}>{c.emoji} {c.nombre}</option>
                ))}
              </select>
            </div>
            <div className="pm__col pm__col--wide">
              <label className="flabel">Descripción</label>
              <textarea
                rows={3} className="finput"
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                placeholder="Ingredientes, preparación, porción…"
              />
            </div>
            <div className="pm__col pm__col--checks">
              <label className="pm__check">
                <input
                  type="checkbox"
                  checked={form.destacado}
                  onChange={(e) => setForm({ ...form, destacado: e.target.checked })}
                />
                <span>★ Destacado</span>
              </label>
              <label className="pm__check">
                <input
                  type="checkbox"
                  checked={form.disponible}
                  onChange={(e) => setForm({ ...form, disponible: e.target.checked })}
                />
                <span>Visible en el menú</span>
              </label>
            </div>
          </div>

          {error && <div className="pm__error">⚠️ {error}</div>}

          <footer className="pm__foot">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-fill" disabled={saving}>
              {saving ? 'Guardando…' : (isNew ? 'Crear producto' : 'Guardar cambios')}
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}