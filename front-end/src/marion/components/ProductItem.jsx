import { Link } from "react-router-dom";

export function ProductItem({ producto, rutaDetalle }) {
  return (
    <tr>
      <td>{producto.id}</td>
      <td>
        <Link to={`${rutaDetalle}/${producto.id}`}>{producto.nombre}</Link>
      </td>
      <td>${producto.precio.toLocaleString("es-MX")}</td>
      <td>{producto.stock}</td>
      <td>{producto.categoria}</td>
    </tr>
  );
}

