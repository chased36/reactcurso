import { clients } from "./clients";

// Normaliza la respuesta para que la UI siempre reciba el mismo formato
const normalize = (r) => ({
  id: r.id,
  titulo: r.title,
  contenido: r.body,
  usuarioId: r.userId,
  
});

const responseUnpack = (res) => {
  return res ?? {};
};

export const placeHolderServices = {
  async get(id = 4, signal) {
    const res = await clients.jsonplaceholder.get(
       `/posts/${id}`,
      {signal },
      
    );

    return res;
  },
};