import { Link, useParams } from "react-router-dom";

export function DetalleProducto({ productos }) {
  const { id } = useParams(); // id llega como TEXTO desde la URL
  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <section className="card">
        <h2>Producto no encontrado</h2>
        <p>No existe un producto con id {id}.</p>
        <Link to="/catalogo">← Volver al catálogo</Link>
      </section>
    );
  }

  return (
    <section className="card detalle">
      <h2>{producto.nombre}</h2>
      <p><strong>Precio:</strong> ${producto.precio.toLocaleString("es-MX")}</p>
      <p><strong>Stock:</strong> {producto.stock} piezas</p>
      <p><strong>Categoría:</strong> {producto.categoria}</p>
      <Link to="/catalogo">← Volver al catálogo</Link>
    </section>
  );
}
