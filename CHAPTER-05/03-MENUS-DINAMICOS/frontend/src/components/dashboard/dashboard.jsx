import React, { useState } from "react";
import { Card } from "primereact/card";
import NavBar from "../shared/navbar.jsx";
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
  configLine,
  CharPizzaLine,
  CharIngredientLine,
  configRadarChart,
  RadarChart,
  PolarCharPizza,
  PolarOptions,
} from "../../services/chart-service";
const Dashboard = () => {
  const pizzalist = useQuery(GET_PIZZAS, {
    pollInterval: 500,
  });
  const IngredientsList = useQuery(GET_INGREDIENTS);

  const [numPizzas, setnumPizzas] = useState(pizzalist.data?.pizzas.length);
  const [numIngredients, setnumIngredients] = useState(
    IngredientsList.data?.ingredients.length
  );
  const [chartPizzaData, setChartPizzaData] = useState(
    getPizzasData(pizzalist.data?.pizzas)
  );
  const [chartIngredientData, setChartIngredientData] = useState(
    getIngredientsData(IngredientsList.data?.ingredients)
  );

  const [chartBarOptions, setChartBarOptions] = useState(optionsBar());
  const [chartPieOptions, setChartPieOptions] = useState(optionsPieChart());
  const [chartRadar, setChartRadar] = useState(
    RadarChart(pizzalist.data?.pizzas, IngredientsList.data?.ingredients)
  );
  const [charRadarOptions, setChartCharRadarOptions] = useState(
    configRadarChart()
  );
  const [chartDonutOptions, setChartDonutOptions] = useState(
    optionsDonutChart()
  );
  const [chartPolar, setCharPolar] = useState(PolarCharPizza(pizzalist.data?.pizzas))
  const [chartPolarOptions, setCharPolarOptions] = useState(PolarOptions())
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
                  value={numPizzas == undefined ? 0 : numPizzas }
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
                  value={numIngredients == undefined ? 0 : numIngredients}
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
          title=" Calorías por Pizzas"
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
          title="Calorías por Ingredientes"
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
          title="Calorías Pizzas e Ingredientes"
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

        <Card
          title="Calorías Pizzas e Ingredientes"
          style={{ width: "80%", marginLeft: "120px", marginTop: "30px" }}
        >
          <div className="row">
            <div className="col-sm-6">
              <Card style={{ textAlign: "center" }}>
                <Chart
                  type="line"
                  data={CharPizzaLine(pizzalist.data?.pizzas)}
                  options={configLine}
                  height="250px"
                  width="400px"
                />
              </Card>
            </div>

            <div className="col-sm-6">
              <Card style={{ textAlign: "center" }}>
                <Chart
                  type="line"
                  data={CharIngredientLine(IngredientsList.data?.ingredients)}
                  options={configLine}
                  height="250px"
                  width="400px"
                />
              </Card>
            </div>
          </div>
        </Card>

        <Card
          title="Calorías Pizzas e Ingredientes"
          style={{ width: "80%", marginLeft: "120px", marginTop: "30px" }}
        >
          <div className="row">
            <Card style={{ textAlign: "center" }}>
              <Chart
                type="radar"
                data={chartRadar}
                options={charRadarOptions}
                height="250px"
                width="600px"
              />
            </Card>
          </div>

        </Card>
      </div>
    </>
  );
};

export default Dashboard;
