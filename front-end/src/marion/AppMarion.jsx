import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./marion.css";
import { allProducts } from "./data/productosMock";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { DetalleProducto } from "./pages/DetalleProducto";
import { NotFound } from "./pages/NotFound";

export function AppMarion() {
  const [productos, setProductos] = useState([...allProducts]);

  const agregarProducto = (nuevo) => {
    setProductos((prev) => {
      const siguienteId = prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1;
      return [...prev, { ...nuevo, id: siguienteId }];
    });
  };

  return (
    <BrowserRouter>
      <div className="app-marion">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo productos={productos} onAgregar={agregarProducto} />} />
            <Route path="/catalogo/:id" element={<DetalleProducto productos={productos} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}