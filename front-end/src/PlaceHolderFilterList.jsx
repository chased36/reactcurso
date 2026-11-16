import { useAsync } from "./hooks/useAsync";
import { ErrorPanel } from "./components/ErrorPanel";
import { placeHolderServiceFilter } from "./services/placeHolderServiceFilter";
import { useState } from "react";

export function PlaceHolderFilterList() {
    const [userId, setUserId] = useState("");
    const { data, loading, error, recargar } = useAsync(
        (signal) => placeHolderServiceFilter.getFilteredList(userId, signal),
        [userId]
    );

    return (
        <>
            <label htmlFor="userId">User ID:</label>
            <input type="number" id="userId" onChange={(e) => {
                setUserId(e.target.value);
            }} />
            {loading && <p>⏳ Buscando...</p>}
            {error && <ErrorPanel error={error} onRetry={recargar} />}
            {!loading && !error && !data?.length && <p>Sin resultados.</p>}
            {!loading && !error && data?.length > 0 && (
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
                        {data.map((r) => (
                            <tr key={r.id}>
                                <td>{r.userId}</td>
                                <td>{r.id}</td>
                                <td>{r.title}</td>
                                <td><code>{r.body}</code></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}
