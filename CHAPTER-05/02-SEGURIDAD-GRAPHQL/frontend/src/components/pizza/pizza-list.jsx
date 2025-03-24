import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import NavBar from "../shared/navbar";
import {
  GET_PIZZAS,
  DELETE_PIZZA,
  showIngredient,
} from "../../services/pizza-service";
import {
  showConfirmMessage,
  showMessage,
} from "../../services/message-service";
import {isAvailable} from "../../services/util-service"
import PizzaForm from "./pizza-form.jsx";

const PizzaList = () => {

  const [pizza, setPizza] = useState(null);


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
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Origen</th>
                <th scope="col">Estado</th>
                <th scope="col">Ingredientes</th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {pizzalist.data?.pizzas.map((item) => (
                <tr key={item.piz_id}>
                  <td>{item.piz_name}</td>
                  <td>{item.piz_origin}</td>
                  <td>{isAvailable(item.piz_state)}</td>
                  <td>{showIngredient(item.ingredients)}</td>
                  <td style={{ textAlign: "center" }}>
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
                      className="btn btn-danger"
                      onClick={() => {
                        DeletePizza(item);
                      }}
                    >
                      <i className="fa fa-trash" aria-hidden="true" />
                    </button>
                    <PizzaForm pizza={pizza}></PizzaForm>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default PizzaList;
