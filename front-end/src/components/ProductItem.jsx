import EditButton from "./assets/edit-note.svg"
import DeleteButton from "./assets/delete-icon.svg"
export function ProductItem({ id, producto, onEdit, onRemove }) {
  return (
    <>             
      <tr id={id} >
        <td><img src={EditButton}  onClick={()=> onEdit(producto)} width={32} height={32} style={{ background: 'white', border: 'none', cursor: 'pointer' }}></img></td>
        <td>
          <button
            type="button"
            aria-label={`Eliminar ${producto.nombre}`}
            onClick={() => {
              if (window.confirm(`¿Está seguro de eliminar "${producto.nombre}"?`)) {
                onRemove(id);
              }
            }}
            style={{ background: "white", border: "none", cursor: "pointer", padding: 0 }}
          >
            <img src={DeleteButton} width={32} height={32} alt="" />
          </button>
        </td>
        {/* <button onClick={()=> onCallbackClick(true)} class="mag-btn mag-btn-sky">Actualizar Producto</button> */}
        <td>{producto.nombre}</td>
        <td>{producto.precio}</td>
        <td>{producto.stock}</td>
        <td>{producto.categoria}</td>
      </tr>
    </>
  );
}
