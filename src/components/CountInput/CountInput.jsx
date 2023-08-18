import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const CurrencyInput = ({ value, onChange, rules, ...rest }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  const _add = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity); // Actualizar el estado de quantity
      onChange(newQuantity); // Actualizar el valor del input en el componente padre
    }
  };

  return (
    <>
      <Button onClick={() => _add(-1)} disabled={quantity <= 1}>
        <MinusOutlined />
      </Button>

      <Input
        min={1}
        max={10}
        value={quantity}
        onChange={handleChange}
        {...rest}
      />
      <Button onClick={() => _add(1)}>
        <PlusOutlined />
      </Button>
    </>
  );
};

export default CurrencyInput;
