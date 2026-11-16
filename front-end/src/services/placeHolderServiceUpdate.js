import { clients } from "./clients";   // ⬅️ respeta el case exacto del archivo
export const placeHolderServiceUpdate = {

    async update(title) {
        const res = await clients.jsonplaceholder.put(
            "/posts/1",
            {
                title: title,                
            }
        );
        return res;
    },
};