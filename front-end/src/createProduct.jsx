import { useAsync } from "./hooks/useAsync";
import { ErrorPanel } from "./components/ErrorPanel";
import { createProduct } from "./services/productService";


export function AddProduct({ product }) {
    if (!product) return <p>Llena los campos y crea un producto.</p>;
    const { data, loading, error, recargar } = useAsync(
        (signal) => createProduct.create(product, signal),
        [product]
    );

    if (loading) return <p>⏳ Creando...</p>;
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
                    </tr>
                </thead>
                <tbody>
                    <tr key={data.id}>
                        <td>{data.id}</td>
                        <td>{data.title}</td>
                        <td>{data.price}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}