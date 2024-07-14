import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useQuery } from "@apollo/client";
import { GET_USER_MENU } from "../../services/access-service";
import { getRolUser, removeUserInfo } from "../../services/auth-service";
import NavBar from "./navbar";
const WelcomePage = () => {
  const [visible, setVisible] = useState(true);
  const [id, setId] = useState(getRolUser());

  const menulist = useQuery(GET_USER_MENU, {
    variables: {
      rolId: id == 0 ? 1 : id,
    },
  });

  return (
    <div className=" flex justify-content-start">
      <NavBar></NavBar>
      <div style={{ display: "inline-flex" }}>
        <h3 style={{ marginLeft: "5px" }}>Bienvenido/a</h3>
        <br></br>
        <img
          src={require(".././../assets/images/pizza.jpg")}
          alt="..."
          style={{ marginLeft: "5px" }}
        />
        <br></br>
        <h3 style={{ marginLeft: "5px" }}>
          Tiene acceso a los siguientes menús:
        </h3>
      </div>

      {menulist.data?.rolemenus[0].menus.map((item) => {
        return (
          <Button
            key={item.mn_id}
            label={item.mn_name}
            icon={item.mn_icon}
            text
            className="side-bar-opt-button"
            disabled
          />
        );
      })}
    </div>
  );
};

export default WelcomePage;
