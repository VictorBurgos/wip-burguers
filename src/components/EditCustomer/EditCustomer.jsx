import React from 'react'
import { Button, Typography } from "antd";
import CustomerForm from "../CustomerForm";
import "./style.css";

const { Title } = Typography;

export default function EditCustomer(props) {
  const {endEditingMode} = props;
  return (
    <>
        <div className="page-heading">
        <Title level={2}>Editar cliente</Title>
        <Button
            className="cancel-button"
            type="primary"
            onClick={endEditingMode}
            danger
        >
            Cancelar
        </Button>
        </div>
        <CustomerForm closeForm={endEditingMode} />
    </>
  )
}