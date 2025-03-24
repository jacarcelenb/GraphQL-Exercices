import React from "react";
import { Link } from "react-router-dom";
import SideBar from "./sidebar.jsx";

const NavBar = () => {
  const getUserRol = () => {
    let userName= "Operador: "
    if (parseInt(localStorage.getItem("rol") )== 1) {
      userName = "Admin: "
    }
    return userName
  };
  return (
    <nav
      className="navbar bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <SideBar></SideBar>
        <span className="navbar-brand mb-0 h1"> 🍕Pizza App</span>

        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link to="/" className="nav-link link">
              <i className="pi pi-user"></i> {getUserRol() + " "+ localStorage.getItem('username')}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
