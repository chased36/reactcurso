import { useParams } from "react-router-dom";
import { useAsync } from "../../hooks/useAsync";
import { placeHolderService } from "../../services/placeHolderService";
import { ErrorPanel } from "../ErrorPanel";

export function MetodoFilter() {
  const { userId } = useParams();

  const { data, loading, error, recargar } = useAsync(
    (signal) => placeHolderService.metodoFilter(userId, signal),
    [userId],
  );

  if (loading) return <p>⏳ Buscando...</p>;

  if (error) {
    return <ErrorPanel error={error} onRetry={recargar} />;
  }

  if (!data?.length) return <p>Sin Resultados</p>;

  return (
    <section>
      <h2>MÉTODO FILTER</h2>
      <p>User ID Consultado: {userId}</p>
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
    </section>
  );
}
