import { useParams } from "react-router-dom";
import { useAsync } from "./hooks/useAsync";
import { placeHolderService } from "./services/placeHolderService";
import { ErrorPanel } from "./components/ErrorPanel";

export function DetallePlaceHolder() {
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
    <>
      <h2>Detalle PlaceHolder</h2>
      <p>ID: {data.id}</p>
      <p>Título: {data.title}</p>
    </>
  );
}
