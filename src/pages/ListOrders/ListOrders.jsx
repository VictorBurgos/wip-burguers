import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Space, Table, Tag, Button } from "antd";
import { useOrder } from "../../context/orders-context";
import { findList } from "../../config/utils";
import { burguers } from "../../config/const";

const ListOrderPage = ({ closeForm }) => {
  const { getOrder, saveOrder } = useOrder();
  const { Column, ColumnGroup } = Table;

  const ordersWithIndex = getOrder.map((order, index) => ({
    ...order,
    orderNumber: index + 1,
    productDetails: findList(burguers, order.product),
  }));

  const _delete = (index) => {
    saveOrder([...getOrder.slice(0, index), ...getOrder.slice(index + 1)]);
  };

  return (
    <div className="">
      <h2>Página de Pedidos</h2>

      <Table dataSource={ordersWithIndex}>
        <ColumnGroup title="Detalle del pedido">
          <Column title="Orden" dataIndex="orderNumber" key="orderNumber" />
          <Column
            title="Producto"
            dataIndex="productDetails"
            key="productDetails"
          />
          <Column title="Notas" dataIndex="note" key="note" />
          <Column title="Cantidad" dataIndex="quantity" key="quantity" />
          <Column
            title="Acciones"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Button onClick={() => _delete(record.orderNumber)}>
                  Eliminar
                </Button>
              </Space>
            )}
          />
        </ColumnGroup>
      </Table>

      <div className="buttons-container">
        <Button type="primary" htmlType="submit">
          Realizar pedido
        </Button>
        <Link to="/orders">
          <Button htmlType="reset">Regresar a añadir producto</Button>
        </Link>
      </div>
    </div>
  );
};

export default ListOrderPage;
