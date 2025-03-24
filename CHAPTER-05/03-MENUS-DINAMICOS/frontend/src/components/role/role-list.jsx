import React, { useState } from "react";
import NavBar from "../shared/navbar";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ROLES, DELETE_ROLE } from "../../services/role-service";

import {
  showMessage,
  showConfirmMessage,
} from "../../services/message-service";
import RoleForm from "./role-form.jsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
const RoleList = () => {
  const [role, setRole] = useState(null);
  // Queries
  const RolesList = useQuery(GET_ROLES);
  // Mutations
  const [deleteRole] = useMutation(DELETE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
  });

  const selectRole = (role) => {
    setRole(role);
  };

  const DeleteRole = (item) => {
    let id = item.rol_id;
    showConfirmMessage("¿Está seguro de eliminar este rol?").then(
      (resp) => {
        if (resp.isConfirmed) {
          deleteRole({
            variables: {
              rolId: parseInt(id.toString()),
            },
          })
            .then(() => {
              showMessage("Rol eliminado correctamente", "success");
            })
            .catch((err) => {
              showMessage("Error al eliminar el rol", "warning");
            });
        }
      }
    );
  };

  const actionsButtons = (item) => {
    return (
      <>
        <button
          type="button"
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#RoleModal"
          style={{ marginRight: 10 }}
          onClick={() => {
            selectRole(item);
          }}
        >
          <i className="fa fa-pencil" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            DeleteRole(item);
          }}
        >
          <i className="fa fa-trash" aria-hidden="true" />
        </button>
        <RoleForm role={role}></RoleForm>
      </>
    );
  };

  const statusRole = (item) => {
    return (
      <Tag
        value={item.rol_status ? "Activo" : "Inactivo"}
        severity={getSeverity(item)}
      ></Tag>
    );
  };

  const getSeverity = (item) => {
    switch (item.rol_status) {
      case true:
        return "success";

      case false:
        return "warning";

      default:
        return null;
    }
  };

  return (
    <div>
      <>
        <NavBar></NavBar>
        <br />
        <div className="container">
          <h5 className="card-title title">Roles</h5>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-primary btn-lg"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#RoleModal"
            >
              <i className="fa fa-plus" aria-hidden="true" /> Crear
            </button>
            <RoleForm role={role}></RoleForm>
          </div>
          <br />
          <DataTable
            value={RolesList.data?.roles}
            showGridlines
            stripedRows
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "30rem" }}
            emptyMessage="No existen registros."
          >
             <Column header="Acciones" body={actionsButtons}></Column>
            <Column
              field="rol_description"
              sortable
              filter
              filterPlaceholder="Buscar por nombre"
              header="Nombre"
              filterMatchMode="contains"
              showFilterMenuOptions={false}
            ></Column>

            <Column
              sortable
              field="rol_status"
              header="Estado"
              body={statusRole}
            ></Column>

          </DataTable>
        </div>
      </>
    </div>
  );
};

export default RoleList;
