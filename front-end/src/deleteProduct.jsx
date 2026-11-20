import { useState } from "react";
import { useAsync } from "./hooks/useAsync";
import { ErrorPanel } from "./components/ErrorPanel";
import { deleteProduct, getProduct } from "./services/productService";

export function DeleteProduct() {
    const { data, loading, error, recargar } = useAsync(
        (signal) => getProduct.get(1, signal),
        []
    );
    const [deletedData, setDeletedData] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        if (!data) return;

        const controller = new AbortController();
        setDeleting(true);
        setDeleteError(null);

        try {
            const result = await deleteProduct.delete(data.id, controller.signal);
            setDeletedData(result);
        } catch (err) {
            setDeleteError(err);
        } finally {
            setDeleting(false);
        }
    }

    if (loading) return <p>⏳ Buscando producto...</p>;
    if (error) return <ErrorPanel error={error} onRetry={recargar} />;
    if (!data) return <p>Sin resultados.</p>;

    return (
        <>
            {deletedData ? (
                <p>
                    Producto eliminado: {deletedData.title} (ID: {deletedData.id})
                </p>
            ) : (
                <>
                    <p><strong>ID:</strong> {data.id}</p>
                    <p><strong>Titulo:</strong> {data.title}</p>
                    <p><strong>Precio:</strong> {data.price}</p>
                </>
            )}

            <form onSubmit={handleSubmit}>
                <button type="submit" disabled={deleting || deletedData}>
                    {deleting ? "Eliminando..." : "Eliminar Producto"}
                </button>
            </form>

            {deleteError && <ErrorPanel error={deleteError} />}
        </>
    );
}
