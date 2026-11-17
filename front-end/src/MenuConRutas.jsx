import { useEffect, useState } from "react";
import "./form.css";
import { GetAllPlates } from "./PlateList";
import { PlateForm } from "./PlateForm";
export function MenuRutas({ plates }) {
  //definir estado para platos, cargando
  const [platos, setPlatos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [plateSeleccionado, setPlateSeleccionado] = useState(null);
  const [menuFiltro, setMenuFiltro] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setPlatos(plates);
    });
  }, []);

  //crud -create, read, update, delete
  const handlerSavePlate = (nuevoOActualizado) => {
    // update: reemplazar el producto seleccionado con el id
    if (plateSeleccionado) {
      //reemplacemos el plate que coincida con el id
      setPlatos(prev=> prev.map(p=> p.id == plateSeleccionado.id? nuevoOActualizado: p))      
    }
    else{
      // agrega un nuevo elemento
      setPlatos((prev) => [
        ...prev,
        { ...nuevoOActualizado, id: `p${Date.now()}` },
      ]);
    }

    //cerrar formulario y limpiarlo
    setShowForm(false);
    setPlateSeleccionado(null);
  };

  const handlerRemovePlate = (id) => {
    // Elimine, filtre o saque de platos el id seleccionado
    // podriamos eliminar con filter, o con slice
    setPlatos(prev => prev.filter(p=> p.id != id))
  }

  const handlerIniciarEdicion = (plato) => {    
    setPlateSeleccionado(plato);
    setShowForm(true);
  }

  const menus = [...new Set(platos.map((plato) => plato.menu).filter(Boolean))];
  const platosFiltrados = menuFiltro
    ? platos.filter((plato) => plato.menu === menuFiltro)
    : platos;

  return (
    <>
      <div>
        <label htmlFor="menu-filtro">Filtrar por menú: </label>
        <select
          id="menu-filtro"
          value={menuFiltro}
          onChange={(event) => setMenuFiltro(event.target.value)}
        >
          <option value="">Todos los menús</option>
          {menus.map((menu) => (
            <option key={menu} value={menu}>
              {menu}
            </option>
          ))}
        </select>

        {isLoading ? (
          <h4>Cargando...</h4>
        ) : (          
          <GetAllPlates
            plates={platosFiltrados}
            onEdit = {handlerIniciarEdicion}
            onRemove = {handlerRemovePlate}
          />
        )}

        <div class="mag-btns">
          <button
            onClick={() => {
              setPlateSeleccionado(null)
              setShowForm(true)
            }}
            class="mag-btn mag-btn-primary"
          >
            Agregar Plato
          </button>
          {/* <button onClick={()=> setCanHandleForm(false)} class="mag-btn mag-btn-ghost">Eliminar Producto</button> */}
        </div>

        {showForm ? (
          <PlateForm
            key = {plateSeleccionado ? plateSeleccionado.id: ''}
            plateAEditar={plateSeleccionado}
            onSave={handlerSavePlate}
            onCancel={()=>{
              setShowForm(false)
              setPlateSeleccionado(null)
            }}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
