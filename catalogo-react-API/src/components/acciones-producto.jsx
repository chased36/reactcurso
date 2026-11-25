import { useState } from 'react';

export function AccionesProducto({
  producto,
  productoAEditar,
  onEditarProducto,
  onEliminarProducto,
}) {
  const [confirmandoBorrar, setConfirmandoBorrar] = useState(false);

  const estaEditando = productoAEditar?.id === producto.id;

  const handleClickEditar = () => {
    setConfirmandoBorrar(false);
    onEditarProducto(producto);
  };

  const handleClickBorrar = () => {
    if (!confirmandoBorrar) {
      setConfirmandoBorrar(true);
      return;
    }

    setConfirmandoBorrar(false);
    onEliminarProducto(producto.id);
  };

  return (
    <div className="acciones-producto">
      <button
        type="button"
        className="btn-ver"
        onClick={() => (window.location.href = `/producto/${producto.id}`)}
      >
        <i class="bi bi-eye"></i>ver
      </button>
      <button
        type="button"
        className={`btn-editar ${estaEditando ? 'editando' : ''}`}
        onClick={handleClickEditar}
      >
        <i className="bi bi-pencil-square"></i>{' '}
        {estaEditando ? 'Editando...' : 'Editar'}
      </button>

      <button
        type="button"
        className={`btn-borrar ${confirmandoBorrar ? 'confirmar' : ''}`}
        onClick={handleClickBorrar}
      >
        <i className="bi bi-trash"></i>{' '}
        {confirmandoBorrar ? '¿Confirmar?' : 'Borrar'}
      </button>

      {confirmandoBorrar && (
        <button
          type="button"
          className="btn-cancelar-borrar"
          onClick={() => setConfirmandoBorrar(false)}
        >
          <i className="bi bi-x-circle"></i> Cancelar
        </button>
      )}
    </div>
  );
}
