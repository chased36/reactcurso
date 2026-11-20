import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { allProducts } from './productosMock.js'
import { Catalogo } from './Catalogo.jsx'
import { UseEffectSinArreglo } from './UseEffectSinArreglo.jsx'
import { UseEffectArregloVacio } from './UseEffectArregloVacio.jsx'
import { UseEffectVariables } from './UseEffectVariables.jsx'
import { UseEffectCleanup } from './UseEffectCleanup.jsx'
import { SearchTermBox } from './SearchTermBox.jsx'
import { SearchProduct } from "./SearchProduct"
import { Calculadora } from "./Calculadora.jsx"
import { PlaceHolder } from './PlaceHolder.jsx'
import { PlaceHolderList } from './PlaceHolderList.jsx'
import { PlaceHolderCreate } from './PlaceHolderCreate.jsx'
import { PlaceHolderUpdate } from './PlaceHolderUpdate.jsx'
import { PlaceHolderDelete } from './PlaceHolderDelete.jsx'
import { PlaceHolderFilterList } from './PlaceHolderFilterList.jsx'
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import { Home } from './Home.jsx'
import { DetallePlaceHolder } from './DetallePlaceHolder.jsx'
import { Menu } from './Menu.jsx'
import { allPlates } from './platosMock.js'
import { MenuRutas } from './MenuConRutas.jsx'
import { PlateInfo } from './PlateInfo.jsx'
import { Product } from './getProducto.jsx'
import { Products } from './getTodosLosProductos.jsx'
import { SearchProducts } from './searchProductos.jsx'
import { AddProduct } from './createProduct.jsx'



function App() {
  const [count, setCount] = useState(0);
  const [saludo, setSaludo] = useState("Hola desconocido");
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState();

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detalle/:id" element={<DetallePlaceHolder />} />
          </Routes>
          <section id="center">
            <p>Ejercicio GET</p>
            <PlaceHolder />
            <p>Ejercicio LIST</p>
            <PlaceHolderList />
            <p>Ejercicio CREATE</p>
            <PlaceHolderCreate />
            <p>Ejercicio UPDATE</p>
            <PlaceHolderUpdate />
            <p>Ejercicio DELETE</p>
            <PlaceHolderDelete />
            <p>Ejercicio FILTER</p>
            <PlaceHolderFilterList />
            <div className="hero">
              <img src={heroImg} className="base" width="170" height="179" alt="" />
              <img src={reactLogo} className="framework" alt="React logo" />
              <img src={viteLogo} className="vite" alt="Vite logo" />
            </div>
            <div>
              <h1>Get started</h1>
              <h3>Ejercicio Catalogo (menu)</h3>
              <Menu plates={allPlates} />
              <h3>Ejercicio Catálogo con Rutas</h3>
              <p>Ingresa la ruta del plato que deseas ver como /plato/id o da click en el enlace del plato.</p>
              <Routes>
                <Route path="/" element={<MenuRutas plates={allPlates} />} />
                <Route path="/plato/:id" element={<><PlateInfo plates={allPlates} /><br /><Link to="/">Volver</Link></>} />
              </Routes>
              <h3>Call Api DummyJSON</h3>
              <h3>GET de 1 producto</h3>
              <Product />
              <h3>GET de todos los productos</h3>
              <Products />
              <h2>Search Productos</h2>
              <input type="text" value={query} placeholder="Buscar productos..." onChange={(e) => setQuery(e.target.value)} />
              <SearchProducts query={query} />
              <h2>Crear Producto</h2>
              <form
                method="POST"
                onSubmit={(e) => {
                  e.preventDefault();
                  setProduct({
                    title: e.currentTarget.elements.titulo.value,
                    price: parseFloat(e.currentTarget.elements.precio.value),
                  });
                }}
              >
                <label htmlFor="titulo">Titulo:</label>
                <input type="text" id="titulo" name="titulo" onSubmit={(e) => setProduct({ ...product, title: e.target.value })} />
                <label htmlFor="precio">Precio:</label>
                <input type="number" id="precio" name="precio" onSubmit={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })} />
                <button type="submit">Crear Producto</button>
              </form>
              <AddProduct product={product} />
              {/* <SearchTermBox/> */}
              <p>
                Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
              </p>
              <UseEffectSinArreglo />
              <UseEffectArregloVacio />
              <UseEffectVariables />
              <UseEffectCleanup />
            </div>
            <Calculadora />
            <SearchProduct products={allProducts} />
            <label>Count is {count}</label>
            <button
              type="button"
              className="counter"
              onClick={() => setCount((count) => count + 1)}
            >
              +
            </button>
            <button
              type="button"
              className="counter"
              onClick={() => setCount((count) => count - 1)}
            >
              -
            </button>
            <button
              type="button"
              className="counter"
              onClick={() => setCount(() => 0)}
            >
              {" "}
              reset
            </button>
          </section>

          <input
            onInput={(evt) => {
              setSaludo(evt.target.value);
            }}
          ></input>

          <h4>{saludo}</h4>
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
            <div id="social">
              <svg className="icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#social-icon"></use>
              </svg>
              <h2>Connect with us</h2>
              <p>Join the Vite community</p>
              <ul>
                <li>
                  <a href="https://github.com/vitejs/vite" target="_blank">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#github-icon"></use>
                    </svg>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://chat.vite.dev/" target="_blank">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#discord-icon"></use>
                    </svg>
                    Discord
                  </a>
                </li>
                <li>
                  <a href="https://x.com/vite_js" target="_blank">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#x-icon"></use>
                    </svg>
                    X.com
                  </a>
                </li>
                <li>
                  <a href="https://bsky.app/profile/vite.dev" target="_blank">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#bluesky-icon"></use>
                    </svg>
                    Bluesky
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <div className="ticks"></div>
          <section id="spacer"></section>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
