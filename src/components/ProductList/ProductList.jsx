import React, { useState, useEffect } from "react";
import { Button, Typography } from "antd";
import { productService } from "../../services/productService";
import "./style.css";
import ProductCard from "../ProductCard";

const { Title } = Typography;

const ProductList = (props) => {
  const { startAddingMode, startEditingMode } = props;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await productService.getAllProducts();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="page-heading">
        <Title level={2}>Lista de Productos</Title>
        <Button type="primary" onClick={startAddingMode}>
          Agregar
        </Button>
      </div>
      <div className="product-list">
        {products.map((p) => (
          <ProductCard editingMode={startEditingMode} product={p} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
