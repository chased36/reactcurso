import { useEffect, useState } from "react";
import "./form.css";
import { ProductForm } from "./ProductForm";
import { CatalogoList } from "./CatalogoList";

export function Catalogo({ products }) {
  const [productos, setProductos] = useState([...products]);
  const [isLoading, setIsLoading] = useState(true);

  // Controlar si el Formulario está siendo Abierto y si estamos Editando o Creando
  const [showForm, setShowForm] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(temporizador);
  }, []);

  const handlerSalvarProducto = (nuevoOActualizado) => {
    // Update: Reemplazar el Producto Seleccionado con el Id
    if (productoSeleccionado) {
      setProductos((prev) =>
        prev.map((p) =>
          p.id === productoSeleccionado.id ? nuevoOActualizado : p,
        ),
      );
    } else {
      // Agregar un Nuevo Elemento
      setProductos((prev) => [
        ...prev,
        { ...nuevoOActualizado, id: `p${Date.now()}` },
      ]);
    }

    // Cerrar Formulario y Limpiarlo
    setShowForm(false);
    setProductoSeleccionado(null);
  };

  const handlerEliminarProducto = (id) => {
    const productoAEliminar = productos.find((p) => p.id === id);

    if (!productoAEliminar) {
      return;
    }

    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar el producto "${productoAEliminar.nombre}"?`,
    );

    if (!confirmar) {
      return;
    }

    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const handlerIniciarEdicion = (producto) => {
    setProductoSeleccionado(producto);
    setShowForm(true);
  };

  return (
    <div>
      {isLoading ? (
        <h4>Está Cargando...</h4>
      ) : (
        <CatalogoList
          products={productos}
          onEdit={handlerIniciarEdicion}
          onRemove={handlerEliminarProducto}
        />
      )}

      <div className="mag-btns">
        <button
          type="button"
          onClick={() => {
            setProductoSeleccionado(null);
            setShowForm(true);
          }}
          className="mag-btn mag-btn-primary"
        >
          Agregar Producto
        </button>
      </div>

      {showForm ? (
        <ProductForm
          key={productoSeleccionado ? productoSeleccionado.id : ""}
          productoAEditar={productoSeleccionado}
          onSave={handlerSalvarProducto}
          onCancel={() => {
            setShowForm(false);
            setProductoSeleccionado(null);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
