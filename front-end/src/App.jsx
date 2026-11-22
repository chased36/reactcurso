import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
// import { allProducts } from "./productosMock.js";
// import { Catalogo } from "./Catalogo.jsx";
// import { UseEffectSinArreglo } from "./UseEffectSinArreglo.jsx";
// import { UseEffectArregloVacio } from "./UseEffectArregloVacio.jsx";
// import { UseEffectVariables } from "./UseEffectVariables.jsx";
// import { UseEffectCleanup } from "./UseEffectCleanup.jsx";
// import { SearchTermBox } from "./SearchTermBox.jsx";
// import { SearchProduct } from "./SearchProduct";
// import { Calculadora } from "./Calculadora.jsx";
import { PlaceHolder } from "./PlaceHolder.jsx";
import { PlaceHolderList } from "./PlaceHolderList.jsx";
import { Home } from "./Home.jsx";
import { DetallePlaceHolder } from "./DetallePlaceHolder.jsx";
import { PlaceHolderCreate } from "./DetallePlaceHolderCreate.jsx";
import PlaceHolderUpdate from "./DetallePlaceHolderUpdate.jsx";
import PlaceHolderDelete from "./DetallePlaceHolderDelete.jsx";

function App() {
  const [count, setCount] = useState(0);
  const [saludo, setSaludo] = useState("Hola desconocido");

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/detalle/:id"
            element={<DetallePlaceHolder></DetallePlaceHolder>}
          ></Route>
        </Routes>
        <section id="center">
          
          <div>
            <h1>Get started</h1>
            <h3>Call Api search</h3>
            
            <p>
              Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
            </p>
            
          </div>
          
          
        </section>

        <section>
          <PlaceHolder></PlaceHolder>
        </section>
        <br />
        <section>
          <PlaceHolderList></PlaceHolderList>
        </section>
        <br />
        <section>
          <PlaceHolderCreate></PlaceHolderCreate>
        </section>

        <section>
          <PlaceHolderUpdate></PlaceHolderUpdate>
        </section>

        <section>
          <PlaceHolderDelete></PlaceHolderDelete>
        </section>
      </BrowserRouter>
    </>
  );
}

export default App;