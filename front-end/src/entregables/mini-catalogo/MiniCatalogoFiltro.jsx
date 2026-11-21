export function MiniCatalogoFiltro({ textoBusqueda, alCambiarBusqueda }) {
  return (
    <div className="mini-catalogo-filtro">
      <label htmlFor="mini-busqueda">Buscar Producto:</label>

      <input
        id="mini-busqueda"
        type="text"
        value={textoBusqueda}
        onChange={(evento) => alCambiarBusqueda(evento.target.value)}
        placeholder="Escribe el Nombre o la Categoría..."
      />
    </div>
  );
}
