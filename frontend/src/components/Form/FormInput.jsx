import React from "react";

const FormInput = ({ label, name, type, defaultValue }) => {
  return (
    <label className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        className="input input-bordered"
        type={type}
        name={name}
        defaultValue={defaultValue}
      ></input>
    </label>
  );
};

export default FormInput;
