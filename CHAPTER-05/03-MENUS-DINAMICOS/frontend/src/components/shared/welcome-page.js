import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useQuery } from "@apollo/client";
import { GET_USER_MENU } from "../../services/access-service";
import { getRolUser, removeUserInfo } from "../../services/auth-service";
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
      <Sidebar visible={visible} onHide={() => setVisible(false)}
        fullScreen>
        <div style={{ display: "inline-flex" }}>
          <h3 style={{ marginLeft: "5px" }}>Bienvenido/a</h3>
          <img
            src={require(".././../assets/images/pizza.jpg")}
            className="img-login-main"
            alt="..."
            style={{ marginLeft: "5px" }}
          />
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
      </Sidebar>

    </div>
  );
};

export default WelcomePage;
