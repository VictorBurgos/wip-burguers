import React, { useState, useMemo, useEffect } from "react";
const MenuContext = React.createContext();

// Creo la función prooverá al componente y escuchara en toda la estructura
export function OrderProvider(props) {
  const [getOrder, setGetOrder] = useState([]);

  const setReset = () => {
    setGetOrder([]);
  };

  const save = (obj) => {
    if (obj && obj.getOrder)
      setGetOrder({
        ...obj.getOrder,
        active: true,
        save: true,
      });
  };

  const value = useMemo(() => {
    return {
      save,
      reset: setReset,
      getOrder: getOrder,
      saveOrder: setGetOrder,
    };
  }, [getOrder]);

  return <MenuContext.Provider value={value} {...props} />;
}

// Se crea la función que se utilizará en los componentes
export function useOrder() {
  const context = React.useContext(MenuContext);
  return context;
}
