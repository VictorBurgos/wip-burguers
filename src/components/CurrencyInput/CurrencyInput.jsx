import React from 'react';
import { Input } from 'antd';

const CurrencyInput = ({ value, onChange, rules, ...rest }) => {
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  return (
    <Input
      type="number"
      step="0.01"
      prefix="$"
      value={value}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default CurrencyInput;
