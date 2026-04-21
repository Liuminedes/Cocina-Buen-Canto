import { useState } from 'react'

const PASSWORD = 'cbc2026'

export default function Login({ onSuccess }) {
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (pass === PASSWORD) {
        onSuccess()
      } else {
        setError('Contraseña incorrecta')
        setPass('')
      }
      setLoading(false)
    }, 400)
  }

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__brand">
          <div className="login__badge">
            <span className="logo-mask logo-mask--abreviado" role="img" aria-label="CBC" />
          </div>
          <div>
            <div className="login__eyebrow">Panel administrativo</div>
            <h1 className="login__title">Cocina Buen Canto</h1>
          </div>
        </div>

        <form onSubmit={submit} className="login__form">
          <div>
            <label className="flabel">Contraseña</label>
            <input
              type="password"
              className="finput"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoFocus
              required
            />
          </div>

          {error && <div className="login__error">⚠️ {error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-fill btn-full"
            style={{ marginTop: '0.5rem' }}
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>

          <a href="/" className="login__back">← Volver al sitio</a>
        </form>
      </div>
    </div>
  )
}