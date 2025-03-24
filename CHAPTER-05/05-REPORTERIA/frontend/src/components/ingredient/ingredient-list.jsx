import React, { useState , useRef} from "react";
import NavBar from "../shared/navbar";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_INGREDIENTS,
  DELETE_INGREDIENTS,
} from "../../services/ingredient-service";

import {
  showMessage,
  showConfirmMessage,
} from "../../services/message-service";
import IngredientForm from "./ingredient-form.jsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { formatIngredientsFields } from "../../services/export-file-service";
import ReportHeader from "../shared/report-header";
const IngredientList = () => {

  const [ingredient, setIngredient] = useState(null);
  const dt = useRef(null);
 // Queries
 const IngredientsList = useQuery(GET_INGREDIENTS);
  // Mutations
  const [deleteIngredient] = useMutation(DELETE_INGREDIENTS, {
    refetchQueries: [{ query: GET_INGREDIENTS }],
  });

  const selectIngredient = (ingredient) => {
    setIngredient(ingredient);
  };


  const DeleteIngredient = (item) => {
    let id = item.ing_id;
    showConfirmMessage("¿Está seguro de eliminar esta Ingrediente?").then(
      (resp) => {
        if (resp.isConfirmed) {
          deleteIngredient({
            variables: {
              deleteIngredientId: id.toString(),
            },
          })
            .then(() => {
              showMessage("Ingrediente eliminado correctamente", "success");
            })
            .catch((err) => {
              showMessage("Error al eliminar el ingrediente", "warning");
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
          data-bs-target="#IngredienteModal"
          style={{ marginRight: 10 }}
          onClick={() => {
            selectIngredient(item);
          }}
        >
          <i className="fa fa-pencil" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            DeleteIngredient(item);
          }}
        >
          <i className="fa fa-trash" aria-hidden="true" />
        </button>
        <IngredientForm ingredient={ingredient}></IngredientForm>
      </>
    );
  };

  const statusIngredient = (item) => {
    return (
      <Tag
        value={item.ing_state ? "Activo" : "Inactivo"}
        severity={getSeverity(item)}
      ></Tag>
    );
  };

  const getSeverity = (item) => {
    switch (item.ing_state) {
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
          <h5 className="card-title title">Ingredientes</h5>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-primary btn-lg"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#IngredienteModal"
            >
              <i className="fa fa-plus" aria-hidden="true" /> Crear
            </button>
            <IngredientForm ingredient={ingredient} ></IngredientForm>
          </div>
          <br />
          <DataTable
            value={IngredientsList.data?.ingredients}
            ref={dt}
            header={
              <ReportHeader
                formatdata={formatIngredientsFields(IngredientsList.data?.ingredients)}
                data={IngredientsList.data?.ingredients}
                dt={dt}
                columns={["Nombre", "Calorías", "Estado"]}
                name={"Ingredientes"}
              ></ReportHeader>
            }
            showGridlines
            stripedRows
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "60rem" }}
            emptyMessage="No existen registros."
          >
           <Column header="Acciones" body={actionsButtons}></Column>
            <Column
              field="ing_name"
              sortable
              filter
              filterPlaceholder="Buscar por nombre"
              header="Nombre"
              filterMatchMode="contains"
              showFilterMenuOptions={false}

            ></Column>
            <Column
              field="ing_calories"
              sortable
              header="Calorias"
            ></Column>
            <Column
              sortable
              field="ing_state"
              header="Estado"
              body={statusIngredient}
            ></Column>

          </DataTable>
        </div>
      </>
    </div>
  );
};

export default IngredientList;
