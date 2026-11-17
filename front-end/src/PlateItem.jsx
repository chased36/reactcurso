import { Link } from "react-router-dom";

export function PlateItem({ id, plato }) {
  return (
    <tr id={id}>
      <td>{plato.nombre}</td>
      <td>{plato.precio}</td>
      <td>{plato.menu}</td>
      <td>
        <Link to={`/plato/${id}`}>Detalle</Link>
      </td>
    </tr>
  );
}