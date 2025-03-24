import React, { useState , useRef} from "react";
import { useQuery, useMutation } from "@apollo/client";
import NavBar from "../shared/navbar";

import { GET_USERS, DELETE_USER } from "../../services/user-service";
import {
  showConfirmMessage,
  showMessage,
} from "../../services/message-service";
import UserForm from "./user-form.jsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import UserMenu from "./user-menu.jsx";
import { GET_ROLES } from "../../services/role-service";
const UserList = () => {
  const [user, setUser] = useState(null);
  const dt = useRef(null);
  // Queries
  const userlist = useQuery(GET_USERS, {
    pollInterval: 500,
  });
  const rolelist = useQuery(GET_ROLES);

  // Mutations
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const selectUser = (user) => {
    setUser(user);
  };

  const DeleteUser = (item) => {
    let id = item.usr_id;
    console.log("Delete ", id);
    showConfirmMessage("¿Está seguro de eliminar este Usuario?").then(
      (resp) => {
        if (resp.isConfirmed) {
          deleteUser({
            variables: {
              deleteUserId: id.toString(),
            },
          })
            .then(() => {
              showMessage("Usuario eliminado correctamente", "success");
            })
            .catch((err) => {
              showMessage("Error al eliminar el usuario", "warning");
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
          className="btn btn-info"
          data-bs-toggle="modal"
          data-bs-target="#UserMenuModal"
          style={{ marginRight: 10 }}
          onClick={() => {
            selectUser(item);
          }}
        >
          <i className="fa fa-eye" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#UserModal"
          style={{ marginRight: 10 }}
          onClick={() => {
            selectUser(item);
          }}
        >
          <i className="fa fa-pencil" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            DeleteUser(item);
          }}
        >
          <i className="fa fa-trash" aria-hidden="true" />
        </button>
         <UserMenu user={user}></UserMenu>
        <UserForm user={user}></UserForm>
      </>
    );
  };

  const userStatus = (item) => {
    return (
      <Tag
        value={item.usr_status ? "Activo" : "Inactivo"}
        severity={getSeverity(item)}
      ></Tag>
    );
  };

  const userRol = (item) => {
    return (
      <Tag
        key={item.rm_id}
        value={getRolebyId(item)}
        severity={getRolLabel(item)}
      ></Tag>
    );
  };

  const getRolebyId = (item) => {
    let name = "";
    for (let index = 0; index < rolelist?.data.roles.length; index++) {
      const element = rolelist.data.roles[index];
      if (item.rol_id == element.rol_id) {
        name = element.rol_description;
      }
    }
    return name;
  };

  const getRolLabel = (item) => {
    switch (item.rol_id) {
      case 1:
        return "secondary";

      case 2:
        return "success";

      default:
        return "warning";
    }
  };


  const getSeverity = (item) => {
    switch (item.usr_status) {
      case true:
        return "success";

      case false:
        return "danger";

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
          <h5 className="card-title title">Usuarios</h5>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-primary btn-lg"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#UserModal"
            >
              <i className="fa fa-plus" aria-hidden="true" /> Crear
            </button>
          </div>
          <UserForm user={user}></UserForm>
          <br />
          <DataTable
            value={userlist.data?.users}
            ref={dt}
            showGridlines
            stripedRows
            paginator
            rows={5}
            filterLocale="ES"
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "60rem" }}
            emptyMessage="No existen registros."
          >
            <Column header="Acciones" body={actionsButtons}></Column>
            <Column
              field="usr_name"
              sortable
              filter
              filterPlaceholder="Buscar por nombre"
              header="Nombre"
              filterMatchMode="contains"
              showFilterMenuOptions={false}
            ></Column>
            <Column
              field="usr_email"
              sortable
              filter
              filterPlaceholder="Buscar por correo"
              header="Correo"
              filterMatchMode="contains"
              showFilterMenuOptions={false}
            ></Column>
            <Column
              sortable
              field="rol_id"
              header="Rol"
              body={userRol}
            ></Column>
            <Column
              sortable
              field="usr_status"
              header="Estado"
              body={userStatus}
            ></Column>


          </DataTable>
        </div>
      </>
    </div>
  );
};

export default UserList;
