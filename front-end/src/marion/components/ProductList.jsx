import { useState } from "react";
import { SearchBox } from "./SearchBox";
import { ProductItem } from "./ProductItem";

// Ordena según el tipo de dato de la columna
function setPredicatedSort(a, b, order) {
  switch (typeof a) {
    case "number":
      return order ? a - b : b - a;
    case "string":
      return order ? a.localeCompare(b) : b.localeCompare(a);
    default:
      return 0; // si key está vacío ("") no ordena
  }
}

export function GetAllProducts({ products, rutaDetalle = "/catalogo" }) {
  const [search, setSearch] = useState("");
  const [objAsc, setAscending] = useState({ order: true, key: "" });

  // 1) Filtrar
  const productosEncontrados = products.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // 2) Ordenar (copia con [...] para no modificar el arreglo original)
  const sorterProducts = [...productosEncontrados].sort((a, b) =>
    setPredicatedSort(a[objAsc.key], b[objAsc.key], objAsc.order)
  );

  const flecha = (key) => (objAsc.key === key ? (objAsc.order ? " ▲" : " ▼") : "");

  return (
    <>
      <SearchBox value={search} onInputChange={setSearch} />

      {sorterProducts.length > 0 ? (
        <table className="tabla">
          <thead>
            <tr>
              <th onClick={() => setAscending({ order: !objAsc.order, key: "id" })}>#{flecha("id")}</th>
              <th onClick={() => setAscending({ order: !objAsc.order, key: "nombre" })}>Nombre{flecha("nombre")}</th>
              <th onClick={() => setAscending({ order: !objAsc.order, key: "precio" })}>Precio{flecha("precio")}</th>
              <th onClick={() => setAscending({ order: !objAsc.order, key: "stock" })}>Stock{flecha("stock")}</th>
              <th onClick={() => setAscending({ order: !objAsc.order, key: "categoria" })}>Categoría{flecha("categoria")}</th>
            </tr>
          </thead>
          <tbody>
            {sorterProducts.map((producto) => (
              <ProductItem key={producto.id} producto={producto} rutaDetalle={rutaDetalle} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="vacio">No se encontraron productos 😕</p>
      )}
    </>
  );
}
