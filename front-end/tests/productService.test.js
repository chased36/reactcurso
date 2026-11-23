import assert from "node:assert/strict";
import { after, test } from "node:test";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createServer } from "vite";

const server = await createServer({
  cacheDir: join(tmpdir(), "reactcurso-service-tests"),
  server: { middlewareMode: true, hmr: false, ws: false },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: "custom",
});
after(() => server.close());
const { productService, localProductService } = await server.ssrLoadModule("/src/services/productService.js");
const { clients } = await server.ssrLoadModule("/src/services/clients.js");

test("catálogo local: altas, cambios y eliminación conservan IDs y no mutan la lista entregada", async () => {
  const original = await localProductService.getAll();
  const product = { nombre: "Producto de prueba", precio: 12.5, stock: 3, categoria: "Audio" };
  const created = await localProductService.create(product);
  assert.ok(created.id);
  assert.equal(original.some((item) => item.id === created.id), false);
  const updated = await localProductService.update(created.id, { ...product, stock: 0 });
  assert.equal(updated.id, created.id);
  assert.equal((await localProductService.getById(created.id)).stock, 0);
  await localProductService.remove(created.id);
  await assert.rejects(localProductService.getById(created.id), { status: 404 });
  assert.equal((await localProductService.getAll()).length, original.length);
});

test("DummyJSON: lista y detalle usan el mismo modelo que el catálogo local", async (t) => {
  const originalRequest = clients.products.request;
  t.after(() => { clients.products.request = originalRequest; });
  const raw = { id: 7, title: "Headphones", price: 25.5, stock: 4, category: "audio", description: "Sound" };
  const controller = new AbortController();
  const calls = [];
  clients.products.request = async (endpoint, options) => {
    calls.push({ endpoint, options });
    return endpoint === "/products?limit=0" ? { products: [raw] } : raw;
  };
  const list = await productService.getAll(controller.signal);
  const detail = await productService.getById("7", controller.signal);
  assert.deepEqual(list[0], detail);
  assert.deepEqual(detail, { id: "7", nombre: "Headphones", precio: 25.5, stock: 4, categoria: "audio", descripcion: "Sound" });
  assert.equal(calls[1].endpoint, "/products/7");
  assert.equal(calls[0].options.signal, controller.signal);
});

test("DummyJSON: las altas simuladas reciben IDs únicos y pueden editarse sin enviar un ID inexistente", async (t) => {
  const originalRequest = clients.products.request;
  t.after(() => { clients.products.request = originalRequest; });
  const calls = [];
  clients.products.request = async (endpoint, options) => {
    calls.push({ endpoint, options });
    return { id: 999, ...options.body };
  };
  const input = { nombre: "Nuevo", precio: 20, stock: 2, categoria: "audio" };
  const first = await productService.create(input);
  const second = await productService.create(input);
  assert.notEqual(first.id, second.id);
  assert.equal(calls[0].endpoint, "/products/add");
  assert.equal(calls[0].options.method, "POST");
  assert.equal(calls[0].options.body.title, input.nombre);
  assert.equal(calls[0].options.body.nombre, undefined);
  assert.equal((await productService.update(first.id, { ...first, stock: 0 })).stock, 0);
  await productService.remove(first.id);
  assert.equal(calls.length, 2);
});

test("DummyJSON: los fallos HTTP se propagan para que la vista permita reintentar", async (t) => {
  const originalRequest = clients.products.request;
  t.after(() => { clients.products.request = originalRequest; });
  clients.products.request = async () => { throw Object.assign(new Error("Sin conexión"), { status: 0 }); };
  await assert.rejects(productService.getAll(), { message: "Sin conexión", status: 0 });
});

test("DummyJSON: actualizar y eliminar productos existentes usan PUT y DELETE", async (t) => {
  const originalRequest = clients.products.request;
  t.after(() => { clients.products.request = originalRequest; });
  const calls = [];
  clients.products.request = async (endpoint, options) => {
    calls.push({ endpoint, options });
    return { id: 7, ...options.body };
  };
  const result = await productService.update("7", { nombre: "Actualizado", precio: 3, stock: 0, categoria: "audio" });
  assert.equal(result.nombre, "Actualizado");
  assert.equal(result.stock, 0);
  assert.equal(result.id, "7");
  await productService.remove("7");
  assert.deepEqual(calls.map((call) => [call.endpoint, call.options.method]), [
    ["/products/7", "PUT"], ["/products/7", "DELETE"],
  ]);
});
