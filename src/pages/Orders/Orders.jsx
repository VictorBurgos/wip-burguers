import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Form, Button, Input, Select, Col, Row, InputNumber } from "antd";
import { useOrder } from "../../context/orders-context";
import { burguers, typeProduct } from "../../config/const";
import  CurrencyInput  from "../../components/CurrencyInput";
const OrdersPage = ({ closeForm }) => {
  const { saveOrder } = useOrder();
  const [form] = Form.useForm();
  const [order, setOrder] = useState([]);

  const _save = async () => {
    try {
      const values = await form.validateFields();
      const updatedOrder = [...order, values];
      await saveOrder(updatedOrder);
      setOrder(updatedOrder);
      form.resetFields();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="">
      <h2>Página de Pedidos</h2>
      <Form form={form}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Categoría"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Por selecciona una categoria",
                },
              ]}
            >
              <Select
                options={[
                  {
                    value: "-1",
                    label: "Selecciona una opción",
                    disabled: true,
                  },
                  ...typeProduct,
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Producto"
              name="product"
              rules={[
                {
                  required: true,
                  message: "Por selecciona una categoria",
                },
              ]}
            >
              <Select
                options={[
                  {
                    value: "-1",
                    label: "Selecciona una opción",
                    disabled: true,
                  },
                  ...burguers,
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Nota"
              name="note"
              rules={[
                {
                  type: "text",
                  message: "Por favor agrega una nota",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Cantidad"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Por favor escribe cuantos del producto",
                },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Precio"
              name="price"
              type="number"
              rules={[
                {
                  required: true,
                  message: "Por favor escribe cuantos del producto",
                },
              ]}
            >
              <CurrencyInput />
            </Form.Item>
          </Col>
        </Row>

        <div className="buttons-container">
          <Button type="primary" htmlType="submit" onClick={_save}>
            Añadir producto
          </Button>

          <Link to="/list">
            <Button htmlType="reset">Ver detalle del pedido</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default OrdersPage;
