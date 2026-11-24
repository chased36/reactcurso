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

import { ProductList, GetAllProducts } from "./ProductList"
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

        <article className="glass-card">
          <h2>Otra versión de Calculadora</h2>
          <CalculadoraGEslava />
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
          <label htmlFor="saludo">Nombre: </label>
          <input
            id="saludo"
            value={saludo}
            onChange={e => setSaludo(e.target.value)}
          />
          <h4>¡Hola {saludo}!</h4>
        </article>

        <article className="glass-card search-card">
          <h2>Búsqueda de productos</h2>
          <ProductList products={allProducts} />
        </article>

        <article className="glass-card search-card">
          <h3>Lista con opción a ordenar por atributo</h3>
          <h4>Dar clic en atributo deseado</h4>
          <GetAllProducts products={allProducts} />
        </article>

        <article className="glass-card search-card">
          <h2>Catálogo  </h2>
          <h3>Incluye: CRUD (Create, Read, Update y Delete) y ordena por atributo </h3>
          <Catalogo products={allProducts} />
        </article>

        <article className="glass-card search-card">
          <h2>Minicatálogo</h2>
          <MiniCatalogoGEslava /> 
        </article>

        <article className="glass-card search-card">
          <h2>Otra sugerencia de catalogo</h2>
          <FormularioGEslava />
        </article>

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
          <Link to="/UseEffect">UseEffect-Varios</Link>
          <Link to="/placeholderdetalle/1">Detalle PlaceHolder</Link>
          <Link to="/placeholderCRUD">PlaceHolder CRUD</Link>
          <Link to="/dummyJsonCRUD">DummyJson CRUD</Link>
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
            path="/UseEffect"
            element={
              <ProtectedRoute>
                <UseEffectPage />
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
          <Route
            path="/placeholderCRUD"
            element={
              <ProtectedRoute>
                <PlaceHolderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dummyJsonCRUD"
            element={
              <ProtectedRoute>
                <DummyJsonPage />
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
export function PlaceHolderPage() {
  return (
    <section className="dashboard-grid" >
      <h2>CRUD con PlaceHolder</h2>

      <article className="glass-card search-card">
        <h3>get</h3>
        <PlaceHolder />
      </article>

      <article className="glass-card search-card">
        <h3>list</h3>
        <PlaceHolderList />
      </article>

      <article className="glass-card search-card">
        <h3>create</h3>
        <PlaceHolderCreate />
      </article>

      <article className="glass-card">
        <h3>update</h3>
        <PlaceHolderUpdate />
      </article>

      <article className="glass-card">
        <h3>delete</h3>
        <PlaceHolderDelete />
      </article>

      <article className="glass-card search-card">
        <h3>filter</h3>
        <PlaceHolderFilter />
      </article>
    </section>
  );
}

export function UseEffectPage() {
  return (
    <section className="dashboard-grid">
      <h2>Ejemplos con UseEffect y ciclo de vida</h2>

      <p className="texto">
        useEffect es un Hook de React que permite ejecutar código secundario (efectos) después de que un componente se renderiza. Se suele usar para:
     

      <ul className="texto">
        <li>Llamar APIs y obtener datos.</li>
        <li>Escuchar eventos (resize, scroll, etc.).</li>
        <li> Modificar el título de la página.</li>
        <li> Crear y limpiar temporizadores (setInterval, setTimeout).</li>
        <li>Sincronizar el componente con recursos externos.</li>
      </ul>
       </p>

      <article className="glass-card">
        <h3>UseEffect - sin Arreglo</h3>
        <UseEffectSinArreglo />
      </article>

      <article className="glass-card">
        <h3>UseEffect - Arreglo Vacío</h3>
        <UseEffectArregloVacio />
      </article>

      <article className="glass-card">
        <h3>UseEffect - Variables</h3>
        <UseEffectVariables />
      </article>

      <article className="glass-card">
        <h3>UseEffect - Cleanup</h3>
        <UseEffectCleanup />
      </article>
      <br></br>
    </section>
  );
}

export function DummyJsonPage() {
  return (
    <section>
      <h2> CRUD con DummyJSON </h2>
      <DummyJson />
    </section>
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
