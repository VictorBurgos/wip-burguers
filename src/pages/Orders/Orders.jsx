import React from 'react';
import './style.css'
import { Form, Button, Input, Select, Col, Row } from "antd";
import {useOrder} from '../../context/orders-context';
import { burguers } from '../../config/const';
const OrdersPage = (props) => {
  const { getOrder, saveOrder } = useOrder()
  const [form] = Form.useForm();
  return (
    <div className=''>
      <h2>Página de Pedidos</h2>
      <Form form={form}>
      <Row gutter={16}>
      <Col span={8}>
          <Form.Item label="Producto" name="product"
            rules={[
              {
                required: true,
                message: "Por selecciona una categoria",
              },
            ]}
          >
            <Select
              options={[
                { value: '-1', label: 'Selecciona una opción', disabled: true},
                ...burguers
              ]}
            />
          </Form.Item>
        </Col>  
       
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Descripción" name="description">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
       
        <Col span={8}>
          <Form.Item
            label="Precio"
            name="price"
            rules={[
              {
                required: true,
                type: "number",
                message: "Por favor escribe el precio del producto",
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
                type: "number",
                message: "Por favor escribe cuantos del producto",
              },
            ]}
          >
            <Input />
           </Form.Item>
        </Col>
      </Row>
      <div className="buttons-container">
        <Button type="primary" htmlType="submit" onClick={()=> {alert('Hola')}}>
          Guardar y salir
        </Button>
        <Button htmlType="reset" onClick={() => alert('adios')}>
          Guardar y nuevo
        </Button>
      </div>
    </Form>
    </div>
  );
};

export default OrdersPage;
