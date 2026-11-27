export function ErrorPanel({ error, onRetry }) {
  if (!error) return null;

  return (
    <div className="tutoria-error" role="alert">
      <h3>Algo salió mal</h3>
      <p>{error.message}</p>
      {onRetry && (
        <button
          type="button"
          className="btn-unam"
          onClick={onRetry}
          style={{ marginTop: "0.75rem" }}
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
