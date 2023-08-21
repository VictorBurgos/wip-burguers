import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Space, Table, Button, Modal } from "antd";
import { useOrder } from "../../context/orders-context";
import { findList, currency } from "../../config/utils";
import { burguers } from "../../config/const";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ModalProduct from "../../components/modal/ListOrders/ModalProduct";

const ListOrderPage = ({ closeForm }) => {
  const { getOrder, saveOrder } = useOrder();
  const { Column, ColumnGroup } = Table;
  const ordersWithIndex = getOrder.map((order, index) => ({
    ...order,
    orderNumber: index + 1,
    productDetails: findList(burguers, order.product),
  }));
  const [visible, setVisible] = useState({
    visible: false,
    data: false,
  });

  const _delete = (index) => {
    Modal.confirm({
      title: "¿Estas seguro de eliminar?",
      onOk: () => {
        saveOrder([...getOrder.slice(0, index), ...getOrder.slice(index + 1)]);
      },
    });
  };

  const _onClose = (reload = false, index) => {
    console.log(index);
    if (!visible.data) {
      saveOrder([...getOrder, reload]);
    } else {
      const updatedOrder = [...getOrder];
      const updatedObj = {
        ...updatedOrder[index],
        reload,
      };
      updatedOrder[index] = updatedObj;

      saveOrder(updatedOrder);
    }
    setVisible({ visible: false, data: false });
  };

  const _getTotal = () => {
    const quantityTotal = getOrder
      .map((i) => i.price * i.quantity)
      .reduce((a, b) => a + parseFloat(b), 0);
    return quantityTotal;
  };

  return (
    <div className="">
      <h2>Página de Pedidos</h2>

      <div className="buttons-container">
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => setVisible({ visible: true, data: false })}
        >
          Añadir nuevo producto
        </Button>
      </div>

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
          <Column title="Precio" dataIndex="price" key="price" />
          <Column
            title="Acciones"
            key="action"
            render={(_, record, index) => (
              <Space size="middle">
                <Button onClick={() => _delete(index)}>
                  <DeleteOutlined />
                </Button>
                <Button
                  onClick={() =>
                    setVisible({ visible: true, data: record, index })
                  }
                >
                  <EditOutlined />
                </Button>
              </Space>
            )}
          />
        </ColumnGroup>
      </Table>
      <div className="buttons-container">
        <Link to="/orders">
          <Button htmlType="reset">Realizar nuevo pedido</Button>
        </Link>
        <Button type="primary" htmlType="submit">
          Realizar pedido
        </Button>
      </div>
      <div>
        <h1> Total: $ {currency(_getTotal(), 2)}</h1>
      </div>
      <ModalProduct
        title="Añadir"
        open={visible.visible}
        data={visible.data}
        onText="Actualizar"
        onClose={(data) => _onClose(data, visible.index)}
        onCancel={() => setVisible({ visible: false, data: false })}
      />
    </div>
  );
};

export default ListOrderPage;
