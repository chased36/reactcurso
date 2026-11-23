import { Link } from "react-router-dom";
import EditButton from "./assets/edit-note.svg";
import DeleteButton from "./assets/delete-icon.svg";

export function ProductItem({ producto, index, onEditarProducto, onEliminarProducto, disabled }) {
  return (
    <tr>
      {onEditarProducto && <td>
        <button type="button" className="icon-btn" disabled={disabled}
          aria-label={`Editar ${producto.nombre}`} onClick={() => onEditarProducto(producto)}>
          <img src={EditButton} width={28} height={28} alt="" />
        </button>
      </td>}
      {onEliminarProducto && <td>
        <button type="button" className="icon-btn" disabled={disabled}
          aria-label={`Eliminar ${producto.nombre}`} onClick={() => onEliminarProducto(producto.id)}>
          <img src={DeleteButton} width={28} height={28} alt="" />
        </button>
      </td>}
      <td>{index}</td>
      <td><Link to={encodeURIComponent(producto.id)}>{producto.nombre}</Link></td>
      <td>${producto.precio.toFixed(2)}</td>
      <td>{producto.stock}</td>
      <td>{producto.categoria}</td>
    </tr>
  );
}
