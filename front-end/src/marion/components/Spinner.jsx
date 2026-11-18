export function Spinner({ texto = "Cargando..." }) {
  return (
    <div className="spinner-box">
      <div className="spinner"></div>
      <p>{texto}</p>
    </div>
  );
}
