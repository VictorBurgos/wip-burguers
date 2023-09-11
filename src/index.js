import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home/Home";
import { OrderProvider } from "./context/orders-context";
import { ProductsProvider } from "./context/products-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductsProvider>
    <OrderProvider>
      <Home />
    </OrderProvider>
    </ProductsProvider>
  </React.StrictMode>
);
