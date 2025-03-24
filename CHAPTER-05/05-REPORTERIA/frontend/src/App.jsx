import { Routes, Route } from "react-router-dom";
import PizzaList from "./components/pizza/pizza-list.jsx";
import MainPage from "./components/home.jsx";
import IngredientList from "./components/ingredient/ingredient-list.jsx";
import UserList from "./components/users/user-list.jsx";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import PrivateRoute from "./components/auth/privateroute.jsx";
import RoleList from "./components/role/role-list.jsx";
import RoleMenuList from "./components/access-menu/rolmenu-list.jsx";
import Login from "./components/login.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";
import WelcomePage from "./components/shared/welcome-page.jsx";
import NotFoundPage from "./components/notfound.jsx";
import './App.css'

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
      <Route path="/" element={<MainPage></MainPage>}></Route>
      <Route path="login" element={<Login setAuth={setAuth}></Login>}></Route>
      <Route
        path="main"
        element={
          <PrivateRoute auth={auth}>
            <Dashboard />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="welcome"
        element={
          <PrivateRoute auth={auth}>
            <WelcomePage />
          </PrivateRoute>
        }
      ></Route>
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
        element={
          <PrivateRoute auth={auth}>
            <UserList />
          </PrivateRoute>
        }
      ></Route>

      <Route
        path="roles"
        element={
          <PrivateRoute auth={auth}>
            <RoleList />
          </PrivateRoute>
        }
      ></Route>

      <Route
        path="accesos"
        element={
          <PrivateRoute auth={auth}>
            <RoleMenuList />
          </PrivateRoute>
        }
      ></Route>
      <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
    </Routes>
  );
}

export default App
