import { useState } from "react";
import { placeHolderService } from "../../services/placeHolderService";

export function MetodoCreate() {
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
      const data = await placeHolderService.metodoCreate(post);
      setResultado(data);
      setPost({ userId: 1, title: "", body: "" });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>MÉTODO CREATE</h2>
      <form onSubmit={handleSubmit}>
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
          {loading ? "Enviando..." : "Crear Registro"}
        </button>
      </form>

      {error && <p>Error: {error.message}</p>}

      {resultado && (
        <div>
          <h3>Registro Creado Correctamente</h3>
          <p>ID: {resultado.id}</p>
          <p>User ID: {resultado.userId}</p>
          <p>Título: {resultado.title}</p>
          <p>Contenido: {resultado.body}</p>
        </div>
      )}
    </section>
  );
}
