import { useState } from "react";
import { PlaceHolderServicesCreate } from "./services/searchServicePlaceHolder";
import { ErrorPanel } from "./components/ErrorPanel";

export function PlaceHolderCreate() {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const controller = new AbortController();

    try {
      setLoading(true);
      setError(null);

      const res = await PlaceHolderServicesCreate.create(
        form,
        controller.signal,
      );
      setData(res);
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
          type="text"
          name="title"
          placeholder="Nombre del producto"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "⏳ Guardando..." : "Crear Producto"}
        </button>
      </form>

      {error && <ErrorPanel error={error} />}

      {data && (
        <div>
          <h3>Resultado:</h3>
          <p>
            <strong>ID:</strong> {data.id}
          </p>
          <p>
            <strong>Título:</strong> {data.title}
          </p>
          <p>
            <strong>Descripción:</strong> {data.description}
          </p>
        </div>
      )}
    </div>
  );
}
