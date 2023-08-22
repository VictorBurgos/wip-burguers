import React, { useState } from "react";
import { Space, Table, Button, Modal, Tag } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { colorStatus, status } from "../../config/const";
const data = [
  {
    id: 1,
    firstName: "Rodrigo",
    lastName: "Ruiz",
    address: "C. 5 LL 381 x 28 y 30 col. Juan Pablo II",
    phone: 9999509788,
    status: "active",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    address: "C. 18 x 23 y 23A Col. Chichen Itza",
    phone: 9999509788,
    status: "pending",
  },
  {
    id: 3,
    firstName: "Cristiano",
    lastName: "Ronaldo",
    address: "C. Siuuuuu, Real Madrid",
    phone: 9999509788,
    status: "cancel",
  },
  {
    id: 4,
    firstName: "Santiago",
    lastName: "Giménez",
    address: "C. Arriba el Cruz Azul",
    phone: 9999509788,
    status: "processing",
  },
];
const Customers = () => {
  const { Column, ColumnGroup } = Table;
  const [visible, setVisible] = useState({ visible: false, data: false });

  const _delete = (index) => {
    console.log(index);
  };
  return (
    <div>
      <h2>Clientes</h2>
      <div className="buttons-container" style={{ marginBottom: "10px" }}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => setVisible({ visible: true, data: false })}
        >
          <PlusOutlined /> Añadir cliente
        </Button>
      </div>
      <Table dataSource={data}>
        <ColumnGroup title="Clientes">
          <Column title="Nombre" dataIndex="firstName" key="firstName" />
          <Column title="Apellido" dataIndex="lastName" key="lastName" />
          <Column title="Dirección" dataIndex="address" key="address" />
          <Column title="Teléfono" dataIndex="phone" key="phone" />
          <Column
            title="Estado"
            key="status"
            render={(_, record) => (
              <Space>
                <Tag color={colorStatus[_.status]}>{status[_.status]}</Tag>
              </Space>
            )}
          />

          <Tag color="warning">warning</Tag>
          <Column
            title="Acciones"
            key="action"
            render={(_, record, index) => (
              <Space size="middle">
                 <Button
                  onClick={() =>
                    setVisible({ visible: true, data: record, index })
                  }
                >
                  <EditOutlined />
                </Button>
                <Button onClick={() => _delete(index)} danger>
                  <DeleteOutlined  />
                </Button>
               
              </Space>
            )}
          />
        </ColumnGroup>
      </Table>
    </div>
  );
};

export default Customers;
