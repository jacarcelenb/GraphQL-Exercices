import React, { useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import NavBar from "../shared/navbar";

import { GET_PIZZAS, DELETE_PIZZA } from "../../services/pizza-service";
import {
  showConfirmMessage,
  showMessage,
} from "../../services/message-service";
import PizzaForm from "./pizza-form.jsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import ReportHeader from "../shared/report-header";
import { formatPizzaFields, exportReportPdf } from "../../services/export-file-service";
const PizzaList = () => {
  const [pizza, setPizza] = useState(null);
  const dt = useRef(null);
  // Queries
  const pizzalist = useQuery(GET_PIZZAS, {
    pollInterval: 500,
  });

  // Mutations
  const [deletePizza] = useMutation(DELETE_PIZZA, {
    refetchQueries: [{ query: GET_PIZZAS }],
  });

  const selectPizza = (pizza) => {
    setPizza(pizza);
  };
  const DeletePizza = (item) => {
    let id = item.piz_id;
    showConfirmMessage("¿Está seguro de eliminar esta Pizza?").then((resp) => {
      if (resp.isConfirmed) {
        deletePizza({
          variables: {
            deletePizzaId: id.toString(),
          },
        })
          .then(() => {
            showMessage("Pizza eliminada correctamente", "success");
          })
          .catch((err) => {
            showMessage("Error al eliminar la pizza", "warning");
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
          data-bs-target="#PizzaModal"
          style={{ marginRight: 10 }}
          onClick={() => {
            selectPizza(item);
          }}
        >
          <i className="fa fa-pencil" aria-hidden="true" />
        </button>

        <button
          type="button"
          className="btn btn-success"
          style={{marginRight:"10px"}}
          onClick={() => {
            exportReportPdf(item,"Reporte Pizzas",["Nombre", "Calorías", "Porción","Estado"]);
          }}
        >
          <i className="fa fa-download" aria-hidden="true" />
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            DeletePizza(item);
          }}
        >
          <i className="fa fa-trash" aria-hidden="true" />
        </button>
        <PizzaForm pizza={pizza}></PizzaForm>
      </>
    );
  };

  const statusPizza = (item) => {
    return (
      <Tag
        value={item.piz_state ? "Activa" : "Inactiva"}
        severity={getSeverity(item)}
      ></Tag>
    );
  };

  const getSeverity = (item) => {
    switch (item.piz_state) {
      case true:
        return "success";

      case false:
        return "warning";

      default:
        return null;
    }
  };

  const IngredientsPizza = (item) => {
    return (
      <ul>
        {item.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.ing_name}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <>
        <NavBar></NavBar>
        <br />
        <div className="container">
          <h5 className="card-title title">Pizzas</h5>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-primary btn-lg"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#PizzaModal"
            >
              <i className="fa fa-plus" aria-hidden="true" /> Crear
            </button>
          </div>
          <PizzaForm pizza={pizza}></PizzaForm>
          <br />
          <DataTable
            ref={dt}
            header={
              <ReportHeader
                formatdata={formatPizzaFields(pizzalist.data?.pizzas)}
                data={pizzalist.data?.pizzas}
                dt={dt}
                columns={["Nombre", "Origen" ,"Estado"]}
                name={"Pizzas"}
              ></ReportHeader>
            }
            value={pizzalist.data?.pizzas}
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
              field="piz_name"
              sortable
              filter
              filterPlaceholder="Buscar por nombre"
              header="Nombre"
              filterMatchMode="contains"
              showFilterMenuOptions={false}
            ></Column>
            <Column
              field="piz_origin"
              sortable
              filter
              filterPlaceholder="Buscar por origen"
              filterMatchMode="contains"
              showFilterMenuOptions={false}
              header="Origen"
            ></Column>
            <Column
              sortable
              field="piz_state"
              header="Estado"
              body={statusPizza}
            ></Column>
            <Column
              field="ingredients"
              header="Ingredientes"
              body={IngredientsPizza}
            ></Column>
          </DataTable>
        </div>
      </>
    </div>
  );
};

export default PizzaList;
