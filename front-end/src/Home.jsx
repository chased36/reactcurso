import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="home-page">
      <header className="home-hero">
        <h1>Mis ejercicios de React</h1>
        <p>Elige una práctica para comenzar.</p>
      </header>
      <div className="dashboard-grid">
        <article className="glass-card">
          <h2>Catálogo local</h2>
          <p>Busca, agrega, edita y consulta productos.</p>
          <Link to="/catalogo">Abrir catálogo</Link>
        </article>
        <article className="glass-card">
          <h2>Catálogo en línea</h2>
          <p>Explora productos de DummyJSON con las mismas herramientas.</p>
          <Link to="/catalogo-api">Abrir catálogo en línea</Link>
        </article>
        <article className="glass-card">
          <h2>Publicaciones</h2>
          <p>Consulta y practica operaciones con JSONPlaceholder.</p>
          <Link to="/publicaciones">Ver publicaciones</Link>
        </article>
        <article className="glass-card">
          <h2>Ejemplos de clase</h2>
          <p>Calculadora, estados y ciclo de vida de los componentes.</p>
          <Link to="/ejemplos">Ver ejemplos</Link>
        </article>
      </div>
    </div>
  );
}
