import "./App.css";

import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import { MetodoGet } from "./components/placeholder/MetodoGet";
import { MetodoGetId } from "./components/placeholder/MetodoGetId";
import { MetodoList } from "./components/placeholder/MetodoList";
import { MetodoCreate } from "./components/placeholder/MetodoCreate";
import { MetodoUpdate } from "./components/placeholder/MetodoUpdate";
import { MetodoDelete } from "./components/placeholder/MetodoDelete";
import { MetodoFilter } from "./components/placeholder/MetodoFilter";

import { AuthProvider } from "./services/authProvider";
import { useAuth } from "./services/useAuth";
import { LoginForm } from "./loginForm";
import { ProtectedRoute } from "./protectedRoute";

import { Home } from "./Home";
import { DetallePlaceHolder } from "./DetallePlaceHolder";
import { MiniCatalogo } from "./entregables/mini-catalogo/MiniCatalogo";
import { CatalogoRutas } from "./entregables/catalogo-rutas/CatalogoRutas";
import { ProductosApi } from "./entregables/api-externa/ProductosApi";

function AppShell() {
  const { user, status, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [httpMenuOpen, setHttpMenuOpen] = useState(false);

  if (status === "loading") {
    return (
      <main className="session-screen" aria-live="polite">
        <span className="loader" aria-hidden="true" />
        <p>Verificando sesión...</p>
      </main>
    );
  }

  if (status !== "authenticated") {
    return <LoginForm />;
  }

  async function handleLogout() {
    await logout();
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          type="button"
          className="menu-toggle"
          aria-label="Abrir o cerrar menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sandwich" />
          <span className="sandwich" />
          <span className="sandwich" />
        </button>

        <div className="brand-wrap">
          <strong>ReactCurso</strong>
        </div>

        <div className="topbar-user">
          <span className="avatar" aria-hidden="true">
            {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
          </span>

          <span className="user-name">{user?.name || user?.email}</span>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <aside className={`side-menu ${menuOpen ? "is-open" : ""}`}>
        <nav aria-label="Navegación principal">
          <Link to="/" onClick={closeMenu}>
            Inicio
          </Link>

          <Link to="/detalle/4" onClick={closeMenu}>
            Detalle
          </Link>

          <Link to="/mini-catalogo" onClick={closeMenu}>
            Mini-Catálogo Estático
          </Link>

          <Link to="/catalogo-rutas" onClick={closeMenu}>
            Catálogo con Rutas
          </Link>

          <Link to="/api-externa" onClick={closeMenu}>
            Integración con API Externa
          </Link>

          <button
            type="button"
            className="side-menu-section"
            aria-expanded={httpMenuOpen}
            onClick={() => setHttpMenuOpen((open) => !open)}
          >
            <span>Métodos HTTP</span>
            <span aria-hidden="true">{httpMenuOpen ? "−" : "+"}</span>
          </button>

          {httpMenuOpen && (
            <div className="side-menu-submenu">
              <Link to="/placeholder" onClick={closeMenu}>
                GET
              </Link>

              <Link to="/placeholderdetalle/6" onClick={closeMenu}>
                GET por ID
              </Link>

              <Link to="/placeholderlist" onClick={closeMenu}>
                LIST
              </Link>

              <Link to="/placeholdercreate" onClick={closeMenu}>
                CREATE
              </Link>

              <Link to="/placeholderupdate" onClick={closeMenu}>
                UPDATE
              </Link>

              <Link to="/placeholderdelete" onClick={closeMenu}>
                DELETE
              </Link>

              <Link to="/placeholderfilter/1" onClick={closeMenu}>
                FILTER
              </Link>
            </div>
          )}
        </nav>
      </aside>

      {menuOpen && (
        <button
          type="button"
          className="menu-backdrop"
          aria-label="Cerrar menú"
          onClick={closeMenu}
        />
      )}

      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mini-catalogo"
            element={
              <ProtectedRoute>
                <MiniCatalogo />
              </ProtectedRoute>
            }
          />

          <Route
            path="/catalogo-rutas/*"
            element={
              <ProtectedRoute>
                <CatalogoRutas />
              </ProtectedRoute>
            }
          />

          <Route
            path="/api-externa"
            element={
              <ProtectedRoute>
                <ProductosApi />
              </ProtectedRoute>
            }
          />

          <Route
            path="/detalle/:id"
            element={
              <ProtectedRoute>
                <DetallePlaceHolder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/placeholder"
            element={
              <ProtectedRoute>
                <MetodoGet />
              </ProtectedRoute>
            }
          />

          <Route
            path="/placeholderdetalle/:id"
            element={
              <ProtectedRoute>
                <MetodoGetId />
              </ProtectedRoute>
            }
          />

          <Route
            path="/placeholderlist"
            element={
              <ProtectedRoute>
                <MetodoList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/placeholdercreate"
            element={
              <ProtectedRoute>
                <MetodoCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/placeholderupdate"
            element={
              <ProtectedRoute>
                <MetodoUpdate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/placeholderdelete"
            element={
              <ProtectedRoute>
                <MetodoDelete />
              </ProtectedRoute>
            }
          />

          <Route
            path="/placeholderfilter/:userId"
            element={
              <ProtectedRoute>
                <MetodoFilter />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
