import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductList } from "../components/ProductList";
import { ProductForm } from "../components/ProductForm";
import { Spinner } from "../components/Spinner";

export function Catalogo({ productos, onGuardar, onEliminar }) {
  const [isLoading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      if (active) setLoading(false);
    }, 1500);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <section className="tutoria-card">
        <Spinner texto="Cargando catálogo..." />
      </section>
    );
  }

  return (
    <section className="tutoria-card">
      <div className="tutoria-breadcrumb">
        <Link to="/">← Inicio</Link>
        <span className="sep">/</span>
        <span>Catálogo Estático</span>
      </div>

      <div className="tutoria-header-row">
        <h1>Catálogo de Productos</h1>
        {!showForm && (
          <button
            type="button"
            className="btn-unam"
            onClick={() => {
              setSeleccionado(null);
              setShowForm(true);
            }}
          >
            + Agregar producto
          </button>
        )}
      </div>

      {showForm && (
        <ProductForm
          key={seleccionado ? seleccionado.id : "nuevo"}
          productoAEditar={seleccionado}
          onSave={(datos) => {
            onGuardar(datos, seleccionado?.id ?? null);
            setShowForm(false);
            setSeleccionado(null);
          }}
          onCancel={() => {
            setShowForm(false);
            setSeleccionado(null);
          }}
        />
      )}

      <ProductList
        products={productos}
        rutaDetalle="/catalogo"
        onEdit={(prod) => {
          setSeleccionado(prod);
          setShowForm(true);
        }}
        onRemove={onEliminar}
      />
    </section>
  );
}
