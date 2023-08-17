import React, { useState } from "react";
import "./style.css";
import { Form, Button, Input, Select, Col, Row, InputNumber } from "antd";
import { useOrder } from "../../context/orders-context";
import { burguers, typeProduct } from "../../config/const";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
const OrdersPage = ({ closeForm }) => {
  const { getOrder, saveOrder } = useOrder();
  const [form] = Form.useForm();
  const [quantity, setQuantity] = useState(1);

  const _add = (amount) => {
    const newAmount = quantity + amount;
    setQuantity(newAmount);
  };

  const _save = async () => {
    try {
      const values = await form.validateFields();
      await saveOrder(values);
    } catch (error) {
      console.log(error);
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
              <InputNumber
                min={1}
                max={10}
                value={quantity}
                onChange={(value) => setQuantity(value)}
              />
              <Button onClick={() => _add(-1)} disabled={quantity <= 1}>
                <MinusOutlined />
              </Button>
              <Button onClick={() => _add(1)}>
                <PlusOutlined />
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <div className="buttons-container">
          <Button type="primary" htmlType="submit" onClick={_save}>
            Guardar pedido
          </Button>
          <Button htmlType="reset" onClick={() => alert("adios")}>
            Ver detalle del pedido
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default OrdersPage;
