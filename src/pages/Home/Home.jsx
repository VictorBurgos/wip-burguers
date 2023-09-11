import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Orders from "../Orders";
import Customers from "../Customers";
import Products from "../Products";
import Inventory from "../Inventory";
import ListOrders from "../ListOrders";
import "./style.css";

const Home = () => {
  return (
    <Router>
      <div>
        <nav>
          <div className="logo">
            <img src="/images/logo.png" alt="Logo" />
          </div>
          <ul>
            <li>
              <Link to="/orders">Pedidos</Link>
            </li>
            <li>
              <Link to="/customers">Clientes</Link>
            </li>
            <li>
              <Link to="/products">Productos</Link>
            </li>
            <li>
              <Link to="/inventory">Inventario</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/list" element={<ListOrders />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;
