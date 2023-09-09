import React, { useEffect, useState } from 'react'
import { Button, Typography } from "antd";
import ProductForm from "../ProductForm";
import "./style.css";
import { productService } from '../../services/productService';

const { Title } = Typography;

export default function EditProduct(props) {
  const {endEditingMode, productId} = props;

  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    const incommingProduct = await productService.getProductById(productId)
    setProduct(incommingProduct);
  }
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
        <div className="page-heading">
        <Title level={2}>Editar producto</Title>
        <Button
            className="cancel-button"
            type="primary"
            onClick={endEditingMode}
            danger
        >
            Cancelar
        </Button>
        </div>
        <ProductForm closeForm={endEditingMode} product={product}/>
    </>
  )
}
