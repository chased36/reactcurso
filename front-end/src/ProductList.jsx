import { useState } from "react";
import { ProductItem } from "./ProductItem";
import { SearchProduct } from "./SearchProduct";

// Lista de consulta con búsqueda por nombre
export function ProductList({ products  = []}) {

  const [textoBusqueda, setTextoBusqueda] = useState("");

  const productosFiltrados = products.filter(producto => 
    producto.nombre
    .toLowerCase()
    .includes(textoBusqueda.toLowerCase())
  );
  return (
    <div>
      <SearchProduct
        textoBusqueda={textoBusqueda}
        setTextoBusqueda={setTextoBusqueda}
      />

      <table border="1">
        <thead>
          <tr>
            <th>Identificador</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoria</th>
          </tr>
        </thead>

        <tbody>
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <ProductItem
                key={producto.id}
                id={producto.id}
                producto={producto}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5">No se encontraron productos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}


//Catálogo con edición, eliminación y ordenamiento
export function GetAllProducts({ 
  products=[], 
  onEdit, 
  onRemove
 })
 {
  const [sort, setSort] = useState({ 
    order: "asc", 
    key: "" 
  });

  function handleSort(key) {
    setSort((current) => ({
      key,
      order:
        current.key === key && current.order === "asc"
          ? "desc"
          : "asc",
    }));
  }

  function compareValues(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }

    return String(a ?? "").localeCompare(
      String(b ?? ""), 
      "es", 
      {
        sensitivity: "base",
        numeric: true,
    });
  }

  const sortedProducts = sort.key
    ? [...products].sort((a, b) => {
        const result = compareValues(
          a[sort.key], 
          b[sort.key]
        );
        return sort.order === "asc" ? result : -result;
      })
    : [...products];

  function sortIndicator(key) {
    if (sort.key !== key) return "";

    return sort.order === "asc" ? " ▲" : " ▼";
  }

   return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Editar</th>
            <th>Eliminar</th>
            <th>Identificador</th>

            <th
              onClick={() => handleSort("nombre")}
              style={{ cursor: "pointer" }}
            >
              Nombre{sortIndicator("nombre")}
            </th>

            <th
              onClick={() => handleSort("precio")}
              style={{ cursor: "pointer" }}
            >
              Precio{sortIndicator("precio")}
            </th>

            <th
              onClick={() => handleSort("stock")}
              style={{ cursor: "pointer" }}
            >
              Stock{sortIndicator("stock")}
            </th>

            <th
              onClick={() => handleSort("categoria")}
              style={{ cursor: "pointer" }}
            >
              Categoria{sortIndicator("categoria")}
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedProducts.length > 0 ? (
            sortedProducts.map((producto) => (
              <ProductItem
                key={producto.id}
                id={producto.id}
                producto={producto}
                onEdit={onEdit}
                onRemove={onRemove}
              />
            ))
          ) : (
            <tr>
              <td colSpan="7">
                No se encontraron productos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
