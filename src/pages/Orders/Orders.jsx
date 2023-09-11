import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import {
  Form,
  Button,
  Input,
  Select,
  Col,
  Row,
  InputNumber,
  Typography,
} from "antd";
import { useOrder } from "../../context/orders-context";
import { useProducts } from "../../context/products-context";
import { typeProduct } from "../../config/const";
const OrdersPage = ({ closeForm }) => {
  const { saveOrder } = useOrder();
  const [form] = Form.useForm();
  const [order, setOrder] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(null);
  const [isNameEnable, setIsNameEnable] = useState(false);

  const handleCategoryChange = ({
    category,
    product,
    quantity: incommingQuantity,
  }) => {
    console.log(JSON.stringify(category));
    console.log(JSON.stringify(product));
    if (!!category && category !== setSelectedCategory) {
      setSelectedCategory(category);
      if (!isNameEnable) setIsNameEnable(true);
    }

    if (!!product && product !== selectedProduct) {
      setSelectedProduct(product);
      const productPrice = products.find((p) => p.name === product).price;
      const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(productPrice);
      setPrice(formattedPrice);
    }

    if (!!incommingQuantity && incommingQuantity !== quantity) {
      setQuantity(incommingQuantity);
    }
  };

  useEffect(() => {
    if (!price || !quantity) return;
    const incommingTotal =
      parseInt(quantity, 10) * parseFloat(price.replace("$", ""), 10);
    const formattedTotal = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(incommingTotal);
    setTotal(formattedTotal);
  }, [price, quantity]);

  const {products} = useProducts();
  const addProduct = async () => {
    try {
      const {category, product: productName, notes, quantity} = await form.validateFields();

      const newProduct = {
        category,
        product: productName,
        notes,
        price,
        quantity,
      }
      console.log("newProduct: "+ JSON.stringify(newProduct))
      console.log("order: "+ JSON.stringify(order))
      const previousProducts = order;
      const updatedOrder = [...previousProducts, newProduct];
      setOrder(updatedOrder);

      await saveOrder(updatedOrder);
      form.resetFields();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="">
      <h2>Página de Pedidos</h2>
      <Form
        form={form}
        onValuesChange={handleCategoryChange}
        initialValues={{ quantity: 1 }}
      >
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
              disabled={isNameEnable}
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
                  ...products
                    .filter((p) => p.category === selectedCategory)
                    .map((p) => ({ value: p.name, label: p.name, name: p.id })),
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
          {price && (
            <>
              <Col span={8}>
                <Typography level={3}>
                  <pre style={{ margin: 0 }}>Price: {price}</pre>
                </Typography>
              </Col>
              <Col span={8}>
                <Typography level={3}>
                  <pre style={{ margin: 0 }}>Total: {total}</pre>
                </Typography>
              </Col>
            </>
          )}
        </Row>

        <div className="buttons-container">
          <Button type="primary" htmlType="submit" onClick={addProduct}>
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
