import { useAsync } from "./hooks/useAsync";
import { ErrorPanel } from "./components/ErrorPanel";
import { getProduct } from "./services/productService";
import { useState } from "react";

export function Product() {
    const [id, setId] = useState(1);
    const { data, loading, error, recargar } = useAsync(
        (signal) => getProduct.get(id),
        [id]
    );

    if (loading) return <p>⏳ Buscando...</p>;
    if (error) return <ErrorPanel error={error} onRetry={recargar} />;
    if (!data) return <p>Sin resultados.</p>;

    return (
        <>
            <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
            <p><strong>ID: </strong>{data.id}</p>
            <p><strong>Titulo: </strong>{data.title}</p>
            <p><strong>Descripcion: </strong>{data.description}</p>
            <p><strong>Categoria: </strong>{data.category}</p>
            <p><strong>Precio: </strong>{data.price}</p>
            <p><strong>Descuento: </strong>{data.discountPercentage}</p>
            <p><strong>Calificacion: </strong>{data.rating}</p>
            <p><strong>Stock: </strong>{data.stock}</p>
        </>
    );
}