import { clients } from "./clients";

const unpack = (res) => {
    if (Array.isArray(res)) return res;
    return res?.data ?? res?.results ?? res?.items ?? res?.products ?? [];
};

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
            { signal }
        )
        return unpack(res);
    }
}
export const searchProducts = {
    async search(query, signal) {
        const res = await clients.dummyjson.get(
            `/products/search?q=${query}`,
            { signal }
        )
        return unpack(res);
    }
}
export const createProduct = {
    async create(product, signal) {
        const res = await clients.dummyjson.post(
            `/products/add`,
            product,
            { signal }
        )
        return res;
    }
}