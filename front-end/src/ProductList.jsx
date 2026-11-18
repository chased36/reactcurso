import { useState } from "react";
import { ProductItem } from "./ProductItem";

export function GetAllProducts({ products, onEdit, onRemove }) {
  const [isAsending, setIsAsending] = useState({ order: true, key: "" });

  const sortedProducts = [...products].sort((a, b) => {
    return setPredicatedSort(
      a[isAsending.key],
      b[isAsending.key],
      isAsending.order
    );
  });

  function setPredicatedSort(a, b, order) {
    switch (typeof a) {
      case "number":
        if (order) {
          return a - b;
        } else {
          return b - a;
        }
      case "string":
        if (order) {
          return a.localeCompare(b);
        } else {
          return b.localeCompare(a);
        }
      case "boolean":
        return 0;
      default:
        return 0;
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th
              onClick={() =>
                setIsAsending({ order: !isAsending.order, key: "nombre" })
              }
            >
              Nombre
            </th>
            <th
              onClick={() =>
                setIsAsending({ order: !isAsending.order, key: "precio" })
              }
            >
              Precio
            </th>
            <th
              onClick={() =>
                setIsAsending({ order: !isAsending.order, key: "stock" })
              }
            >
              Stock
            </th>
            <th
              onClick={() =>
                setIsAsending({ order: !isAsending.order, key: "categoria" })
              }
            >
              Categoria
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
              <th colSpan="5">No se encontraron productos</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}