import { useAsync } from "./hooks/useAsync";
import { placeHolderServiceList } from "./services/placeHolderServiceList";
import { ErrorPanel } from "./components/ErrorPanel";

export function PlaceHolderList() {
    const { data, loading, error, recargar } = useAsync(
        (signal) => placeHolderServiceList.getList(signal),
        []
    );

    if (loading) return <p>⏳ Buscando...</p>;
    if (error) return <ErrorPanel error={error} onRetry={recargar} />;
    if (!data?.length) return <p>Sin resultados.</p>;

    return (
        <table className="mag-table">
            <thead>
                <tr>
                    <th>UserID</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Body</th>
                </tr>
            </thead>
            <tbody>
                {data.map((r, i) => (
                    <tr key={r.userId}>
                        <td>{r.userId}</td>
                        <td>{r.id}</td>
                        <td>{r.title}</td>
                        <td><code>{r.body}</code></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
