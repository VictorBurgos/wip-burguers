import React from "react";
import { Typography } from "antd";

const { Title } = Typography;
const { Text } = Typography;

const ProductCard = ( props ) => {
    const {product, editingMode } = props;


    const id = product.name;
    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(product.price);

    return (
        <div
          key={id}
          className="product-card" 
          onClick={() => editingMode(id)}
        >
          <div className="product-top">
            <Title level={3}>{product.name}</Title>
            <Title level={3}>{formattedPrice}</Title>
          </div>
          <Text>{product.description}</Text>
        </div>
      );
}

export default ProductCard;
