import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home/Home";
import { OrderProvider } from "./context/orders-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <OrderProvider>
      <Home />
    </OrderProvider>
  </React.StrictMode>
);
