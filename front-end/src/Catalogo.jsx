import { useState } from "react";
import { ProductForm } from "./ProductForm";
import { GetAllProducts } from "./ProductList";
import { useCatalog } from "./hooks/catalogContext";
import { ErrorPanel } from "./components/ErrorPanel";
import "./form.css";

export function Catalogo() {
  const { products, title, description, saving, mutationError, saveProduct, removeProduct, clearError } = useCatalog();
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const categories = [...new Set(products.map((product) => product.categoria))];

  function closeForm() {
    setSelected(null);
    setShowForm(false);
    clearError();
  }

  async function handleSave(product) {
    if (await saveProduct(product, selected?.id)) closeForm();
  }

  function handleRemove(id) {
    const product = products.find((item) => item.id === id);
    if (window.confirm(`¿Estás seguro de eliminar "${product.nombre}"?`)) removeProduct(id);
  }

  return (
    <section className="practice-stack">
      <h1>{title}</h1>
      <p>{description}</p>
      <button type="button" disabled={saving} onClick={() => {
        clearError(); setSelected(null); setShowForm(true);
      }}>Nuevo producto</button>
      <ErrorPanel error={mutationError} />
      {showForm && (
        <fieldset disabled={saving} className="product-form-container">
          <ProductForm key={selected?.id ?? "nuevo"}
            productoEditar={selected} onGuardarProducto={handleSave}
            onCancelar={closeForm} categories={categories} />
        </fieldset>
      )}
      {saving && <p role="status">Guardando cambios...</p>}
      <GetAllProducts products={products} disabled={saving}
        onEditarProducto={(product) => {
          clearError(); setSelected(product); setShowForm(true);
        }} onEliminarProducto={handleRemove} />
    </section>
  );
}
