import { useState } from "react";
import { useAsync } from "./hooks/useAsync";
import { placeHolderFilterServices } from "./services/placeHolderFilterService";
import { ErrorPanel } from "./components/ErrorPanel";

export function PlaceHolderFilter() {
    //Estado para almacenar el valor del filtro
    const [filter, setFilter] = useState("");

    //Consultar una lista de elementos
    const { data, loading, error, recargar } = useAsync(
        (signal) => placeHolderFilterServices.getListFiltered(signal),
        []
    );
    const estiloCabecera = {
        position: "sticky",
        top: 0,
        backgroundColor: "#f5f5f5",
        zIndex: 1,
        border: "1px solid #ccc",
        padding: "8px",
    };

    if (loading) return <p>⏳ Buscando publicaciones...</p>;

    if (error) {
        return (
            <ErrorPanel
                error={error}
                onRetry={recargar}
            />
        );
    }

    if (!data || data.length === 0) {
        return <p>Sin resultados.</p>;
    }
    // Normalizar el texto de búsqueda
    const texto = filter.trim().toLowerCase();
    // Aplicar el filtro
    const publicacionesFiltradas = data.filter((post) => {
        return (
            String(post.id).includes(texto) ||
            String(post.userId).includes(texto) ||
            String(post.title ?? "").toLowerCase().includes(texto) ||
            String(post.body ?? "").toLowerCase().includes(texto)
        );
    });
    return (
        <div>
            <input
                id="buscado"
                type="text"
                placeholder="Buscar publicaciones"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <p>
                Publicaciones encontradas:
                {publicacionesFiltradas.length}
            </p>
            {/*Muestra resultados filtrados*/}
            {publicacionesFiltradas.length === 0 ? (
                <p>No se encontraron publicaciones
                    que coincidan con el filtro.
                </p>
            ) :
                (
                    <div>
                        <h2>Lista de publicaciones filtradas</h2>

                        <div
                            style={{
                                height: "400px",
                                overflowY: "auto",
                                border: "1px solid #ccc"
                            }}
                        >    <div>
                                <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                                    <thead>
                                        <tr>
                                            <th style={estiloCabecera}>ID</th>
                                            <th style={estiloCabecera}>Título</th>
                                            <th style={estiloCabecera}>Usuario</th>
                                            <th style={estiloCabecera}>Cuerpo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {publicacionesFiltradas.map((post) => (
                                            <tr key={post.id}>
                                                <td>{post.id}</td>
                                                <td>{post.title}</td>
                                                <td>{post.userId}</td>
                                                <td>{post.body}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}