import { categorias } from '../data/productosMock.js';

export function BotonesCategoria({ categoriaActiva, setCategoriaActiva }) {
  return (
    <div className="filtros-categorias">
      <button
        type="button"
        className={`BotonCat  ${categoriaActiva === 'Todos' ? 'activo' : ''}`}
        onClick={() => setCategoriaActiva('Todos')}
      >
        Todos
      </button>

      {categorias.map((categoria) => (
        <button
          key={categoria}
          type="button"
          className={`BotonCat  ${categoriaActiva === categoria ? 'activo' : ''}`}
          onClick={() => setCategoriaActiva(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}
