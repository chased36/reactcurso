import { useState } from "react";
import { useAsync } from "./hooks/useAsync";
import { placeHolderService } from "./services/placeHolderService";
import { ErrorPanel } from "./components/ErrorPanel";
import { placeHolderServiceUpdate } from "./services/placeHolderServiceUpdate";

export function PlaceHolderUpdate() {
    const { data, loading, error, recargar } = useAsync(
        (signal) => placeHolderService.get(1, signal),
        []
    );
    const [title, setTitle] = useState("");
    const [updatedData, setUpdatedData] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        if (!data) return;

        const controller = new AbortController();
        setUpdating(true);
        setUpdateError(null);
        try {
            const result = await placeHolderServiceUpdate.update(title);
            setUpdatedData(result);
        } catch (err) {
            setUpdateError(err);
        } finally {
            setUpdating(false);
        }
    }

    if (loading) return <p>⏳ Buscando...</p>;
    if (error) return <ErrorPanel error={error} onRetry={recargar} />;
    if (!data) return <p>Sin resultados.</p>;

    const item = updatedData ?? data;

    return (
        <>
            <p>{item.id}</p>
            <p>{item.title}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Nuevo título</label>
                <input
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <button type="submit" disabled={updating}>
                    {updating ? "Actualizando..." : "Actualizar"}
                </button>
            </form>
            {updateError && <ErrorPanel error={updateError} />}
        </>
    );
}