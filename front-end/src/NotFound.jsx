import { Link } from "react-router-dom";

export function NotFound({ resource = "Página no encontrada", backTo = "/" }) {
  return (
    <section className="glass-card">
      <h1>404 — {resource}</h1>
      <p>Revisa la dirección o vuelve para continuar.</p>
      <Link to={backTo} relative="path">Volver</Link>
    </section>
  );
}
