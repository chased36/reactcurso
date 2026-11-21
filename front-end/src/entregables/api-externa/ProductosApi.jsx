import { useAsync } from "../../hooks/useAsync";
import { productosApiService } from "./productosApiService";
import { ErrorPanel } from "../../components/ErrorPanel";
import "./apiExterna.css";

export function ProductosApi() {
  const {
    data: productos,
    loading,
    error,
    recargar,
  } = useAsync(productosApiService.metodoList, []);

  if (loading) {
    return <p>Cargando Productos desde DummyJSON...</p>;
  }

  if (error) {
    return (
      <section>
        <ErrorPanel
          error={error}
          onRetry={recargar}
          title="Error al Consultar los Productos"
        />
      </section>
    );
  }

  return (
    <section className="productos-api">
      <h2>Integración con API Externa</h2>
      <p>Productos Obtenidos desde la API Pública DummyJSON.</p>

      {productos?.products?.length === 0 ? (
        <p>No Hay Productos Disponibles.</p>
      ) : (
        <div className="productos-api-lista">
          {productos?.products?.map((producto) => (
            <article key={producto.id} className="producto-api-card">
              <img
                src={producto.thumbnail}
                alt={producto.title}
                className="producto-api-imagen"
              />
              <h3>{producto.title}</h3>
              <p>Precio: ${producto.price}</p>
              <p>Categoría: {producto.category}</p>
              <p>Calificación: {producto.rating}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
