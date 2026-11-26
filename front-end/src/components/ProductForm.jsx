import { useState } from "react";

const formVacio = { nombre: "", precio: 0, stock: 0, categoria: "" };

export function ProductForm({ productoAEditar = null, onSave, onCancel }) {
  const [formData, setFormData] = useState(productoAEditar ?? formVacio);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (evt) => {
    const { name, value, type } = evt.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!formData.nombre.trim() || !formData.categoria) {
      setMensaje("Nombre y categoría son obligatorios.");
      return;
    }
    onSave(formData);
    setFormData(formVacio);
    setMensaje("");
  };

  return (
    <form className="tutoria-form" onSubmit={handleSubmit}>
      <h3>{productoAEditar ? "Editar producto" : "Nuevo producto"}</h3>

      <div className="tutoria-form-grid">
        <label>
          Nombre
          <input
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
          />
        </label>

        <label>
          Precio
          <input
            name="precio"
            type="number"
            min="0"
            value={formData.precio}
            onChange={handleChange}
          />
        </label>

        <label>
          Stock
          <input
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
          />
        </label>

        <label>
          Categoría
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="">-- Selecciona --</option>
            <option value="Periféricos">Periféricos</option>
            <option value="Pantallas">Pantallas</option>
            <option value="Audio">Audio</option>
          </select>
        </label>
      </div>

      {mensaje && (
        <p className="tutoria-form-error" role="alert">
          {mensaje}
        </p>
      )}

      <div className="tutoria-form-actions">
        <button type="submit" className="btn-unam">
          {productoAEditar ? "Actualizar" : "Guardar"}
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
