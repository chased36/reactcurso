import { useParams, Link } from 'react-router-dom';

export function DetalleProductoPage({ productos }) {
  const { id } = useParams();
  const producto = productos.find((item) => String(item.id) === id);

  if (!producto) {
    return (
      <main className="contenedor-detalle-producto">
        <h2>Producto no encontrado</h2>
        <p>No existe un producto con el ID #{id}.</p>
        <button
          className="BotonCat except-btn"
          onClick={() => (window.location.href = '/')}
        >
          <a to="/">
            <i class="bi bi-caret-left-fill"></i>Volver al catalogo
          </a>
        </button>
      </main>
    );
  }

  return (
    <main className="contenedor-detalle-producto">
      <button
        className="BotonCat detalle-btn"
        onClick={() => (window.location.href = '/')}
      >
        <a to="/">
          <i class="bi bi-caret-left-fill"></i>Volver al catalogo
        </a>
      </button>

      <article className="detalle-producto">
        <h2>{producto.nombre}</h2>
        <p>
          <strong>ID:</strong> #{producto.id}
        </p>
        <p>
          <strong>Categoría:</strong> {producto.categoria}
        </p>
        <p>
          <strong>Precio:</strong> ${producto.precio}
        </p>
        {producto.descripcion && (
          <p>
            <strong>Descripción:</strong> {producto.descripcion}
          </p>
        )}
      </article>
    </main>
  );
}
