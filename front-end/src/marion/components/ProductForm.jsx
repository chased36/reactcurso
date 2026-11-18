import { useState } from "react";

const formVacio = { nombre: "", precio: 0, stock: 0, categoria: "" };

export function ProductForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState(formVacio);
  const [mensaje, setMensaje] = useState("");

  // Un solo handleChange para TODOS los inputs (usa el atributo name)
  const handleChange = (evt) => {
    const { name, value, type } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!formData.nombre.trim() || !formData.categoria) {
      setMensaje("Nombre y categoría son obligatorios");
      return;
    }
    onSave(formData); // le avisamos al padre
    setFormData(formVacio);
    setMensaje("");
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h3>➕ Nuevo producto</h3>

      <label>
        Nombre
        <input name="nombre" type="text" value={formData.nombre} onChange={handleChange} />
      </label>
      <label>
        Precio
        <input name="precio" type="number" min="0" value={formData.precio} onChange={handleChange} />
      </label>
      <label>
        Stock
        <input name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} />
      </label>
      <label>
        Categoría
        <select name="categoria" value={formData.categoria} onChange={handleChange}>
          <option value="">-- Selecciona --</option>
          <option value="Cuerdas">Cuerdas</option>
          <option value="Teclados">Teclados</option>
          <option value="Percusión">Percusión</option>
          <option value="Audio">Audio</option>
        </select>
      </label>

      {mensaje && <p className="form-error">{mensaje}</p>}

      <div className="acciones">
        <button type="submit" className="btn">Guardar</button>
        <button type="button" className="btn btn-sec" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}
