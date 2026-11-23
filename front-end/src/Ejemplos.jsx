import { useState } from "react";
import { Calculadora } from "./Calculadora";
import { SearchTermBox } from "./SearchTermBox";
import { UseEffectSinArreglo } from "./UseEffectSinArreglo";
import { UseEffectArregloVacio } from "./UseEffectArregloVacio";
import { UseEffectVariables } from "./UseEffectVariables";
import { EjemploMontaje } from "./EjemploMontaje";

export function Ejemplos() {
  const [count, setCount] = useState(0);
  const [saludo, setSaludo] = useState("");
  return (
    <div className="practice-stack">
      <h1>Ejemplos de clase</h1>
      <section className="glass-card"><Calculadora /></section>
      <section className="glass-card">
        <h2>Contador y saludo</h2>
        <p>Contador: {count}</p>
        <button onClick={() => setCount((value) => value + 1)}>Sumar</button>
        <button onClick={() => setCount((value) => value - 1)}>Restar</button>
        <button onClick={() => setCount(0)}>Reiniciar</button>
        <label htmlFor="saludo">Tu nombre</label>
        <input id="saludo" value={saludo} onChange={(event) => setSaludo(event.target.value)} />
        <p>Hola {saludo || "desconocido"}</p>
      </section>
      <section className="glass-card">
        <h2>Ciclo de vida</h2>
        <UseEffectSinArreglo /><UseEffectArregloVacio /><UseEffectVariables /><EjemploMontaje />
      </section>
      <section className="glass-card"><h2>Búsqueda de clase</h2><SearchTermBox /></section>
    </div>
  );
}
