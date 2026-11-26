import { Link } from "react-router-dom";

export function ProductItem({ producto, rutaDetalle, onEdit, onRemove }) {
  return (
    <tr>
      <td>{producto.id}</td>
      <td>
        <Link to={`${rutaDetalle}/${producto.id}`}>{producto.nombre}</Link>
      </td>
      <td>${Number(producto.precio).toLocaleString("es-MX")}</td>
      <td>{producto.stock}</td>
      <td>
        <span className="tutoria-badge">{producto.categoria}</span>
      </td>
      {(onEdit || onRemove) && (
        <td className="tutoria-actions-cell">
          {onEdit && (
            <button
              type="button"
              className="btn-edit-outline"
              onClick={() => onEdit(producto)}
            >
              Editar
            </button>
          )}
          {onRemove && (
            <button
              type="button"
              className="btn-danger-outline"
              onClick={() => {
                if (window.confirm(`¿Eliminar "${producto.nombre}"?`)) {
                  onRemove(producto.id);
                }
              }}
            >
              Eliminar
            </button>
          )}
        </td>
      )}
    </tr>
  );
}
