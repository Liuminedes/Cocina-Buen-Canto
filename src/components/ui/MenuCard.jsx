import { formatPrecio } from '../../data/menu'

export default function MenuCard({ item }) {
  return (
    <div className="menu-card">
      <div className="menu-card__img">
        {item.imagen
          ? <img src={item.imagen} alt={item.nombre} />
          : (
            <div className="menu-card__placeholder">
              <span style={{ fontSize: '1.6rem' }}>🍽</span>
              <span>Foto proximamente</span>
            </div>
          )
        }
        {item.destacado && <span className="menu-card__badge">Destacado</span>}
      </div>
      <div className="menu-card__body">
        <div className="menu-card__name">{item.nombre}</div>
        <div className="menu-card__desc">{item.descripcion}</div>
        <div className="menu-card__footer">
          <div className="menu-card__price">{formatPrecio(item.precio)}</div>
        </div>
      </div>
    </div>
  )
}