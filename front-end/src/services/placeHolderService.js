import { clients } from "./clients";

export const placeHolderService = {
  // GET: Obtener un Registro Específico
  async metodoGet(signal) {
    return clients.jsonplaceholder.get("/posts/4", { signal });
  },

  // GET por ID
  async metodoGetId(id, signal) {
    return clients.jsonplaceholder.get(`/posts/${id}`, { signal });
  },

  // LIST: Obtener TODOS los Registros
  async metodoList(signal) {
    return clients.jsonplaceholder.get("/posts", { signal });
  },

  // CREATE: Crear un Registro
  async metodoCreate(post, signal) {
    return clients.jsonplaceholder.post("/posts", post, { signal });
  },

  // UPDATE: Actualizar un Registro
  async metodoUpdate(id, post, signal) {
    return clients.jsonplaceholder.put(`/posts/${id}`, post, { signal });
  },

  // DELETE: Eliminar un Registro
  async metodoDelete(id, signal) {
    return clients.jsonplaceholder.delete(`/posts/${id}`, { signal });
  },

  // FILTER: Filtrar por User ID
  async metodoFilter(userId, signal) {
    return clients.jsonplaceholder.get(`/posts?userId=${userId}`, { signal });
  },
};
