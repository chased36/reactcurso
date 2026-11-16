import { clients } from "./clients";
/** Normaliza un resultado de búsqueda al shape que consume la UI */

/** Acepta array directo o envoltorios comunes: { data } / { results } / { items } */
const unpack = (res) => {
    if (Array.isArray(res)) return res;
    return res?.data ?? res?.results ?? res?.items ?? [];
};

export const placeHolderServiceList = {
    async getList(query, signal) {
        const res = await clients.jsonplaceholder.get(
            "/posts",
        )
        return unpack(res);
    }
}