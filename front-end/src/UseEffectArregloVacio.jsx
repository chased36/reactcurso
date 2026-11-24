import { useEffect, useState } from "react";

export function UseEffectArregloVacio() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(
      "componente useEffectArregloVacio fue cargado: acabamos de consultar datos desde un API"
    );

    setTimeout(() => {
      setUsers([
        { id: 1, nombre: "Prueba UseEffectArregloVacío" },
        { id: 2, nombre: "El Chris" }
      ]);
    }, 1000);
  }, []);

  return (
    <ul>
      {users.map((x) => (
        <li key={x.id}>{x.nombre}</li>
      ))}
    </ul>
  );
}