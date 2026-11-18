import { useAsync } from "../hooks/useAsync";
import { productService } from "../services/productService";
import { GetAllProducts } from "../components/ProductList";
import { ErrorPanel } from "../components/ErrorPanel";
import { Spinner } from "../components/Spinner";

export function CatalogoApi() {
  const { data, loading, error, recargar } = useAsync(
    (signal) => productService.getAll(signal),
    []
  );

  if (loading) return <Spinner texto="Consultando DummyJSON..." />;
  if (error) return <ErrorPanel error={error} onRetry={recargar} />;
  if (!data?.length) return <p>Sin resultados.</p>;

  return (
    <section className="card">
      <h2>Catálogo desde API 🌐</h2>
      {/* ¡El MISMO componente del ejercicio 1! Solo cambió de dónde vienen los datos */}
      <GetAllProducts products={data} rutaDetalle="/api" />
    </section>
  );
}