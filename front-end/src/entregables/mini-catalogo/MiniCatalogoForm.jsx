import { useState } from "react";

export function MiniCatalogoForm({ alAgregarProducto, alCancelarFormulario }) {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
  });

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setDatosFormulario({
      ...datosFormulario,
      [name]: value,
    });
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    const nuevoProducto = {
      id: Date.now(),
      nombre: datosFormulario.nombre.trim(),
      precio: Number(datosFormulario.precio),
      stock: Number(datosFormulario.stock),
      categoria: datosFormulario.categoria.trim(),
    };

    alAgregarProducto(nuevoProducto);

    setDatosFormulario({
      nombre: "",
      precio: "",
      stock: "",
      categoria: "",
    });
  }

  return (
    <form onSubmit={manejarEnvio} className="mini-catalogo-form">
      <h3>Agregar Nuevo Producto</h3>

      <label htmlFor="mini-nombre">Nombre:</label>
      <input
        id="mini-nombre"
        type="text"
        name="nombre"
        value={datosFormulario.nombre}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="mini-precio">Precio:</label>
      <input
        id="mini-precio"
        type="number"
        name="precio"
        min="0.01"
        step="0.01"
        value={datosFormulario.precio}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="mini-stock">Stock:</label>
      <input
        id="mini-stock"
        type="number"
        name="stock"
        min="0"
        step="1"
        value={datosFormulario.stock}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="mini-categoria">Categoría:</label>
      <input
        id="mini-categoria"
        type="text"
        name="categoria"
        value={datosFormulario.categoria}
        onChange={manejarCambio}
        required
      />

      <div className="mini-catalogo-acciones">
        <button type="submit">Guardar Producto</button>

        <button type="button" onClick={alCancelarFormulario}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
