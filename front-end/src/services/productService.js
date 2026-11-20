import { clients } from "./clients";

const unpack = (res) => {
    if (Array.isArray(res)) return res;
    return res?.data ?? res?.results ?? res?.items ?? res?.products ?? [];
};

export const getProduct = {
    async get(id, signal) {
        const res = await clients.dummyjson.get(
            `/products/${id}`,
            { signal }
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

export const updateProduct = {
    async update(id, product, signal) {
        const res = await clients.dummyjson.put(
            `/products/${id}`,
            product,
            { signal }
        )
        return res;
    }
}

export const deleteProduct = {
    async delete(id, signal) {
        const res = await clients.dummyjson.delete(
            `/products/${id}`,
            { signal }
        )
        return res;
    }
}