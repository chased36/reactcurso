import { AccionesProducto } from './acciones-producto.jsx';

export function TablaCategoria({
  productos_catalogo,
  productoAEditar,
  onEliminarProducto,
  onEditarProducto,
}) {
  return (
    <div className="contenedor-catalogo">
      <table className="table-catalogo">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos_catalogo.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td>${producto.precio}</td>
              <td>{producto.descripcion}</td>
              <td>
                <AccionesProducto
                  producto={producto}
                  productoAEditar={productoAEditar}
                  onEditarProducto={onEditarProducto}
                  onEliminarProducto={onEliminarProducto}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
