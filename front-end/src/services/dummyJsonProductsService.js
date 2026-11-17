import { clients } from "./clients.js";

// Normaliza la respuesta para que la UI siempre reciba el mismo formato
const normalize = (r, index) => ({
  id: r.id ?? index +1,
  title: r.title ?? "",
  price: r.price ?? 0,
  category: r.category ?? "",
  stock: r.stock ?? 0,
  thumbnail: r.thumbnail ?? ""
});

// Servicio para consultar productos de DummyJSON
export const dummyJsonProductsService = {

    // 1. get: Obtener la lista de productos
    async getListFiltered({ limit = 10, skip = 0, signal }={}){
        const res = await clients.dummyjson.get(
            `/products?limit=${limit}&skip=${skip}`,
            { signal }
        );
        const data=  Array.isArray(res.products) ? res.products : [];
        return data.map((item, index)=>
            normalize(item, index)
        )
    },

    // 2- get: Obteniene un producto por identificador
    getProductById: async (id, { signal } = {}) => {
        return await clients.dummyjson.get(
            `/products/${id}`,
            { signal }
        );
    },

     // 3. post: Crear un producto
    async createProduct(datos, {signal} ={}){
       const res= await clients.dummyjson.post(
            "/products/add",
            datos,
            { signal }
        );
        return (res);
    },
    // 4. put: Actualizar un producto
   async updateProduct (id, producto, { signal } = {}){
        return await clients.dummyjson.put(
            `/products/${id}`,
            producto,
            { signal }
        );
    },
    // 5. DELETE: Eliminar un producto
    async delete(id, { signal }={}){
        return await clients.dummyjson.delete(
            `/products/${id}`,
            { signal }
        );
    },
    // 6. GET: Buscar productos por texto
    searchProducts: async (texto, { signal } = {}) => {
        const data = await clients.dummyjson.get(
            `/products/search?q=${encodeURIComponent(texto)}`,
            { signal }
        );

        return data.products;
    },
    // 7. get: Obtener productos por categoría
    getProductsByCategory: async (categoria, { signal } = {}) => {
        const data = await clients.dummyjson.get(
            `/products/category/${encodeURIComponent(categoria)}`,
            { signal }
        );

        return data.products;
    }
};
