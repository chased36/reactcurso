import { clients } from "./clients";   // ⬅️ respeta el case exacto del archivo
export const placeHolderServiceDelete = {

    async delete(id) {
        const res = await clients.jsonplaceholder.delete(
            "/posts/"+id,
        );
        return res;
    },
};