import React, { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
GET_USER_MENU,
} from "../../services/access-service";


const UserMenu = ({ user }) => {
const [id, setId] = useState(0);

useEffect(() => {
    if (user !== null) {
      setId(user.rol_id);
    }
  }, [user]);

const menulist = useQuery(GET_USER_MENU,{
  variables : {
    rolId: id == 0 ? 1: id
  }
});

  return (
    <div
      className="modal fade"
      id="UserMenuModal"
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
            />
          </div>
          <div className="modal-body">
            <form>
              <div style={{ textAlign: "left" }}>

                <div className="mb-3">
                   <ul>
                   {menulist.data?.rolemenus[0].menus.map((item) => {
                      return (
                        <li key={item.mn_id}>
                        {'Menú '+ item.mn_name}
                        </li>
                      );
                    })}
                   </ul>

                </div>

              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
