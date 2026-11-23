import { Link, useParams } from "react-router-dom";
import { useAsync } from "./hooks/useAsync";
import { jsonPlaceholderService } from "./services/jsonPlaceholderService";
import { ErrorPanel } from "./components/ErrorPanel";
import { NotFound } from "./NotFound";

export function DetallePlaceHolder() {
  const { id } = useParams();
  const { data, loading, error, recargar } = useAsync(
    (signal) => jsonPlaceholderService.getById(id, signal), [id],
  );
  if (loading) return <p role="status">Cargando publicación...</p>;
  if (error?.status === 404 || (!error && !data)) return <NotFound resource="Publicación no encontrada" backTo="/publicaciones" />;
  if (error) return <ErrorPanel error={error} onRetry={recargar} />;
  return (
    <article className="glass-card">
      <Link to="/publicaciones">← Volver a publicaciones</Link>
      <h1>{data.title}</h1>
      <p>Publicación {data.id} · Usuario {data.userId}</p>
      <p>{data.body}</p>
    </article>
  );
}
