import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import Header from "./shared/header";
import { LOGIN_USER } from "../services/user-service";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { showMessage } from "../services/message-service";
import { Password } from "primereact/password";
import MainImage from "../assets/images/pizza.jpg"

const Inicio = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [login, { error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.loginUser.user_token);
      localStorage.setItem("rol", data.loginUser.rol_id);
      localStorage.setItem("username", data.loginUser.usr_name);
      localStorage.setItem("status", data.loginUser.usr_status);
      setAuth(jwtDecode(data.loginUser.user_token));
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({
        variables: { usr_email: username, usr_password: password },
      });

      if (localStorage.getItem("status") === "true") {
        navigate("pizzas");
      } else {
        showMessage("Usuario no activo", "error");
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  return (
    <div className="card-login flex justify-content-center">
      <Header></Header>
      <Card className="md:w-25rem">
        <h2> {"Login"}</h2>
        <img
          src={MainImage}
          className="img-login-main"
          alt="..."
        />
        <br></br>
        <InputText
          placeholder="Correo"
          className="input-main-login"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          feedback={true}
          toggleMask={true}

          placeholder="Clave"


        />
        <br />
        <br />
        <Button
          onClick={handleSubmit}
          label="Login"
          rounded
          className="input-main-login"
        />
      </Card>
    </div>
  );
};

export default Inicio;
