import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Orders from "../Orders";
import Customers from "../Customers";
import Products from "../Products";
import Inventory from "../Inventory";
import './style.css'

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);
  return (
    <Router>
      <div>
        <nav>
          <div className="logo">
            <img src="/images/logo.png" alt="Logo" />
          </div>
          <div className="nav-toggle" onClick={toggleMenu}>☰</div>
          <ul className={showMenu ? 'show' : ''}>
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
        </Routes>
      </div>
    </Router>
  );
};

export default Home;
