import React, { useEffect, useState } from "react";
import { Form, Button, Input, Select } from "antd";
import { Col, Row } from "antd";
import CurrencyInput from "../CurrencyInput";
import { productService } from "../../services/productService";
import "./style.css";
import { typeProduct } from "../../config/const";

const ProductForm = ({ closeForm, product: incommingProduct }) => {
  const [form] = Form.useForm();

  const [product, setProduct] = useState();
  const save = async () => {
    try {
      const values = await form.validateFields();
      if(isNewProduct) productService.createProduct(values);
      else productService.updateProduct(product.id, values);
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };
  const saveAndClose = async () => {
    await save();
    closeForm();
  };

  const [isNewProduct, setIsNewProduct] = useState(true);
  useEffect(() => {
    setIsNewProduct(incommingProduct?.id === undefined);
    setProduct(incommingProduct);
    form.resetFields();
  }, [incommingProduct]);

  return (
    <Form form={form} layout="vertical" initialValues={product}>
      <Row gutter={16}>
        <Col span={20}>
          <Form.Item
            label="Nombre del producto"
            name="name"
            rules={[
              {
                required: true,
                message: "Por favor escribe el nombre del producto",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={4}>
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
            <CurrencyInput />
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
            label="Categoria"
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
                { value: "-1", label: "Selecciona una opción", disabled: true },
                ...typeProduct,
              ]}
            />
          </Form.Item>
        </Col>
        {/* <Col span={8}>
          <Form.Item label="Image Name" name="imageName">
            <Input />
          </Form.Item>
        </Col> */}
      </Row>
      <div className="buttons-container">
        <Button type="primary" htmlType="submit" onClick={saveAndClose}>
          Guardar y salir
        </Button>
      </div>
    </Form>
  );
};

export default ProductForm;
