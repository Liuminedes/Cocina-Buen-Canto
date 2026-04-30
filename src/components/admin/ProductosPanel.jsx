import { useState, useMemo } from 'react'
import {
  createProducto, updateProducto, deleteProducto,
  uploadImagen, deleteImagen,
} from '../../lib/supabase'
import { notifyUpdate, formatPrecio } from '../../data/menu'

export default function ProductosPanel({ categorias, onChange }) {
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

  const refresh = () => { onChange?.(); notifyUpdate() }

  const handleDelete = async (p) => {
    if (!confirm(`¿Eliminar "${p.nombre}"?`)) return
    try {
      if (p.imagen_path) await deleteImagen(p.imagen_path)
      await deleteProducto(p.id)
      refresh()
    } catch (e) {
      alert('Error al eliminar: ' + e.message)
    }
  }

  const togglePropiedad = async (p, prop) => {
    try {
      await updateProducto(p.id, { [prop]: !p[prop] })
      refresh()
    } catch (e) {
      alert('Error: ' + e.message)
    }
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
            type="text" className="finput pp__search"
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
          onSaved={() => { setEditing(null); setCreating(false); refresh() }}
        />
      )}
    </div>
  )
}

function ProductoModal({ producto, categorias, onClose, onSaved }) {
  const isNew = !producto
  const [form, setForm] = useState({
    nombre: producto?.nombre ?? '',
    descripcion: producto?.descripcion ?? '',
    precio: producto?.precio ?? '',
    categoria_id: producto?.categoria_id ?? categorias[0]?.id ?? '',
    destacado: producto?.destacado ?? false,
    disponible: producto?.disponible !== false,
    orden: producto?.orden ?? 0,
  })
  const [imagenFile, setImagenFile] = useState(null)
  const [preview, setPreview] = useState(producto?.imagen ?? null)
  const [removeImage, setRemoveImage] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const onFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 5 * 1024 * 1024) {
      setError('La imagen no puede pesar más de 5 MB')
      return
    }
    setError('')
    setImagenFile(f)
    setPreview(URL.createObjectURL(f))
    setRemoveImage(false)
  }

  const quitarImagen = () => {
    setImagenFile(null)
    setPreview(null)
    setRemoveImage(true)
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.nombre.trim()) return setError('El nombre es obligatorio')
    if (!form.categoria_id) return setError('Selecciona una categoría')
    if (Number(form.precio) < 0) return setError('Precio inválido')

    setSaving(true)
    try {
      const payload = {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        precio: Number(form.precio) || 0,
        categoria_id: form.categoria_id,
        destacado: form.destacado,
        disponible: form.disponible,
        orden: Number(form.orden) || 0,
      }

      if (isNew) {
        const creado = await createProducto(payload)
        if (imagenFile) {
          const { path, publicUrl } = await uploadImagen(imagenFile, creado.id)
          await updateProducto(creado.id, { imagen: publicUrl, imagen_path: path })
        }
      } else {
        let imagen      = producto.imagen
        let imagen_path = producto.imagen_path

        if (imagenFile) {
          const up = await uploadImagen(imagenFile, producto.id)
          if (producto.imagen_path) await deleteImagen(producto.imagen_path)
          imagen = up.publicUrl
          imagen_path = up.path
        } else if (removeImage && producto.imagen_path) {
          await deleteImagen(producto.imagen_path)
          imagen = null
          imagen_path = null
        }

        await updateProducto(producto.id, { ...payload, imagen, imagen_path })
      }

      onSaved()
    } catch (e) {
      setError(e.message || 'Error al guardar')
    } finally {
      setSaving(false)
    }
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
          <div>
            <label className="flabel">Imagen del producto</label>
            <div className="pm__dropzone">
              {preview ? (
                <div className="pm__preview">
                  <img src={preview} alt="Preview" />
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
            {preview && (
              <label className="pm__replace">
                <input type="file" accept="image/*" onChange={onFile} hidden />
                🔄 Cambiar imagen
              </label>
            )}
          </div>

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
                placeholder="32000" required
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
            <div className="pm__col">
              <label className="flabel">Orden</label>
              <input
                type="number" className="finput" min="0"
                value={form.orden}
                onChange={(e) => setForm({ ...form, orden: e.target.value })}
              />
            </div>
            <div className="pm__col pm__col--checks">
              <label className="pm__check">
                <input type="checkbox" checked={form.destacado}
                  onChange={(e) => setForm({ ...form, destacado: e.target.checked })} />
                <span>★ Destacado</span>
              </label>
              <label className="pm__check">
                <input type="checkbox" checked={form.disponible}
                  onChange={(e) => setForm({ ...form, disponible: e.target.checked })} />
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