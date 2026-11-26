import { Link, useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { productService } from "../services/productService";
import { ErrorPanel } from "../components/ErrorPanel";
import { Spinner } from "../components/Spinner";

export function DetalleApi() {
  const { id } = useParams();

  const { data, loading, error, recargar } = useAsync(
    (signal) => productService.obtener(id, signal),
    [id]
  );

  if (loading) {
    return (
      <section className="tutoria-card">
        <Spinner texto="Cargando detalle..." />
      </section>
    );
  }

  if (error) {
    return (
      <section className="tutoria-card">
        <ErrorPanel error={error} onRetry={recargar} />
      </section>
    );
  }

  if (!data) {
    return (
      <section className="tutoria-card">
        <p>Sin resultados.</p>
      </section>
    );
  }

  return (
    <section className="tutoria-card tutoria-detail">
      <div className="tutoria-breadcrumb">
        <Link to="/">← Inicio</Link>
        <span className="sep">/</span>
        <Link to="/api">Catálogo API</Link>
        <span className="sep">/</span>
        <span>{data.nombre}</span>
      </div>

      {data.imagen && <img src={data.imagen} alt={data.nombre} />}
      <h1>{data.nombre}</h1>
      <p>{data.descripcion}</p>
      <p>
        <strong>Precio:</strong> ${data.precio}
      </p>
      <p>
        <strong>Stock:</strong> {data.stock}
      </p>
      <p>
        <strong>Categoría:</strong>{" "}
        <span className="tutoria-badge">{data.categoria}</span>
      </p>
    </section>
  );
}
