export function BotonesCategoria({
  categorias = ['Todos'],
  categoriaActiva,
  setCategoriaActiva,
}) {
  return (
    <div className="contenedor-categorias">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          type="button"
          className={`BotonCat ${categoriaActiva === categoria ? 'activo' : ''}`}
          onClick={() => setCategoriaActiva(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}
