import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_MENU } from "../../services/access-service";
import { getRolUser, removeUserInfo } from "../../services/auth-service";
import image from "../../assets/images/pizza.jpg"
const SideBar = () => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(getRolUser());
  const navigate = useNavigate();

  const navigateTo = (route) => {
    navigate(route);
  };

  const menulist = useQuery(GET_USER_MENU, {
    variables: {
      rolId: id == 0 ? 1 : id,
    },
  });

  const logOut = () => {
    removeUserInfo();
    navigate("/login");
  };
  return (
    <div className=" flex justify-content-start">
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <div style={{ display: "inline-flex" }}>
          <img
            src={image}
            className="img-login-main"
            alt="..."
            style={{ marginLeft: "5px" }}
          />
          <h3 style={{ marginLeft: "5px" }}>Menú</h3>
        </div>

        {menulist.data?.rolemenus[0].menus.map((item) => {
          return (
            <Button
            key={item.mn_id}
              label={item.mn_name}
              icon={item.mn_icon}
              text
              className="side-bar-opt-button"
              onClick={() => {
                navigateTo(item.mn_route);
              }}
            />
          );
        })}

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
