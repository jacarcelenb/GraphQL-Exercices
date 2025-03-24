import React, { useState } from "react";
import { Button } from "primereact/button";
import { useQuery } from "@apollo/client";
import { GET_USER_MENU } from "../../services/access-service";
import { getRolUser, removeUserInfo } from "../../services/auth-service";
import NavBar from "./navbar.jsx";
import { Card } from "primereact/card";
import image from "../../assets/images/pizza.jpg";
const WelcomePage = () => {
  const [visible, setVisible] = useState(true);
  const [id, setId] = useState(getRolUser());

  const menulist = useQuery(GET_USER_MENU, {
    variables: {
      rolId: id == 0 ? 1 : id,
    },
  });

  return (
    <div style={{textAlign:'center'}}>
      <NavBar></NavBar>
      <div >
        <br></br>
        <br></br>
        <h5><strong>Bienvenido/a</strong></h5>
        <img
          src={image}
         className="img-welcome"
        />
        <h5>
          Tiene acceso a los siguientes menús:
        </h5>
      </div>
      <Card style={{width:'500px', marginLeft:'430px'}}>

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
      </Card>
    </div>
  );
};

export default WelcomePage;
