import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import MainImage from "../../assets/images/pizza.jpg";
const SideBar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const navigateTo = (route) => {
    navigate(route);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("username");
    navigate("/");
  };
  return (
    <div className=" flex justify-content-start">
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <div style={{ display: "inline-flex" }}>
          <img
            src={MainImage}
            className="img-login-main"
            alt="..."
            style={{ marginLeft: "5px" }}
          />
          <h3 style={{ marginLeft: "5px" }}>Menú</h3>
        </div>

        {localStorage.getItem("rol") == 1 && (
          <>
            <Button
              label="Dashboard"
              icon="pi pi-book"
              text
              className="side-bar-opt-button"
            />
            <br />
            <Button
              label="Usuarios"
              text
              icon="pi pi-users"
              className="side-bar-opt-button"
            />
            <br />
          </>
        )}

        <Button
          label="Ingredientes"
          icon="pi pi-briefcase"
          className="side-bar-opt-button"
          text
          onClick={() => {
            navigateTo("/ingredientes");
          }}
        />
        <br />
        <Button
          label="Pizzas"
          text
          icon="pi pi-cart-minus"
          className="side-bar-opt-button"
          onClick={() => {
            navigateTo("/pizzas");
          }}
        />
        <br />
        <Button
          label="Salir"
          icon="pi pi-sign-out"
          text
          className="side-bar-opt-button"
          onClick={logOut}
        />
      </Sidebar>
      <i
        className="pi pi-bars btn-sidebar"
        onClick={() => setVisible(true)}
      ></i>
    </div>
  );
};

export default SideBar;
