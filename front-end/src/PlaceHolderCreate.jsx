import { useState } from "react";
import { useAsync } from "./hooks/useAsync";
import { placeHolderServiceCreate } from "./services/placeHolderServiceCreate";
import { ErrorPanel } from "./components/ErrorPanel";
export function PlaceHolderCreate() {
    const [title, setTitle] = useState("foo");
    const [body, setBody] = useState("bar");
    const [userId, setUserId] = useState("1");
    const [submittedPost, setSubmittedPost] = useState(null);
    const { data, loading, error, recargar } = useAsync(
        () => submittedPost
            ? placeHolderServiceCreate.create(
                submittedPost.title,
                submittedPost.body,
                submittedPost.userId
            )
            : Promise.resolve(null),
        [submittedPost]
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmittedPost({ title, body, userId: Number(userId) });
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <input value={title} onChange={(event) => setTitle(event.target.value)} required />
                </label>
                <label>
                    Body
                    <input value={body} onChange={(event) => setBody(event.target.value)} required />
                </label>
                <label>
                    User ID
                    <input
                        type="number"
                        min="1"
                        value={userId}
                        onChange={(event) => setUserId(event.target.value)}
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>Crear</button>
            </form>

            {loading && <p>⏳ Creando...</p>}
            {error && <ErrorPanel error={error} onRetry={recargar} />}
            {data && (
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
                        <tr>
                            <td>{data.userId}</td>
                            <td>{data.id}</td>
                            <td>{data.title}</td>
                            <td><code>{data.body}</code></td>
                        </tr>
                    </tbody>
                </table>
            )}
        </section>
    );
}
 