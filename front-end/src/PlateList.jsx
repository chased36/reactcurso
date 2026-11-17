import { useState } from "react";
import { PlateItem } from "./PlateItem";

export function GetAllPlates({ plates, onEdit, onRemove }) {
const [isAsending, setIsAsending] = useState({ order: true, key: "" });

  const sortedPlates = plates.sort((a, b) => {
    return setPredicatedSort(
      a[isAsending.key],
      b[isAsending.key],
      isAsending.order,
    );
  });

  function setPredicatedSort(a, b, order) {
    switch (typeof a) {
      case "number":
        // order - default asc
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
        //to-do will implement it
        return;
    }
  }
  // {products} --- props
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th
              onClick={(evt) =>
                setIsAsending({ order: !isAsending, key: "nombre" })
              }
            >
              Nombre
            </th>
            <th
              onClick={(evt) =>
                setIsAsending({ order: !isAsending, key: "precio" })
              }
            >
              Precio
            </th>
            <th
              onClick={(evt) =>
                setIsAsending({ order: !isAsending, key: "menu" })
              }
            >
              Menu
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPlates.length > 0 ? (
            sortedPlates.map((plato) => (
              <PlateItem
                key={plato.id}
                id={plato.id}
                plato={plato}
                onEdit={onEdit}
                onRemove={onRemove}
              />
            ))
          ) : (
            <tr>
              <th>No se encontraron platos</th>
            </tr>
          )}
        </tbody>
      </table>             
    </div>
  );
}