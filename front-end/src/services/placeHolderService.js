import { clients } from "./clients";

export const placeHolderService = {
    async get(id, signal) {
        const res = await clients.jsonplaceholder.get(
            `/posts/${id}`,
            {}
        )
        return res;
    }
}