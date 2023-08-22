import React from "react";
import { Typography } from "antd";

const { Title } = Typography;
const { Text } = Typography;

const CustomerCard = ( props ) => {
    const {customer, editingMode } = props;


    const id = customer.name;

    return (
        <div
          key={id}
          className="customer-card" 
          onClick={() => editingMode(id)}
        >
          <div className="customer-top">
            <Title level={3}>{customer.name}</Title>
            <Text strong size={"large"}>
              {customer.phone}
            </Text>
          </div>
          <Text>{customer.distance}</Text>
        </div>
      );
}

export default CustomerCard;
