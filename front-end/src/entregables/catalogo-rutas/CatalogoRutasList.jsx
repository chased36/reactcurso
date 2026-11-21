import { Link } from "react-router-dom";

export function CatalogoRutasList({ productos }) {
  return (
    <section className="catalogo-rutas-list">
      <h2>Listado de Productos</h2>
      {productos.length === 0 ? (
        <p>No Hay Productos Disponibles.</p>
      ) : (
        <div className="catalogo-rutas-grid">
          {productos.map((producto) => (
            <article key={producto.id} className="producto-rutas-card">
              <h3>{producto.nombre}</h3>
              <p>Precio: ${producto.precio}</p>
              <p>Categoría: {producto.categoria}</p>
              <Link to={`/catalogo-rutas/${producto.id}`}>Ver Detalle</Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
