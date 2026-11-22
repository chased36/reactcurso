import { useAsync } from "./hooks/useAsync";
import { PlaceHolderServices } from "./services/searchServicePlaceHolder";
import { ErrorPanel } from "./components/ErrorPanel";

export function PlaceHolder() {
  const { data, loading, error, recargar } = useAsync(
    (signal) => PlaceHolderServices.get(signal),
    [],
  );

  if (loading) return <p>⏳ Buscando...</p>;
  if (error) return <ErrorPanel error={error} onRetry={recargar} />;
  if (!data) return <p>Sin resultados.</p>;

  return (
    <>
      <p><strong>ID:</strong> {data.id}</p>
      <p><strong>Título:</strong> {data.title}</p>
      <p><strong>Descripción:</strong> {data.description ?? data.body}</p>
    </>
  );
}
