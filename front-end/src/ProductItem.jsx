import EditButton from "./assets/edit-note.svg";
import DeleteButton from "./assets/delete-icon.svg";

export function ProductItem({ id, producto, onEdit, onRemove }) {
  return (
    <tr id={String(id ?? producto.id)}>
      <td>{producto.id}</td>
      <td>{producto.nombre}</td>
      <td>{producto.precio}</td>
      <td>{producto.stock}</td>
      <td>{producto.categoria}</td>
      {onEdit && (
        <td>
          <button
            type="button"
            aria-label={`Editar ${producto.nombre}`}
            onClick={() => onEdit(producto)}
          >
            <img
              src={EditButton}
              alt=""
              width={32}
              height={32}
              style={{
                background: "white",
                border: "none",
                cursor: "pointer",
              }}
            />
          </button>

        </td>
      )}
      {onRemove && (
        <td>
          <button
            type="button"
            aria-label={`Eliminar ${producto.nombre}`}
            onClick={() => onRemove(producto.id)}
          >
            <img
              src={DeleteButton}
              alt=""
              width={32}
              height={32}
              style={{
                background: "white",
                border: "none",
                cursor: "pointer",
              }}
            />
          </button>
        </td>
      )}
    </tr>
  );
}