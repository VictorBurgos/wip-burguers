import React from 'react'
import { Button, Typography } from "antd";
import ProductForm from "../ProductForm";
import "./style.css";

const { Title } = Typography;

export default function AddNewProduct(props) {
  const {endAddingMode} = props;
  return (
    <>
        <div className="page-heading">
        <Title level={2}>Agregar nuevo producto</Title>
        <Button
            className="cancel-button"
            type="primary"
            onClick={endAddingMode}
            danger
        >
            Cancelar
        </Button>
        </div>
        <ProductForm closeForm={endAddingMode} />
    </>
  )
}
