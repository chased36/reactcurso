export function ErrorPanel({ error, onRetry }) {
  return (
    <div className="error-panel" role="alert">
      <h3> Algo salió mal</h3>
      <p>{error.message}</p>
      {onRetry && (
        <button type="button" className="btn" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}