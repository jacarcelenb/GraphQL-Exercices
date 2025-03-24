import { BrowserRouter, Routes, Route } from "react-router-dom";
import PizzaList from "./components/pizza/pizza-list.jsx";
import Home from './components/home.jsx'
import IngredientList from "./components/ingredient/ingredient-list.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/pizzas" element={<PizzaList></PizzaList>}></Route>
        <Route path="/ingredientes" element={<IngredientList></IngredientList>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
