<<<<<<< HEAD
import EditButton from "./assets/edit-note.svg";
import DeleteButton from "./assets/delete-icon.svg";

export function ProductItem({ id, producto, onEditClick, onDeleteClick }) {
  return (
    <tr id={id}>
      <td>
        <img
          src={EditButton}
          width={24}
          height={24}
          style={{ cursor: 'pointer', marginRight: '8px' }}
          alt="Editar"
          onClick={() => onEditClick(producto)}
        />
        <img
          src={DeleteButton}
          width={24}
          height={24}
          style={{ cursor: 'pointer' }}
          alt="Eliminar"
          onClick={() => onDeleteClick(producto.id)}
        />
      </td>
      <td>{id}</td>
      <td>{producto.nombre}</td>
      <td>{producto.precio}</td>
      <td>{producto.stock}</td>
      <td>{producto.categoria}</td>
    </tr>
=======
import EditButton from "./assets/edit-note.svg"
import DeleteButton from "./assets/delete-icon.svg"
export function ProductItem({ id, producto, onEdit, onRemove }) {
  return (
    <>             
      <tr id={id} >
        <td><img src={EditButton}  onClick={()=> onEdit(producto)} width={32} height={32} style={{ background: 'white', border: 'none', cursor: 'pointer' }}></img></td>
        <td><img src={DeleteButton}  onClick={()=> { onRemove(id)}} width={32} height={32} style={{ background: 'white', border: 'none', cursor: 'pointer' }}></img></td>
        {/* <button onClick={()=> onCallbackClick(true)} class="mag-btn mag-btn-sky">Actualizar Producto</button> */}
        <td>{producto.nombre}</td>
        <td>{producto.precio}</td>
        <td>{producto.stock}</td>
        <td>{producto.categoria}</td>
      </tr>
    </>
>>>>>>> main
  );
}