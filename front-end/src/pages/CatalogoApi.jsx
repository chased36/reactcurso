import { Link } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { productService } from "../services/productService";
import { ProductList } from "../components/ProductList";
import { ErrorPanel } from "../components/ErrorPanel";
import { Spinner } from "../components/Spinner";

export function CatalogoApi() {
  const { data, loading, error, recargar } = useAsync(
    (signal) => productService.getAll(signal),
    []
  );

  if (loading) {
    return (
      <section className="tutoria-card">
        <Spinner texto="Consultando API externa (DummyJSON)..." />
      </section>
    );
  }

  if (error) {
    return (
      <section className="tutoria-card">
        <ErrorPanel error={error} onRetry={recargar} />
      </section>
    );
  }

  if (!data?.length) {
    return (
      <section className="tutoria-card">
        <p>Sin resultados.</p>
      </section>
    );
  }

  return (
    <section className="tutoria-card">
      <div className="tutoria-breadcrumb">
        <Link to="/">← Inicio</Link>
        <span className="sep">/</span>
        <span>Catálogo API</span>
      </div>

      <h1>Catálogo desde API Externa</h1>
      <ProductList products={data} rutaDetalle="/api" />
    </section>
  );
}
