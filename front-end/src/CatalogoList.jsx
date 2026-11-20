import { useState } from "react";
import { CatalogoItem } from "./CatalogoItem";

export function CatalogoList({ products, onEdit, onRemove }) {
  const [search, setSearch] = useState("");

  const [sortConfig, setSortConfig] = useState({
    columna: null,
    direccion: "asc",
  });

  function manejarClicTabla(event) {
    const encabezado = event.target.closest("th[data-sort-key]");

    if (!encabezado || !event.currentTarget.contains(encabezado)) {
      return;
    }

    const columna = encabezado.dataset.sortKey;

    setSortConfig((ordenAnterior) => ({
      columna,
      direccion:
        ordenAnterior.columna === columna && ordenAnterior.direccion === "asc"
          ? "desc"
          : "asc",
    }));
  }

  function indicadorOrden(columna) {
    if (sortConfig.columna !== columna) {
      return "↕";
    }

    return sortConfig.direccion === "asc" ? "↑" : "↓";
  }

  const productosOrdenados = [...products].sort((a, b) => {
    if (!sortConfig.columna) {
      return 0;
    }

    const valueA = a[sortConfig.columna];
    const valueB = b[sortConfig.columna];

    let comparacion;

    if (typeof valueA === "number" && typeof valueB === "number") {
      comparacion = valueA - valueB;
    } else {
      comparacion = String(valueA ?? "").localeCompare(
        String(valueB ?? ""),
        "es",
        {
          numeric: true,
          sensitivity: "base",
        },
      );
    }

    return sortConfig.direccion === "asc" ? comparacion : -comparacion;
  });

  const productosFiltrados =
    search.trim() === ""
      ? productosOrdenados
      : productosOrdenados.filter((p) =>
          p.nombre.toLowerCase().includes(search.trim().toLowerCase()),
        );

  const primerProductoEncontrado =
    search.trim() === ""
      ? productosOrdenados
      : productosOrdenados.find((p) =>
          p.nombre.toLowerCase().includes(search.trim().toLowerCase()),
        );

  const productosAMostrar =
    search.trim() === ""
      ? productosFiltrados
      : primerProductoEncontrado
        ? [primerProductoEncontrado]
        : [];

  return (
    <div>
      <label htmlFor="buscarProducto">Buscar Producto: </label>
      <input
        id="buscarProducto"
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <table onClick={manejarClicTabla}>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>

            <th
              scope="col"
              data-sort-key="id"
              aria-sort={
                sortConfig.columna === "id"
                  ? sortConfig.direccion === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              # {indicadorOrden("id")}
            </th>

            <th
              scope="col"
              data-sort-key="nombre"
              aria-sort={
                sortConfig.columna === "nombre"
                  ? sortConfig.direccion === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              Nombre {indicadorOrden("nombre")}
            </th>

            <th
              scope="col"
              data-sort-key="precio"
              aria-sort={
                sortConfig.columna === "precio"
                  ? sortConfig.direccion === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              Precio {indicadorOrden("precio")}
            </th>

            <th
              scope="col"
              data-sort-key="stock"
              aria-sort={
                sortConfig.columna === "stock"
                  ? sortConfig.direccion === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              Stock {indicadorOrden("stock")}
            </th>

            <th
              scope="col"
              data-sort-key="categoria"
              aria-sort={
                sortConfig.columna === "categoria"
                  ? sortConfig.direccion === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              Categoría {indicadorOrden("categoria")}
            </th>
          </tr>
        </thead>

        <tbody>
          {productosAMostrar.length > 0 ? (
            productosAMostrar.map((producto) => (
              <CatalogoItem
                key={producto.id}
                id={producto.id}
                producto={producto}
                onEdit={onEdit}
                onRemove={onRemove}
              />
            ))
          ) : (
            <tr>
              <td colSpan={7}>NO se Encontraron Productos.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
