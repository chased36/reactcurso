import { useEffect, useState } from "react";
export function PlateForm({ plateAEditar, onSave, onCancel }) {
  let newPlate = {
    id: 0,
    nombre: "",
    precio: 0,
    menu: "",
  };
  const [formData, setFormData] = useState(plateAEditar || newPlate);

  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;

    setFormData((prevData) => ({
      // ... spread
      ...prevData,
      [name]: type == "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSave({
      ...formData,
      precio: +formData.precio,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="radio"
        name="step"
        id="step1"
        className="msf-radio"
        defaultChecked
      />
      
      <div className="msf-wrap">
        <div className="msf-body">
          <div className="msf-panel msf-panel-1">
            <h3>Nuevo Plato</h3>
            <input
              type="text"
              name="nombre"
              placeholder="Name"
              onChange={handleChange}
              value={formData.nombre}
            />
            <input
              type="text"
              name="precio"
              placeholder="precio"
              onChange={handleChange}
              value={formData.precio}
            />
            <input
              type="text"
              name="menu"
              onChange={handleChange}
              value={formData.menu}
            />
            <div className="msf-actions">
              <button>
                {plateAEditar ? (
                  <label htmlFor="step" className="msf-btn">
                    Actualizar
                  </label>
                ) : (
                  <label htmlFor="step" className="msf-btn">
                    Guardar
                  </label>
                )}
              </button>
              <button type="button" onClick={onCancel}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
