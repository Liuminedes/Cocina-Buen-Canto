import StarRating from './StarRating'

export default function ResenaCard({ resena }) {
  const fecha = new Date(resena.created_at || resena.fecha).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
  return (
    <div className="rcard">
      <div className="rcard__head">
        <div>
          <div className="rcard__name">{resena.nombre}</div>
          <div className="rcard__date">{fecha}</div>
        </div>
        <StarRating value={resena.estrellas} readonly />
      </div>
      <div className="rcard__div" />
      <p className="rcard__text">&#8220;{resena.comentario}&#8221;</p>
    </div>
  )
}