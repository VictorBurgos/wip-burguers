import React from 'react';
import { Button, Typography } from "antd";
import CustomerForm from "../../components/CustomerForm";
import "./style.css";

const { Title } = Typography;

const Customers = () => {
  const endAddingMode = () => { 
    console.log("endAdding");
  };
  return (
    <div>
      <h1>Clientes</h1>
      <div className='customer-heading'>
        <Title level={2}>Agregar nuevo cliente</Title>
        <Button
          className="cancel-button"
          type="primary"
          danger
        >
          Cancelar
        </Button>
      </div>
      <CustomerForm closeForm={endAddingMode}/>
    </div>
  );
};

export default Customers;
