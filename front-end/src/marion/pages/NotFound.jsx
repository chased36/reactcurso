import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="card">
      <h1>404 🎻</h1>
      <p>Esta página no existe.</p>
      <Link to="/">Ir al inicio</Link>
    </section>
  );
}
