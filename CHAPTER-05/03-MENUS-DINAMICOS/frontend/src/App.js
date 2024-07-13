import { Routes, Route } from "react-router-dom";
import PizzaList from "./components/pizza/pizza-list";
import MainPage from "./components/home";
import IngredientList from "./components/ingredient/ingredient-list";
import UserList from "./components/users/user-list";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import PrivateRoute from "./components/auth/privateroute";
import RoleList from "./components/role/role-list";
import RoleMenuList from "./components/access-menu/rolmenu-list";
import Login from "./components/login";
import Dashboard from "./components/dashboard/dashboard";
function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(jwtDecode(token));
    }
  }, []);

;


  return (

      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route path="login" element={<Login setAuth={setAuth}></Login>}></Route>
        <Route path="main"
         element={  <PrivateRoute auth={auth}><Dashboard/></PrivateRoute>}
        ></Route>
        <Route path="pizzas"
         element={  <PrivateRoute auth={auth}><PizzaList/></PrivateRoute>}
        ></Route>
        <Route
          path="ingredientes"
          element={<PrivateRoute auth={auth}><IngredientList/></PrivateRoute>}
        ></Route>

        <Route
          path="usuarios"
          element={<PrivateRoute auth={auth}><UserList /></PrivateRoute>}
        ></Route>

      <Route
          path="roles"
          element={<PrivateRoute auth={auth}><RoleList /></PrivateRoute>}
        ></Route>

      <Route
          path="accesos"
          element={<PrivateRoute auth={auth}><RoleMenuList /></PrivateRoute>}
        ></Route>
      </Routes>




  );
}

export default App;
