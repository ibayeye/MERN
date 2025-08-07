import React from "react";

const FormInputImage = ({ label, name, value, onChange, placeholder }) => {
  return (
    <label className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
      type="file"
        accept="image/*"
        className="file-input file-input-sm w-full"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
};

export default FormInputImage;
