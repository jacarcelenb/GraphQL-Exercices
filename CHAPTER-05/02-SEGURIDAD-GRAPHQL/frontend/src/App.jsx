import { useState,useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PizzaList from "./components/pizza/pizza-list.jsx";
import Home from "./components/home";
import IngredientList from "./components/ingredient/ingredient-list.jsx";
import { jwtDecode } from "jwt-decode";
import PrivateRoute from "./components/auth/privateroute.jsx";
import "./App.css";

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(jwtDecode(token));
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home setAuth={setAuth}></Home>}></Route>
      <Route
        path="pizzas"
        element={
          <PrivateRoute auth={auth}>
            <PizzaList />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="ingredientes"
        element={
          <PrivateRoute auth={auth}>
            <IngredientList />
          </PrivateRoute>
        }
      ></Route>

      <Route
        path="usuarios"
        element={<PrivateRoute auth={auth}></PrivateRoute>}
      ></Route>
    </Routes>
  );
}

export default App;
