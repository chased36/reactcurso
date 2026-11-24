export function SearchProduct({ textoBusqueda, setTextoBusqueda }) {
  return (
    <input
      id="buscaProduct"
      type="text"
      placeholder="Buscar producto..."
      value={textoBusqueda}
      onChange={(e) => setTextoBusqueda(e.target.value)}
    />
  );
}