import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Space, Table, Button, Modal, Input, Tag } from "antd";
import { useOrder } from "../../context/orders-context";
import { findList, currency } from "../../config/utils";
import { burguers } from "../../config/const";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ListOrderPage = ({ closeForm }) => {
  const { getOrder, saveOrder } = useOrder();
  const { Column, ColumnGroup } = Table;
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [product, setProduct] = useState("");
  const ordersWithIndex = getOrder.map((order, index) => ({
    ...order,
    orderNumber: index + 1,
    productDetails: findList(burguers, order.product),
  }));

  const [editProduct, setEditProduct] = useState({
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
  const onEdit = (value, index) => {
    const updatedOrder = [...getOrder];
    const updatedObj = {
      ...updatedOrder[index],
      quantity,
      note,
    };

    updatedOrder[index] = updatedObj;

    saveOrder(updatedOrder);

    setEditProduct({ visible: false, data: false });
  };

  const _getTotal = () => {
    const quantityTotal = getOrder
      .map((i) => i.price * i.quantity)
      .reduce((a, b) => a + parseFloat(b), 0);
    return quantityTotal;
  };

  useEffect(() => {
    if (editProduct.visible) {
      setQuantity(editProduct.data.quantity);
      setNote(editProduct.data.notes);
    }
  }, [editProduct]);

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
                    setEditProduct({ visible: true, data: record, index })
                  }
                >
                  <EditOutlined />
                </Button>
              </Space>
            )}
          />
        </ColumnGroup>
      </Table>
      <Modal
        title="Editar"
        open={editProduct.visible}
        onText="Actualizar"
        onCancel={() => {
          setEditProduct({ visible: false, data: false });
        }}
        onOk={() => onEdit(editProduct.data, editProduct.index)}
      >
        <Space>
          <Tag> Producto </Tag>
          <Input
            placeholder="Editar producto"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </Space>
        <Space>
          <Tag> Cantidad </Tag>
          <Input
            placeholder="Editar cantidad"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Space>
        <Space>
          <Tag> Notas </Tag>
          <Input
            placeholder="Editar notas"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Space>
      </Modal>

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
    </div>
  );
};

export default ListOrderPage;
