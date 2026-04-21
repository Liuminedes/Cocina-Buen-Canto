import { useState } from 'react'
import { loadCategorias, saveCategorias } from '../../data/menu'

export default function CategoriasPanel({ categorias }) {
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)

  const handleDelete = (c) => {
    const n = c.items.length
    const msg = n > 0
      ? `La categoría "${c.nombre}" tiene ${n} producto(s). Se eliminarán también. ¿Continuar?`
      : `¿Eliminar la categoría "${c.nombre}"?`
    if (!confirm(msg)) return

    const all = loadCategorias()
    saveCategorias(all.filter(x => x.id !== c.id))
  }

  return (
    <div className="pp">
      <div className="pp__toolbar">
        <div className="pp__head-info">
          <h2 className="pp__heading">Categorías del menú</h2>
          <p className="pp__subheading">
            Organiza los productos en secciones. El orden afecta cómo aparecen en el menú público.
          </p>
        </div>
        <div className="pp__actions">
          <button className="btn btn-fill" onClick={() => setCreating(true)}>
            + Nueva categoría
          </button>
        </div>
      </div>

      {categorias.length === 0 ? (
        <div className="admin__empty">No hay categorías. Crea la primera.</div>
      ) : (
        <div className="cat-grid">
          {categorias.map(c => (
            <div key={c.id} className="cat-card">
              <div className="cat-card__emoji">{c.emoji || '🍽️'}</div>
              <div className="cat-card__body">
                <div className="cat-card__id">{c.id}</div>
                <h3 className="cat-card__name">{c.nombre}</h3>
                <p className="cat-card__desc">{c.descripcion || 'Sin descripción'}</p>
                <div className="cat-card__meta">
                  <span className="cat-card__count">{c.items.length} productos</span>
                  <span className="cat-card__orden">Orden: {c.orden ?? 0}</span>
                </div>
              </div>
              <div className="cat-card__actions">
                <button className="pcard__btn" onClick={() => setEditing(c)}>✏️</button>
                <button className="pcard__btn pcard__btn--danger" onClick={() => handleDelete(c)}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(editing || creating) && (
        <CategoriaModal
          categoria={editing}
          existingIds={categorias.map(c => c.id)}
          onClose={() => { setEditing(null); setCreating(false) }}
        />
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════
function CategoriaModal({ categoria, existingIds, onClose }) {
  const isNew = !categoria
  const [form, setForm] = useState({
    id: categoria?.id ?? '',
    nombre: categoria?.nombre ?? '',
    descripcion: categoria?.descripcion ?? '',
    emoji: categoria?.emoji ?? '🍽️',
    orden: categoria?.orden ?? 0,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setError('')

    if (!form.nombre.trim()) return setError('El nombre es obligatorio')
    if (!form.id.trim()) return setError('El ID es obligatorio')
    if (!/^[a-z0-9-_]+$/.test(form.id)) {
      return setError('El ID solo admite minúsculas, números, guiones y guion bajo')
    }
    if (isNew && existingIds.includes(form.id)) {
      return setError('Ya existe una categoría con ese ID')
    }

    setSaving(true)
    const all = loadCategorias()
    let updated
    if (isNew) {
      updated = [...all, { ...form, orden: Number(form.orden) || 0, items: [] }]
    } else {
      updated = all.map(c =>
        c.id === categoria.id
          ? { ...c, ...form, orden: Number(form.orden) || 0 }
          : c
      )
    }
    const ok = saveCategorias(updated)
    setSaving(false)
    if (ok) onClose()
  }

  return (
    <div className="pm-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="pm pm--sm">
        <header className="pm__head">
          <div>
            <div className="pm__eyebrow">{isNew ? 'Nueva categoría' : 'Editar categoría'}</div>
            <h2 className="pm__title">{form.nombre || 'Sin nombre'}</h2>
          </div>
          <button className="pm__close" onClick={onClose} aria-label="Cerrar">✕</button>
        </header>

        <form onSubmit={submit} className="pm__body">
          <div className="pm__grid">
            <div className="pm__col">
              <label className="flabel">ID (slug) *</label>
              <input
                type="text" className="finput"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value.toLowerCase() })}
                placeholder="burgers"
                disabled={!isNew}
                required
              />
              <small className="pm__hint">Identificador único. No se puede cambiar después.</small>
            </div>
            <div className="pm__col">
              <label className="flabel">Emoji</label>
              <input
                type="text" className="finput"
                value={form.emoji}
                onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                maxLength={2}
                placeholder="🍔"
              />
            </div>
            <div className="pm__col pm__col--wide">
              <label className="flabel">Nombre *</label>
              <input
                type="text" className="finput"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Burgers"
                required
              />
            </div>
            <div className="pm__col pm__col--wide">
              <label className="flabel">Descripción</label>
              <textarea
                rows={2} className="finput"
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                placeholder="Hamburguesas al carbón con ingredientes seleccionados"
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
          </div>

          {error && <div className="pm__error">⚠️ {error}</div>}

          <footer className="pm__foot">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-fill" disabled={saving}>
              {saving ? 'Guardando…' : (isNew ? 'Crear' : 'Guardar')}
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}