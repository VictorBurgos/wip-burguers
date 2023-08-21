import React, { useState, useEffect } from "react";
import { Modal, Select, Input, Space } from "antd";
import { burguers, typeProduct } from "../../../config/const";
import CurrencyInput from "../../CurrencyInput";

const ModalProduct = (props) => {
  const {
    title = "",
    open = false,
    description = "",
    onClose,
    onCancel,
  } = props;
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [product, setProduct] = useState("-1");
  const [category, setCategory] = useState("-1");
  const [price, setPrice] = useState(0);

  const _onClose = (reload = false) => {
    if (reload) onClose(reload);
  };


  const onAdd = () => {
    const obj = {
      category,
      product,
      price,
      quantity,
      note,
    };
    _onClose(obj);
  };

  useEffect(() => {
    if (props.data) {
      setCategory(props.data.category);
      setProduct(props.data.product);
      setPrice(props.data.price);
      setQuantity(props.data.quantity);
    }
  }, [props.data]);

  return (
    <>
      <Modal
        title={title}
        open={open}
        onText={description}
        onCancel={onCancel}
        onOk={onAdd}
      >
        <Space>
          <Select
            value={category}
            onChange={(value) => setCategory(value)}
            options={[
              {
                value: "-1",
                label: "Selecciona una opción",
                disabled: true,
              },
              ...typeProduct,
            ]}
            style={{
              width: 120,
            }}
          />
          <Select
            value={product}
            onChange={(value) => setProduct(value)}
            options={[
              {
                value: "-1",
                label: "Selecciona una opción",
                disabled: true,
              },
              ...burguers,
            ]}
          />
          <Input value={note} onChange={(e) => setNote(e.target.value)} />
          <Input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <CurrencyInput value={price} onChange={(value) => setPrice(value)} />
        </Space>
      </Modal>
    </>
  );
};

export default ModalProduct;
