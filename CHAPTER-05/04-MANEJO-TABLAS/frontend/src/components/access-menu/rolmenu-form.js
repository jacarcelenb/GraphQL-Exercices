import React, { useEffect } from "react";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ROLE_MENU,
  CREATE_ROLE_MENU,
  UPDATE_ROLE_MENU
} from "../../services/access-service";
import {
GET_MENUS
} from "../../services/menu-service";
import { GET_ROLES } from "../../services/role-service";

import { showMessage } from "../../services/message-service";


const RoleMenuForm = ({ rolemenu }) => {
  const rolelist = useQuery(GET_ROLES);
  const menulist = useQuery(GET_MENUS);
  const [state, setState] = useState(false);
  const [rolId, setrolId] = useState(0);
  const [mnId, setmnId] = useState(0);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (rolemenu !== null) {
      setId(rolemenu.rm_id);
      console.log(rolemenu.rm_id)
      setState(rolemenu.rm_status);
      setrolId(rolemenu.rol_id);
      setmnId(rolemenu.mn_id);
    }
  }, [rolemenu]);

  // Mutations
  const [createRoleMenu] = useMutation(CREATE_ROLE_MENU, {
    refetchQueries: [{ query: GET_ROLE_MENU }],
  });

  const [updateRoleMenu] = useMutation(UPDATE_ROLE_MENU, {
    refetchQueries: [{ query: GET_ROLE_MENU }],
  });

  const CleanForm = () => {
    setmnId(0);
    setrolId(0);
    setId(0);
    setState(false);
  };

  const CreateRoleMenu = (event) => {
    event.preventDefault();
    if (parseInt(rolId) > 0 && parseInt(mnId) > 0) {
      createRoleMenu({
        variables: {
          input: {
            mn_id: parseInt(mnId),
            rm_status: state,
            rol_id: parseInt(rolId)
          },
        },
      })
        .then(() => {
          showMessage("Acceso creado correctamente", "success");
        })
        .catch(() => {
          showMessage("Error al crear el acceso", "warning");
        });
      document.getElementById("closeBtn").click();
    } else {
      showMessage("No se pueden dejar sin seleccionar", "warning");
    }
  };

  const UpdateRoleMenu = (event) => {
    event.preventDefault();
    if (parseInt(rolId) > 0 && parseInt(mnId) > 0) {
      updateRoleMenu({
        variables: {
          input: {
            rm_id: parseInt(id),
            mn_id: parseInt(mnId),
            rm_status: state,
            rol_id: parseInt(rolId)
          },
        },
      })
        .then(() => {
          showMessage("Acceso actualizado correctamente", "success");
        })
        .catch((err) => {
          console.log(err);
          showMessage("Error al actualizar el acceso", "warning");
        });
      document.getElementById("closeBtn").click();
    } else {
      showMessage("No se pueden dejar sin seleccionar", "warning");
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
      id="RoleMenuModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="UserModalLabel">
              Accesos
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

                <strong>Menu</strong> <br></br>
                <div className="mb-3">
                  <select
                    style={{ width: "5cm", height: "1cm" }}
                    value={mnId}
                    onChange={(e) => setmnId(e.target.value)}
                  >
                    <option>Seleccionar</option>
                    {menulist.data?.menus.map((item) => {
                      return (
                        <option key={item.mn_id} value={item.mn_id}>
                          {item.mn_name}
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
              onClick={id === 0 ? CreateRoleMenu : UpdateRoleMenu}
            >
              Guardar <i className="fa fa-save" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleMenuForm;
