import { Link, NavLink } from "react-router-dom";

export function Layout({ user, onLogout, children }) {
  return (
    <div className="tutoria-shell">
      <header className="tutoria-header">
        <Link to="/" className="tutoria-header-logos">
          <img
            src="/LogoBlanco.png"
            alt="Logo FES Iztacala"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </Link>

        <h1 className="tutoria-header-title">
          TutorIA - Curso de React
        </h1>

        <div className="tutoria-header-logos">
          <img
            src="/Imagen1.png"
            alt="TutorIA"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <img
            src="/MetaversoBlanco.png"
            alt="Metaverso"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </header>

      <nav className="tutoria-nav" aria-label="Navegación principal">
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/catalogo">Catálogo Estático</NavLink>
        <NavLink to="/api">Catálogo API</NavLink>

        {user ? (
          <div className="tutoria-nav-user">
            <span>{user.email}</span>
            <button type="button" className="btn-secondary" onClick={onLogout}>
              Salir
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="tutoria-nav-login">
            Iniciar sesión
          </NavLink>
        )}
      </nav>

      <main className="tutoria-main">
        <div className="tutoria-container">{children}</div>
      </main>

      <footer className="tutoria-footer">
        <div className="tutoria-container">
          <p>
            <span>
              2025, Metaverso UNAM, Facultad de Estudios Superiores Iztacala.{" "}
            </span>
            <span>
              Aviso de Privacidad
            </span>
            <span>
              Créditos
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
