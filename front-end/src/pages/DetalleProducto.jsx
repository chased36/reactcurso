import { Link, useParams } from "react-router-dom";

export function DetalleProducto({ productos }) {
  const { id } = useParams();
  const producto = productos.find((p) => String(p.id) === String(id));

  if (!producto) {
    return (
      <section className="tutoria-card">
        <h1>Producto no encontrado</h1>
        <p>No existe un producto con el identificador {id}.</p>
        <div className="tutoria-breadcrumb" style={{ marginTop: "1rem" }}>
          <Link to="/catalogo">← Volver al catálogo</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="tutoria-card tutoria-detail">
      <div className="tutoria-breadcrumb">
        <Link to="/">← Inicio</Link>
        <span className="sep">/</span>
        <Link to="/catalogo">Catálogo</Link>
        <span className="sep">/</span>
        <span>{producto.nombre}</span>
      </div>

      <h1>{producto.nombre}</h1>
      <p>
        <strong>Precio:</strong> ${producto.precio.toLocaleString("es-MX")}
      </p>
      <p>
        <strong>Stock disponible:</strong> {producto.stock} unidades
      </p>
      <p>
        <strong>Categoría:</strong>{" "}
        <span className="tutoria-badge">{producto.categoria}</span>
      </p>
    </section>
  );
}
