import { useState } from 'react'
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import "./App.css";

import { AuthProvider } from "./services/authProvider.jsx";
import { useAuth } from "./services/useAuth.js";
import { LoginForm } from "./loginForm.jsx";
import { ProtectedRoute } from "./protectedRoute.jsx";

import { DetallePlaceHolder } from "./DetallePlaceHolder.jsx";
import { PlaceHolder } from './placeHolder.jsx'
import { PlaceHolderList } from './placeHolderList.jsx'
import { PlaceHolderCreate } from './placeHolderCreate.jsx'
import { PlaceHolderUpdate } from './placeHolderUpdate.jsx'
import { PlaceHolderDelete } from './placeHolderDelete.jsx'
import { PlaceHolderFilter } from './placeHolderFilter.jsx'

import { SearchTermBox } from './SearchTermBox.jsx'
import { Catalogo } from './Catalogo.jsx'
import { Calculadora } from "./Calculadora.jsx"
import { CalculadoraGEslava } from './CalculadoraGEslava.jsx'
import { FormularioGEslava } from './FormularioGEslava.jsx'
import { MiniCatalogoGEslava } from './MiniCatalogoGEslava.jsx'

import { ProductList, GetAllProducts} from "./ProductList"
import { allProducts } from './productosMock.js'

import { ListaProductos } from "./ListaProductos.jsx";
import { DetalleProducto } from "./DetalleProducto.jsx";
import { NoEncontrado404 } from "./NoEncontrado404.jsx";
import { DummyJson } from "./DummyJson.jsx";

import { UseEffectSinArreglo } from './UseEffectSinArreglo.jsx'
import { UseEffectArregloVacio } from './UseEffectArregloVacio.jsx'
import { UseEffectVariables } from './UseEffectVariables.jsx'
import { UseEffectCleanup } from './UseEffectCleanup.jsx'

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

function HomePage() {
  const [count, setCount] = useState(0);
  const [saludo, setSaludo] = useState("hola desconocido");

  return (
    <div className="home-page">

      <header className="home-hero">
        <span className="eyebrow">Panel privado</span>
        <h3>Explora tu aplicación</h3>
        <p>Navega por las herramientas disponibles.</p>
      </header>

      <section className="dashboard-grid">

        <article className="glass-card search-card">
          <h2>Búsqueda</h2>
          <SearchTermBox />
        </article>

        <article className="glass-card">
          <h2>Calculadora</h2>
          <Calculadora />
        </article>

        <article className="examplesUseEffect">
          <h4>Ejemplos de useEffect y ciclo de vida</h4>
          <UseEffectSinArreglo />
          <UseEffectArregloVacio />
          <UseEffectVariables />
          <UseEffectCleanup />
        </article>

        <article className="glass-card counter-card">
          <h2>Contador</h2>
          <strong className="counter-value">{count}</strong>

          <div className="counter-actions">
            <button type="button" onClick={() => setCount(v => v + 1)}>
              +
            </button>
            <button type="button" onClick={() => setCount(v => v - 1)}>
              -
            </button>
            <button type="button" onClick={() => setCount(0)}>
              Reset
            </button>
          </div>
        </article>

        <article className="glass-card">
          <h2>Saludo</h2>
          <input
            value={saludo}
            onChange={e => setSaludo(e.target.value)}
          />
          <h4>{saludo}</h4>
        </article>

      </section>

      <section>
        <h2>Ejercicios con PlaceHolder</h2>
        <PlaceHolder />
        <PlaceHolderList />
        <PlaceHolderCreate />
        <PlaceHolderUpdate />
        <PlaceHolderDelete />
        <PlaceHolderFilter />
      </section>

      <section>
        <h2>Búsqueda y productos</h2>
        <ProductList products={allProducts} />
        <GetAllProducts products={allProducts} />
      </section>

      <section>
        <h2>Catálogo CRUD</h2>
        <Catalogo products={allProducts} />
      </section>

      <section>
        <h2>Mis proyectos</h2>
        <MiniCatalogoGEslava />
        <CalculadoraGEslava />
        <FormularioGEslava />
      </section>

      <section>
        <h2>Consultas con DummyJSON</h2>
        <DummyJson />
      </section>

      <section id="next-steps">
        <div id="docs">
          <h2>Documentación</h2>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
      </section>

    </div>
  );
}
  
function AppShell() {
  const { user, status, logout } = useAuth();

  if (status === "loading") {
    return <p>Verificando sesión...</p>;
  }

  if (status !== "authenticated") {
    return <LoginForm />;
  }

  async function handleLogout() {
    await logout();
  }

  return (
    <div className="app-shell">

      <input className="menu-toggle" type="checkbox" id="menu-toggle" />

      <header className="topbar">
        <div className="brand-wrap">
          <label className="sandwich" htmlFor="menu-toggle">
            <span />
            <span />
            <span />
          </label>

          <Link className="brand" to="/">
            ReactCurso
          </Link>
        </div>

        <div className="topbar-user">
          <span className="avatar">
            {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
          </span>

          <span className="user-name">
            {user?.name || user?.email}
          </span>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Salir
          </button>
        </div>
      </header>

      <nav className="side-menu" aria-label="Navegación principal">
        <div className="side-menu-inner">
          <span className="menu-label">Explorar</span>
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/placeholderdetalle/1">Detalle PlaceHolder</Link>
        </div>
      </nav>

      <label className="menu-backdrop" htmlFor="menu-toggle" />

      <main className="app-content">
        <Routes>

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/catalogo"
            element={
              <ProtectedRoute>
                <ListaProductos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/catalogo/:id"
            element={
              <ProtectedRoute>
                <DetalleProducto />
              </ProtectedRoute>
            }
          />

          <Route
            path="/placeholderdetalle/:id"
            element={
              <ProtectedRoute>
                <DetallePlaceHolder />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Navigate to="/" replace />} />

          <Route path="*" element={<NoEncontrado404 />} />

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
