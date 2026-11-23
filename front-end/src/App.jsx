import { useState } from "react";
import { BrowserRouter, Link, NavLink, Outlet, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./services/authProvider.jsx";
import { useAuth } from "./services/useAuth.js";
import { LoginForm } from "./loginForm.jsx";
import { ProtectedRoute } from "./protectedRoute.jsx";
import { CatalogProvider } from "./components/CatalogProvider.jsx";
import { localProductService, productService } from "./services/productService.js";
import { Catalogo } from "./Catalogo.jsx";
import { ProductDetail } from "./ProductDetail.jsx";
import { Home } from "./Home.jsx";
import { NotFound } from "./NotFound.jsx";
import { Ejemplos } from "./Ejemplos.jsx";
import { Publicaciones } from "./Publicaciones.jsx";
import { DetallePlaceHolder } from "./DetallePlaceHolder.jsx";
import "./App.css";

function AppShell() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["/", "Inicio"],
    ["/catalogo", "Catálogo local"],
    ["/catalogo-api", "Catálogo en línea"],
    ["/publicaciones", "Publicaciones"],
    ["/ejemplos", "Ejemplos"],
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <button type="button" className="sandwich" aria-label="Abrir menú"
            aria-expanded={menuOpen} aria-controls="main-menu"
            onClick={() => setMenuOpen((open) => !open)}>
            <span /><span /><span />
          </button>
          <Link className="brand" to="/">ReactCurso</Link>
        </div>
        <div className="topbar-user">
          <span className="user-name">{user?.email}</span>
          <button type="button" className="logout-button" onClick={logout}>Salir</button>
        </div>
      </header>
      {menuOpen && (
        <>
          <button type="button" className="menu-overlay" aria-label="Cerrar menú"
            onClick={() => setMenuOpen(false)} />
          <nav id="main-menu" className="side-menu is-open" aria-label="Navegación principal">
            <div className="side-menu-inner">
              {links.map(([to, label]) => (
                <NavLink key={to} to={to} end={to === "/"} onClick={() => setMenuOpen(false)}>
                  {label}
                </NavLink>
              ))}
            </div>
          </nav>
        </>
      )}
      <main className="app-content"><Outlet /></main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
            <Route index element={<Home />} />
            <Route path="catalogo" element={<CatalogProvider key="local" service={localProductService}
              title="Catálogo local" description="Los cambios se conservan durante esta visita y se restablecen al recargar la página." />}>
              <Route index element={<Catalogo />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route path="catalogo-api" element={<CatalogProvider key="api" service={productService}
              title="Catálogo en línea" description="Las altas, ediciones y eliminaciones son simuladas. Se restablecen al volver a cargar el catálogo." />}>
              <Route index element={<Catalogo />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route path="publicaciones" element={<Publicaciones />} />
            <Route path="detalle/:id" element={<DetallePlaceHolder />} />
            <Route path="placeholderdetalle/:id" element={<DetallePlaceHolder />} />
            <Route path="ejemplos" element={<Ejemplos />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
