import React, { useState } from "react";
import { Card } from "primereact/card";
import NavBar from "../shared/navbar";
import { Knob } from "primereact/knob";
import { Chart } from "primereact/chart";
import { GET_PIZZAS } from "../../services/pizza-service";
import { GET_INGREDIENTS } from "../../services/ingredient-service";
import { useQuery } from "@apollo/client";
import {
  getIngredientsData,
  getPizzasData,
  optionsBar,
  optionsPieChart,
  optionsDonutChart,
  configPizzaLine
} from "../../services/chart-service";
const Dashboard = () => {
  const pizzalist = useQuery(GET_PIZZAS, {
    pollInterval: 500,
  });
  const IngredientsList = useQuery(GET_INGREDIENTS);

  const [numPizzas, setnumPizzas] = useState(pizzalist.data.pizzas.length);
  const [numIngredients, setnumIngredients] = useState(
    IngredientsList.data.ingredients.length
  );
  const [chartPizzaData, setChartPizzaData] = useState(
    getPizzasData(pizzalist.data.pizzas)
  );
  const [chartIngredientData, setChartIngredientData] = useState(
    getIngredientsData(IngredientsList.data.ingredients)
  );

  const [chartBarOptions, setChartBarOptions] = useState(optionsBar());
  const [chartPieOptions, setChartPieOptions] = useState(optionsPieChart());
  const [chartDonutOptions, setChartDonutOptions] = useState(optionsDonutChart());


  return (
    <>
      <NavBar></NavBar>
      <div>
        <Card style={{ width: "80%", marginLeft: "120px", marginTop: "30px" }}>
          <div className="row">
            <div className="col-sm-6">
              <Card
                title="Pizzas"
                style={{ textAlign: "center", fontSize: "12px" }}
              >
                <Knob
                  value={numPizzas}
                  strokeWidth={10}
                  size={100}
                  style={{ marginTop: "-25px" }}
                />
              </Card>
            </div>
            <div className="col-sm-6">
              <Card
                title="Ingredientes"
                style={{ textAlign: "center", fontSize: "12px" }}
              >
                <Knob
                  value={numIngredients}
                  strokeWidth={10}
                  size={100}
                  style={{ marginTop: "-25px" }}
                  valueColor="#19d160"
                />
              </Card>
            </div>
          </div>
        </Card>

        <Card
          title="Número de Calorías Pizzas"
          style={{ width: "80%", marginLeft: "120px", marginTop: "30px" }}
        >
          <div className="row">
            <div className="col-sm-6">
              <Card style={{ textAlign: "center" }}>
                <Chart
                  type="bar"
                  data={chartPizzaData}
                  options={chartBarOptions}
                />
              </Card>
            </div>

            <div className="col-sm-6">
              <Card style={{ textAlign: "center" }}>
                <Chart
                  type="pie"
                  data={chartPizzaData}
                  options={chartPieOptions}
                  height="240px"
                />
              </Card>
            </div>
          </div>
        </Card>

        <Card
          title="Número de Calorías Ingredientes"
          style={{ width: "80%", marginLeft: "120px", marginTop: "30px" }}
        >
          <div className="row">
            <div className="col-sm-6">
              <Card style={{ textAlign: "center" }}>
                <Chart
                  type="bar"
                  data={chartIngredientData}
                  options={chartBarOptions}
                />
              </Card>
            </div>
            <div className="col-sm-6">
              <Card style={{ textAlign: "center" }}>
                <Chart
                  type="pie"
                  data={chartIngredientData}
                  options={chartPieOptions}
                  height="240px"
                />
              </Card>
            </div>
          </div>
        </Card>

        <Card
          title="Número de Calorías Pizzas e Ingredientes"
          style={{ width: "80%", marginLeft: "120px", marginTop: "30px" }}
        >
          <div className="row">
            <div className="col-sm-6">
              <Card style={{ textAlign: "center" }}>
                <Chart
                  type="doughnut"
                  data={chartPizzaData}
                  options={chartDonutOptions}
                  height="250px"
                />
              </Card>
            </div>

            <div className="col-sm-6">
              <Card style={{ textAlign: "center" }}>
                <Chart
                  type="doughnut"
                  data={chartIngredientData}
                  options={chartDonutOptions}
                  height="250px"
                />
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
