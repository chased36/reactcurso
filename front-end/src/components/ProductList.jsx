import { useState } from "react";
import { SearchBox } from "./SearchBox";
import { ProductItem } from "./ProductItem";

function compareValues(a, b, order) {
  if (typeof a === "number" && typeof b === "number") {
    return order ? a - b : b - a;
  }
  const res = String(a ?? "").localeCompare(String(b ?? ""), "es", {
    sensitivity: "base",
  });
  return order ? res : -res;
}

export function ProductList({
  products,
  rutaDetalle = "/catalogo",
  onEdit,
  onRemove,
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ order: true, key: "" });

  const filtrados = products.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const ordenados = sort.key
    ? [...filtrados].sort((a, b) =>
        compareValues(a[sort.key], b[sort.key], sort.order)
      )
    : filtrados;

  const handleSort = (key) => {
    setSort((prev) => ({
      key,
      order: prev.key === key ? !prev.order : true,
    }));
  };

  const flecha = (key) =>
    sort.key === key ? (sort.order ? " ▲" : " ▼") : "";

  return (
    <>
      <SearchBox value={search} onInputChange={setSearch} />

      {ordenados.length > 0 ? (
        <div className="tutoria-table-wrap">
          <table className="tutoria-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("id")}>#{flecha("id")}</th>
                <th onClick={() => handleSort("nombre")}>
                  Nombre{flecha("nombre")}
                </th>
                <th onClick={() => handleSort("precio")}>
                  Precio{flecha("precio")}
                </th>
                <th onClick={() => handleSort("stock")}>
                  Stock{flecha("stock")}
                </th>
                <th onClick={() => handleSort("categoria")}>
                  Categoría{flecha("categoria")}
                </th>
                {(onEdit || onRemove) && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {ordenados.map((producto) => (
                <ProductItem
                  key={producto.id}
                  producto={producto}
                  rutaDetalle={rutaDetalle}
                  onEdit={onEdit}
                  onRemove={onRemove}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="tutoria-empty">No se encontraron productos.</p>
      )}
    </>
  );
}
