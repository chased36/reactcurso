import { Link } from "react-router-dom";

export function Home() {
  return (
    <section className="card">
      <h1>Bienvenido a SoundStore 🎶</h1>
      <p>Ejercicios del módulo de React:</p>
      <ul className="lista-ejercicios">
        <li><Link to="/catalogo">Ejercicio 1 – Mini-Catálogo estático</Link></li>
        <li><Link to="/catalogo/1">Ejercicio 3 – Detalle con rutas (useParams)</Link></li>
        <li><Link to="/api">Ejercicio 4 – Catálogo desde API (DummyJSON)</Link></li>
        <li><Link to="/no-existe">Probar página 404</Link></li>
      </ul>
    </section>
  );
}
