import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home.jsx";
import NavBar from "./components/NavBar.jsx";
import "./App.css";
import BackOffice from "./components/Seller.jsx";
import Login from "./components/Login.jsx";
import Cart from "./components/Cart.jsx";
import Register from "./components/Register.jsx";
import { useState } from "react";

function App() {
  const [total, setTotal] = useState(0);
  return (
    <div className="app">
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/backOffice" element={<BackOffice />} />
          <Route path="/cart" element={<Cart setTotal={setTotal} />} />
          <Route path="/register" element={<Register />} />
        
        </Routes>
      </div>
     
    </div>
  );
}

export default App;





