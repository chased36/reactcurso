import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { obtenerProductos } from './services/productosService.js';
// import { productosMock } from './data/productosMock.js';
import { CatalogoPage } from './pages/catalogo-page.jsx';
import { DetalleProductoPage } from './pages/detalle-producto-page.jsx';
import { NotFoundPage } from './pages/not-found-page.jsx';
import './App.css';
import './styles.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const textNormalized = terminoBusqueda.toLowerCase().trim();

  const categorias = ['Todos', ...new Set(productos.map((p) => p.categoria))];

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoriaActiva === 'Todos' || producto.categoria === categoriaActiva;
    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(textNormalized) ||
      producto.categoria.toLowerCase().includes(textNormalized);

    return coincideCategoria && coincideBusqueda;
  });

  useEffect(() => {
    const controller = new AbortController();

    async function cargarProductos() {
      try {
        setCargando(true);
        setError(null);
        const datos = await obtenerProductos(controller.signal);
        setProductos(datos);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'No se pudieron cargar los productos');
        }
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();

    return () => {
      controller.abort();
    };
  }, []);

  const handleAgregarProducto = (nuevoProducto) => {
    setProductos((prevProductos) => {
      const maxId = prevProductos.reduce(
        (max, prod) => (prod.id > max ? prod.id : max),
        0
      );

      return [
        ...prevProductos,
        {
          ...nuevoProducto,
          id: maxId + 1,
        },
      ];
    });
  };

  const handleEliminarProducto = (id) => {
    setProductos((prevProductos) =>
      prevProductos.filter((producto) => producto.id !== id)
    );

    if (productoAEditar?.id === id) {
      setProductoAEditar(null);
      setMostrarFormulario(false);
    }
  };

  const handleIniciarEdicion = (producto) => {
    setProductoAEditar(producto);
    setMostrarFormulario(true);
  };

  const handleGuardarEdicion = (productoActualizado) => {
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === productoActualizado.id ? productoActualizado : producto
      )
    );
    setProductoAEditar(null);
    setMostrarFormulario(false);
  };

  const handleCancelarEdicion = () => {
    setProductoAEditar(null);
    setMostrarFormulario(false);
  };

  if (cargando) {
    return (
      <main>
        <p>Cargando productos desde DummyJSON...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h2>Ocurrió un error</h2>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/producto/:id"
          element={<DetalleProductoPage productos={productos} />}
        />
        <Route
          path="/"
          element={
            <CatalogoPage
              categorias={categorias}
              productosFiltrados={productosFiltrados}
              categoriaActiva={categoriaActiva}
              setCategoriaActiva={setCategoriaActiva}
              terminoBusqueda={terminoBusqueda}
              setTerminoBusqueda={setTerminoBusqueda}
              mostrarFormulario={mostrarFormulario}
              setMostrarFormulario={setMostrarFormulario}
              productoAEditar={productoAEditar}
              setProductoAEditar={setProductoAEditar}
              handleAgregarProducto={handleAgregarProducto}
              handleEliminarProducto={handleEliminarProducto}
              handleIniciarEdicion={handleIniciarEdicion}
              handleGuardarEdicion={handleGuardarEdicion}
              handleCancelarEdicion={handleCancelarEdicion}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
        {/* localhost:port/cualquiercosa */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
