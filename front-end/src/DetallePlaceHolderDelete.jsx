import { useState } from "react";
import { PlaceHolderServicesDelete } from "./services/searchServicePlaceHolder";
import { ErrorPanel } from "./components/ErrorPanel";

export function PlaceHolderDelete() {
  const [id, setId] = useState("");
  const [deletedProduct, setDeletedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanId = id.trim();
    if (!cleanId) return;

    const controller = new AbortController();

    try {
      setLoading(true);
      setError(null);
      setDeletedProduct(null);

      const res = await PlaceHolderServicesDelete.remove(
        cleanId,
        controller.signal,
      );
      setDeletedProduct(res?.data ?? res);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Eliminar Producto</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="number"
          min="1"
          placeholder="Escribe el ID del producto a eliminar..."
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          disabled={loading || !id.trim()}
          style={{
            padding: "8px",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "⏳ Eliminando..." : "Eliminar Producto"}
        </button>
      </form>

      {error && <ErrorPanel error={error} />}

      {deletedProduct && (
        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            padding: "10px",
            borderRadius: "5px",
            color: "#15803d",
          }}
        >
          <p>
            <strong>¡Éxito!</strong> El producto con ID{" "}
            <code>{deletedProduct.id}</code> fue eliminado.
          </p>
          {deletedProduct.title && (
            <p>
              <strong>Título:</strong> {deletedProduct.title}
            </p>
          )}
          {deletedProduct.deletedOn && (
            <p>
              <strong>Eliminado en:</strong> {deletedProduct.deletedOn}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
