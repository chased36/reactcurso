import { Link, useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { productService } from "../services/productService";
import { ErrorPanel } from "../components/ErrorPanel";
import { Spinner } from "../components/Spinner";

export function DetalleApi() {
  const { id } = useParams();

  const { data, loading, error, recargar } = useAsync(
    (signal) => productService.obtener(id, signal),
    [id] // si cambia el id, vuelve a consultar
  );

  if (loading) return <Spinner texto="Cargando producto..." />;
  if (error) return <ErrorPanel error={error} onRetry={recargar} />;
  if (!data) return <p>Sin resultados.</p>;

  return (
    <section className="card detalle">
      {data.imagen && <img src={data.imagen} alt={data.nombre} />}
      <h2>{data.nombre}</h2>
      <p>{data.descripcion}</p>
      <p><strong>Precio:</strong> ${data.precio}</p>
      <p><strong>Stock:</strong> {data.stock}</p>
      <p><strong>Categoría:</strong> {data.categoria}</p>
      <Link to="/api">← Volver</Link>
    </section>
  );
}