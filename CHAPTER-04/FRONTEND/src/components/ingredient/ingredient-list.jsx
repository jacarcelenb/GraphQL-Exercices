import React, { useState } from "react";
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
import { isAvailable } from "../../services/util-service";
const IngredientList = () => {

  const [ingredient, setIngredient] = useState(null);

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
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Estado</th>
                <th scope="col">Calorías</th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {IngredientsList.data?.ingredients.map((item) => (
                <tr key={item.ing_id}>
                  <td>{item.ing_name}</td>
                  <td>{isAvailable(item.ing_state)}</td>
                  <td>{item.ing_calories}</td>
                  <td style={{ textAlign: "center" }}>
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
                    <IngredientForm
                      key={item.ing_id}
                      ingredient={ingredient}
                    ></IngredientForm>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        DeleteIngredient(item);
                      }}
                    >
                      <i className="fa fa-trash" aria-hidden="true" />
                    </button>
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

export default IngredientList;
