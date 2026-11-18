import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="navbar">
      <span className="logo">🎸 SoundStore</span>
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/catalogo">Catálogo</NavLink>
      <NavLink to="/api">Catálogo API</NavLink>
    </nav>
  );
}