import React from "react";
import { Form, Button, Input} from "antd";
import { Col, Row } from "antd";
import { productService } from "../../services/productService";
import "./style.css";

const { TextArea } = Input;

const CustomerForm = ({ closeForm }) => {
  const [form] = Form.useForm();

  const save = async () => {
    try {
      const values = await form.validateFields();
      productService.createProduct(values);
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };
  const saveAndClose = async () => {
    await save();
    closeForm();
  };

  return (
    <Form form={form}>
      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            label="Nombre del cliente"
            name="name"
            rules={[
              {
                required: true,
                message: "Por favor escribe tu nombre",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Dirección"
            name="address"
            rules={[
              {
                required: true,
                type: "varchar",
                message: "Por favor escribe tu direccion",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Numero de telefono" name="phone">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Notas" name="notes">
            <TextArea rows={5} />
          </Form.Item>
        </Col>
      </Row>
      <div className="buttons-container">
        <Button type="primary" htmlType="submit" onClick={saveAndClose}>
          Guardar y salir
        </Button>
        <Button htmlType="reset" onClick={save}>
          Guardar y nuevo
        </Button>
      </div>
    </Form>
  );
};

export default CustomerForm;
