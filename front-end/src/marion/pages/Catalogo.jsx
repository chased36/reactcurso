import { useEffect, useState } from "react";
import { GetAllProducts } from "../components/ProductList";
import { ProductForm } from "../components/ProductForm";
import { Spinner } from "../components/Spinner";

export function Catalogo({ productos, onAgregar }) {
  const [isLoading, setLoading] = useState(true);
  const [canHandleForm, setCanHandleForm] = useState(false);

  // Simula una carga de 1.5 s, con cleanup
  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      if (active) setLoading(false);
    }, 1500);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []); // [] = solo al montar

  const guardar = (nuevo) => {
    onAgregar(nuevo);
    setCanHandleForm(false);
  };

  if (isLoading) return <Spinner texto="Cargando catálogo..." />;

  return (
    <section className="card">
      <div className="encabezado">
        <h2>Catálogo de instrumentos</h2>
        {!canHandleForm && (
          <button className="btn" onClick={() => setCanHandleForm(true)}>
            Agregar producto
          </button>
        )}
      </div>

      {canHandleForm && (
        <ProductForm onSave={guardar} onCancel={() => setCanHandleForm(false)} />
      )}

      <GetAllProducts products={productos} rutaDetalle="/catalogo" />
    </section>
  );
}
