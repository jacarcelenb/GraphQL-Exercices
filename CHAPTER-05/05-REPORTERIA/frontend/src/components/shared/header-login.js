import React from "react";
import { Link } from "react-router-dom"
const HeaderLogin = () => {
return (
    <nav
    className="navbar bg-dark border-bottom border-body"
    data-bs-theme="dark"
  >
    <div className="container-fluid">
      <span className="navbar-brand mb-0 h1"> 🍕Pizza App</span>

      <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link to="/" className="nav-link link">
              <i className="pi pi-arrow-left"></i>
            </Link>
          </li>
        </ul>
    </div>

  </nav>
)
}

export default HeaderLogin