import { Link, useParams } from "react-router-dom";

import { productosRutas } from "./productosRutas";
import { CatalogoRutas404 } from "./CatalogoRutas404";

export function CatalogoRutasDetalle() {
  const { id } = useParams();

  const identificador = Number(id);

  if (!Number.isInteger(identificador) || identificador <= 0) {
    return <CatalogoRutas404 />;
  }

  const producto = productosRutas.find(
    (producto) => producto.id === identificador,
  );

  if (!producto) {
    return (
      <section className="catalogo-rutas-detalle">
        <h2>Producto No Encontrado</h2>
        <p>No Existe un Producto con el Identificador Solicitado.</p>

        <Link to="/catalogo-rutas">Volver al Catálogo</Link>
      </section>
    );
  }

  return (
    <section className="catalogo-rutas-detalle">
      <h2>Detalle del Producto</h2>
      <h3>{producto.nombre}</h3>
      <p>ID: {producto.id}</p>
      <p>Precio: ${producto.precio}</p>
      <p>Categoría: {producto.categoria}</p>
      <p>Descripción: {producto.descripcion}</p>
      <Link to="/catalogo-rutas">Volver al Catálogo</Link>
    </section>
  );
}
