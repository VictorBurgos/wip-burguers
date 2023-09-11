import React, { useState, useMemo } from "react";
const OrdersContext = React.createContext();

// Creo la función prooverá al componente y escuchara en toda la estructura
export function OrderProvider(props) {
  const [order, setOrder] = useState([]);
  const resetOrder = () => setOrder([]);
  const saveOrder = (obj) => (obj && obj.order) && setOrder({ ...obj.order });;

  const value = useMemo(() => {
    return {
      resetOrder,
      saveOrder,
      order,
    };
  }, [order]);

  return <OrdersContext.Provider value={value} {...props} />;
}

// Se crea la función que se utilizará en los componentes
export function useOrder() {
  const context = React.useContext(OrdersContext);
  return context;
}
