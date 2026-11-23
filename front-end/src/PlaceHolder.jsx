import { useAsync } from "./hooks/useAsync";
import { placeHolderServices } from "./services/placeHolderService";
import { ErrorPanel } from "./components/ErrorPanel";

export function PlaceHolder() {
  const { data, loading, error, recargar } = useAsync(
    (signal) => placeHolderServices.get(1, signal), [],
  );
  if (loading) return <p role="status">Cargando publicación...</p>;
  if (error) return <ErrorPanel error={error} onRetry={recargar} />;
  if (!data) return <p>Sin resultados.</p>;
  return <article><h2>{data.title}</h2><p>{data.body}</p></article>;
}
