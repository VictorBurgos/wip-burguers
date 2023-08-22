import React, { useState, useEffect } from "react";
import { Button, Typography } from "antd";
import { customerService } from "../../services/customerService";
import "./style.css";
import CustomerCard from "../CustomerCard";

const { Title } = Typography;

const CustomerList = (props) => {
  const { startAddingMode, startEditingMode } = props;
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const customersData = await customerService.getAllCustomers();
      setCustomers(customersData);
    };

    fetchCustomers();
  }, []);

  return (
    <>
      <div className="page-heading">
        <Title level={2}>Lista de Clientes</Title>
        <Button type="primary" onClick={startAddingMode}>
          Agregar
        </Button>
      </div>
      <div className="customer-list">
        {customers.map((c) => (
          <CustomerCard editingMode={startEditingMode} customer={c} />
        ))}
      </div>
    </>
  );
};

export default CustomerList;
