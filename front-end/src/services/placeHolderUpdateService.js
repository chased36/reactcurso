import { clients } from "./clients";

// Normaliza la respuesta para que la UI siempre reciba el mismo formato
const normalize = (r) => ({
  id: r.id ?? 0,
  userId: r.userId ?? 0,
  title: r.title ?? "",
  body: r.body ?? "",
});

export const placeHolderUpdateServices = {
  //Actualización de elementos
  async getById(id, signal) {
        const res = await clients.jsonplaceholder.get(
            `/posts/${id}`,
            { signal }
        );

        return normalize(res);
    },

  async update(id, datos,signal) {
    const res = await clients.jsonplaceholder.put(
      `/posts/${id}`,
      datos,
      { signal }
    );
    
    return normalize(res);
  }
};