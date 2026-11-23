import { useAsync } from "./hooks/useAsync";
import { placeHolderListServices } from "./services/placeHolderListService";
import { ErrorPanel } from "./components/ErrorPanel";

export function PlaceHolderList() {
  //Consultar una lista de elementos
  const { data, loading, error, recargar }
    = useAsync((signal) => placeHolderListServices.getList(signal), []);

  const estiloCabecera = {
    position: "sticky",
    top: 0,
    backgroundColor: "#f5f5f5",
    zIndex: 1,
    border: "1px solid #ccc",
    padding: "8px",
  };

  if (loading) return <p>⏳ Buscando publicaciones...</p>;

  if (error) {
    return (
      <ErrorPanel
        error={error}
        onRetry={recargar}
      />
    );
  }

  if (!data || data.length === 0) {
    return <p>Sin resultados.</p>;
  }
  return (
    <div>

      <h3>Lista de publicaciones</h3>
      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ccc"
        }}
      >

        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={estiloCabecera}>ID</th>
              <th style={estiloCabecera}>Usuario</th>
              <th style={estiloCabecera}>Título</th>
              <th style={estiloCabecera}>Contenido</th>
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
      </div>
    </div>
  )
}