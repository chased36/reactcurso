import { useAsync } from "./hooks/useAsync";
import { placeHolderService } from "./services/placeHolderService";
import { ErrorPanel } from "./components/ErrorPanel";

export function PlaceHolder() {
  const {
    data: postOriginal,
    loading: loadingGet,
    error: errorGet,
    recargar: recargarGet,
  } = useAsync((signal) => placeHolderService.metodoGet(signal), []);

  const { data, loading, error, recargar } = useAsync(
    (signal) => placeHolderService.metodoList(signal),
    [],
  );

  if (loading) return <p>⏳ Buscando...</p>;
  if (error) return <ErrorPanel error={error} onRetry={recargar} />;
  if (!data?.length) return <p>Sin Resultados</p>;
  //if (!data) return <p>Sin Resultados</p>;

  return (
    <>
      {/*
      <p>{data.id}</p>
      <p>{data.title}</p>
      */}
      <h2>API JSONPlaceholder</h2>
      <h2>MÉTODO GET</h2>
      {loadingGet && <p>⏳ Buscando publicación...</p>}
      {errorGet && <ErrorPanel error={errorGet} onRetry={recargarGet} />}
      {postOriginal && (
        <div>
          <p>
            <strong>ID:</strong> {postOriginal.id}
          </p>
          <p>
            <strong>User ID:</strong> {postOriginal.userId}
          </p>
          <p>
            <strong>Título:</strong> {postOriginal.title}
          </p>
          <p>
            <strong>Contenido:</strong> {postOriginal.body}
          </p>
        </div>
      )}
      <hr />
      <h2>MÉTODO LIST</h2>
      <table className="mag-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Título</th>
            <th>Contenido</th>
          </tr>
        </thead>
        <tbody>
          {data.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.userId}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
