export function BuscadorProducto({ terminoBusqueda, setTerminoBusqueda }) {
  return (
    <div className="buscador-catalogo">
      <label className="buscador-label" htmlFor="buscar-producto">
        Buscar producto:
      </label>
      <input
        id="buscar-producto"
        type="text"
        placeholder="Escribe el nombre del producto o la categoria..."
        value={terminoBusqueda}
        onChange={(e) => setTerminoBusqueda(e.target.value)}
        className="buscador-input"
      />
    </div>
  );
}
