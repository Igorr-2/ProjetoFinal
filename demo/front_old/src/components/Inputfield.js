import React from "react";
import App from "../App.css"

const InputField = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field"
    />
  );
};

export default InputField;
