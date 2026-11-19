import { useAsync } from "./hooks/useAsync";
import { ErrorPanel } from "./components/ErrorPanel";
import { getAllProducts } from "./services/productService";


export function Products() {
    const { data, loading, error, recargar } = useAsync(
        (signal) => getAllProducts.get(signal),
        []
    );

    if (loading) return <p>⏳ Buscando...</p>;
    if (error) return <ErrorPanel error={error} onRetry={recargar} />;
    if (!data) return <p>Sin resultados.</p>;

    return (
        <>
            <table style={{ width: "100%", height: "100%" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Precio</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}