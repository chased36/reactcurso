import { TablaCategoria } from '../components/tabla-categoria.jsx';
import { BotonesCategoria } from '../components/botones-categoria.jsx';
import { BuscadorProducto } from '../components/buscador-producto.jsx';
import { FormularioProducto } from '../components/formulario-producto.jsx';

export function CatalogoPage({
  productosFiltrados,
  categoriaActiva,
  setCategoriaActiva,
  terminoBusqueda,
  setTerminoBusqueda,
  mostrarFormulario,
  setMostrarFormulario,
  productoAEditar,
  setProductoAEditar,
  handleAgregarProducto,
  handleEliminarProducto,
  handleIniciarEdicion,
  handleGuardarEdicion,
  handleCancelarEdicion,
}) {
  return (
    <main>
      <h1>
        <i
          className="bi bi-collection-fill"
          style={{ fontSize: '1.5rem', padding: '0 0.8rem' }}
        ></i>
        Mini Catalogo
        <i
          className="bi bi-collection-fill"
          style={{ fontSize: '1.5rem', padding: '0 0.8rem' }}
        ></i>
      </h1>

      <button
        type="button"
        className="BotonCat"
        onClick={() => {
          if (mostrarFormulario) {
            setProductoAEditar(null);
          }
          setMostrarFormulario((prev) => !prev);
        }}
      >
        {mostrarFormulario ? (
          <>
            <i class="bi bi-caret-left-fill"></i>
          </>
        ) : (
          <>
            <i class="bi bi-plus-circle" style={{ marginRight: '0.5rem' }}></i>{' '}
            Agregar/Editar Producto
          </>
        )}
      </button>

      {mostrarFormulario && (
        <FormularioProducto
          onAgregarProducto={handleAgregarProducto}
          productoAEditar={productoAEditar}
          onGuardarEdicion={handleGuardarEdicion}
          onCancelarEdicion={handleCancelarEdicion}
        />
      )}

      <BotonesCategoria
        categoriaActiva={categoriaActiva}
        setCategoriaActiva={setCategoriaActiva}
      />

      <BuscadorProducto
        terminoBusqueda={terminoBusqueda}
        setTerminoBusqueda={setTerminoBusqueda}
      />

      <TablaCategoria
        productos_catalogo={productosFiltrados}
        productoAEditar={productoAEditar}
        onEliminarProducto={handleEliminarProducto}
        onEditarProducto={handleIniciarEdicion}
      />
    </main>
  );
}
