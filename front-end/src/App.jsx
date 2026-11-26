import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { allProducts } from "./data/productosMock";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { DetalleProducto } from "./pages/DetalleProducto";
import { CatalogoApi } from "./pages/CatalogoApi";
import { DetalleApi } from "./pages/DetalleApi";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";

function readStoredUser() {
  try {
    const raw = localStorage.getItem("tutoria-user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem("tutoria-user");
    return null;
  }
}

function ProtectedRoute({ user, children }) {
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const [productos, setProductos] = useState([...allProducts]);
  const [user, setUser] = useState(readStoredUser);

  const handleLogin = async ({ email }) => {
    const nextUser = { email, name: email.split("@")[0] };
    localStorage.setItem("tutoria-user", JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("tutoria-user");
    setUser(null);
  };

  const guardarProducto = (datos, idEditando) => {
    if (idEditando !== null) {
      setProductos((prev) =>
        prev.map((p) => (p.id === idEditando ? { ...datos, id: idEditando } : p))
      );
    } else {
      setProductos((prev) => {
        const nextId = prev.length
          ? Math.max(...prev.map((p) => Number(p.id))) + 1
          : 1;
        return [...prev, { ...datos, id: nextId }];
      });
    }
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <BrowserRouter>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route
            path="/login"
            element={<Login user={user} onLogin={handleLogin} />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/catalogo"
            element={
              <ProtectedRoute user={user}>
                <Catalogo
                  productos={productos}
                  onGuardar={guardarProducto}
                  onEliminar={eliminarProducto}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/catalogo/:id"
            element={
              <ProtectedRoute user={user}>
                <DetalleProducto productos={productos} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/api"
            element={
              <ProtectedRoute user={user}>
                <CatalogoApi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/api/:id"
            element={
              <ProtectedRoute user={user}>
                <DetalleApi />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute user={user}>
                <NotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
