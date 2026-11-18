export function ProductItem({ producto }) {
  return (
    <tr>
      <td>{producto.id}</td>
      <td>{producto.nombre}</td>
      <td>${producto.precio.toLocaleString("es-MX")}</td>
      <td>{producto.stock}</td>
      <td>{producto.categoria}</td>
    </tr>
  );
}
