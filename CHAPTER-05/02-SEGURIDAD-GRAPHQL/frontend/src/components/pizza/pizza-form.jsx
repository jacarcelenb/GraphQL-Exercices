import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_PIZZAS,
  CREATE_PIZZA,
  UPDATE_PIZZA,
  DELETE_PIZZA_INGREDIENT,
  getTotalCalories,
  deleteIngredient,
  addIngredient,
  ListSelectedIngredients,
} from "../../services/pizza-service";
import { GET_INGREDIENTS } from "../../services/ingredient-service";
import { showMessage } from "../../services/message-service";

const PizzaForm = ({ pizza }) => {
  const IngredientsList = useQuery(GET_INGREDIENTS);
  const [pizzaIngredients, setpizzaIngredients] = useState([]);
  const [newIngredient, setnewIngredient] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [origin, setOrigin] = useState("");
  const [id, setId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [state, setState] = useState(false);

  useEffect(() => {
    if (pizza !== null) {
      setpizzaIngredients(pizza.ingredients);
      setName(pizza.piz_name);
      setOrigin(pizza.piz_origin);
      setId(pizza.piz_id);
      setState(pizza.piz_state);
      setDescription(pizza.piz_description);
    }
  }, [pizza]);

  const AddIngredients = () => {
    const ingredient = addIngredient(
      IngredientsList,
      parseInt(quantity),
      newIngredient
    );
    if (ingredient.ing_id === 0) {
      showMessage("Debe seleccionar un ingrediente", "warning");
      setnewIngredient(0);
      setQuantity(0);
    } else if (!ingredient.ing_state) {
      showMessage("Ingrediente no disponible", "warning");
      setnewIngredient(0);
      setQuantity(0);
    } else {
      showMessage("Ingrediente agregado correctamente", "success");
      setpizzaIngredients([...pizzaIngredients, ingredient]);
      setnewIngredient(0);
      setQuantity(0);
    }
  };

  const DeleteIngredients = (item) => {
    if (id > 0) {
      deletePizzaIngredient({
        variables: {
          pizzaIngredient: {
            ing_id: item.ing_id,
            piz_id: id,
          },
        },
      }).then(() => {
        setpizzaIngredients(deleteIngredient(item, pizzaIngredients));
      });
    } else {
      setpizzaIngredients(deleteIngredient(item, pizzaIngredients));
    }
  };

  const CleanForm = () => {
    setQuantity(0);
    setnewIngredient(0);
    setpizzaIngredients([]);
    setName("");
    setOrigin("");
    setDescription("");
    setId(0);
    setState(false);
  };

  // Mutations
  const [updatePizza] = useMutation(UPDATE_PIZZA, {
    refetchQueries: [{ query: GET_PIZZAS }, { query: GET_INGREDIENTS }],
  });
  const [deletePizzaIngredient] = useMutation(DELETE_PIZZA_INGREDIENT, {
    refetchQueries: [{ query: GET_PIZZAS }],
  });

  const [createPizza] = useMutation(CREATE_PIZZA, {
    refetchQueries: [{ query: GET_PIZZAS }, { query: GET_INGREDIENTS }],
  });

  const CreatePizza = (event) => {
    event.preventDefault();
    if (name.length > 0 && origin.length > 0 && pizzaIngredients.length > 0) {
      createPizza({
        variables: {
          pizza: {
            piz_name: name,
            piz_origin: origin,
            piz_description: description,
            piz_state: state,
            ingredientsPizza: ListSelectedIngredients(pizzaIngredients),
          },
        },
      })
        .then(() => {
          showMessage("Pizza creada correctamente", "success");
        })
        .catch(() => {
          showMessage("Error al crear la pizza", "warning");
        });
      document.getElementById("closeBtn").click();
    } else {
      showMessage("No se pueden dejar los campos vacíos", "warning");
    }
  };

  const UpdatePizza = (event) => {
    event.preventDefault();
    if (name.length > 0 && origin.length > 0 && pizzaIngredients.length > 0) {
      updatePizza({
        variables: {
          pizza: {
            piz_id: id,
            piz_name: name,
            piz_origin: origin,
            piz_state: state,
            piz_description: description,
            ingredientsPizza: ListSelectedIngredients(pizzaIngredients),
          },
        },
      })
        .then((resp) => {
          console.log(resp);
          showMessage("Pizza actualizada correctamente", "success");
        })
        .catch((err) => {
          showMessage("Error al actualizar la pizza", "warning");
        });
      document.getElementById("closeBtn").click();
      CleanForm();
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
      id="PizzaModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {"🍕 Pizza"}
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
            <div className="row">
              <div className="col-sm-5">
                <div className="card">
                  <div className="card-body">
                    <form>
                      <div style={{ textAlign: "left" }}>
                        {id > 0 ? (
                          <div className="mb-3">
                            <strong>Id: {id}</strong>
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="mb-3">
                          <strong>Nombre:</strong>
                          <input
                            type="text"
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                            className="form-control"
                            placeholder="Nombre"
                          />
                        </div>
                        <strong>Descripción:</strong>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Descripción"
                            value={description}
                            onChange={({ target }) =>
                              setDescription(target.value)
                            }
                          />
                        </div>
                        <strong>Origen:</strong>
                        <br></br>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Origen"
                            value={origin}
                            onChange={({ target }) => setOrigin(target.value)}
                          />
                        </div>
                        <div className="container">
                          <div className="row">
                            <div className="col-3">
                              <strong style={{ marginLeft: "-8px" }}>
                                Estado:
                              </strong>
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
                </div>
              </div>
              <div className="col-sm-7">
                <div className="card">
                  <div className="card-body">
                    <div style={{ textAlign: "left" }}>
                      <div className="row">
                        <div className="col-4">
                          <strong>Ingrediente:</strong>
                          <div className="mb-3">
                            <select
                              style={{ width: "5cm", height: "1cm" }}
                              value={newIngredient}
                              onChange={(e) => setnewIngredient(e.target.value)}
                            >
                              <option>Seleccionar</option>
                              {IngredientsList.data?.ingredients.map((item) => {
                                if (item.ing_state) {
                                  return (
                                    <option
                                      key={item.ing_id}
                                      value={item.ing_id}
                                    >
                                      {item.ing_name}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="mb-3">
                            <strong>Porción:</strong> <br></br>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="quantity"
                              style={{ width: "5cm", height: "1cm" }}
                              value={quantity}
                              min={0}
                              onChange={(e) => setQuantity(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-4">
                          <button
                            type="button"
                            style={{ marginTop: "23px", width: "4.8cm" }}
                            className="btn btn-success"
                            onClick={AddIngredients}
                          >
                            <i className="fa fa-plus" aria-hidden="true" />{" "}
                            Agregar
                          </button>
                        </div>
                      </div>

                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Calorías</th>
                            <th scope="col">Porción</th>
                            <th scope="col" style={{ textAlign: "center" }}>
                              {" "}
                              <i
                                className="fa fa-trash"
                                aria-hidden="true"
                              />{" "}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {pizzaIngredients.map((item, index) => (
                            <tr key={index}>
                              <td>{item.ing_name}</td>
                              <td>{item.ing_calories}</td>
                              <td>{item.pi_portion}</td>
                              <td>
                                <div style={{ textAlign: "center" }}>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                      DeleteIngredients(item);
                                    }}
                                  >
                                    <i
                                      className="fa fa-trash"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th></th>
                            <th></th>
                            <th>Total de Calorías</th>
                            <th style={{ color: "red", textAlign: "center" }}>
                              {getTotalCalories(pizzaIngredients)}
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer  justify-content-md-center ">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              style={{ width: "20%" }}
              onClick={CleanForm}
            >
              Cancelar <i className="fa fa-close" aria-hidden="true" />
            </button>
            <button
              className="btn btn-success"
              style={{ width: "20%" }}
              onClick={id === 0 ? CreatePizza : UpdatePizza}
            >
              Guardar <i className="fa fa-save" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaForm;
