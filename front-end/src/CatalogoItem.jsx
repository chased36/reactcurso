import EditButton from "./assets/edit-icon_1.svg";
import DeleteButton from "./assets/delete-icon_1.svg";

export function CatalogoItem({ id, producto, onEdit, onRemove }) {
  return (
    <tr>
      <td>
        <button
          type="button"
          onClick={() => onEdit(producto)}
          className="mag-btn mag-btn-sky mag-btn-icon"
          title={`Editar ${producto.nombre}`}
          aria-label={`Editar ${producto.nombre}`}
        >
          <img src={EditButton} width={30} height={30} alt="" />
        </button>
      </td>

      <td>
        <button
          type="button"
          onClick={() => onRemove(id)}
          className="mag-btn mag-btn-sky mag-btn-icon"
          title={`Eliminar ${producto.nombre}`}
          aria-label={`Eliminar ${producto.nombre}`}
        >
          <img src={DeleteButton} width={30} height={30} alt="" />
        </button>
      </td>

      <td>{id}</td>
      <td>{producto.nombre}</td>
      <td>{producto.precio}</td>
      <td>{producto.stock}</td>
      <td>{producto.categoria}</td>
    </tr>
  );
}
