import { clients } from "./clients";

const normalize = (p) => ({
  id: p.id,
  nombre: p.title ?? "(sin nombre)",
  precio: p.price ?? 0,
  stock: p.stock ?? 0,
  categoria: p.category ?? "sin categoría",
  descripcion: p.description ?? "",
  imagen: p.thumbnail ?? null,
});

const unpack = (res) => {
  if (Array.isArray(res)) return res;
  return res?.products ?? res?.data ?? [];
};

export const productService = {
  async getAll(signal) {
    const res = await clients.dummy.get("/products?limit=30", { signal });
    return unpack(res).map(normalize);
  },

  async obtener(id, signal) {
    const raw = await clients.dummy.get(`/products/${id}`, { signal });
    return normalize(raw);
  },
};
