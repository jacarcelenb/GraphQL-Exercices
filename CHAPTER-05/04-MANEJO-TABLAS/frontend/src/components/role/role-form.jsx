import React, { useEffect } from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  GET_ROLES,
  CREATE_ROLE,
  UPDATE_ROLE,
} from "../../services/role-service";

import { showMessage } from "../../services/message-service";

const RoleForm = ({ role }) => {
  const [description, setDescription] = useState("");
  const [state, setState] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (role !== null) {
      setDescription(role.rol_description);
      setId(role.rol_id);
      setState(role.rol_status);
    }
  }, [role]);

  // Mutations
  const [createRole] = useMutation(CREATE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
  });

  const [updateRole] = useMutation(UPDATE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
  });

  const CleanForm = () => {
    setDescription("");
    setId(0);
    setState(false);
  };

  const CreateRole = (event) => {
    event.preventDefault();
    if (description.length > 0) {
      createRole({
        variables: {
        input: {
            rol_description:description,
            rol_status: state,
          },
        },
      })
        .then(() => {
          showMessage("Rol creado correctamente", "success");
        })
        .catch(() => {
          showMessage("Error al crear el rol", "warning");
        });
      document.getElementById("closeBtn").click();
    } else {
      showMessage("No se pueden dejar los campos vacíos", "warning");
    }
  };

  const UpdateRole = (event) => {
    event.preventDefault();
    if (description.length > 0) {
      updateRole({
        variables: {
          input: {
            rol_id: id,
            rol_description:description,
            rol_status: state,
          }
        },
      })
        .then(() => {
          showMessage("Rol actualizado correctamente", "success");
        })
        .catch((err) => {
          console.log(err);
          showMessage("Error al actualizar el rol", "warning");
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
      id="RoleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="IngredienteModal">
              Roles
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
                <strong>Descripción</strong> <br></br>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Descripción"
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                  />
                </div>

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
              onClick={id === 0 ? CreateRole : UpdateRole}
            >
              Guardar <i className="fa fa-save" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleForm;
