import React from "react";
import { Link } from "react-router-dom"
const NavBar = () => {
return (
    <nav
    className="navbar bg-dark border-bottom border-body"
    data-bs-theme="dark"
  >
    <div className="container-fluid">
      <span className="navbar-brand mb-0 h1"> 🍕Pizza App</span>

      <ul className="nav justify-content-end">
        <li className="nav-item">
        <Link to="/" className="nav-link link">Inicio</Link>
        </li>
        <li className="nav-item">
        <Link to="/pizzas" className="nav-link link">Pizzas</Link>
        </li>
        <li className="nav-item">
        <Link to="/ingredientes" className="nav-link link">Ingredientes</Link>
        </li>
      </ul>
    </div>
  </nav>
)
}

export default NavBar