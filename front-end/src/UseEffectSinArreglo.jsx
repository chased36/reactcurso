import { useEffect, useState } from "react";

<<<<<<< HEAD
export function UseEffectSinArreglo() {
    const [contador, setContador] = useState(0);

    useEffect(() => {
        console.log("El componente se acaba de renderizar");
    }); // Sin corchetes, se dispara en cada cambio

    return (
        <>
            <p>Contador: {contador}</p>
            {/* Aquí corregimos el guion por el signo de igual (=) */}
            <button onClick={() => setContador(contador + 1)}>Sumar</button>
        </>
    );
=======
export function UseEffectSinArreglo(){
    const [contador, setContador] = useState(0);


    useEffect(()=>{
        console.log("El componente se acaba de renderizar de useEffectSinArreglo")
    })

    return (
        <>
          <p>Contador: {contador}</p>   
          <button onClick={()=> setContador(contador + 1)}>Sumar</button>
        </>
    )
>>>>>>> main
}