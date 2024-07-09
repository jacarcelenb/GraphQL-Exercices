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
    </div>
  </nav>
)
}

export default Header