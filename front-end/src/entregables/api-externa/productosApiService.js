import { clients } from "../../services/clients";

export const productosApiService = {
  // Obtener Todos los Productos
  async metodoList(signal) {
    return clients.dummyjson.get("/products", { signal });
  },

  // Obtener un Producto Específico
  async metodoGetId(id, signal) {
    return clients.dummyjson.get(`/products/${id}`, { signal });
  },
};
