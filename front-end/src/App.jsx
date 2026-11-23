import { useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './services/authProvider.jsx';
import { useAuth } from './services/useAuth.js';
import { LoginForm } from './loginForm.jsx';
import { ProtectedRoute } from './protectedRoute.jsx';
import { DetallePlaceHolder } from './DetallePlaceHolder.jsx';
import { SearchTermBox } from './SearchTermBox.jsx';
import { Catalogo } from './Catalogo.jsx';
import { Calculadora } from './Calculadora.jsx';
import { allProducts } from './productosMock.js';
import { SearchProduct } from './SearchProduct';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { UseEffectSinArreglo } from './UseEffectSinArreglo.jsx';
import { UseEffectArregloVacio } from './UseEffectArregloVacio.jsx';
import { UseEffectVariables } from './UseEffectVariables.jsx';
import { UseEffectCleanup } from './UseEffectCleanup.jsx';

function HomePage() {
  const [count, setCount] = useState(0);
  const [saludo, setSaludo] = useState('hola desconocido');
  return (
    <div className="home-page">
      <header className="home-hero">
        <span className="eyebrow">Panel privado</span>
        <h3>Explora tu aplicación</h3>
        <p>Navega por las herramientas disponibles en el menú.</p>
      </header>

      <section className="dashboard-grid">
        <article className="glass-card search-card">
          <h2>B�squeda</h2>
          <SearchTermBox />
        </article>

        <article className="glass-card">
          <h2>Calculadora</h2>
          <Calculadora />
        </article>

        <article className="examplesUseEffect">
          <h4>Example of uses effect and life cycle</h4>
          <UseEffectSinArreglo />
          <UseEffectArregloVacio />
          <UseEffectVariables />
          <UseEffectCleanup />
        </article>

        <article className="glass-card counter-card">
          <h2>Contador</h2>
          <strong className="counter-value">{count}</strong>
          <div className="counter-actions">
            <button
              type="button"
              onClick={() => setCount((value) => value + 1)}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => setCount((value) => value - 1)}
            >
              -
            </button>
            <button type="button" onClick={() => setCount(0)}>
              Reset
            </button>
          </div>
        </article>

        <article className="glass-card catalog-card">
          <h2>Cat�logo</h2>
          <SearchProduct products={allProducts} />
        </article>
        <article className="exampleSetSaludo">
          <h3>Example set saludo to label</h3>
          <input
            onInput={(evt) => {
              setSaludo(evt.target.value);
            }}
          ></input>
          <h4>{saludo}</h4>
        </article>
        <article>
          <div className="ticks"></div>
          <Catalogo products={allProducts} />
          <section id="next-steps">
            <div id="docs">
              <svg className="icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#documentation-icon"></use>
              </svg>
              <h2>Documentation</h2>
              <p>Your questions, answered</p>
              <ul>
                <li>
                  <a href="https://vite.dev/" target="_blank">
                    <img className="logo" src={viteLogo} alt="" />
                    Explore Vite
                  </a>
                </li>
                <li>
                  <a href="https://react.dev/" target="_blank">
                    <img className="button-icon" src={reactLogo} alt="" />
                    Learn more
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </article>
      </section>
    </div>
  );
}

function AppShell() {
  const { user, status, logout } = useAuth();

  if (status === 'loading') {
    return (
      <main className="session-screen" aria-live="polite">
        <span className="loader" aria-hidden="true" />
        <p>Verificando sesi�n...</p>
      </main>
    );
  }

  if (status !== 'authenticated') return <LoginForm />;

  async function handleLogout() {
    await logout();
  }

  return (
    <div className="app-shell">
      <input className="menu-toggle" type="checkbox" id="menu-toggle" />

      <header className="topbar">
        <div className="brand-wrap">
          <label
            className="sandwich"
            htmlFor="menu-toggle"
            aria-label="Abrir men�"
          >
            <span />
            <span />
            <span />
          </label>
          <Link className="brand" to="/">
            ReactCurso
          </Link>
        </div>

        <div className="topbar-user">
          <span className="avatar" aria-hidden="true">
            {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
          </span>
          <span className="user-name">{user?.name || user?.email}</span>
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Salir
          </button>
        </div>
      </header>

      <nav className="side-menu" aria-label="Navegaci�n principal">
        <div className="side-menu-inner">
          <span className="menu-label">Explorar</span>
          <Link to="/">
            <span aria-hidden="true">�</span> Inicio
          </Link>
          <Link to="/placeholderdetalle/1">
            <span aria-hidden="true">?</span> Detalle
          </Link>
        </div>
      </nav>

      <label
        className="menu-backdrop"
        htmlFor="menu-toggle"
        aria-hidden="true"
      />

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
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route
            path="/placeholderdetalle/:id"
            element={
              <ProtectedRoute>
                <DetallePlaceHolder />
              </ProtectedRoute>
            }
          />
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
