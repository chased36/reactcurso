import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <h2>404 — Página no encontrada</h2>
      <p>La ruta que intentaste visitar no existe en el Mini Catálogo.</p>
      <button
        className="BotonCat except-btn"
        onClick={() => (window.location.href = '/')}
      >
        <a to="/">
          <i class="bi bi-caret-left-fill"></i>Volver al catalogo
        </a>
      </button>
    </main>
  );
}
