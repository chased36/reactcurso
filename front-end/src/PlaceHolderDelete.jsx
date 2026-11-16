import { useState } from "react";
import { useAsync } from "./hooks/useAsync";
import { placeHolderService } from "./services/placeHolderService";
import { ErrorPanel } from "./components/ErrorPanel";
import { placeHolderServiceDelete } from "./services/placeHolderServiceDelete";

export function PlaceHolderDelete() {
    const { data, loading, error, recargar } = useAsync(
        (signal) => placeHolderService.get(1, signal),
        []
    );
    const [deletedData, setDeletedData] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const item = deletedData ?? data;

    async function handleSubmit(event) {
        event.preventDefault();
        if (!item) return;

        setDeleting(true);
        setDeleteError(null);
        try {
            const result = await placeHolderServiceDelete.delete(item.id);
            setDeletedData(result);
        } catch (err) {
            setDeleteError(err);
        } finally {
            setDeleting(false);
        }
    }

    if (loading) return <p>⏳ Buscando...</p>;
    if (error) return <ErrorPanel error={error} onRetry={recargar} />;
    if (!data) return <p>Sin resultados.</p>;

    return (
        <>
            <p>{item.id}</p>
            <p>{item.title}</p>

            <form onSubmit={handleSubmit}>
                <button type="submit" disabled={deleting}>
                    {deleting ? "Eliminando..." : "Eliminar"}
                </button>
            </form>
            {deleteError && <ErrorPanel error={deleteError} />}
        </>
    );
}