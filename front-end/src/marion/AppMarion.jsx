import { useState } from "react";
import "./marion.css";
import { allProducts } from "./data/productosMock";
import { Catalogo } from "./pages/Catalogo";

export function AppMarion() {
  const [productos, setProductos] = useState([...allProducts]);

  const agregarProducto = (nuevo) => {
    setProductos((prev) => {
      const siguienteId = prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1;
      return [...prev, { ...nuevo, id: siguienteId }];
    });
  };

  return (
    <div className="app-marion">
      <main>
        <Catalogo productos={productos} onAgregar={agregarProducto} />
      </main>
    </div>
  );
}
