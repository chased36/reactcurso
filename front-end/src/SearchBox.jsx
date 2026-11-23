export function SearchBox({ value, onInputChange }) {
  return (
    <label className="product-search">
      Buscar producto por nombre
      <input type="search" value={value} placeholder="Escribe un nombre"
        onChange={(event) => onInputChange(event.target.value)} />
    </label>
  );
}
