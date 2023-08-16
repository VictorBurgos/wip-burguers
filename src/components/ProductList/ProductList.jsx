import React, { useState, useEffect } from "react";
import { Button, Typography } from "antd";
import { productService } from "../../services/productService";
import "./style.css";

const { Title } = Typography;
const { Text } = Typography;

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

  const Products = products.map((product) => {
    const id = product.name;
    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(product.price);
    return (
      <div
        key={id}
        className="product-card"
        onClick={() => startEditingMode(id)}
      >
        <div className="product-top">
          <Title level={3}>{product.name}</Title>
          <Text underline strong size={"large"}>
            {formattedPrice}
          </Text>
        </div>
        <Text>{product.description}</Text>
      </div>
    );
  });

  return (
    <>
      <div className="page-heading">
        <Title level={2}>Lista de Productos</Title>
        <Button type="primary" onClick={startAddingMode}>
          Agregar
        </Button>
      </div>
      <div className="product-list">{Products}</div>
    </>
  );
};

export default ProductList;
