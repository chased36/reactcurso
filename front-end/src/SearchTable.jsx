import { useAsync } from "./hooks/useAsync";
import { searchService } from "./services/searchService";
import { ErrorPanel } from "./components/ErrorPanel";

export function SearchTable() {
    const { data, loading, error, recargar } = useAsync(
        (signal) => searchService.getAll(signal),
        []
    );

    if (loading) return <p>⏳ Buscando...</p>;
    if (error) return <ErrorPanel error={error} onRetry={recargar} />;
    if (!data || data.length === 0) return <p>Sin resultados.</p>;

    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Título</th>
                    <th>Engine</th>
                    <th>Snippet</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={item.id}>
                        <td>
                            <button
                                onClick={async () => {
                                    try {
                                        await searchService.remove(item.id);
                                        alert("¡Eliminado con éxito!");
                                        // Opcional: recargar los datos o actualizar el estado
                                    } catch (err) {
                                        console.error("Error al borrar:", err);
                                    }
                                }}
                                style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "4px 8px", cursor: "pointer" }}
                            >
                                🗑️ Borrar
                            </button>
                        </td>

                        <td>{index + 1}</td>
                        <td>
                            <a href={item.url} target="_blank" rel="noreferrer">
                                {item.title}
                            </a>
                        </td>
                        <td>
                            <span>{item.engine}</span>
                        </td>
                        <td>{item.snippet}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}