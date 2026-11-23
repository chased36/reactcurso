import { useState } from "react";
import { ProductItem } from "./ProductItem";
import { SearchBox } from "./SearchBox";

export function GetAllProducts({ products, onEditarProducto, onEliminarProducto, disabled = false }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "nombre", order: "asc" });
  const columns = [["nombre", "Nombre"], ["precio", "Precio"], ["stock", "Stock"], ["categoria", "Categoría"]];
  const filtered = products.filter((product) => product.nombre.toLocaleLowerCase("es").includes(search.toLocaleLowerCase("es")));
  const sorted = [...filtered].sort((a, b) => {
    const left = a[sort.key];
    const right = b[sort.key];
    const result = typeof left === "number" && typeof right === "number"
      ? left - right : String(left ?? "").localeCompare(String(right ?? ""), "es", { numeric: true, sensitivity: "base" });
    return sort.order === "asc" ? result : -result;
  });

  function handleSort(key) {
    setSort((current) => ({ key, order: current.key === key && current.order === "asc" ? "desc" : "asc" }));
  }

  return (
    <div>
      <SearchBox value={search} onInputChange={setSearch} />
      <div className="table-scroll">
        <table>
          <thead><tr>
            {onEditarProducto && <th scope="col">Editar</th>}
            {onEliminarProducto && <th scope="col">Eliminar</th>}
            <th scope="col">#</th>
            {columns.map(([key, label]) => (
              <th key={key} scope="col" aria-sort={sort.key === key ? (sort.order === "asc" ? "ascending" : "descending") : "none"}>
                <button type="button" onClick={() => handleSort(key)}>
                  {label} {sort.key === key ? (sort.order === "asc" ? "▲" : "▼") : ""}
                </button>
              </th>
            ))}
          </tr></thead>
          <tbody>
            {sorted.length ? sorted.map((product, index) => (
              <ProductItem key={product.id} producto={product} index={index + 1}
                onEditarProducto={onEditarProducto} onEliminarProducto={onEliminarProducto} disabled={disabled} />
            )) : <tr><td colSpan={5 + Number(Boolean(onEditarProducto)) + Number(Boolean(onEliminarProducto))}>No se encontraron productos</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
