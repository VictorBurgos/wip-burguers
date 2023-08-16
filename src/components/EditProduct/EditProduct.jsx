import React from 'react'
import { Button, Typography } from "antd";
import ProductForm from "../ProductForm";
import "./style.css";

const { Title } = Typography;

export default function EditProduct(props) {
  const {endEditingMode} = props;
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
        <ProductForm closeForm={endEditingMode} />
    </>
  )
}
