export function FiltroPosts({
  filtroUserId,
  setFiltroUserId,
  busqueda,
  setBusqueda,
}) {
  const usuarios = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <section
      aria-label="Filtros de posts"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        alignItems: 'center',
        marginBottom: '1rem',
      }}
    >
      <label>
        Usuario (API):{' '}
        <select
          value={filtroUserId}
          onChange={(e) => setFiltroUserId(e.target.value)}
        >
          <option value="">Todos los usuarios</option>
          {usuarios.map((id) => (
            <option key={id} value={String(id)}>
              Usuario {id}
            </option>
          ))}
        </select>
      </label>

      <label>
        Buscar texto:{' '}
        <input
          type="search"
          placeholder="Título o contenido..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </label>

      {(filtroUserId || busqueda) && (
        <button
          type="button"
          onClick={() => {
            setFiltroUserId('');
            setBusqueda('');
          }}
        >
          Limpiar filtros
        </button>
      )}
    </section>
  );
}
