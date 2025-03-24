import React from "react";
import { Link } from "react-router-dom";
import SideBar from "./sidebar.jsx";
import { getUsername } from "../../services/auth-service";

const NavBar = () => {
  const getUser = () => {
    return "Usuario: "+ getUsername()
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
              <i className="pi pi-user"></i> {getUser()}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
