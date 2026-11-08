<<<<<<< HEAD

export function UseEffectVariables() {
    const [busqueda, setBusqueda] = useState();


    useEffect(() => {
        if (busqueda.trim() === "") return;

        console.log("Se ejecuta cuando cambia la busqueda");

    }, [busqueda]);

    return (
        <div style={{ marginTop: "20px", border: "1px dashed gray", padding: "15px", borderRadius: "8px" }}>
            <input type="text" placeholder="Buscar..." value={busqueda} onChange={(evt) => setBusqueda(evt.target.value)} />
        </div>
    );
}
=======
import { useEffect, useState } from "react";

export function UseEffectVariables(){
    const [busqueda, setBusqueda] = useState('')

    useEffect(()=>{
        if(busqueda.trim() == "") return;

        console.log("Buscando Api de productos que coincidan con la busqueda")


    }, [busqueda])

    return (
        <div>
            <input type="text" placeholder="escriba su termino de busqueda" value = {busqueda} onInput={(evt)=> setBusqueda(evt.target.value)}/>
        </div>
    )
}
>>>>>>> main
