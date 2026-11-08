<<<<<<< HEAD
import { useState, useEffect } from "react";

export function ProductForm({ selectedProduct, onSaveProduct }) {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [categoria, setCategoria] = useState("");

    // Si estamos editando, rellenamos los inputs automáticamente con los datos del producto
    useEffect(() => {
        if (selectedProduct) {
            setNombre(selectedProduct.nombre || "");
            setPrecio(selectedProduct.precio || "");
            setStock(selectedProduct.stock || "");
            setCategoria(selectedProduct.categoria || "");
        }
    }, [selectedProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveProduct({
            id: selectedProduct ? selectedProduct.id : Date.now().toString(),
            nombre,
            precio: Number(precio),
            stock: Number(stock),
            categoria,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="card bg-surface-100-900 p-4 w-full max-w-md mx-auto space-y-4" style={{ background: "#f4f4f4", border: "1px solid #ccc", borderRadius: "8px" }}>
            <header>
                <h3 className="h3">{selectedProduct ? "Editar Producto" : "Nuevo Producto"}</h3>
            </header>

            <fieldset className="fieldset space-y-2">
                <legend className="legend">Detalles del Producto</legend>

                <label className="label" style={{ display: "block", marginBottom: "10px" }}>
                    <span className="label-text">Nombre</span>
                    <input
                        className="input"
                        type="text"
                        placeholder="Ej. Teclado mecánio"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </label>

                <label className="label" style={{ display: "block", marginBottom: "10px" }}>
                    <span className="label-text">Precio</span>
                    <input
                        className="input"
                        type="number"
                        placeholder="0.00"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </label>

                <label className="label" style={{ display: "block", marginBottom: "10px" }}>
                    <span className="label-text">Stock</span>
                    <input
                        className="input"
                        type="number"
                        placeholder="Cantidad"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </label>

                <label className="label" style={{ display: "block", marginBottom: "10px" }}>
                    <span className="label-text">Categoría</span>
                    <input
                        className="input"
                        type="text"
                        placeholder="Ej. Electrónica"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    />
                </label>
            </fieldset>

            <footer className="flex justify-end" style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="btn preset-filled">Guardar</button>
            </footer>
        </form>
    );
}
=======
import { useEffect, useState } from "react";
export function ProductForm({ productAEditar, onSave, onCancel }) {
  let newProduct = {
    id: 0,
    nombre: "",
    precio: 0,
    stock: 0,
    categoria: "",
  };
  const [formData, setFormData] = useState(productAEditar || newProduct);

  //Si nosotros le pasamos un producto para edita, estariamos cargando sus datos en el estado de nuestro form local
  // useEffect(() => {
  //   if (productAEditar) {
  //     setFormData(productAEditar);
  //   } else {
  //     setFormData(newProduct);
  //   }
  // }, [productAEditar]);

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
      // stock: +formData.stock
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
      {/* <input type="radio" name="step" id="step2" className="msf-radio" />
        <input type="radio" name="step" id="step3" className="msf-radio" /> */}

      <div className="msf-wrap">
        {/* <div className="msf-progress">
            <span className="msf-step-label">1. Your Info</span>
            <span className="msf-step-label">2. Details</span>
            <span className="msf-step-label">3. Done</span>
          </div> */}

        <div className="msf-body">
          <div className="msf-panel msf-panel-1">
            <h3>Your Info</h3>
            <h3>{productAEditar ? "Editar Producto" : "Nuevo Producto"}</h3>
            {/* id: "p2",
    nombre: "Mouse Inalámbrico",
    precio: 45,
    stock: 0,
    categoria: "Periféricos", */}

            <input type="text" name="id" placeholder="ID" readOnly="true"  value={formData.id} />
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
              name="stock"
              onChange={handleChange}
              value={formData.stock}
            />
            <input
              type="text"
              name="category"
              onChange={handleChange}
              value={formData.category}
            />
            {/* to-do move to selectlist */}
            <input type="text" placeholder="category" readOnly="true" />
            <div className="msf-actions">
              <button>
                {productAEditar ? (
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

          <div className="msf-panel msf-panel-2">
            <h3>Details</h3>
            <input type="text" placeholder="Company (optional)" />
            <input type="tel" placeholder="Phone number" />
            <div className="msf-actions">
              <label htmlFor="step1" className="msf-btn msf-btn-back">
                ← Back
              </label>
            </div>
          </div>

          <div className="msf-panel msf-panel-3">
            <h3>All done!</h3>
            <p className="msf-success">
              ✓ Form submitted, zero JavaScript used!
            </p>
            <div className="msf-actions">
              <label htmlFor="step1" className="msf-btn">
                Start Over
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
>>>>>>> main
