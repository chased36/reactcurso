export function SearchBox({ value, onInputChange }) {
  return (
    <div className="tutoria-search">
      <label htmlFor="searchBox">Buscar:</label>
      <input
        id="searchBox"
        type="text"
        placeholder="Escribe un nombre..."
        value={value}
        onChange={(evt) => onInputChange(evt.target.value)}
      />
    </div>
  );
}
