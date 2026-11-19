import { useParams } from "react-router-dom";
import { useAsync } from "../../hooks/useAsync";
import { placeHolderService } from "../../services/placeHolderService";
import { ErrorPanel } from "../ErrorPanel";

export function MetodoGetId() {
  const { id } = useParams();

  const { data, loading, error, recargar } = useAsync(
    (signal) => placeHolderService.metodoGetId(id, signal),
    [id],
  );

  if (loading) return <p>⏳ Buscando...</p>;

  if (error) {
    return <ErrorPanel error={error} onRetry={recargar} />;
  }

  if (!data) return <p>Sin Resultados</p>;

  return (
    <section>
      <h2>MÉTODO GET por ID</h2>
      <p>ID: {data.id}</p>
      <p>User ID: {data.userId}</p>
      <p>Título: {data.title}</p>
      <p>Contenido: {data.body}</p>
    </section>
  );
}
