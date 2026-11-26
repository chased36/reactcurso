import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="tutoria-card">
      <h1>404 - Página no encontrada</h1>
      <p>La ruta que buscas no existe en TutorIA.</p>
      <div className="tutoria-breadcrumb" style={{ marginTop: "1rem" }}>
        <Link to="/">← Volver al inicio</Link>
      </div>
    </section>
  );
}
