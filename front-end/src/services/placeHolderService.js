import { clients } from "./clients";

export const placeHolderService = {
    // 1. GET: Consultar un recurso usando el cliente 'search'
    async get(query = "Hola Mundo", signal) {
        // Usamos el cliente 'elcris' que apunta a scraper.iguzman.com.mx
        const res = await clients.elcris.get(`/search?q=${query}`, { signal });
        return res;
    },

    // 2. POST: Crear un recurso nuevo
    async create(nuevoPost, signal) {
        const res = await clients.jsonplaceholder.post("/posts", nuevoPost, { signal });
        return res;
    },

    // 3. DELETE: Borrar un recurso por id
    async remove(id, signal) {
        const res = await clients.jsonplaceholder.delete(`/posts/${id}`, { signal });
        return res;
    }
};