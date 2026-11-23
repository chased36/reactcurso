import { useAsync } from "./hooks/useAsync";
import { Link } from "react-router-dom";
import { jsonPlaceholderService } from "./services/jsonPlaceholderService";

export function PostList() {
  const { data, loading, error, recargar } = useAsync(
    (signal) => jsonPlaceholderService.getAll(signal),
    []
  );

  if (loading) {
    return <p>Cargando publicaciones...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error al obtener publicaciones: {error.message}</p>
        <button type="button" onClick={recargar}>
          Reintentar
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <p>No se encontraron publicaciones.</p>;
  }

  return (
    <section>
      <h2>Lista de publicaciones</h2>

      <button type="button" onClick={recargar}>
        Recargar publicaciones
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Título</th>
            <th>Contenido</th>
          </tr>
        </thead>

        <tbody>
          {data.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.userId}</td>
              <td><Link to={`/detalle/${post.id}`}>{post.title}</Link></td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
