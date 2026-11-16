import { clients } from "./clients";   // ⬅️ respeta el case exacto del archivo
export const placeHolderServiceCreate = {
    /**
     * Crea una publicación.
     * @param {string} title
     * @param {string} body
     * @param {number} [userId=1]
     * @param {AbortSignal} [signal]
     */
    async create(title, body, userId = 1, signal) {
        const res = await clients.jsonplaceholder.post(
            "/posts",
            { title, body, userId },                   // body (el cliente hace JSON.stringify)
            {
                headers: { "Content-Type": "application/json; charset=UTF-8" },
                signal,
            }
        );
        return res;
    },
};