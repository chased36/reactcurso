// URL base de la API
const API_URL = "https://dummyjson.com/products";

// Adaptar los productos al formato de nuestro catálogo
function adaptarProducto(producto) {
    return {
        id: producto.id,
        nombre: producto.title,
        precio: producto.price,
        stock: producto.stock,
        categoria: producto.category
    };
}

// Obtener la lista de productos desde DummyJSON
export async function obtenerProductos() {

    const respuesta = await fetch(API_URL);

    // Verificar que la petición haya sido exitosa
    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener los productos");
    }

    // Convertir la respuesta a JSON
    const datos = await respuesta.json();

    // Adaptar los productos antes de devolverlos
    return datos.products.map(adaptarProducto);
}