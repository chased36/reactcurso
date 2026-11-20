import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./services/useAuth";

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(credentials);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-lightbox" aria-label="Inicio de sesión">
      <div className="auth-backdrop" aria-hidden="true" />
      <section
        className="auth-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <div className="auth-brand" aria-hidden="true">
          <span>R</span>
        </div>
        <header className="auth-header">
          <span className="eyebrow">Acceso privado</span>
          <h3 id="login-title">Bienvenido de nuevo</h3>
          <p>Ingresa tus datos para abrir el panel.</p>
        </header>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              autoComplete="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error.message}
            </p>
          )}

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Verificando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="auth-footnote">Acceso protegido con sesión activa.</p>
      </section>
    </main>
  );
}
