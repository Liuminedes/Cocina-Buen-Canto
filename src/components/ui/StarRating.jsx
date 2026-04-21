export default function StarRating({ value, onChange, readonly = false }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map((s) => (
        <button
          key={s} type="button" disabled={readonly}
          onClick={() => !readonly && onChange && onChange(s)}
          className={`star${s <= value ? ' on' : ''}`}
          style={{ cursor: readonly ? 'default' : 'pointer', transition: 'transform 0.1s', fontSize: '1.1rem' }}
          onMouseEnter={(e) => { if (!readonly) e.currentTarget.style.transform = 'scale(1.3)' }}
          onMouseLeave={(e) => { if (!readonly) e.currentTarget.style.transform = 'scale(1)' }}
        >
          &#9733;
        </button>
      ))}
    </div>
  )
}