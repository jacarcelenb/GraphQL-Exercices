import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { LOGIN_USER } from "../services/user-service";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { showMessage } from "../services/message-service";
import { Password } from "primereact/password";
import {
  setUserStatus,
  setRolUser,
  setTokenUser,
  setUserName,
  getUserStatus,
} from "../services/auth-service";
import HeaderLogin from "./shared/header-login";

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [login, { error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      setTokenUser(data.loginUser.user_token);
      setRolUser(data.loginUser.rol_id);
      setUserName(data.loginUser.usr_name);
      setUserStatus(data.loginUser.usr_status);
      setAuth(jwtDecode(data.loginUser.user_token));
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({
        variables: { usr_email: username, usr_password: password },
      });

      if (getUserStatus() === "true") {
        navigate("/pizzas");
      } else {
        showMessage("Usuario no activo", "error");
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  return (
    <div className="card-login flex justify-content-center">
       <HeaderLogin></HeaderLogin>
      <Card className="md:w-25rem">
        <h2> {" Iniciar Sesión "}</h2>
        <img
          src={require("../assets/images/pizza.jpg")}
          className="img-login-main"
          alt="..."
        />
        <br></br>
        <InputText
          placeholder="Correo Electronico"
          className="input-main-login"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          feedback={true}
          toggleMask={true}
          inputClassName="p-inputtext"
          placeholder="Contraseña"
          weakLabel="Debil"
          mediumLabel="Media"
          strongLabel="Fuerte"
          panelClassName="password-panel"
          className="password-input"
        />
        <br />
        <br />
        <Button
          onClick={handleSubmit}
          label="Iniciar Sesión"
          rounded
          className="input-main-login"
        />
      </Card>
    </div>
  );
};

export default Login;
