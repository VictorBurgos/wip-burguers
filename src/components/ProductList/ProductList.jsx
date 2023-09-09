import React, { useState, useEffect } from "react";
import { Button, Typography } from "antd";
import { productService } from "../../services/productService";
import "./style.css";
import ProductCard from "../ProductCard";

const { Title } = Typography;

const ProductList = (props) => {
  const { startAddingMode, startEditingMode } = props;
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const productsData = await productService.getAllProducts();
    setProducts(productsData);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const ProductsCards = products.sort((a, b) => a.price - b.price).map((p) => {
    const key = p.id;
    const handleStartEditing = () => startEditingMode(p.id);
    return <ProductCard key={key} editingMode={handleStartEditing} product={p} />
  })
  
  return (
    <>
      <div className="page-heading">
        <Title level={2}>Lista de Productos</Title>
        <Button type="primary" onClick={startAddingMode}>
          Agregar
        </Button>
      </div>
      <div className="product-list">{ProductsCards}</div>
    </>
  );
};

export default ProductList;
