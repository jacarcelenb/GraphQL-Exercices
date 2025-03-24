import React, { useEffect } from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  GET_INGREDIENTS,
  CREATE_INGREDIENTS,
  UPDATE_INGREDIENTS,
} from "../../services/ingredient-service";

import { showMessage } from "../../services/message-service";

const IngredientForm = ({ ingredient }) => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState(0);
  const [state, setState] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (ingredient !== null) {
      setName(ingredient.ing_name);
      setCalories(ingredient.ing_calories);
      setId(ingredient.ing_id);
      setState(ingredient.ing_state);
    }
  }, [ingredient]);

  // Mutations
  const [createIngredient] = useMutation(CREATE_INGREDIENTS, {
    refetchQueries: [{ query: GET_INGREDIENTS }],
  });

  const [updateIngredient] = useMutation(UPDATE_INGREDIENTS, {
    refetchQueries: [{ query: GET_INGREDIENTS }],
  });

  const CleanForm = () => {
    setName("");
    setCalories(0);
    setId(0);
    setState(false);
  };

  const CreateIngredient = (event) => {
    event.preventDefault();
    if (name.length > 0 && calories > 0) {
      createIngredient({
        variables: {
          ingredient: {
            ing_calories: parseFloat(calories),
            ing_name: name,
            ing_state: state,
          },
        },
      })
        .then(() => {
          showMessage("Ingrediente creado correctamente", "success");
        })
        .catch(() => {
          showMessage("Error al crear el ingrediente", "warning");
        });
      document.getElementById("closeBtn").click();
    } else {
      showMessage("No se pueden dejar los campos vacíos", "warning");
    }
  };

  const UpdateIngredient = (event) => {
    event.preventDefault();
    if (name.length > 0 && calories > 0) {
      updateIngredient({
        variables: {
          ingredient: {
            ing_id: id,
            ing_name: name,
            ing_state: state,
            ing_calories: parseFloat(calories),
          },
        },
      })
        .then(() => {
          showMessage("Ingrediente actualizado correctamente", "success");
        })
        .catch((err) => {
          showMessage("Error al actualizar el ingrediente", "warning");
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
      id="IngredienteModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="IngredienteModal">
              🥕 Ingredientes
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
                <strong>Nombre</strong> <br></br>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                  />
                </div>
                <strong>Calorías</strong> <br></br>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="calories"
                    style={{ height: "1cm" }}
                    value={calories}
                    onChange={({ target }) => setCalories(target.value)}
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
              onClick={id === 0 ? CreateIngredient : UpdateIngredient}
            >
              Guardar <i className="fa fa-save" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientForm;
