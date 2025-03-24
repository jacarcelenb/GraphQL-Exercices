import React from "react";
import { Link } from "react-router-dom"
const Header = () => {
return (
    <nav
    className="navbar bg-dark border-bottom border-body"
    data-bs-theme="dark"
  >
    <div className="container-fluid">
      <span className="navbar-brand mb-0 h1"> 🍕Pizza App</span>
      <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link to="/login" className="nav-link link">
              <i className="pi pi-user"> Iniciar Sesión</i>
            </Link>
          </li>
        </ul>
    </div>

  </nav>
)
}

export default Header