import { useAsync } from "../../hooks/useAsync";
import { placeHolderService } from "../../services/placeHolderService";
import { ErrorPanel } from "../ErrorPanel";

export function MetodoGet() {
  const { data, loading, error, recargar } = useAsync(
    (signal) => placeHolderService.metodoGet(signal),
    [],
  );

  if (loading) return <p>⏳ Buscando...</p>;

  if (error) {
    return <ErrorPanel error={error} onRetry={recargar} />;
  }

  if (!data) return <p>Sin Resultados</p>;

  return (
    <section>
      <h2>MÉTODO GET</h2>
      <p>ID: {data.id}</p>
      <p>User ID: {data.userId}</p>
      <p>Título: {data.title}</p>
      <p>Contenido: {data.body}</p>
    </section>
  );
}
