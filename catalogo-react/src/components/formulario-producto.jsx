import { useState, useEffect } from 'react';
import { categorias } from '../data/productosMock.js';

export function FormularioProducto({
  onAgregarProducto,
  productoAEditar,
  onGuardarEdicion,
  onCancelarEdicion,
}) {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState(categorias[0] ?? '-');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    if (productoAEditar) {
      setNombre(productoAEditar.nombre);
      setCategoria(productoAEditar.categoria);
      setDescripcion(productoAEditar.descripcion);
      setPrecio(String(productoAEditar.precio));
    } else {
      setNombre('');
      setCategoria(categorias[0] ?? '-');
      setDescripcion('');
      setPrecio('');
    }
  }, [productoAEditar]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || Number(precio) <= 0) return;

    if (productoAEditar) {
      onGuardarEdicion({
        ...productoAEditar,
        nombre: nombre.trim(),
        categoria,
        precio: Number(precio),
      });
      return;
    }

    onAgregarProducto({
      nombre: nombre.trim(),
      categoria,
      precio: Number(precio),
      descripcion: descripcion.trim(),
    });

    setNombre('');
    setCategoria(categorias[0] ?? '-');
    setPrecio('');
    setDescripcion('');
  };

  return (
    <form className="formulario-producto" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre-producto">Nombre:</label>
        <input
          type="text"
          id="nombre-producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="categoria-producto">Categoría:</label>
        <select
          id="categoria-producto"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="precio-producto">Precio:</label>
        <input
          type="number"
          placeholder="$ 0"
          id="precio-producto"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="descripcion-producto">Descripción:</label>
        <textarea
          id="descripcion-producto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <button className="BotonCat" type="submit">
        {productoAEditar ? (
          <>
            <i class="bi bi-check-circle-fill"></i> Guardar Cambios
          </>
        ) : (
          <>
            <i class="bi bi-plus-circle"></i> Agregar Producto
          </>
        )}
      </button>

      {productoAEditar && (
        <button className="BotonCat" type="button" onClick={onCancelarEdicion}>
          <i class="bi bi-x-circle"></i> Cancelar
        </button>
      )}
    </form>
  );
}
