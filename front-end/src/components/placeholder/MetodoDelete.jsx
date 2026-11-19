import { useState } from "react";
import { placeHolderService } from "../../services/placeHolderService";

export function MetodoDelete() {
  const [id, setId] = useState(1);
  const [resultado, setResultado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);
    setResultado(false);

    try {
      await placeHolderService.metodoDelete(id);
      setResultado(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>MÉTODO DELETE</h2>
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
        <button type="submit" disabled={loading}>
          {loading ? "Eliminando..." : "Eliminar Registro"}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
      {resultado && (
        <div>
          <h3>Registro Eliminado Correctamente</h3>
          <p>ID del registro: {id}</p>
        </div>
      )}
    </section>
  );
}
