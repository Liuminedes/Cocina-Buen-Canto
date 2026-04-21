// Seed inicial: se usa la primera vez que se carga la app
const SEED = [
  {
    id: 'burgers',
    nombre: 'Burgers',
    descripcion: 'Hamburguesas al carbón con ingredientes seleccionados',
    emoji: '🍔',
    orden: 1,
    items: [
      { id: 1, nombre: 'Burger Caramela', descripcion: '150g carne de res, pan brioche, queso americano, aros de cebolla, tocineta y salsa de caramelo salado.', precio: 32000, imagen: null, destacado: true, disponible: true },
      { id: 2, nombre: 'Burger Clásica', descripcion: '150g carne de res, pan brioche, tomate, lechuga, cebolla morada, tocineta, queso y salsa de la casa.', precio: 30000, imagen: null, destacado: false, disponible: true },
      { id: 3, nombre: 'Burger Quesos', descripcion: '200g carne rellena de queso doble crema, pan brioche, aros de cebolla, queso americano y salsa de la casa.', precio: 35000, imagen: null, destacado: false, disponible: true },
      { id: 4, nombre: 'Burger CBC', descripcion: '150g chuleta de cerdo, hogao, queso doble crema, pan brioche, guacamole, chips de plátano y salsa de la casa.', precio: 35000, imagen: null, destacado: true, disponible: true },
      { id: 5, nombre: 'Burger Parrillera', descripcion: '200g carne (chorizo y res), pan brioche, chimichurri, tomates cherry, cebolla caramelizada y suero costeño.', precio: 35000, imagen: null, destacado: false, disponible: true },
    ],
  },
  {
    id: 'parrilla',
    nombre: 'Parrilla',
    descripcion: 'Cortes y preparaciones directo del carbón',
    emoji: '🔥',
    orden: 2,
    items: [
      { id: 6, nombre: 'Bondiola de Cerdo', descripcion: '300g corte del cuello y lomo superior, jugoso por su marmoleo, con chimichurri.', precio: 42000, imagen: null, destacado: false, disponible: true },
      { id: 7, nombre: 'Churrasco de Pollo Especial', descripcion: '300g pierna-pernil deshuesada con salsa de panela y limoncillo, y puré de papa amarilla.', precio: 40000, imagen: null, destacado: true, disponible: true },
      { id: 8, nombre: 'Costillas San Louis BBQ', descripcion: 'Costillas de cerdo estilo San Louis con salsa BBQ artesanal.', precio: 45000, imagen: null, destacado: false, disponible: true },
      { id: 9, nombre: 'Punta de Anca', descripcion: 'Corte premium de res a la parrilla de carbón.', precio: 65000, imagen: null, destacado: true, disponible: true },
    ],
  },
  {
    id: 'papas',
    nombre: 'Papas',
    descripcion: 'Acompañamientos con sazón valluno',
    emoji: '🍟',
    orden: 3,
    items: [
      { id: 10, nombre: 'Papas Chorreadas', descripcion: 'Papa sabanera al vapor con hogao, crema, queso y cilantro. Opción de agregar chicharrón.', precio: 23000, imagen: null, destacado: false, disponible: true },
      { id: 11, nombre: 'Papas Montañeras', descripcion: 'Papas criollas acompañadas de suero costeño, guacamole, hogao, carne desmechada y cebolla.', precio: 22000, imagen: null, destacado: false, disponible: true },
    ],
  },
  {
    id: 'bebidas',
    nombre: 'Bebidas',
    descripcion: 'Refrescantes opciones para acompañar',
    emoji: '🥤',
    orden: 4,
    items: [
      { id: 12, nombre: 'Coca-Cola Original 400cc', descripcion: 'Coca-Cola clásica bien fría.', precio: 6000, imagen: null, destacado: false, disponible: true },
      { id: 13, nombre: 'Coca-Cola Zero 400cc', descripcion: 'Coca-Cola Zero bien fría.', precio: 6000, imagen: null, destacado: false, disponible: true },
      { id: 14, nombre: 'Jugo de Lulo en Agua', descripcion: 'Jugo natural de lulo.', precio: 10000, imagen: null, destacado: false, disponible: true },
      { id: 15, nombre: 'Jugo de Mango en Agua', descripcion: 'Jugo natural de mango.', precio: 10000, imagen: null, destacado: false, disponible: true },
      { id: 16, nombre: 'Jugo de Mora en Agua', descripcion: 'Jugo natural de mora.', precio: 10000, imagen: null, destacado: false, disponible: true },
      { id: 17, nombre: 'Té', descripcion: 'Té frío o caliente.', precio: 6000, imagen: null, destacado: false, disponible: true },
    ],
  },
  {
    id: 'sodas',
    nombre: 'Sodas & Limonadas',
    descripcion: 'Bebidas artesanales de la casa',
    emoji: '🍋',
    orden: 5,
    items: [
      { id: 18, nombre: 'Soda de Maracuyá', descripcion: 'Refrescante soda con salsa artesanal de frutas seleccionadas.', precio: 12000, imagen: null, destacado: true, disponible: true },
      { id: 19, nombre: 'Limonada Tradicional', descripcion: 'Limón y hielo, endulzado con sirope.', precio: 10000, imagen: null, destacado: false, disponible: true },
    ],
  },
]

const STORAGE_KEY = 'cbc:menu:v1'

// Evento custom para que el menú público se actualice en vivo cuando el admin guarda
const UPDATE_EVENT = 'cbc:menu:updated'
const notifyUpdate = () => window.dispatchEvent(new Event(UPDATE_EVENT))

export const onMenuUpdate = (fn) => {
  window.addEventListener(UPDATE_EVENT, fn)
  // También escuchamos storage para sincronizar entre pestañas
  window.addEventListener('storage', (e) => { if (e.key === STORAGE_KEY) fn() })
  return () => {
    window.removeEventListener(UPDATE_EVENT, fn)
    window.removeEventListener('storage', fn)
  }
}

// ─── Lectura ─────────────────────────────────────────────
export function loadCategorias() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      // Primera vez: inicializa con seed
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED))
      return SEED
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : SEED
  } catch {
    return SEED
  }
}

// ─── Escritura ───────────────────────────────────────────
export function saveCategorias(categorias) {
  try {
    const ordered = [...categorias].sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ordered))
    notifyUpdate()
    return true
  } catch (err) {
    console.error('[menu] No se pudo guardar:', err)
    // Probablemente el localStorage está lleno (imágenes muy pesadas)
    alert('No se pudo guardar. El almacenamiento puede estar lleno. Intenta usar imágenes más pequeñas.')
    return false
  }
}

// ─── Reset a valores de fábrica ─────────────────────────
export function resetMenu() {
  localStorage.removeItem(STORAGE_KEY)
  notifyUpdate()
  return loadCategorias()
}

// ─── Export compatible con código existente ────────────
// Tu Menu.jsx antes importaba { categorias } — lo mantenemos para no romper nada,
// pero ahora el componente debe usar loadCategorias() para leer en vivo.
export const categorias = loadCategorias()

// ─── Helper de formato (ya existía, lo mantenemos) ──────
export const formatPrecio = (precio) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(Number(precio) || 0)