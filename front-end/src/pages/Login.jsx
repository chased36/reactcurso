import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function Login({ user, onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(destino, { replace: true });
    }
  }, [user, navigate, destino]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!email.trim() || password.length < 4) {
        throw new Error(
          "Ingresa un correo válido y una contraseña de al menos 4 caracteres."
        );
      }

      await onLogin({ email: email.trim(), password });
      navigate(destino, { replace: true });
    } catch (err) {
      setError(err.message || "Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tutoria-login-wrap">
      <div className="tutoria-login-box">
        <h1>Inicio de sesión</h1>

        <form className="tutoria-login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Correo:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <p className="tutoria-form-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn-unam btn-full" disabled={loading}>
            {loading ? "Ingresando..." : "Acceder"}
          </button>
        </form>

        <div className="tutoria-login-info">
          <p>
            <strong>¿No tienes cuenta?</strong>
            <br />
            Contacta al administrador para crear una cuenta
          </p>
        </div>
      </div>
    </div>
  );
}
