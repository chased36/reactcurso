import { useEffect, useState } from 'react';
import { FiltroPosts } from './components/FiltrosPosts.jsx';
import { FormularioPost } from './components/FormularioPost.jsx';
import {
  listarPosts,
  obtenerPostPorId,
  crearPost,
  actualizarPost,
  eliminarPost,
} from './services/postsService.js';
import './App.css';

export function App() {
  const [posts, setPosts] = useState([]);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Filtros (LIST con query param userId + búsqueda local por texto)
  const [filtroUserId, setFiltroUserId] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // GET por ID (detalle consultado desde /posts/:id)
  const [postDetalle, setPostDetalle] = useState(null);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);

  // CREATE / UPDATE
  const [postAEditar, setPostAEditar] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState('');

  // LIST + FILTER por userId desde la API
  useEffect(() => {
    const controller = new AbortController();

    async function cargarLista() {
      try {
        setCargando(true);
        setError(null);
        const data = await listarPosts(filtroUserId, controller.signal);
        setPosts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setCargando(false);
      }
    }

    cargarLista();
    return () => controller.abort();
  }, [filtroUserId]);

  // Filtro adicional en cliente por título o cuerpo
  const termino = busqueda.trim().toLowerCase();
  const postsVisibles = posts.filter((post) => {
    if (!termino) return true;
    return (
      post.title.toLowerCase().includes(termino) ||
      post.body.toLowerCase().includes(termino)
    );
  });

  const postsMostrados = mostrarTodos
    ? postsVisibles
    : postsVisibles.slice(0, 10);

  // GET: obtener un post específico por ID
  async function handleObtenerPorId(id) {
    try {
      setCargandoDetalle(true);
      setError(null);
      const data = await obtenerPostPorId(id);
      setPostDetalle(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargandoDetalle(false);
    }
  }

  // CREATE: POST /posts
  async function handleCrearPost(nuevoPost) {
    try {
      setEnviando(true);
      setError(null);
      setMensajeEstado('');

      const creado = await crearPost(nuevoPost);
      // JSONPlaceholder suele devolver id: 101; aseguramos id único en estado local
      const idLocal =
        posts.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;
      const postParaEstado = { ...creado, id: creado.id ?? idLocal };

      setPosts((prev) => [postParaEstado, ...prev]);
      setMensajeEstado(`Post creado con POST (ID simulado: ${creado.id})`);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  // UPDATE: PUT /posts/:id
  async function handleActualizarPost(id, datosActualizados) {
    try {
      setEnviando(true);
      setError(null);
      setMensajeEstado('');

      const actualizado = await actualizarPost(id, datosActualizados);

      setPosts((prev) =>
        prev.map((post) =>
          post.id === id ? { ...post, ...actualizado, id } : post
        )
      );

      if (postDetalle?.id === id) {
        setPostDetalle((prev) => ({ ...prev, ...actualizado, id }));
      }

      setPostAEditar(null);
      setMensajeEstado(`Post #${id} actualizado con PUT`);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  // DELETE: DELETE /posts/:id
  async function handleEliminarPost(id) {
    try {
      setError(null);
      setMensajeEstado('');

      await eliminarPost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));

      if (postDetalle?.id === id) {
        setPostDetalle(null);
      }
      if (postAEditar?.id === id) {
        setPostAEditar(null);
      }

      setMensajeEstado(`Post #${id} eliminado con DELETE`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    // Dentro del return de App.jsx
    <main className="app-container">
      <header className="app-header">
        <h1>Práctica JSONPlaceholder — CRUD + Filter</h1>
        <p className="app-contador">
          Posts cargados: <strong>{postsVisibles.length}</strong>
          {filtroUserId
            ? ` (Usuario ${filtroUserId})`
            : ' (Todos los usuarios)'}
        </p>
      </header>

      {mensajeEstado && (
        <p className="mensaje-estado" role="status">
          <strong>Estado:</strong> {mensajeEstado}
        </p>
      )}

      {error && (
        <p className="mensaje-error" role="alert">
          <strong>Error:</strong> {error}
        </p>
      )}

      <FiltroPosts
        filtroUserId={filtroUserId}
        setFiltroUserId={setFiltroUserId}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      <FormularioPost
        postAEditar={postAEditar}
        onCrearPost={handleCrearPost}
        onActualizarPost={handleActualizarPost}
        onCancelarEdicion={() => setPostAEditar(null)}
        enviando={enviando}
      />

      {cargando ? (
        <p className="estado-carga">Cargando posts desde JSONPlaceholder...</p>
      ) : (
        <>
          {postsVisibles.length > 10 && (
            <div className="lista-footer">
              <button
                type="button"
                onClick={() => setMostrarTodos((prev) => !prev)}
              >
                {mostrarTodos
                  ? 'Mostrar solo los primeros 10'
                  : `Ver todos (${postsVisibles.length})`}
              </button>
            </div>
          )}

          <ul className="lista-posts">
            {postsMostrados.map((post) => (
              <li key={post.id} className="post-item">
                <div className="post-info">
                  <span className="post-id">#{post.id}</span>
                  <span className="post-titulo">{post.title}</span>
                </div>
                <div className="post-acciones">
                  <button
                    type="button"
                    className="btn btn-detalle"
                    onClick={() => handleObtenerPorId(post.id)}
                  >
                    GET ID
                  </button>
                  <button
                    type="button"
                    className="btn btn-editar"
                    onClick={() => setPostAEditar(post)}
                  >
                    Editar (PUT)
                  </button>
                  <button
                    type="button"
                    className="btn btn-eliminar"
                    onClick={() => handleEliminarPost(post.id)}
                  >
                    Eliminar (DELETE)
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {postsVisibles.length > 10 && (
        <div className="lista-footer">
          <button
            type="button"
            onClick={() => setMostrarTodos((prev) => !prev)}
          >
            {mostrarTodos
              ? 'Mostrar solo los primeros 10'
              : `Ver todos (${postsVisibles.length})`}
          </button>
        </div>
      )}

      {cargandoDetalle && (
        <p className="estado-carga">Consultando detalle por ID...</p>
      )}

      {postDetalle && !cargandoDetalle && (
        <section className="detalle-post">
          <h2>Detalle GET /posts/{postDetalle.id}</h2>
          <p>
            <strong>Usuario (userId):</strong> {postDetalle.userId}
          </p>
          <p>
            <strong>Título:</strong> {postDetalle.title}
          </p>
          <p>
            <strong>Contenido:</strong> {postDetalle.body}
          </p>
          <button
            type="button"
            className="btn btn-secundario"
            onClick={() => setPostDetalle(null)}
          >
            Cerrar detalle
          </button>
        </section>
      )}
    </main>
  );
}

export default App;
