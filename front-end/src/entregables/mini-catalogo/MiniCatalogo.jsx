import { useState } from "react";

import { productosMiniCatalogo } from "./productos";
import { MiniCatalogoList } from "./MiniCatalogoList";
import { MiniCatalogoForm } from "./MiniCatalogoForm";
import { MiniCatalogoFiltro } from "./MiniCatalogoFiltro";
import "./miniCatalogo.css";

export function MiniCatalogo() {
  const [productos, setProductos] = useState(productosMiniCatalogo);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [mostrarFormulario, establecerMostrarFormulario] = useState(false);

  function agregarProducto(nuevoProducto) {
    setProductos([...productos, nuevoProducto]);
    establecerMostrarFormulario(false);
  }

  const productosFiltrados = productos.filter((producto) => {
    const busqueda = textoBusqueda.toLowerCase().trim();

    return (
      producto.nombre.toLowerCase().includes(busqueda) ||
      producto.categoria.toLowerCase().includes(busqueda)
    );
  });

  return (
    <section className="mini-catalogo">
      <h2>Mini-Catálogo</h2>

      <p>
        Catálogo de Productos con Opción de Búsqueda y Registro de Nuevos
        Productos.
      </p>

      <MiniCatalogoFiltro
        textoBusqueda={textoBusqueda}
        alCambiarBusqueda={setTextoBusqueda}
      />

      {!mostrarFormulario && (
        <button type="button" onClick={() => establecerMostrarFormulario(true)}>
          Agregar Producto
        </button>
      )}

      {mostrarFormulario && (
        <MiniCatalogoForm
          alAgregarProducto={agregarProducto}
          alCancelarFormulario={() => establecerMostrarFormulario(false)}
        />
      )}

      <MiniCatalogoList productos={productosFiltrados} />
    </section>
  );
}
