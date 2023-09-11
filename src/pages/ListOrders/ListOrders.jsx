import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Space, Table, Button, Modal } from "antd";
import { useOrder } from "../../context/orders-context";
import { findList, currency } from "../../config/utils";
import { burguers } from "../../config/const";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import ModalProduct from "../../components/modal/ListOrders/";
import ProductPDF from "../../components/ProductPDF";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

const ListOrderPage = ({ closeForm }) => {
  const { order, saveOrder } = useOrder();
  const { Column, ColumnGroup } = Table;
  const ordersWithIndex = order.map((order, index) => ({
    ...order,
    orderNumber: index + 1,
    productDetails: findList(burguers, order.product),
  }));
  const [visible, setVisible] = useState({
    visible: false,
    data: false,
  });

  const deleteProductByIndex = (index) => {
    Modal.confirm({
      title: "¿Estas seguro de eliminar?",
      onOk: () =>
        saveOrder([...order.slice(0, index), ...order.slice(index + 1)]),
    });
  };

  const _onClose = (reload = false, index) => {
    if (!visible.data) {
      saveOrder([...order, reload]);
    } else {
      saveOrder([...order.slice(0, index), reload, ...order.slice(index + 1)]);
    }
    setVisible({ visible: false, data: false });
  };

  const _getTotal = () => {
    const quantityTotal = order
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
          <PlusOutlined />
          Añadir producto
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
                <Button
                  onClick={() =>
                    setVisible({ visible: true, data: record, index })
                  }
                >
                  <EditOutlined />
                </Button>
                <Button onClick={() => deleteProductByIndex(index)} danger>
                  <DeleteOutlined />
                </Button>
              </Space>
            )}
          />
        </ColumnGroup>
      </Table>
      <div className="buttons-container">
        <Link to="/orders">
          <Button type="primary" htmlType="reset">
            Realizar nuevo pedido
          </Button>
        </Link>

        <PDFDownloadLink
          document={<ProductPDF total={_getTotal()} data={order} />}
          fileName="comand"
        >
          <Button type="dashed" htmlType="submit">
            Imprimir ticket <PrinterOutlined />
          </Button>
        </PDFDownloadLink>
        {/* <PDFViewer>
          <ProductPDF data={order} />
        </PDFViewer> */}
      </div>
      <div>
        <h1> Total: $ {currency(_getTotal(), 2)}</h1>
      </div>
      <ModalProduct
        open={visible.visible}
        data={visible.data}
        onClose={(data) => _onClose(data, visible.index)}
        onCancel={() => setVisible({ visible: false, data: false })}
      />
    </div>
  );
};

export default ListOrderPage;
