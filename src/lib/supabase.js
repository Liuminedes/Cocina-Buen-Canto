import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('[Supabase] Falta VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en .env')
}

export const supabase = createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
})

// CATEGORÍAS
export async function fetchCategorias() {
  const { data, error } = await supabase
    .from('categorias').select('*').order('orden', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function upsertCategoria(cat) {
  const { data, error } = await supabase
    .from('categorias').upsert(cat, { onConflict: 'id' }).select().single()
  if (error) throw error
  return data
}

export async function deleteCategoria(id) {
  const { error } = await supabase.from('categorias').delete().eq('id', id)
  if (error) throw error
}

// PRODUCTOS
export async function fetchProductos() {
  const { data, error } = await supabase
    .from('productos').select('*').order('orden', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function createProducto(p) {
  const { data, error } = await supabase.from('productos').insert(p).select().single()
  if (error) throw error
  return data
}

export async function updateProducto(id, patch) {
  const { data, error } = await supabase
    .from('productos').update(patch).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteProducto(id) {
  const { error } = await supabase.from('productos').delete().eq('id', id)
  if (error) throw error
}

// STORAGE
const BUCKET = 'productos'

export async function uploadImagen(file, productoId) {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext) ? ext : 'jpg'
  const path = `${productoId || 'nuevo'}/${Date.now()}.${safeExt}`

  const { error } = await supabase.storage
    .from(BUCKET).upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type })
  if (error) throw error

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { path, publicUrl: data.publicUrl }
}

export async function deleteImagen(path) {
  if (!path) return
  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) console.warn('[Storage] no se pudo borrar', path, error.message)
}

// AUTH
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  await supabase.auth.signOut()
}

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

export function onAuthChange(cb) {
  const { data } = supabase.auth.onAuthStateChange((_e, s) => cb(s))
  return () => data.subscription.unsubscribe()
}