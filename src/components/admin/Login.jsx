import { useState } from 'react'
import { signIn } from '../../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
    } catch (err) {
      const msg = err.message === 'Invalid login credentials'
        ? 'Correo o contraseña incorrectos'
        : (err.message || 'Error al iniciar sesión')
      setError(msg)
    } finally {
      setLoading(false)
    }
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
            <label className="flabel">Correo</label>
            <input
              type="email" className="finput"
              placeholder="admin@cocinabuencanto.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email" required autoFocus
            />
          </div>
          <div>
            <label className="flabel">Contraseña</label>
            <input
              type="password" className="finput"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password" required
            />
          </div>

          {error && <div className="login__error">⚠️ {error}</div>}

          <button type="submit" disabled={loading} className="btn btn-fill btn-full" style={{ marginTop: '0.5rem' }}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>

          <a href="/" className="login__back">← Volver al sitio</a>
        </form>
      </div>
    </div>
  )
}