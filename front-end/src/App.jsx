import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { MetodoGet } from "./components/placeholder/MetodoGet";
import { MetodoGetId } from "./components/placeholder/MetodoGetId";
import { MetodoList } from "./components/placeholder/MetodoList";
import { MetodoCreate } from "./components/placeholder/MetodoCreate";
import { MetodoUpdate } from "./components/placeholder/MetodoUpdate";
import { MetodoDelete } from "./components/placeholder/MetodoDelete";
import { MetodoFilter } from "./components/placeholder/MetodoFilter";

import { Home } from "./Home";
import { DetallePlaceHolder } from "./DetallePlaceHolder";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <h2>JSONPlaceholder - Métodos HTTP</h2>
        <Link to="/placeholder">GET</Link>
        <Link to="/placeholderdetalle/6">GET por ID</Link>
        <Link to="/placeholderlist">LIST</Link>
        <Link to="/placeholdercreate">CREATE</Link>
        <Link to="/placeholderupdate">UPDATE</Link>
        <Link to="/placeholderdelete">DELETE</Link>
        <Link to="/placeholderfilter/1">FILTER</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detalle/:id" element={<DetallePlaceHolder />} />
          <Route path="/placeholder" element={<MetodoGet />} />
          <Route path="/placeholderdetalle/:id" element={<MetodoGetId />} />
          <Route path="/placeholderlist" element={<MetodoList />} />
          <Route path="/placeholdercreate" element={<MetodoCreate />} />
          <Route path="/placeholderupdate" element={<MetodoUpdate />} />
          <Route path="/placeholderdelete" element={<MetodoDelete />} />
          <Route path="/placeholderfilter/:userId" element={<MetodoFilter />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
