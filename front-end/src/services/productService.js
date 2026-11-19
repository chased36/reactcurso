import { clients } from "./clients";

export const getProduct = {
    async get(id, signal) {
        const res = await clients.dummyjson.get(
            `/products/${id}`,
            {}
        )
        return res;
    }
}
export const getAllProducts = {
    async get(signal) {
        const res = await clients.dummyjson.get(
            `/products`,
            {signal}
        )
        return res;
    }
}