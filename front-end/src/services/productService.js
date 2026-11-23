import { clients } from "./clients";
import { HttpError } from "../HttpClient";
import { allProducts } from "../productosMock";

// Ambos servicios entregan el mismo modelo, independiente del origen de datos.
const normalize = (product) => ({
  id: String(product.id),
  nombre: product.title,
  precio: product.price,
  stock: product.stock,
  categoria: product.category,
  descripcion: product.description ?? "",
});

const payload = (product) => ({
  title: product.nombre,
  price: product.precio,
  stock: product.stock,
  category: product.categoria,
  description: product.descripcion ?? "",
});

const isSimulated = (id) => String(id).startsWith("nuevo-");

export const productService = {
  async getAll(signal) {
    const result = await clients.products.get("/products?limit=0", { signal });
    return result.products.map(normalize);
  },
  async getById(id, signal) {
    return normalize(await clients.products.get(`/products/${encodeURIComponent(id)}`, { signal }));
  },
  async create(product) {
    const result = await clients.products.post("/products/add", payload(product));
    // DummyJSON simula las escrituras y puede repetir el ID del alta.
    // Un ID local único permite seguir editando y consultando cada alta en esta vista.
    return { ...normalize(result), id: `nuevo-${crypto.randomUUID()}` };
  },
  async update(id, product) {
    if (isSimulated(id)) return { ...product, id };
    const result = await clients.products.put(`/products/${encodeURIComponent(id)}`, payload(product));
    return normalize(result);
  },
  async remove(id) {
    if (!isSimulated(id)) await clients.products.delete(`/products/${encodeURIComponent(id)}`);
  },
};

let localProducts = allProducts.map((product) => ({ ...product }));

export const localProductService = {
  async getAll() {
    return localProducts.map((product) => ({ ...product }));
  },
  async getById(id) {
    const product = localProducts.find((item) => String(item.id) === String(id));
    if (!product) throw new HttpError("Producto no encontrado", 404);
    return { ...product };
  },
  async create(product) {
    const created = { ...product, id: crypto.randomUUID() };
    localProducts = [...localProducts, created];
    return created;
  },
  async update(id, product) {
    await this.getById(id);
    const updated = { ...product, id };
    localProducts = localProducts.map((item) => item.id === id ? updated : item);
    return updated;
  },
  async remove(id) {
    await this.getById(id);
    localProducts = localProducts.filter((item) => item.id !== id);
  },
};
