import { useState } from "react";
import { ProductItem } from "./ProductItem";

export function GetAllProducts({ products, onEdit, onRemove }) {
  const [sort, setSort] = useState({ order: "asc", key: "" });

  function handleSort(key) {
    setSort((current) => ({
      key,
      order:
        current.key === key
          ? current.order === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  }

  function compareValues(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }

    return String(a ?? "").localeCompare(String(b ?? ""), "es", {
      sensitivity: "base",
      numeric: true,
    });
  }

  const sortedProducts = sort.key
    ? [...products].sort((a, b) => {
        const result = compareValues(a[sort.key], b[sort.key]);
        return sort.order === "asc" ? result : -result;
      })
    : [...products];
  // {products} --- props
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Editar</th>
            <th>Eliminar</th>
            <th onClick={() => handleSort("nombre")}>
              Nombre {sort.key === "nombre" ? (sort.order === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("precio")}>
              Precio {sort.key === "precio" ? (sort.order === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("stock")}>
              Stock {sort.key === "stock" ? (sort.order === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("categoria")}>
              Categoria {sort.key === "categoria" ? (sort.order === "asc" ? "▲" : "▼") : ""}
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
              <th>No se encontraron productos</th>
            </tr>
          )}
        </tbody>
      </table>             
    </div>
  );
}
