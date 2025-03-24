import React, { useEffect } from "react";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
} from "../../services/user-service";
import { GET_ROLES } from "../../services/role-service";

import { showMessage } from "../../services/message-service";
import { Password } from "primereact/password";


const UserForm = ({ user }) => {
  const rolelist = useQuery(GET_ROLES);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState(false);
  const [rolId, setrolId] = useState(0);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (user !== null) {
      setName(user.usr_name);
      setEmail(user.usr_email);
      setPassword(user.usr_password);
      setId(user.usr_id);
      setState(user.usr_status);
      setrolId(user.rol_id);
    }
  }, [user]);

  // Mutations
  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const CleanForm = () => {
    setName("");
    setEmail("");
    setrolId(0);
    setId(0);
    setPassword("");
    setState(false);
  };

  const CreateUser = (event) => {
    event.preventDefault();
    if (name.length > 0 && email.length > 0) {
      createUser({
        variables: {
          user: {
            usr_name: name,
            usr_email: email,
            usr_status: state,
            usr_password: password,
            rol_id: parseInt(rolId),
            user_token: "",
          },
        },
      })
        .then(() => {
          showMessage("Usuario creado correctamente", "success");
        })
        .catch(() => {
          showMessage("Error al crear el usuario", "warning");
        });
      document.getElementById("closeBtn").click();
    } else {
      showMessage("No se pueden dejar los campos vacíos", "warning");
    }
  };

  const UpdateUser = (event) => {
    event.preventDefault();
    if (name.length > 0 && email.length > 0) {
      updateUser({
        variables: {
          user: {
            usr_id: id,
            usr_name: name,
            usr_email: email,
            usr_status: state,
            rol_id: parseInt(rolId),
            user_token: "",
          },
        },
      })
        .then(() => {
          showMessage("Usuario actualizado correctamente", "success");
        })
        .catch((err) => {
          showMessage("Error al actualizar el usuario", "warning");
        });
      document.getElementById("closeBtn").click();
    } else {
      showMessage("No se pueden dejar los campos vacíos", "warning");
    }
  };

  const changeState = () => {
    if (state) {
      setState(false);
    } else {
      setState(true);
    }
  };

  return (
    <div
      className="modal fade"
      id="UserModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="UserModalLabel">
              Usuarios
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="closeBtn"
              onClick={CleanForm}
            />
          </div>
          <div className="modal-body">
            <form>
              <div style={{ textAlign: "left" }}>
                {id > 0 ? (
                  <div className="mb-3">
                    <strong>Id: {id}</strong>
                  </div>
                ) : (
                  <></>
                )}
                <strong>Nombre</strong> <br></br>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                  />
                </div>
                <strong>Correo</strong> <br></br>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Correo"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                  />
                </div>
                {id == 0 && (
                  <>
                    <strong>Contraseña</strong>
                    <br></br>
                    <div className="mb-3">
                      <Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        feedback={true}
                        toggleMask={true}
                        inputClassName="form-control"
                        weakLabel="Debil"
                        mediumLabel="Media"
                        strongLabel="Fuerte"
                        panelClassName="password-panel"
                        className="password-input"
                      />
                    </div>
                  </>
                )}
                <strong>Rol</strong> <br></br>
                <div className="mb-3">
                  <select
                    style={{ width: "5cm", height: "1cm" }}
                    value={rolId}
                    onChange={(e) => setrolId(e.target.value)}
                  >
                    <option>Seleccionar</option>
                    {rolelist.data?.roles.map((item) => {
                      return (
                        <option key={item.rol_id} value={item.rol_id}>
                          {item.rol_description}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <br></br>
                <div className="container">
                  <div className="row">
                    <div className="col-3">
                      <strong style={{ marginLeft: "-8px" }}>Estado:</strong>
                    </div>
                    <div className="col-3" style={{ marginLeft: "-45px" }}>
                      Activo
                    </div>
                    <div className="col-1">
                      <div
                        className="form-check"
                        style={{ marginLeft: "-45px" }}
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckDefault"
                          checked={state}
                          onChange={changeState}
                        />
                      </div>
                    </div>
                    <div className="col-3" style={{ marginLeft: "-45px" }}>
                      Inactivo
                    </div>
                    <div className="col-1">
                      <div
                        className="form-check"
                        style={{ marginLeft: "-45px" }}
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckDefault"
                          checked={!state}
                          onChange={changeState}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={CleanForm}
            >
              Cancelar <i className="fa fa-close" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={id === 0 ? CreateUser : UpdateUser}
            >
              Guardar <i className="fa fa-save" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
