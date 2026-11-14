import { useState } from "react";
import { searchService } from "./services/searchService";

export function SearchForm({ onCreated }) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [snippet, setSnippet] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            setLoading(true);
            // Mandamos el objeto con la estructura que la API de búsqueda sí acepta
            await searchService.create({
                query: title
            });

            alert("¡Búsqueda creada con éxito!");
            setTitle("");
            setUrl("");
            setSnippet("");

            if (onCreated) onCreated();
        } catch (err) {
            console.error("Error al crear el registro:", err);
            alert("Hubo un error al intentar enviar el registro.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: "20px 0", padding: "15px", border: "1px solid #444", borderRadius: "8px" }}>
            <h3>Agregar nuevo elemento</h3>
            <div style={{ marginBottom: "10px" }}>
                <input
                    type="text"
                    placeholder="Escribe tu búsqueda..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: "100%", padding: "8px" }}
                    required
                />
            </div>
            <button type="submit" disabled={loading} style={{ padding: "8px 16px", cursor: "pointer" }}>
                {loading ? "Guardando..." : "➕ Crear Registro"}
            </button>
        </form>
    );
}