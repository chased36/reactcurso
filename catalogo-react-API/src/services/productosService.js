const BASE_URL = 'https://dummyjson.com/products';

function adaptarProducto(item) {
  return {
    id: item.id,
    nombre: item.title,
    categoria: item.category,
    precio: item.price,
    descripcion: item.description,
  };
}

export async function obtenerProductos(signal) {
  const response = await fetch(BASE_URL, { signal });

  if (!response.ok) {
    throw new Error(`Error al consultar productos (HTTP ${response.status})`);
  }

  const data = await response.json();
  return data.products.map(adaptarProducto);
}
