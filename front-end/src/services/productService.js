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
            {signal}
        )
        console.log("getAllProducts.get res:", res);
        return unpack(res);
    }
}