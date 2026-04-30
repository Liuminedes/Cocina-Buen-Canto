import { fetchCategorias, fetchProductos } from '../lib/supabase'

const UPDATE_EVENT = 'cbc:menu:updated'
export const notifyUpdate = () => window.dispatchEvent(new Event(UPDATE_EVENT))
export const onMenuUpdate = (fn) => {
  window.addEventListener(UPDATE_EVENT, fn)
  return () => window.removeEventListener(UPDATE_EVENT, fn)
}

export async function loadCategorias() {
  const [cats, prods] = await Promise.all([fetchCategorias(), fetchProductos()])
  return cats
    .map(c => ({
      ...c,
      items: prods
        .filter(p => p.categoria_id === c.id)
        .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0)),
    }))
    .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
}

export const formatPrecio = (precio) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', minimumFractionDigits: 0,
  }).format(Number(precio) || 0)