export function Spinner({ texto = "Cargando..." }) {
  return (
    <div className="tutoria-spinner-box" role="status" aria-live="polite">
      <div className="tutoria-spinner" />
      <p>{texto}</p>
    </div>
  );
}
