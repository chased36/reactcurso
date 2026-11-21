import { Routes, Route } from "react-router-dom";

import { productosRutas } from "./productosRutas";
import { CatalogoRutasList } from "./CatalogoRutasList";
import { CatalogoRutasDetalle } from "./CatalogoRutasDetalle";
import { CatalogoRutas404 } from "./CatalogoRutas404";

import "./catalogoRutas.css";

export function CatalogoRutas() {
  return (
    <section className="catalogo-rutas">
      <h1>Catálogo con Rutas</h1>

      <p>Navegación entre el Listado de Productos y sus Detalles.</p>

      <Routes>
        <Route
          index
          element={<CatalogoRutasList productos={productosRutas} />}
        />

        <Route path=":id" element={<CatalogoRutasDetalle />} />

        <Route path="*" element={<CatalogoRutas404 />} />
      </Routes>
    </section>
  );
}
