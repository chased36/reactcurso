import { Link, useParams } from "react-router-dom";
import { useCatalog } from "./hooks/catalogContext";
import { NotFound } from "./NotFound";

export function ProductDetail() {
  const { id } = useParams();
  const { products } = useCatalog();
  const product = products.find((item) => String(item.id) === id);

  if (!product) return <NotFound resource="Producto no encontrado" backTo=".." />;

  return (
    <article className="glass-card product-detail">
      <Link to=".." relative="path">← Volver al catálogo</Link>
      <h1>{product.nombre}</h1>
      <dl>
        <dt>Precio</dt><dd>${product.precio.toFixed(2)}</dd>
        <dt>Stock</dt><dd>{product.stock}</dd>
        <dt>Categoría</dt><dd>{product.categoria}</dd>
      </dl>
      {product.descripcion && <p>{product.descripcion}</p>}
    </article>
  );
}
