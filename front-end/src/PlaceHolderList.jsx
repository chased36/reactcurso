import { useAsync } from "./hooks/useAsync";
import { PlaceHolderServicesList } from "./services/searchServicePlaceHolder";
import { ErrorPanel } from "./components/ErrorPanel";

export function PlaceHolderList() {
  const { data, loading, error, recargar } = useAsync(
    (signal) => PlaceHolderServicesList.get(signal),
    [],
  );

  if (loading) return <p>⏳ Buscando...</p>;
  if (error) return <ErrorPanel error={error} onRetry={recargar} />;
  const productos = Array.isArray(data)
    ? data
    : data?.products ?? [];

  if (!productos.length) return <p>Sin resultados.</p>;

  return (
    <>
      {productos.map((producto) => (
        <div
          key={producto.id}
          style={{
            marginBottom: "1rem",
            borderBottom: "1px solid #ccc",
            paddingBottom: "0.5rem",
          }}
        >
          <p>
            <strong>ID:</strong> {producto.id}
          </p>
          <p>
            <strong>Producto:</strong> {producto.title}
          </p>
        </div>
      ))}
    </>
  );
}
