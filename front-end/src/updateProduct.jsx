import { useEffect, useState } from "react";
import { useAsync } from "./hooks/useAsync";
import { ErrorPanel } from "./components/ErrorPanel";
import { getProduct, updateProduct } from "./services/productService";

export function UpdateProduct() {
    const { data, loading, error, recargar } = useAsync(
        (signal) => getProduct.get(1, signal),
        []
    );
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [updatedData, setUpdatedData] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setPrice(String(data.price));
        }
    }, [data]);

    async function handleSubmit(event) {
        event.preventDefault();
        if (!data) return;

        const controller = new AbortController();
        setUpdating(true);
        setUpdateError(null);

        try {
            const result = await updateProduct.update(
                data.id,
                { title, price: parseFloat(price) },
                controller.signal
            );
            setUpdatedData(result);
        } catch (err) {
            setUpdateError(err);
        } finally {
            setUpdating(false);
        }
    }

    if (loading) return <p>⏳ Buscando producto...</p>;
    if (error) return <ErrorPanel error={error} onRetry={recargar} />;
    if (!data) return <p>Sin resultados.</p>;

    const product = updatedData ?? data;

    return (
        <>
            <p><strong>ID:</strong> {product.id}</p>
            <p><strong>Titulo:</strong> {product.title}</p>
            <p><strong>Precio:</strong> {product.price}</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="update-title">Titulo:</label>
                <input
                    id="update-title"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                />

                <label htmlFor="update-price">Precio:</label>
                <input
                    id="update-price"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                />

                <button type="submit" disabled={updating}>
                    {updating ? "Actualizando..." : "Actualizar Producto"}
                </button>
            </form>

            {updateError && <ErrorPanel error={updateError} />}
        </>
    );
}
