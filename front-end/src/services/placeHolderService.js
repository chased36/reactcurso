import { clients } from "./clients";

export const placeHolderService = {
    async get(signal) {
        const res = await clients.jsonplaceholder.get(
            "/posts/4",
            {}
        )
        return res;
    }
}