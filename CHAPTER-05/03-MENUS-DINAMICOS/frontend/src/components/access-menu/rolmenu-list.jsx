import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import NavBar from "../shared/navbar.jsx";
import { GET_ROLES } from "../../services/role-service";
import { DELETE_ROLE_MENU, GET_ROLE_MENU } from "../../services/access-service";
import {
  showConfirmMessage,
  showMessage,
} from "../../services/message-service";
import { GET_MENUS } from "../../services/menu-service";
import RoleMenuForm from "./rolmenu-form.jsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
const RoleMenuList = () => {
  const [rolemenu, setroleMenu] = useState(null);
  const rolelist = useQuery(GET_ROLES);
  const menulist = useQuery(GET_MENUS);
  // Queries
  const roleMenuList = useQuery(GET_ROLE_MENU, {
    pollInterval: 500,
  });

  // Mutations
  const [deleteRoleMenu] = useMutation(DELETE_ROLE_MENU, {
    refetchQueries: [{ query: GET_ROLE_MENU }],
  });

  const selectRoleMenu = (rolemenu) => {
    setroleMenu(rolemenu);
  };

  const DeleteRoleMenu = (item) => {
    let id = item.rm_id;
    showConfirmMessage("¿Está seguro de eliminar este acceso?").then((resp) => {
      if (resp.isConfirmed) {
        deleteRoleMenu({
          variables: {
            rmId: parseInt(id.toString()),
          },
        })
          .then(() => {
            showMessage("Acceso eliminado correctamente", "success");
          })
          .catch((err) => {
            showMessage("Error al eliminar el acceso", "warning");
          });
      }
    });
  };

  const actionsButtons = (item) => {
    return (
      <>
        <button
          type="button"
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#RoleMenuModal"
          style={{ marginRight: 10 }}
          onClick={() => {
            selectRoleMenu(item);
          }}
        >
          <i className="fa fa-pencil" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            DeleteRoleMenu(item);
          }}
        >
          <i className="fa fa-trash" aria-hidden="true" />
        </button>
        <RoleMenuForm key={item.rm_id} rolemenu={rolemenu}></RoleMenuForm>
      </>
    );
  };

  const roleMenuStatus = (item) => {
    return (
      <Tag
        value={item.rm_status ? "Activo" : "Inactivo"}
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

  const getMenubyId = (item) => {
    let menuname = "";
    for (let index = 0; index < menulist?.data.menus.length; index++) {
      const element = menulist?.data.menus[index];
      if (item.mn_id == element.mn_id) {
        menuname = element.mn_name;
      }
    }
    return <Tag key={item.rm_id} value={menuname} severity="warning"></Tag>;
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
        return "danger";
    }
  };

  const getSeverity = (item) => {
    switch (item.rm_status) {
      case true:
        return "info";

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
          <h5 className="card-title title">Accesos</h5>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-primary btn-lg"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#RoleMenuModal"
            >
              <i className="fa fa-plus" aria-hidden="true" /> Crear
            </button>
          </div>
          <RoleMenuForm rolemenu={rolemenu}></RoleMenuForm>
          <br />
          <DataTable
            value={roleMenuList.data?.rolemenus}
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
            <Column field="mn_id" header="Menú" body={getMenubyId}></Column>
            <Column
              field="rol_id"
              sortable
              filter
              filterPlaceholder="Buscar por rol"
              header="Rol"
              filterMatchMode="contains"
              showFilterMenuOptions={false}
              body={userRol}
            ></Column>
            <Column
              sortable
              field="rm_status"
              header="Estado"
              body={roleMenuStatus}
            ></Column>
          </DataTable>
        </div>
      </>
    </div>
  );
};

export default RoleMenuList;
