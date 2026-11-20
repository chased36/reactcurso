import "./App.css";

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

function AppShell() {
  const { user, status, logout } = useAuth();

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

  return (
    <>
      <header>
        <span>Usuario: {user?.name || user?.email}</span>

        <button type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <nav>
        <Link to="/">Home</Link>
        <h2>JSONPlaceholder - Métodos HTTP</h2>
        <Link to="/placeholder">GET</Link>
        <Link to="/placeholderdetalle/6">GET por ID</Link>
        <Link to="/placeholderlist">LIST</Link>
        <Link to="/placeholdercreate">CREATE</Link>
        <Link to="/placeholderupdate">UPDATE</Link>
        <Link to="/placeholderdelete">DELETE</Link>
        <Link to="/placeholderfilter/1">FILTER</Link>
      </nav>

      <main>
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
    </>
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
