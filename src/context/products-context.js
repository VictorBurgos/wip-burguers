import React, { useState, useEffect, useMemo } from "react";
import { productService } from "../services/productService";
const ProductsContext = React.createContext();

// Creo la función prooverá al componente y escuchara en toda la estructura
export function ProductsProvider(props) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const productsData = await productService.getAllProducts();
    setProducts(productsData);
  };

  const syncProducts = () => fetchProducts();
  useEffect(() => {
    fetchProducts();
  }, []);

  const value = useMemo(() => {
    return {
      syncProducts,
      products,
    };
  }, [products]);

  return <ProductsContext.Provider value={value} {...props} />;
}

// Se crea la función que se utilizará en los componentes
export function useProducts() {
  const context = React.useContext(ProductsContext);
  return context;
}
