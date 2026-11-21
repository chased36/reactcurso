import { Link } from "react-router-dom";

export function CatalogoRutas404() {
  return (
    <section className="catalogo-rutas-404">
      <h2>Error 404</h2>

      <h3>Página NO Encontrada</h3>

      <p>
        La Dirección que Intentas Visitar NO Existe Dentro del Catálogo con
        Rutas.
      </p>

      <Link to="/catalogo-rutas">Volver al Catálogo</Link>
    </section>
  );
}
