import { clients } from "./clients"; 

//GET LIST CREATE UPDATE DELTE DEL API  QUE NOS PUSO EL PROFE DE LA API JSONPLACEHOLDER 

/** Normaliza un resultado de búsqueda al shape que consume la UI */
// const normalize = (r, index) => ({});

// const responseUnpack = (res) => {
//   return res ?? {};
// };

export const PlaceHolderServices = {
  async get(id = 1, signal) {
    if (typeof id !== "number" && typeof id === "object") {
      signal = id;
      id = 1;
    }

    const res = await clients.dummyjson.get(`/products/${id}`, { signal });
    return res;
  },
};

export const PlaceHolderServicesList = {
  async get(signal) {
    const res = await clients.dummyjson.get(`/products`, { signal });
    return res.products; 
  },
};

export const PlaceHolderServicesCreate = {
  async create(nuevoProducto, signal) {
    const payload = {
      title: nuevoProducto.title,
      description: nuevoProducto.description ?? "",
    };

    return await clients.dummyjson.post("/products/add", payload, { signal });
  },
};

export const PlaceHolderServicesUpdate = {
  async update(id, postData, signal) {
    const payload = {
      title: postData.title,
      description: postData.description ?? "",
    };

    const res = await clients.dummyjson.put(`/products/${id}`, payload, { signal });
    return res;
  },
};

export const PlaceHolderServicesDelete = {
  async remove(id, signal) {
    const res = await clients.dummyjson.delete(`/products/${id}`, { signal });
    return res;
  },
};