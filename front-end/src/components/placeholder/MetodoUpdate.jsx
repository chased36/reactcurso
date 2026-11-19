import { useState } from "react";
import { placeHolderService } from "../../services/placeHolderService";

export function MetodoUpdate() {
  const [id, setId] = useState(1);

  const [post, setPost] = useState({
    userId: 1,
    title: "",
    body: "",
  });

  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPost((prev) => ({
      ...prev,
      [name]: name === "userId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);
    setResultado(null);

    try {
      const data = await placeHolderService.metodoUpdate(id, post);
      setResultado(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>MÉTODO UPDATE</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID del Registro:</label>
          <input
            type="number"
            min="1"
            value={id}
            onChange={(event) => setId(Number(event.target.value))}
            required
          />
        </div>
        <div>
          <label>User ID:</label>
          <input
            type="number"
            name="userId"
            min="1"
            value={post.userId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Contenido:</label>
          <textarea
            name="body"
            value={post.body}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar Registro"}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
      {resultado && (
        <div>
          <h3>Registro Actualizado Correctamente</h3>
          <p>
            <strong>ID:</strong> {resultado.id}
          </p>
          <p>
            <strong>User ID:</strong> {resultado.userId}
          </p>
          <p>
            <strong>Título:</strong> {resultado.title}
          </p>
          <p>
            <strong>Contenido:</strong> {resultado.body}
          </p>
        </div>
      )}
    </section>
  );
}
