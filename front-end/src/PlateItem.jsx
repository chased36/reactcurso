import EditButton from "./assets/edit-note.svg"
import DeleteButton from "./assets/delete-icon.svg"
export function PlateItem({ id, plato, onEdit, onRemove }) {
  return (
    <>             
      <tr id={id} >
        <td>{plato.nombre}</td>
        <td>{plato.precio}</td>
        <td>{plato.menu}</td>
      </tr>
    </>
  );
}
